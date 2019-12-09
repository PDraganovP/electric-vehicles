package app.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class TextValidator implements ConstraintValidator<TextConstraint, String> {
    private int min;
    private int max;

    @Override
    public void initialize(TextConstraint constraintAnnotation) {
        this.min = constraintAnnotation.min();
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        return s == "" || ((s.length() >= min && s.length() <= max) && (!s.isBlank()));
    }
}
