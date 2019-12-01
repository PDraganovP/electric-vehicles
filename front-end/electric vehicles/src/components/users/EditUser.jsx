import React from 'react';
import { Formik, Form } from 'formik';
import { formSchema } from './EditUserFormValidation';
import TextInputField from '../input-fields/TextInputField';
import AuthenticationService from '../../service/AuthenticationService';

import { Spinner } from 'react-bootstrap';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formInitialValues: {
                username: '',
                oldPassword: '',
                password: '',
                confirmPassword: '',
                email: ''
            },
            message: '',

            isLoading: false
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        this.setState({
            isLoading: true
        })
        let url = 'http://localhost:8080/users/edit';
        AuthenticationService.getData(url)
            .then(response => {
                const unauthorizedMessage = 'You are unauthorized'
                let username = response.username;
                if (username !== undefined) {
                    this.setState({
                        formInitialValues: {
                            username: response.username,
                            oldPassword: '',
                            password: '',
                            confirmPassword: '',
                            email: response.email,
                        },
                        isLoading: false
                    })
                } else {
                    this.setState({
                        message: response.message,
                        isLoading: false
                    })
                }
            })
    }


    handleSubmit = (values) => {
        let url = 'http://localhost:8080/users/edit';

        let user = {
            username: values.username,
            oldPassword: values.oldPassword,
            password: values.password,
            confirmPassword: values.confirmPassword,
            email: values.email
        }

        AuthenticationService.patchData(user, url)
            .then(response => {
                let successMessage = 'You successfully edited your profile';
                let message = response.message;
                if (message !== undefined && message === successMessage) {
                    this.getUser();
                    console.log('message', message);

                    this.setState({
                        message: response.message
                    })

                } else {
                    let unsuccessMessage = 'Please try to edit profile once again';
                    this.setState({
                        message: response.message
                    })
                }

                console.log('Success', JSON.stringify(response));
            })
            .catch(error => console.error('Error:', error));

    }

    render() {
        let { formInitialValues } = this.state;

        return (
            <div className="mx-auto w-50">
                {this.state.isLoading ? <Spinner animation="border" variant="primary" style={{ textAlign: 'center' }} /> :
                    <Formik
                        initialValues={formInitialValues}
                        onSubmit={this.handleSubmit}
                        validateOnChange={false}
                        validateOnBlur={true}
                        // validate={this.validate}//false
                        validationSchema={formSchema}
                        enableReinitialize={true}
                    >

                        <Form >
                            <TextInputField placeholder="Enter username" label="Username" name="username" disabled={true} />
                            <TextInputField placeholder="Enter old password" label="Old password" name="oldPassword" type="password" />
                            <TextInputField placeholder="Enter new password" label="New password" name="password" type="password" />
                            <TextInputField placeholder="Confirm password" label="Comfirm password" name="confirmPassword" type="password" />
                            <TextInputField placeholder="Enter email" label="Email address" name="email" type="email" />
                            <button className="btn btn-success" type="Register">Save</button>
                            <h4 className='text-center'>{this.state.message}</h4>
                        </Form>
                    </Formik>}
            </div>
        )
    }
}

export default EditUser

