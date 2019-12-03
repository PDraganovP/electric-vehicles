package app.controllers;

import app.domain.models.Notification;
import app.domain.models.binding.UserEditBindingModel;
import app.domain.models.binding.UserRegisterBindingModel;
import app.domain.models.rest.Message;
import app.domain.models.rest.UserAllRestModel;
import app.domain.models.rest.UserProfileRestModel;
import app.domain.models.service.UserServiceModel;
import app.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {
    private UserService userService;
    private final ModelMapper modelMapper;

    @Autowired
    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/register")
    @PreAuthorize("isAnonymous()")
    public ResponseEntity<?> registerConfirm(@Valid @RequestBody UserRegisterBindingModel model, BindingResult bindingResult) {
        Notification notification = new Notification();
        if (bindingResult.hasErrors()) {
            notification.setMessage("Please, enter valid data");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }

        if (!model.getPassword().equals(model.getConfirmPassword())) {
            notification.setMessage("Your password is not  equal with confirm password");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        } else if (this.userService.isUserExists(model.getUsername())) {
            notification.setMessage("This username already exists");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }

        this.userService.registerUser(this.modelMapper.map(model, UserServiceModel.class));

        notification.setMessage("Your registration is successful");
        return new ResponseEntity<>(notification, HttpStatus.OK);
    }

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> profile(Principal principal) {
        String name = principal.getName();
        Object userByUserName = this.userService.findUserByUserName(name);
        UserProfileRestModel userProfileRestModel = this.modelMapper.map(userByUserName, UserProfileRestModel.class);

        return new ResponseEntity<>(userProfileRestModel, HttpStatus.OK);
    }

    @GetMapping("/edit")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> editProfile(Principal principal) {
        String name = principal.getName();
        Object userByUserName = this.userService.findUserByUserName(name);
        UserProfileRestModel userProfileRestModel = this.modelMapper.map(userByUserName, UserProfileRestModel.class);

        return new ResponseEntity<>(userProfileRestModel, HttpStatus.OK);
    }

    @PatchMapping("/edit")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> editProfileConfirm(@Valid @RequestBody UserEditBindingModel model, BindingResult bindingResult) {
        Notification notification = new Notification();
        if (bindingResult.hasErrors()) {
            notification.setMessage("Please, enter valid data");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }

        if (model.getPassword() != null && !model.getPassword().equals(model.getConfirmPassword())) {
            notification.setMessage("Your password is not  equal with confirm password");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }

        boolean isUserProfileEdited = this.userService.isUserProfileEdited(this.modelMapper.map(model, UserServiceModel.class), model.getOldPassword());
        if (isUserProfileEdited) {
            notification.setMessage("You successfully edited your profile");

            return new ResponseEntity<>(notification, HttpStatus.OK);
        }
        notification.setMessage("Your user profile was not edited");

        return new ResponseEntity<>(notification, HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> allUsers() {
        List<UserAllRestModel> users = this.userService.findAllUsers()
                .stream()
                .map(u -> {
                    UserAllRestModel user = this.modelMapper.map(u, UserAllRestModel.class);
                    user.setAuthorities(u.getAuthorities().stream().map(a -> a.getAuthority()).collect(Collectors.toSet()));

                    return user;
                })
                .collect(Collectors.toList());

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/set-user/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> setUser(@PathVariable String id) {
        this.userService.setUserRole(id, "user");
        Message message = new Message();
        message.setMessage("You successfully changed the role");

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/set-moderator/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> setModerator(@PathVariable String id) {
        this.userService.setUserRole(id, "moderator");
        Message message = new Message();
        message.setMessage("You successfully changed the role");

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/set-admin/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> setAdmin(@PathVariable String id) {
        this.userService.setUserRole(id, "admin");
        Message message = new Message();
        message.setMessage("You successfully changed the role");

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable("id") String id) {
        boolean isDeleted = this.userService.deleteUserById(id);

        if (!isDeleted) {
            Notification notification = new Notification();
            notification.setMessage("User was not deleted");

            return new ResponseEntity<>(notification, HttpStatus.OK);
        }

        Message message = new Message();
        message.setMessage("You successfully deleted the user");

        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    @InitBinder
    private void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
    }
}
