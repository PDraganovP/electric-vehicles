package app.controllers;

import app.domain.entities.enums.ElectricVehicleTypes;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ElectricVehicleTypesController {
    public ElectricVehicleTypesController() {
    }

    @GetMapping("/electricVehicleTypes")
    public ElectricVehicleTypes[] getElectricVehicleTypes() {
        ElectricVehicleTypes[] electricVehicleTypes = ElectricVehicleTypes.values();

        return electricVehicleTypes;
    }
}
