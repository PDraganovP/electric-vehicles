import Cookie from 'js-cookie';

class DataService {

    getToken() {
        let token = '';
        if (Cookie.get('token') !== undefined) {
            token = Cookie.get('token');
        }
        return token
    }

    postData(data, url) {
        let token = this.getToken();

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
    }

    patchData(data, url) {
        let token = this.getToken();

        return fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
    }

    getData(url) {
        let token = this.getToken();

        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
    }

    logout() {
        Cookie.remove('token');
        Cookie.remove('userRole');
    }

    isUserLoggedIn() {
        if (Cookie.get('token') !== undefined) {
            return true
        }
        return false
    }

    isAdmin() {
        let userRole = Cookie.get('userRole');
        if (userRole !== undefined && userRole === 'admin') {
            return true;
        }
        return false;
    }

    isModerator() {
        let userRole = Cookie.get('userRole');
        if (userRole !== 'admin' && userRole === 'moderator') {
            return true;
        }
        return false;
    }
}
export default new DataService()



