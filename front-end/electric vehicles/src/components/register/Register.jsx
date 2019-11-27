import React from 'react';
import { Form, Formik } from 'formik';
import { formSchema } from './RegisterFormValidation'
import TextInputField from '../input-fields/TextInputField';
import AuthenticationService from '../../service/AuthenticationService';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            message: ''
        }
    }

    handleSubmit = (values) => {

        let user = {
            username: values.username,
            password: values.password,
            confirmPassword: values.confirmPassword,
            email: values.email
        }

        let url = 'http://localhost:8080/users/register';

        AuthenticationService.postData(user, url)
            .then(response => {
                let successMessage = 'Your registration is successful';
                let message = response.message;
                if (message !== undefined && message === successMessage) {
                    let { history } = this.props;
                    history.push('/login');
                }
                console.log('Success', JSON.stringify(response));
                this.setState({
                    message: response.message
                })
            })
            .catch(error => console.error('Error:', error));
    }

    render() {
        let { username, password, email, confirmPassword } = this.state;

        return (
            <div className="mx-auto w-50">
                <Formik
                    initialValues={{ username, password, email, confirmPassword }}
                    onSubmit={this.handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validationSchema={formSchema}
                    enableReinitialize={true}
                >
                    <Form >
                        <TextInputField placeholder="Enter username" label="Username" name="username" />
                        <TextInputField placeholder="Enter password" label="Password" name="password" type="password" />
                        <TextInputField placeholder="Confirm password" label="Comfirm password" name="confirmPassword" type="password" />
                        <TextInputField placeholder="Enter email" label="Email address" name="email" type="email" />
                        <button className="btn btn-success">Register</button>
                        <h4 className="text-center">{this.state.message}</h4>
                    </Form>
                </Formik>
            </div>
        )
    }
}

export default Register
