package app.repositories;

import app.domain.entities.ElectricTruck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ElectricTruckRepository extends JpaRepository<ElectricTruck, String> {

    @Query("SELECT et FROM ElectricTruck AS et ORDER BY et.model")
    List<ElectricTruck> findAllOrderByModel();
}
