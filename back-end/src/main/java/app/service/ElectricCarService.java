package app.service;

import app.domain.models.service.ElectricCarServiceModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ElectricCarService {


    ElectricCarServiceModel saveElectricCar(ElectricCarServiceModel electricCarServiceModel);

    boolean editElectricCar(ElectricCarServiceModel electricCarServiceModel);

    ElectricCarServiceModel findById(String id);

    boolean deleteElectricCarById(String id);

    List<ElectricCarServiceModel> findAllOrderedByModel();
}
