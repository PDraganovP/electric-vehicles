package app.service;

import app.domain.models.service.ElectricTruckServiceModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ElectricTruckService {

    ElectricTruckServiceModel saveElectricTruck(ElectricTruckServiceModel electricTruckServiceModel);

    boolean editElectricTruck(ElectricTruckServiceModel electricTruckServiceModel);

    ElectricTruckServiceModel findById(String id);

    boolean deleteElectricTruckById(String id);

    List<ElectricTruckServiceModel> findAllOrderedByModel();
}
