import React from 'react';
import AuthenticationService from '../../service/AuthenticationService';
import Table from '../table/Table';
import TableHead from '../table/TableHead';
import TableBody from '../table/TableBody';
import ModalComponent from '../modal/ModalComponent';
import '../../styles/common-styles.css';

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
            }
            ).catch(error => console.log('Error', error))
    }

    changeAccess = (event) => {
        let buttonId = event.target.id;
        let role = buttonId.split('-')[0];
        let userId = event.target.parentNode.id;
        console.log('role', role);
        console.log('userId', userId);
        let url = 'http://localhost:8080/users/set-' + role + '/' + userId;

        AuthenticationService.postData('', url)
            .then(response => {
                let message = response.message;
                if (message !== undefined) {
                    this.getAllUsers();

                }
                console.log('changed', JSON.stringify(response));

            }).catch(error => console.log('Error', error))
    }

    deleteUser = () => {
        let userId = this.state.delete;
        let url = 'http://localhost:8080/users/delete/' + userId;

        AuthenticationService.postData('', url)
            .then(response => {
                let successMessage = 'You successfully deleted the user';
                let message = response.message;
                if (successMessage === message) {
                    this.setState({
                        message: response.message
                    });
                    this.getAllUsers();
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
        }

        let { users } = this.state;
        let usersRows = users.map((user, index) =>
            <tr key={user.id} className='data-row'>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{this.findRole(user)}</td>
                <td id={user.id}>
                    {!(this.findRole(user) === 'admin') && <button id={"admin-" + index} type="button" className="btn btn-primary mx-1" onClick={this.changeAccess}>Admin</button>}
                    {!(this.findRole(user) === 'moderator') && <button id={"moderator-" + index} type="button" className="btn btn-primary mx-1" onClick={this.changeAccess}>Moderator</button>}
                    {!(this.findRole(user) === 'user') && <button id={"user-" + index} type="button" className="btn btn-primary" onClick={this.changeAccess}>User</button>}
                </td>
                <td>
                    <button id={user.username + "/" + user.id} type="button" className="btn btn-primary" onClick={this.handleShow}>Delete</button>
                </td>
            </tr>
        )
        let cells = ['#', 'Username ', 'Email ', 'User role', 'Change user role', 'Delete'];

        return (
            <div className="mx-auto w-75">
                <Table tableHeading='All users' >
                    <TableHead cells={cells} />
                    <TableBody>
                        {usersRows}
                    </TableBody>
                </Table>
                <ModalComponent {...props} />
                <h4 className='text-center'>{this.state.message}</h4>
            </div>
        )
    }
}
export default AllUsers