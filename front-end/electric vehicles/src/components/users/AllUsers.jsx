import React from 'react';
//import AuthenticationService from '../../service/AuthenticationService';
import AuthenticationService from '../../service/AuthenticationService';
import ModalComponent from '../ModalComponent';

class AllUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            message: '',
            username: '',
            show: false,
            delete: ''
        }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers = () => {
        let url = 'http://localhost:8080/users/all';
        AuthenticationService.getData(url)
            .then(response => {
                let message = response.message;
                if (message === undefined) {
                    this.setState({
                        users: response
                    })
                } else {
                    this.setState({
                        message: response.message,
                        isLoading: false
                    })
                }
                console.log('Success', JSON.stringify(response));
            }
            ).catch(error => console.log('Error', error))
    }

    changeAccess = (event) => {
        let buttonId = event.target.id;
        let role = buttonId.split('-')[0];
        //   let out = event.target.outerHTML;
        let userId = event.target.parentNode.id;
        console.log('role', role);
        //   console.log('outer', out);
        console.log('userId', userId);
        let url = 'http://localhost:8080/users/set-' + role + '/' + userId;

        AuthenticationService.postData('', url)
            .then(response => {
                let message = response.message;
                if (message !== undefined) {
                    /*  let tdElement = document.getElementById(userId);
 
                     let selector = ':not(#' + buttonId + ')';
 
                     //tdElement.querySelectorAll("button"+selector)[0].style.color = 'green';
                     let buttons = tdElement.querySelectorAll("button" + selector);
                     for (let i = 0; i < buttons.length; i++) {
                         buttons[i].style.display = '';
                     }
                     document.getElementById(buttonId).style.display = "none"; */
                    this.getAllUsers();

                }
                console.log('changed', JSON.stringify(response));

            }).catch(error => console.log('Error', error))
    }

    deleteUser = (event) => {
        //  let buttonId = event.target.id;
        //let userId = buttonId.split('/')[1];
        let userId = this.state.delete;
        let url = 'http://localhost:8080/users/delete/' + userId;//+ role + '/'

        AuthenticationService.postData('', url)
            .then(response => {
                let successMessage = 'You successfully deleted the user';
                let message = response.message;
                if (successMessage === message) {
                    this.setState({
                        message: response.message
                    });
                    this.getAllUsers();
                    console.log('Delete message', response.message)
                } else {
                    this.setState({
                        message: response.messsage
                    })
                }
            })
    }

    findRole(user) {
        let authorities = user.authorities;
        let containsAdmin = authorities.includes('ROLE_ADMIN');
        let containsModerator = authorities.includes('ROLE_MODERATOR');
        if (containsModerator && containsAdmin) {
            return 'admin';
        } else if (containsModerator && (!containsAdmin)) {
            return 'moderator';
        }
        return 'user';
    }

    handleClose = () => {
        this.setState({
            show: false
        });
    };
    handleShow = (event) => {
        //  let id = event.target.id;
        let buttonId = event.target.id;
        let userId = buttonId.split('/')[1];
        let username = buttonId.split('/')[0];
        this.setState({
            show: true,
            delete: userId,
            username: username
        });

    };
    handleDelete = () => {
        this.setState({
            show: false
        });
        this.deleteUser();
    }

    render() {
        let props = {
            show: this.state.show,
            record: this.state.username,
            handleDelete: this.handleDelete,
            handleClose: this.handleClose,
            //   handleShow: this.handleShow
        }

        let center = 'align-middle';
        let { users } = this.state;
        let usersRows = users.map((user, index) =>
            <tr key={user.id}>
                <td className={center}>{index + 1}</td>
                <td className={center}>{user.username}</td>
                <td className={center}>{user.email}</td>
                <td className={"role " + center}>{this.findRole(user)}</td>
                <td className={center} id={user.id}>
                    {!(this.findRole(user) === 'admin') && <button id={"admin-" + index} type="button" className="btn btn-primary mx-1" onClick={this.changeAccess}>Admin</button>}
                    {!(this.findRole(user) === 'moderator') && <button id={"moderator-" + index} type="button" className="btn btn-primary mx-1" onClick={this.changeAccess}>Moderator</button>}
                    {!(this.findRole(user) === 'user') && <button id={"user-" + index} type="button" className="btn btn-primary" onClick={this.changeAccess}>User</button>}
                </td>
                <td>
                    {/* {this.deleteUser}  !(this.findRole(user) === 'user') &&  */<button id={user.username + "/" + user.id} type="button" className="btn btn-primary" onClick={this.handleShow}>Delete</button>}
                </td>
            </tr>
        )
        return (
            <div className="mx-auto w-75">
                <h1 className="text-center">All users</h1>
                <table className="table text-center">
                    <thead >
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>User role</th>
                            <th>Change user role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersRows}
                    </tbody>
                </table>
                <ModalComponent {...props} />
                <h4 className='text-center'>{this.state.message}</h4>
            </div>
        )
    }
}
export default AllUsers 