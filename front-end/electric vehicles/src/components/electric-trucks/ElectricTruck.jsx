import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import DataService from '../../service/DataService';
import TextInputField from '../input-fields/TextInputField';
import SelectInputField from '../input-fields/SelectInputField';
import { getDate, parseToEnum } from '../electric-cars/Utils';
import DatePickerInputField from '../input-fields/DatePickerInputField';
import { formSchema } from './TruckFormValidation';

class ElectricTruck extends React.Component {
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
                payloadCapacity: '',
                numberOfAxel: ''
            },
            message: ''
        }
    }
    componentDidMount() {
        this.getElectricVehicleTypes();
        let id = this.props.match.params.id;
        if (id !== undefined) {
            this.getElectricTruck(id);
        }
    }


    getElectricTruck = (id) => {
        let url = 'http://localhost:8080/electricTrucks/edit/' + id;

        DataService.getData(url)
            .then(response => {
                this.setState({
                    formInitialValues: {
                        manufacturer: response.manufacturer,
                        model: response.model,
                        electricVehicleType: response.electricVehicleTypes.type,
                        topSpeed: response.topSpeed,
                        acceleration: response.acceleration,
                        chargingTime: response.chargingTime,
                        nominalRange: response.nominalRange,
                        marketRelease: (response.marketRelease !== null) ? getDate(response.marketRelease) : '',
                        payloadCapacity: response.payloadCapacity,
                        numberOfAxel: response.numberOfAxel
                    }
                })
                console.log('truck', response);
            }).catch(error => console.log('Error', error))
    }

    getElectricVehicleTypes = () => {
        let url = 'http://localhost:8080/electricVehicleTypes';

        DataService.getData(url)
            .then(response => {
                this.setState({
                    electricVehicleTypes: response
                })
            }).catch(error => console.log('Error', error))
    }

    handleSubmit = (values) => {

        let electricTruck = {
            manufacturer: values.manufacturer,
            model: values.model,
            electricVehicleTypes: parseToEnum(values.electricVehicleType),
            topSpeed: values.topSpeed,
            acceleration: values.acceleration,
            chargingTime: values.chargingTime,
            nominalRange: values.nominalRange,
            marketRelease: values.marketRelease,
            payloadCapacity: values.payloadCapacity,
            numberOfAxel: values.numberOfAxel

        }

        let url = 'http://localhost:8080/electricTrucks/add';

        let id = this.props.match.params.id;
        if (id !== undefined) {
            electricTruck.id = id;

            url = 'http://localhost:8080/electricTrucks/edit/' + id
        }

        DataService.postData(electricTruck, url)
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
            document.getElementById('electric-truck-form').reset();
        }
    }

    render() {
        let { formInitialValues, electricVehicleTypes } = this.state;
        const options = electricVehicleTypes.map(electricVehicleType =>
            <option value={electricVehicleType.type} key={electricVehicleType.type}>{electricVehicleType.type}
            </option>
        )

        return (
            <div className="mb-3">
                <h3 style={{ textAlign: 'center', color: 'red' }}>Truck</h3>
                <div className="container mx-auto w-75">
                    <Formik
                        initialValues={formInitialValues}
                        onSubmit={this.handleSubmit}
                        validateOnChange={false}
                        validateOnBlur={true}
                        validationSchema={formSchema}
                        enableReinitialize={true}
                    >

                        <Form id="electric-truck-form">
                            <TextInputField placeholder="Enter manufacturer" label="Manufacturer" name="manufacturer" />
                            <TextInputField placeholder="Enter model" label="Model" name="model" />
                            <TextInputField placeholder="Enter top speed" label="Top speed" name="topSpeed" />
                            <TextInputField placeholder="Enter acceleration" label="Acceleration" name="acceleration" />
                            <TextInputField placeholder="Enter charging time" label="Charging time" name="chargingTime" />
                            <TextInputField placeholder="Enter nominal range" label="Nominal range" name="nominalRange" />
                            <DatePickerInputField name="marketRelease" label="Choose date" />
                            <TextInputField placeholder="Enter payload capacity" label="Payload capacity" name="payloadCapacity" />
                            <TextInputField placeholder="Enter number of axel" label="Number of axel" name="numberOfAxel" />
                            <SelectInputField name='electricVehicleType' label='Choose car type' options={options} />
                            <h3 className='text-center'>{this.state.message}</h3>
                            <button className="btn btn-success" type="submit">Save</button>
                            <Link to='/show-trucks' className="btn btn-success ml-1">Back</Link>
                        </Form>
                    </Formik>
                </div>
            </div >
        )
    }
}

export default ElectricTruck