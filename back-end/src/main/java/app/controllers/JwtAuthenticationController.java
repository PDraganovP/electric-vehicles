package app.controllers;

import app.configurations.JwtTokenUtil;
import app.domain.models.Notification;
import app.domain.models.binding.UserBindingModel;
import app.domain.models.rest.AuthenticatedUser;
import app.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;
import java.util.TreeSet;

@RestController
@CrossOrigin
public class JwtAuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticatedUser(@Valid @RequestBody UserBindingModel authenticationRequest, BindingResult bindingResult) throws Exception {
        Notification notification = new Notification();
        if (bindingResult.hasErrors()) {
            notification.setMessage("Please, enter valid data");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);

        Set<String> authorities = new TreeSet<>();
        userDetails.getAuthorities().stream()
                .forEach(o -> authorities.add(((GrantedAuthority) o).getAuthority()));

        String userRole = getUserRole(authorities);

        AuthenticatedUser authenticatedUser = new AuthenticatedUser();
        authenticatedUser.setToken(token);
        authenticatedUser.setUserRole(userRole);

        return ResponseEntity.ok(authenticatedUser);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    private String getUserRole(Set<String> authorities) {
        String moderator = "ROLE_MODERATOR";
        String admin = "ROLE_ADMIN";

        boolean containsModerator = authorities.contains(moderator);
        boolean containsAdmin = authorities.contains(admin);
        if (containsAdmin) {
            return "admin";
        } else if (containsModerator && (!containsAdmin)) {
            return "moderator";
        }
        return "user";
    }
}


