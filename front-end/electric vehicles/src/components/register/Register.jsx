import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { formSchema } from './RegisterFormValidation'
import TextInputField from '../input-fields/TextInputField';
import DataService from '../../service/DataService';

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (values) => {
        let user = {
            username: values.username,
            password: values.password,
            confirmPassword: values.confirmPassword,
            email: values.email
        }

        let url = 'http://localhost:8080/users/register';

        DataService.postData(user, url)
            .then(response => {
                let successMessage = 'Your registration is successful';
                let message = response.message;
                if (message !== undefined && message === successMessage) {
                    let { history } = props;
                    history.push('/login');
                } else {
                    setMessage(response.message);
                }
            })
            .catch(error => console.log('error', error))
    }

    return (
        <div className="mx-auto w-50">
            <h2 className='text-center text-white'>Register</h2>
            <Formik
                initialValues={{ username, password, email, confirmPassword }}
                onSubmit={handleSubmit}
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
                    <button type="submit" className="btn btn-success">Register</button>
                    <h4 className="text-center">{message}</h4>
                </Form>
            </Formik>
        </div>
    )
}

export default Register
