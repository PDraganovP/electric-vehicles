import React from 'react';
import Loader from '../loader/Loader';
import Message from '../message/Message';
import DataService from '../../service/DataService';

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

    deleteMessage = () => {
        this.setState({
            message: ''
        })
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
        let { username, email, isLoading, message } = this.state;
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
                            <Message message={message} deleteMessage={this.deleteMessage} />
                        </div>
                    </React.Fragment>}
            </div>
        )
    }
}

export default UserProfile