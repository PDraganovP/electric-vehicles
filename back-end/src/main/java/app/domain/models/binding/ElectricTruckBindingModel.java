package app.domain.models.binding;

import app.domain.models.ElectricVehicleModel;
import app.validation.DecimalFloatingPointNumberConstraint;
import app.validation.DecimalNumberConstraint;

import static app.AnnotationConstants.*;

public class ElectricTruckBindingModel extends ElectricVehicleModel {
    private double payloadCapacity;
    private int numberOfAxel;

    public ElectricTruckBindingModel() {
    }

    @DecimalFloatingPointNumberConstraint(min = MIN_PAYLOAD_CAPACITY, max = MAX_PAYLOAD_CAPACITY, message = INPUT_IS_NOT_CORRECT)
    public double getPayloadCapacity() {
        return payloadCapacity;
    }

    public void setPayloadCapacity(double payloadCapacity) {
        this.payloadCapacity = payloadCapacity;
    }

    @DecimalNumberConstraint(min = MIN_NUMBER_OF_AXEL, max = MAX_NUMBER_OF_AXEL, message = INPUT_IS_NOT_CORRECT)
    public int getNumberOfAxel() {
        return numberOfAxel;
    }

    public void setNumberOfAxel(int numberOfAxel) {
        this.numberOfAxel = numberOfAxel;
    }
}
