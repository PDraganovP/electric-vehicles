package app.domain.models.service;

import app.domain.models.ElectricVehicleModel;

public class ElectricTruckServiceModel extends ElectricVehicleModel {
    private double payloadCapacity;
    private int numberOfAxel;

    public ElectricTruckServiceModel() {
    }

    public double getPayloadCapacity() {
        return payloadCapacity;
    }

    public void setPayloadCapacity(double payloadCapacity) {
        this.payloadCapacity = payloadCapacity;
    }

    public int getNumberOfAxel() {
        return numberOfAxel;
    }

    public void setNumberOfAxel(int numberOfAxel) {
        this.numberOfAxel = numberOfAxel;
    }
}
