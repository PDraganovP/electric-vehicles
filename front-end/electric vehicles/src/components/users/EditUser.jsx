import React from 'react';
import { Formik, Form } from 'formik';
import { formSchema } from './EditUserFormValidation';
import TextInputField from '../input-fields/TextInputField';
import DataService from '../../service/DataService';
import Loader from '../loader/Loader';

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
        DataService.getData(url)
            .then(response => {
                const unauthorizedMessage = 'You are unauthorized'
                let username = response.username;
                if (username !== undefined && unauthorizedMessage !== response.message) {
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

        DataService.patchData(user, url)
            .then(response => {
                let successMessage = 'You successfully edited your profile';
                let message = response.message;
                if (message !== undefined && message === successMessage) {
                    this.getUser();
                    this.setState({
                        message: response.message
                    })

                } else {
                    this.setState({
                        message: response.message
                    })
                }
            })
            .catch(error => console.error('Error:', error));

    }

    render() {
        let { formInitialValues, isLoading } = this.state;

        return (
            <div className="mx-auto w-50">
                {isLoading ? <Loader /> :
                    <Formik
                        initialValues={formInitialValues}
                        onSubmit={this.handleSubmit}
                        validateOnChange={false}
                        validateOnBlur={true}
                        validationSchema={formSchema}
                        enableReinitialize={true}
                    >

                        <Form >
                            <TextInputField placeholder="Enter username" label="Username" name="username" disabled={true} />
                            <TextInputField placeholder="Enter old password" label="Old password" name="oldPassword" type="password" />
                            <TextInputField placeholder="Enter new password" label="New password" name="password" type="password" />
                            <TextInputField placeholder="Confirm password" label="Comfirm password" name="confirmPassword" type="password" />
                            <TextInputField placeholder="Enter email" label="Email address" name="email" type="email" />
                            <button className="btn btn-success" type="submit">Save</button>
                            <h4 className='text-center'>{this.state.message}</h4>
                        </Form>
                    </Formik>}
            </div>
        )
    }
}

export default EditUser

