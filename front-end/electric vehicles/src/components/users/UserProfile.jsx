import React from 'react';
import DataService from '../../service/DataService';
import Loader from '../loader/Loader';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            message: '',
            isLoading: false
        }
    }

    componentDidMount() {
        this.getUserProfile();
    }

    getUserProfile = () => {
        this.setState({
            isLoading: true
        })
        let url = 'http://localhost:8080/users/profile';
        DataService.getData(url)
            .then(response => {
                let username = response.username;
                if (username !== undefined) {
                    this.setState({
                        username: response.username,
                        email: response.email,
                        isLoading: false
                    })
                } else {
                    this.setState({
                        message: response.message,
                        isLoading: false
                    })
                }
            }).catch(error => console.log('error', error));
    }

    render() {
        let { username, email, isLoading } = this.state;
        return (
            <div className="text-center mt-5 text-white">
                <h1>Profile</h1>
                {isLoading ? <Loader /> :
                    <React.Fragment>
                        <div>
                            <h1>Username</h1>
                            <h2>{username}</h2>
                            <h1>Email</h1>
                            <h2>{email}</h2>
                            <h4 className='text-center'>{this.state.message}</h4>
                        </div>
                    </React.Fragment>}
            </div>
        )
    }
}

export default UserProfile