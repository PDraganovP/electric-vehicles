package app.domain.entities.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ElectricVehicleTypes {
    BATTERY_ELECTRIC_VEHICLE("Battery electric vehicle"),
    PLUG_IN_HYBRID_ELECTRIC_VEHICLE("Plug in hybrid electric vehicle"),
    HYBRID_ELECTRIC_VEHICLE("Hybrid electric vehicle"),
    FUEL_CELL_ELECTRIC_VEHICLE("Fuel cell electric vehicle");

    private String type;

    ElectricVehicleTypes(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

}
