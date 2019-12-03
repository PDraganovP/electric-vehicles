package app.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class DecimalNumberValidator implements ConstraintValidator<DecimalNumberConstraint, Integer> {

    private int min;
    private int max;

    @Override
    public void initialize(DecimalNumberConstraint constraintAnnotation) {
        this.min = constraintAnnotation.min();
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(Integer v, ConstraintValidatorContext constraintValidatorContext) {
        return v == 0 || (v >= min && v <= max);
    }
}
