package app.service;

import app.domain.entities.ElectricTruck;
import app.domain.models.service.ElectricTruckServiceModel;
import app.repositories.ElectricTruckRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ElectricTruckServiceImpl implements ElectricTruckService {
    private final ElectricTruckRepository electricTruckRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ElectricTruckServiceImpl(ElectricTruckRepository electricTruckRepository, ModelMapper modelMapper) {
        this.electricTruckRepository = electricTruckRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ElectricTruckServiceModel saveElectricTruck(ElectricTruckServiceModel electricTruckServiceModel) {
        ElectricTruck electricTruck = this.modelMapper.map(electricTruckServiceModel, ElectricTruck.class);
        ElectricTruck savedElectricTruck = this.electricTruckRepository.saveAndFlush(electricTruck);
        ElectricTruckServiceModel mappedElectricTruckServiceModel = this.modelMapper
                .map(savedElectricTruck, ElectricTruckServiceModel.class);

        return mappedElectricTruckServiceModel;
    }

    @Override
    public boolean editElectricTruck(ElectricTruckServiceModel electricTruckServiceModel) {
        String id = electricTruckServiceModel.getId();
        ElectricTruck electricTruck = this.electricTruckRepository.getOne(id);

        if (electricTruck != null) {
            electricTruck = this.modelMapper.map(electricTruckServiceModel, ElectricTruck.class);
            this.electricTruckRepository.save(electricTruck);
            return true;
        }
        return false;
    }

    @Override
    public ElectricTruckServiceModel findById(String id) {
        ElectricTruck electricTruck = this.electricTruckRepository.findById(id).orElse(null);
        return electricTruck == null ? null : this.modelMapper.map(electricTruck, ElectricTruckServiceModel.class);
    }

    @Override
    public boolean deleteElectricTruckById(String id) {
        try {
            this.electricTruckRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<ElectricTruckServiceModel> findAllOrderedByModel() {
        List<ElectricTruck> electricTrucks = this.electricTruckRepository.findAllOrderByModel();
        List<ElectricTruckServiceModel> electricTruckServiceModels = electricTrucks.stream()
                .map(electricTruck -> this.modelMapper
                        .map(electricTruck, ElectricTruckServiceModel.class))
                .collect(Collectors.toList());

        return electricTruckServiceModels;
    }
}
