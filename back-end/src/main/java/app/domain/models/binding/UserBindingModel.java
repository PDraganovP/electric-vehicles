package app.domain.models.binding;

import app.validation.TextConstraint;

import javax.validation.constraints.NotEmpty;

import static app.AnnotationConstants.*;
import static app.AnnotationConstants.INPUT_IS_NOT_CORRECT;

public class UserBindingModel {
   // private String id;
    private String username;
    private String password;
   /* private String email;
    private Set<RoleBindingModel> authorities;*/

    public UserBindingModel() {
    }

    /* public String getId() {
         return id;
     }

     public void setId(String id) {
         this.id = id;
     }*/
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
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

   /* public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<RoleBindingModel> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<RoleBindingModel> authorities) {
        this.authorities = authorities;
    }*/
}
