package app.domain.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "electric_cars")
public class ElectricCar extends ElectricVehicle {
    private int passengers;
    private boolean isDualMotor;
    private boolean isAutonomous;

    public ElectricCar() {
    }

    @Column(name = "passengers")
    public int getPassengers() {
        return passengers;
    }

    public void setPassengers(int passengers) {
        this.passengers = passengers;
    }

    @Column(name = "is_dual_motor")
    public boolean isDualMotor() {
        return isDualMotor;
    }

    public void setDualMotor(boolean dualMotor) {
        isDualMotor = dualMotor;
    }

    @Column(name = "is_autonomous")
    public boolean isAutonomous() {
        return isAutonomous;
    }

    public void setAutonomous(boolean autonomous) {
        isAutonomous = autonomous;
    }
}
