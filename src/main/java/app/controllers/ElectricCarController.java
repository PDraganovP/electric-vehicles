package app.controllers;

import app.domain.models.Notification;
import app.domain.models.binding.ElectricCarBindingModel;
import app.domain.models.service.ElectricCarServiceModel;
import app.domain.models.rest.ElectricCarRestModel;
import app.service.ElectricCarService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/electricCars")
public class ElectricCarController {

    private final ElectricCarService electricCarService;
    private final ModelMapper modelMapper;

    @Autowired
    public ElectricCarController(ElectricCarService electricCarService, ModelMapper modelMapper) {
        this.electricCarService = electricCarService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/show")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> show() {
        List<ElectricCarServiceModel> electricCarServiceModelList = this.electricCarService.findAllOrderedByModel();
        List<ElectricCarRestModel> electricCarRestModelList = electricCarServiceModelList.stream().map(electricCarServiceModel -> this.modelMapper
                .map(electricCarServiceModel, ElectricCarRestModel.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(electricCarServiceModelList, HttpStatus.OK);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> addElectricCar(@Valid @RequestBody ElectricCarBindingModel electricCarBindingModel, BindingResult bindingResult) {
        ElectricCarServiceModel electricCarServiceModel = this.modelMapper.map(electricCarBindingModel, ElectricCarServiceModel.class);
        ElectricCarServiceModel electricCarServiceModelWithId = this.electricCarService.saveElectricCar(electricCarServiceModel);
        electricCarBindingModel.setId(electricCarServiceModelWithId.getId());
        Notification notification = new Notification();

        if (electricCarServiceModelWithId == null) {
            notification.setMessage("New record is not added");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }
        notification.setMessage("New record was added");

        return new ResponseEntity<>(notification, HttpStatus.OK);
    }

    @GetMapping("/edit/{id}")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> getEditElectricCarPage(@PathVariable("id") String id) {
        ElectricCarServiceModel electricCarServiceModel = this.electricCarService.findById(id);
        Notification notification = new Notification();

        if (electricCarServiceModel == null) {
            notification.setMessage("The record was not found");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }
        ElectricCarBindingModel electricCarBindingModel = this.modelMapper.map(electricCarServiceModel, ElectricCarBindingModel.class);

        return new ResponseEntity<>(electricCarBindingModel, HttpStatus.OK);
    }

    @PostMapping("/edit/{id}")
    // @PatchMapping("/edit/{id}")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> editElectricCar(@PathVariable("id") String id, @RequestBody ElectricCarBindingModel electricCarBindingModel) {
        electricCarBindingModel.setId(id);
        ElectricCarServiceModel electricCarServiceModel = this.modelMapper.map(electricCarBindingModel, ElectricCarServiceModel.class);
        boolean isEdited = this.electricCarService.editElectricCar(electricCarServiceModel);
        Notification notification = new Notification();

        if (isEdited) {
            notification.setMessage("The record was edited");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }
        notification.setMessage("The record was not edited");

        return new ResponseEntity<>(notification, HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> deleteElectricCar(@PathVariable("id") String id) {
        boolean isDeleted = this.electricCarService.deleteElectricCarById(id);
        Notification notification = new Notification();

        if (!isDeleted) {
            notification.setMessage("The record was not deleted");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }
        notification.setMessage("The record was deleted");

        return new ResponseEntity<>(notification, HttpStatus.OK);
    }

    @GetMapping("/compareElectricCars")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCompareElectricCarsPage() {
        List<ElectricCarRestModel> electricCarsOrderedByName = this.findElectricCarsOrderedByModel();

        return new ResponseEntity<>(electricCarsOrderedByName, HttpStatus.OK);
    }

    private List<ElectricCarRestModel> findElectricCarsOrderedByModel() {
        List<ElectricCarServiceModel> electricCarServiceModelList = this.electricCarService.findAllOrderedByModel();
        List<ElectricCarRestModel> electricCarRestModelList = electricCarServiceModelList.stream().map(electricCarServiceModel -> this.modelMapper
                .map(electricCarServiceModel, ElectricCarRestModel.class))
                .collect(Collectors.toList());
        return electricCarRestModelList;

    }
}
