package app.domain.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "electric_trucks")
public class ElectricTruck extends ElectricVehicle {
    private double payloadCapacity;
    private int numberOfAxel;

    public ElectricTruck() {
    }

    @Column(name = "payload_capacity")
    public double getPayloadCapacity() {
        return payloadCapacity;
    }

    public void setPayloadCapacity(double payloadCapacity) {
        this.payloadCapacity = payloadCapacity;
    }

    @Column(name = "number_of_axel")
    public int getNumberOfAxel() {
        return numberOfAxel;
    }

    public void setNumberOfAxel(int numberOfAxel) {
        this.numberOfAxel = numberOfAxel;
    }
}
