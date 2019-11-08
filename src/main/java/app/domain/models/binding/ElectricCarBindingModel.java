package app.domain.models.binding;

import app.domain.models.ElectricVehicleModel;

public class ElectricCarBindingModel extends ElectricVehicleModel {
    private int passengers;
    private boolean isDualMotor;
    private boolean isAutonomous;

    public ElectricCarBindingModel() {
    }

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
