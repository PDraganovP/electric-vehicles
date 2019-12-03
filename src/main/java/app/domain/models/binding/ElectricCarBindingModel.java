package app.domain.models.binding;

import app.domain.models.ElectricVehicleModel;
import app.validation.DecimalNumberConstraint;

import static app.AnnotationConstants.*;

public class ElectricCarBindingModel extends ElectricVehicleModel {
    private int passengers;
    private boolean isDualMotor;
    private boolean isAutonomous;

    public ElectricCarBindingModel() {
    }

    @DecimalNumberConstraint(min = MIN_PASSENGERS, max = MAX_PASSENGERS, message = INPUT_IS_NOT_CORRECT)
    public int getPassengers() {
        return passengers;
    }

    public void setPassengers(int passengers) {
        this.passengers = passengers;
    }

    public boolean isDualMotor() {
        return isDualMotor;
    }

    public void setDualMotor(boolean dualMotor) {
        isDualMotor = dualMotor;
    }

    public boolean isAutonomous() {
        return isAutonomous;
    }

    public void setAutonomous(boolean autonomous) {
        isAutonomous = autonomous;
    }

}
