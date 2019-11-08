package app.service;

import app.domain.entities.ElectricCar;
import app.domain.models.service.ElectricCarServiceModel;
import app.repositories.ElectricCarRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ElectricCarServiceImpl implements ElectricCarService {

    private final ElectricCarRepository electricCarRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ElectricCarServiceImpl(ElectricCarRepository electricCarRepository, ModelMapper modelMapper) {
        this.electricCarRepository = electricCarRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ElectricCarServiceModel saveElectricCar(ElectricCarServiceModel electricCarServiceModel) {
        ElectricCar electricCar = this.modelMapper.map(electricCarServiceModel, ElectricCar.class);
        ElectricCar savedElectricCar = this.electricCarRepository.saveAndFlush(electricCar);
        ElectricCarServiceModel mappedElectricCarServiceModel = this.modelMapper
                .map(savedElectricCar, ElectricCarServiceModel.class);

        return mappedElectricCarServiceModel;
    }

    @Override
    public boolean editElectricCar(ElectricCarServiceModel electricCarServiceModel) {
        String id = electricCarServiceModel.getId();
        ElectricCar electricCar = this.electricCarRepository.getOne(id);

        if (electricCar != null) {
            electricCar = this.modelMapper.map(electricCarServiceModel, ElectricCar.class);
            this.electricCarRepository.save(electricCar);
            return true;
        }
        return false;
    }

    @Override
    public ElectricCarServiceModel findById(String id) {
        ElectricCar electricCar = this.electricCarRepository.findById(id).orElse(null);
        return electricCar == null ? null : this.modelMapper.map(electricCar, ElectricCarServiceModel.class);
    }

    @Override
    public boolean deleteElectricCarById(String id) {
        try {
            this.electricCarRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<ElectricCarServiceModel> findAllOrderedByModel() {
        List<ElectricCar> electricCars = this.electricCarRepository.findAllOrderByModel();
        List<ElectricCarServiceModel> electricCarServiceModels = electricCars.stream()
                .map(electricCar -> this.modelMapper
                        .map(electricCar, ElectricCarServiceModel.class))
                .collect(Collectors.toList());

        return electricCarServiceModels;
    }
}
