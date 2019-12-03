package app.domain.models.binding;

import java.util.Set;

public class UserBindingModel {
    private String id;
    private String username;
    private String password;
    private String email;
    private Set<RoleBindingModel> authorities;

    public UserBindingModel() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
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
    }
}
