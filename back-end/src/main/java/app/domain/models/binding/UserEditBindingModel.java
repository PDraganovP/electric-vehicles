package app.domain.models.binding;

import app.validation.TextConstraint;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import static app.AnnotationConstants.*;

public class UserEditBindingModel {
    private String username;
    private String oldPassword;
    private String password;
    private String confirmPassword;
    private String email;

    public UserEditBindingModel() {
    }

    @NotEmpty(message = NOT_EMPTY)
    @TextConstraint(min = TEXT_INPUT_MIN_LENGTH, max = TEXT_INPUT_MAX_LENGTH, message = INPUT_IS_NOT_CORRECT)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @NotEmpty(message = NOT_EMPTY)
    @TextConstraint(min = TEXT_INPUT_MIN_LENGTH, max = TEXT_INPUT_MAX_LENGTH, message = INPUT_IS_NOT_CORRECT)
    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    @NotEmpty(message = NOT_EMPTY)
    @TextConstraint(min = TEXT_INPUT_MIN_LENGTH, max = TEXT_INPUT_MAX_LENGTH, message = INPUT_IS_NOT_CORRECT)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @NotEmpty(message = NOT_EMPTY)
    @TextConstraint(min = TEXT_INPUT_MIN_LENGTH, max = TEXT_INPUT_MAX_LENGTH, message = INPUT_IS_NOT_CORRECT)
    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    @NotEmpty(message = NOT_EMPTY)
    @Email(message = INPUT_IS_NOT_CORRECT)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
