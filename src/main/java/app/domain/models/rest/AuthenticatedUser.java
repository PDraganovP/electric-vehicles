package app.domain.models.rest;

public class AuthenticatedUser {
    private String token;
    private String userRole;

    public AuthenticatedUser() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
