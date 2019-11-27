import React from 'react';
import { Formik, Form } from 'formik';
import { formSchema } from './LoginFormValidation'
import TextInputField from '../input-fields/TextInputField';
import Cookie from 'js-cookie';
import AuthenticationService from '../../service/AuthenticationService'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
        }
    }

    handleSubmit = (values) => {
        let user = {
            username: values.username,
            password: values.password,
            email: values.email
        }

        let url = 'http://localhost:8080/authenticate';

        AuthenticationService.postData(user, url)
            .then(response => {
                let message = response.message;
                let unathorizedMessage = 'You are unauthorized'
                let token = response.token;
                let userRole = response.userRole;
                if (token !== undefined || token) {
                    Cookie.set('token', token);
                    Cookie.set('userRole', userRole);

                    let location = this.props.location.state;
                    let { history } = this.props;

                    if (location !== undefined) {
                        let pathBeforeRedirect = location.from.pathname;
                        history.push(pathBeforeRedirect);
                    } else {
                        history.push('/home');
                    }

                } else if (message === unathorizedMessage) {
                    this.setState({
                        message: 'Bad credentials'
                    })
                }
                console.log('Success', JSON.stringify(response));
            })
            .catch(error => console.error('Error:', error));

    }
    render() {
        let { username, password } = this.state;

        return (
            <div className="d-flex justify-content-center">
                <div className="w-50 py-5">
                    <Formik
                        initialValues={{ username, password }}
                        onSubmit={this.handleSubmit}
                        validateOnChange={false}
                        validateOnBlur={true}
                        validationSchema={formSchema}
                        enableReinitialize={true}
                    >
                        <Form >
                            <TextInputField placeholder="Enter username" label="Username" name="username" />
                            <TextInputField placeholder="Enter password" label="Password" name="password" type="password" />
                            <h5 className="text-center" style={{ color: 'red' }} >{this.state.message}</h5>
                            <button className="btn btn-success" type="submit">Login</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        )
    }
}

export default Login

