import React from 'react';
import { Link } from 'react-router-dom'
import DataService from '../../service/DataService';
import { Formik, Form } from 'formik';
import TextInputField from '../input-fields/TextInputField';
import SelectInputField from '../input-fields/SelectInputField';
import RadioInputField from '../input-fields/RadioInputField';
import RadioInputFieldWrapper from '../input-fields/RadioInputFieldWrapper';
import DatePickerInputField from '../input-fields/DatePickerInputField';
import { formSchema } from './CarFormValidation';
import { getDate, parseToEnum } from './Utils';
import Loader from '../loader/Loader';

class ElectricCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            electricVehicleTypes: [],
            formInitialValues: {
                manufacturer: '',
                model: '',
                electricVehicleType: '',
                topSpeed: '',
                acceleration: '',
                chargingTime: '',
                nominalRange: '',
                marketRelease: '',
                dualMotor: '',
                passengers: '',
                autonomous: ''
            },
            message: '',
            isLoading: false
        }
    }

    componentDidMount() {
        this.getElectricVehicleTypes();
        let id = this.props.match.params.id;
        if (id !== undefined) {
            this.getCar(id);
        }
    }

    getCar = (id) => {
        this.setState({
            isLoading: true
        })
        let url = 'http://localhost:8080/electricCars/edit/' + id;
        DataService.getData(url)
            .then(response => {
                let feilMessage = 'The record was not found';
                if (response.message !== feilMessage) {
                    this.setState({
                        formInitialValues: {
                            manufacturer: response.manufacturer,
                            model: response.model,
                            electricVehicleType: response.electricVehicleTypes.type,
                            topSpeed: response.topSpeed,
                            acceleration: response.acceleration,
                            chargingTime: response.chargingTime,
                            nominalRange: response.nominalRange,
                            marketRelease: (response.marketRelease !== null) ? getDate(response.marketRelease) : '', // (response.marketRelease !== null) ? response.marketRelease : '',
                            passengers: response.passengers,
                            dualMotor: response.dualMotor.toString(),
                            autonomous: response.autonomous.toString(),
                        },
                        isLoading: false
                    })
                } else {
                    this.setState({
                        message: response.message,
                        isLoading: false
                    })
                }
            }).catch(error => console.log('Error', error))
    }

    getElectricVehicleTypes = () => {
        let url = 'http://localhost:8080/electricVehicleTypes'

        DataService.getData(url)
            .then(response => {
                this.setState({
                    electricVehicleTypes: response
                })
            }).catch(error => console.log('Error', error))
    }

    handleSubmit = (values) => {

        let electricCar = {
            manufacturer: values.manufacturer,
            model: values.model,
            electricVehicleTypes: parseToEnum(values.electricVehicleType),
            topSpeed: values.topSpeed,
            acceleration: values.acceleration,
            chargingTime: values.chargingTime,
            nominalRange: values.nominalRange,
            marketRelease: values.marketRelease,
            passengers: values.passengers
        }
        let autonomous = values.autonomous;

        if (autonomous === '' || autonomous === 'false') {
            electricCar.autonomous = false
        } else {
            electricCar.autonomous = true
        }

        let dualMotor = values.dualMotor;
        if (dualMotor === '' || dualMotor === 'false') {
            electricCar.dualMotor = false
        } else {
            electricCar.dualMotor = true
        }

        let url = 'http://localhost:8080/electricCars/add'

        let id = this.props.match.params.id;
        if (id !== undefined) {
            electricCar.id = id;
            url = 'http://localhost:8080/electricCars/edit/' + id
        }

        DataService.postData(electricCar, url)
            .then(response => {
                let responseMessage = response.message;
                let successMessage = 'New record was added';
                if (responseMessage === successMessage) {
                    this.setState({
                        message: responseMessage
                    })
                } else {
                    this.setState({
                        message: response.message
                    })
                }
            })
        console.log(values);
        if (id === undefined) {
            document.getElementById('electric-car-form').reset();
        }
    }

    render() {
        let { formInitialValues, electricVehicleTypes, isLoading } = this.state;
        const options = electricVehicleTypes.map(electricVehicleType =>
            <option value={electricVehicleType.type} key={electricVehicleType.type}>
                {electricVehicleType.type}
            </option>
        )

        return (
            <div>
                <h3 style={{ textAlign: 'center', color: 'red' }}>Car</h3>
                <div className="container mx-auto w-75">
                    {isLoading ? <Loader /> :
                        <Formik
                            initialValues={formInitialValues}
                            onSubmit={this.handleSubmit}
                            validateOnChange={false}
                            validateOnBlur={true}
                            validationSchema={formSchema}
                            enableReinitialize={true}
                        >
                            <Form id="electric-car-form">
                                <TextInputField placeholder="Enter manufacturer" label="Manufacturer" name="manufacturer" />
                                <TextInputField placeholder="Enter model" label="Model" name="model" />
                                <TextInputField placeholder="Enter top speed" label="Top speed" name="topSpeed" />
                                <TextInputField placeholder="Enter acceleration" label="Acceleration" name="acceleration" />
                                <TextInputField placeholder="Enter charging time" label="Charging time" name="chargingTime" />
                                <TextInputField placeholder="Enter nominal range" label="Nominal range" name="nominalRange" />
                                <DatePickerInputField name="marketRelease" label="Choose date" />
                                <TextInputField placeholder="Enter passengers" label="Passengers" name="passengers" />
                                <RadioInputFieldWrapper name="dualMotor" label="Autonomous">
                                    <RadioInputField name="autonomous" value="true" label="True" />
                                    <RadioInputField name="autonomous" value="false" label="False" />
                                </RadioInputFieldWrapper>
                                <RadioInputFieldWrapper name="dualMotor" label="Dual motor">
                                    <RadioInputField name="dualMotor" value="true" label="True" />
                                    <RadioInputField name="dualMotor" value="false" label="False" />
                                </RadioInputFieldWrapper>
                                <SelectInputField name='electricVehicleType' label='Choose car type' options={options} />
                                <h3 className='text-center'>{this.state.message}</h3>
                                <button className="btn btn-success" type="submit">Save</button>
                                <Link to='/show-cars' className="btn btn-success ml-1">Back</Link>
                            </Form>
                        </Formik>}
                </div>
            </div >
        )
    }
}

export default ElectricCar

