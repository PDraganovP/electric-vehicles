package app.domain.models;

import app.domain.entities.enums.ElectricVehicleTypes;
import app.validation.DecimalFloatingPointNumberConstraint;
import app.validation.DecimalNumberConstraint;
import app.validation.EnumConstraint;
import app.validation.TextConstraint;

import javax.validation.constraints.NotEmpty;
import java.util.Date;

import static app.AnnotationConstants.*;

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

    @NotEmpty(message = NOT_EMPTY)
    @TextConstraint(min = TEXT_INPUT_MIN_LENGTH, max = TEXT_INPUT_MAX_LENGTH, message = INPUT_IS_NOT_CORRECT)
    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    @NotEmpty(message = NOT_EMPTY)
    @TextConstraint(min = TEXT_INPUT_MIN_LENGTH, max = TEXT_INPUT_MAX_LENGTH, message = INPUT_IS_NOT_CORRECT)
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @DecimalFloatingPointNumberConstraint(min = MIN_TOP_SPEED, max = MAX_TOP_SPEED, message = INPUT_IS_NOT_CORRECT)
    public double getTopSpeed() {
        return topSpeed;
    }

    public void setTopSpeed(double topSpeed) {
        this.topSpeed = topSpeed;
    }

    @DecimalFloatingPointNumberConstraint(min = MIN_ACCELERATION, max = MAX_ACCELERATION, message = INPUT_IS_NOT_CORRECT)
    public double getAcceleration() {
        return acceleration;
    }

    public void setAcceleration(double acceleration) {
        this.acceleration = acceleration;
    }

    @DecimalFloatingPointNumberConstraint(min = MIN_CHARGING_TIME, max = MAX_CHARGING_TIME, message = INPUT_IS_NOT_CORRECT)
    public double getChargingTime() {
        return chargingTime;
    }

    public void setChargingTime(double chargingTime) {
        this.chargingTime = chargingTime;
    }

    @DecimalNumberConstraint(min = MIN_NOMINAL_RANGE, max = MAX_NOMINAL_RANGE, message = INPUT_IS_NOT_CORRECT)
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

    @EnumConstraint(enumeration = ElectricVehicleTypes.class, message = ENUMERATION_VALUE_IS_NOT_CORRECT)
    public ElectricVehicleTypes getElectricVehicleTypes() {
        return electricVehicleTypes;
    }

    public void setElectricVehicleTypes(ElectricVehicleTypes electricVehicleTypes) {
        this.electricVehicleTypes = electricVehicleTypes;
    }
}
