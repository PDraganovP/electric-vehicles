import React from 'react';
import AuthenticationService from '../../service/AuthenticationService';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            message: ''
        }
    }

    componentDidMount() {
        this.getUserProfile();
    }

    getUserProfile = () => {
        let url = 'http://localhost:8080/users/profile';
        AuthenticationService.getData(url)
            .then(response => {
                let username = response.username;
                if (username !== undefined) {
                    this.setState({
                        username: response.username,
                        email: response.email
                    })
                } else {
                    this.setState({
                        message: response.message
                    })
                }
                console.log('User', JSON.stringify(response))
            }).catch(error => console.log('error', error));
    }

    render() {
        let styles = {
            paddingTop: '15vh',
            paddingBottom: '15vh',
            backgroundColor: '#f8f9fa',
            color: 'rgba(116, 72, 72, 0.5)'
        }
        let { username, email } = this.state;
        return (
            <div className="text-center" style={styles}>
                <h1>Profile</h1>
                <div >
                    <h1>Username</h1>
                    <h2>{username}</h2>
                </div>
                <div style={{ width: '100px', height: '100px' }} className="mx-auto">
                    <img src="https://fsmedia.imgix.net/6d/3b/27/0d/7199/4372/a982/ef903882eac9.jpeg" alt="rocket" style={{ objectFit: 'cover', width: '100px', height: '100px', borderRadius: '50%' }} />
                </div>
                <div>
                    <h1>Email</h1>
                    <h2>{email}</h2>
                    <h4 className='text-center'>{this.state.message}</h4>
                </div>
            </div>
        )
    }
}

export default UserProfile