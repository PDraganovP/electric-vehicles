package app.domain.models;

import app.domain.entities.enums.ElectricVehicleTypes;

import java.util.Date;

public class ElectricVehicleModel extends BaseModel {
    private String manufacturer;
    private String model;
    private double topSpeed;
    private double acceleration;
    private double chargingTime;
    private int nominalRange;
    private Date marketRelease;
    private ElectricVehicleTypes electricVehicleTypes;

    public ElectricVehicleModel() {
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public double getTopSpeed() {
        return topSpeed;
    }

    public void setTopSpeed(double topSpeed) {
        this.topSpeed = topSpeed;
    }

    public double getAcceleration() {
        return acceleration;
    }

    public void setAcceleration(double acceleration) {
        this.acceleration = acceleration;
    }

    public double getChargingTime() {
        return chargingTime;
    }

    public void setChargingTime(double chargingTime) {
        this.chargingTime = chargingTime;
    }

    public int getNominalRange() {
        return nominalRange;
    }

    public void setNominalRange(int nominalRange) {
        this.nominalRange = nominalRange;
    }

    public Date getMarketRelease() {
        return marketRelease;
    }

    public void setMarketRelease(Date marketRelease) {
        this.marketRelease = marketRelease;
    }

    public ElectricVehicleTypes getElectricVehicleTypes() {
        return electricVehicleTypes;
    }

    public void setElectricVehicleTypes(ElectricVehicleTypes electricVehicleTypes) {
        this.electricVehicleTypes = electricVehicleTypes;
    }
}
