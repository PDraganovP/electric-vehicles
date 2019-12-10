package app.domain.entities;

import app.domain.entities.enums.ElectricVehicleTypes;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
public abstract class ElectricVehicle extends BaseEntity {
    private String manufacturer;
    private String model;
    private double topSpeed;
    private double acceleration;
    private double chargingTime;
    private int nominalRange;
    private Date marketRelease;
    private ElectricVehicleTypes electricVehicleTypes;

    public ElectricVehicle() {
    }

    @Column(name = "manufacturers")
    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    @Column(name = "model")
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Column(name = "top_speed")
    public double getTopSpeed() {
        return topSpeed;
    }

    public void setTopSpeed(double topSpeed) {
        this.topSpeed = topSpeed;
    }

    @Column(name = "acceleration")
    public double getAcceleration() {
        return acceleration;
    }

    public void setAcceleration(double acceleration) {
        this.acceleration = acceleration;
    }

    @Column(name = "charging_time")
    public double getChargingTime() {
        return chargingTime;
    }

    public void setChargingTime(double chargingTime) {
        this.chargingTime = chargingTime;
    }

    @Column(name = "nominal_range")
    public int getNominalRange() {
        return nominalRange;
    }

    public void setNominalRange(int nominalRange) {
        this.nominalRange = nominalRange;
    }

    @Column(name = "market_release")
    public Date getMarketRelease() {
        return marketRelease;
    }


    public void setMarketRelease(Date marketRelease) {
        this.marketRelease = marketRelease;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "electric_vehicle_types")
    public ElectricVehicleTypes getElectricVehicleTypes() {
        return electricVehicleTypes;
    }

    public void setElectricVehicleTypes(ElectricVehicleTypes electricVehicleTypes) {
        this.electricVehicleTypes = electricVehicleTypes;
    }
}
