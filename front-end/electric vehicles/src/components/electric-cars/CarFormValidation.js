import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    manufacturer: Yup.string()
        .min(3, 'This has to be greater than 3')
        .max(50, 'This field has not to be greater than 50')
        .required('This field is required'),
    model: Yup.string()
        .min(3, 'This has to be greater than 3')
        .max(50, 'This field has not to be greater than 50')
        .required('This field is required'),
    electricVehicleType: Yup.string()
        .required('This field is required'),
    topSpeed: Yup.number().typeError('Please enter number')
        .min(10, 'This has to be greater than 10')
        .max(500, 'This field has not to be greater than'),
    acceleration: Yup.number().typeError('Please enter number')
        .min(1, 'This has to be greater than 1')
        .max(50, 'This field has not to be greater than 50'),
    chargingTime: Yup.number().typeError('Please enter number')
        .min(1, 'This field has to be greater than 1')
        .max(300, 'This field has not to be greater than 300')
        .required('This field is required'),
    nominalRange: Yup.number().typeError('Please enter number')
        .min(20, 'This has to be greater than 20')
        .max(1000, 'This field has not to be greater than 1000'),
    passengers: Yup.number()
        .min(1, 'This has to be greater than 1')
        .max(10, 'This field has not to be greater than 10'),
})

