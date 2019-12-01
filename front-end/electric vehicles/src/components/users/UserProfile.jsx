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
            /*  height: '60vh',
             width:'80%',rgba(0, 0, 0, 0.5) */
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
                <div style={{ width: '100px', height: '100px'/* , border: 'solid green 1px' */ }} className="mx-auto">
                    <img src="https://cdn.vox-cdn.com/thumbor/9QiP2iO26oVrzS3bUogeRtqIxn4=/0x0:3000x2000/1200x800/filters:focal(1260x760:1740x1240)/cdn.vox-cdn.com/uploads/chorus_image/image/59669267/GettyImages_914642586.0.jpg" alt="rocket" style={{ objectFit: 'cover', width: '100px', height: '100px', borderRadius: '50%' }} />
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