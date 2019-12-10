package app.repositories;

import app.domain.entities.ElectricCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ElectricCarRepository extends JpaRepository<ElectricCar, String> {

    @Query("SELECT ec FROM ElectricCar AS ec ORDER BY ec.model")
    List<ElectricCar> findAllOrderByModel();
}
