package app.domain.models.binding;

import app.domain.models.ElectricVehicleModel;

public class ElectricTruckBindingModel extends ElectricVehicleModel {
    private double payloadCapacity;
    private int numberOfAxel;

    public ElectricTruckBindingModel() {
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
