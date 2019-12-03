package app.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class DecimalFloatingPointNumberValidator implements ConstraintValidator<DecimalFloatingPointNumberConstraint, Double> {

    private double min;
    private double max;

    @Override
    public void initialize(DecimalFloatingPointNumberConstraint constraintAnnotation) {
        this.min = constraintAnnotation.min();
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(Double v, ConstraintValidatorContext constraintValidatorContext) {

        return v == 0 || (v >= min && v <= max);
    }
}

