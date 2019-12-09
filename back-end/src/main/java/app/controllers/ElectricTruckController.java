package app.controllers;

import app.domain.models.Notification;
import app.domain.models.binding.ElectricTruckBindingModel;
import app.domain.models.rest.ElectricTruckRestModel;
import app.domain.models.service.ElectricTruckServiceModel;
import app.service.ElectricTruckService;
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
@RequestMapping("/electricTrucks")
public class ElectricTruckController {

    private final ElectricTruckService electricTruckService;
    private final ModelMapper modelMapper;

    @Autowired
    public ElectricTruckController(ElectricTruckService electricTruckService, ModelMapper modelMapper) {
        this.electricTruckService = electricTruckService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/show")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> show() {

        List<ElectricTruckServiceModel> electricTruckServiceModelList = this.electricTruckService.findAllOrderedByModel();
        List<ElectricTruckRestModel> electricTruckRestModelList = electricTruckServiceModelList.stream()
                .map(electricTruckServiceModel -> this.modelMapper
                        .map(electricTruckServiceModel, ElectricTruckRestModel.class)).collect(Collectors.toList());


        return new ResponseEntity<>(electricTruckRestModelList, HttpStatus.OK);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> addElectricTruck(@Valid @RequestBody ElectricTruckBindingModel electricTruckBindingModel, BindingResult bindingResult) {
        Notification notification = new Notification();
        if (bindingResult.hasErrors()) {
            notification.setMessage("Please, enter valid data");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }

        ElectricTruckServiceModel electricTruckServiceModel = this.modelMapper.map(electricTruckBindingModel, ElectricTruckServiceModel.class);
        ElectricTruckServiceModel electricTruckServiceModelWithId = this.electricTruckService.saveElectricTruck(electricTruckServiceModel);
        electricTruckBindingModel.setId(electricTruckServiceModelWithId.getId());

        if (electricTruckServiceModelWithId == null) {
            notification.setMessage("New record is not added");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }
        notification.setMessage("New record was added");

        return new ResponseEntity<>(notification, HttpStatus.OK);
    }

    @GetMapping("/edit/{id}")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> getEditElectricTruckPage(@PathVariable("id") String id) {
        ElectricTruckServiceModel electricTruckServiceModel = this.electricTruckService.findById(id);
        Notification notification = new Notification();

        if (electricTruckServiceModel == null) {
            notification.setMessage("The record was not found");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }
        ElectricTruckRestModel electricTruckRestModel = this.modelMapper.map(electricTruckServiceModel, ElectricTruckRestModel.class);

        return new ResponseEntity<>(electricTruckRestModel, HttpStatus.OK);
    }

    @PostMapping("/edit/{id}")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> editElectricTruck(@PathVariable("id") String id, @Valid @RequestBody ElectricTruckBindingModel electricTruckBindingModel, BindingResult bindingResult) {
        Notification notification = new Notification();
        if (bindingResult.hasErrors()) {
            notification.setMessage("Please, enter valid data");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }

        electricTruckBindingModel.setId(id);
        ElectricTruckServiceModel electricTruckServiceModel = this.modelMapper.map(electricTruckBindingModel, ElectricTruckServiceModel.class);

        boolean isEdited = this.electricTruckService.editElectricTruck(electricTruckServiceModel);

        if (isEdited) {
            notification.setMessage("The record was edited");
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }
        notification.setMessage("The record was not edited");
        return new ResponseEntity<>(notification, HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> deleteElectricTruck(@PathVariable("id") String id) {
        boolean isDeleted = this.electricTruckService.deleteElectricTruckById(id);
        Notification notification = new Notification();
        if (!isDeleted) {
            notification.setMessage("The record was not deleted");

            return new ResponseEntity<>(notification, HttpStatus.OK);
        }

        notification.setMessage("The record was deleted");
        return new ResponseEntity<>(notification, HttpStatus.OK);
    }

    @GetMapping("/compareElectricTrucks")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCompareElectricTrucksPage() {
        List<ElectricTruckRestModel> electricTrucksOrderedByName = this.findElectricTrucksOrderedByName();

        return new ResponseEntity<>(electricTrucksOrderedByName, HttpStatus.OK);
    }

    private List<ElectricTruckRestModel> findElectricTrucksOrderedByName() {
        List<ElectricTruckServiceModel> electricTruckServiceModelList = this.electricTruckService.findAllOrderedByModel();
        List<ElectricTruckRestModel> electricTruckRestModelList = electricTruckServiceModelList.stream().map(electricTruckServiceModel -> this.modelMapper
                .map(electricTruckServiceModel, ElectricTruckRestModel.class))
                .collect(Collectors.toList());
        return electricTruckRestModelList;

    }
}
