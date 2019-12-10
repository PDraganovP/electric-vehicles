package app.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;

public class EnumValidator implements ConstraintValidator<EnumConstraint, Enum<?>> {
    private List<String> enumValues = null;

    @Override
    public void initialize(EnumConstraint constraintAnnotation) {
        enumValues = new ArrayList<>();
        Class<? extends Enum<?>> enumeration = constraintAnnotation.enumeration();
        Enum<?>[] enumConstants = enumeration.getEnumConstants();
        for (Enum anEnum : enumConstants) {
            enumValues.add(anEnum.toString().toUpperCase());
        }
    }

    @Override
    public boolean isValid(Enum<?> enumeration, ConstraintValidatorContext constraintValidatorContext) {
        String enumValue = enumeration.toString().toUpperCase();
        boolean containsValues = enumValues.contains(enumValue);
        return containsValues;
    }
}
