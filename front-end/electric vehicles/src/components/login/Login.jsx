import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { formSchema } from './LoginFormValidation'
import TextInputField from '../input-fields/TextInputField';
import Cookie from 'js-cookie';
import DataService from '../../service/DataService'

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (values) => {
        let user = {
            username: values.username,
            password: values.password,
            email: values.email
        }

        let url = 'http://localhost:8080/authenticate';

        DataService.postData(user, url)
            .then(response => {
                let message = response.message;
                let unathorizedMessage = 'You are unauthorized'
                let token = response.token;
                let userRole = response.userRole;
                if (token !== undefined || token) {
                    Cookie.set('token', token);
                    Cookie.set('userRole', userRole);

                    let location = props.location.state;
                    let { history } = props;

                    if (location !== undefined) {
                        let pathBeforeRedirect = location.from.pathname;
                        history.push(pathBeforeRedirect);
                    } else {
                        history.push('/home');
                    }
                } else if (message === unathorizedMessage) {
                    setMessage('Bad credentials');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="w-50 py-5">
                <h2 className='text-center text-white'>Login</h2>
                <Formik
                    initialValues={{ username, password }}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validationSchema={formSchema}
                    enableReinitialize={true}
                >
                    <Form >
                        <TextInputField placeholder="Enter username" label="Username" name="username" />
                        <TextInputField placeholder="Enter password" label="Password" name="password" type="password" />
                        <h5 className="text-center" style={{ color: 'red' }} >{message}</h5>
                        <button className="btn btn-success" type="submit">Login</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Login