import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    /*  username: Yup.string()
         .min(3, 'This has to be greater than ')
         .max(30, 'This field has not to be greater than')
         .required('This field is required'), */
    password: Yup.string()
        .min(3, 'This has to be greater than ')
        .max(30, 'This field has not to be greater than')
        .required('This field is required'),
    oldPassword: Yup.string()
        .min(3, 'This has to be greater than ')
        .max(30, 'This field has not to be greater than')
        .required('This field is required'),
    confirmPassword: Yup.string()
        .min(3, 'This has to be greater than ')
        .max(30, 'This field has not to be greater than')
        .required('This field is required'),
    email: Yup.string()
        .email()
        .required('This field is required')
})
