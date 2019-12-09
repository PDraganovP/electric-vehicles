package app.domain.models.rest;

import app.domain.models.ElectricVehicleModel;

public class ElectricTruckRestModel extends ElectricVehicleModel {
    private double payloadCapacity;
    private int numberOfAxel;

    public ElectricTruckRestModel() {
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
