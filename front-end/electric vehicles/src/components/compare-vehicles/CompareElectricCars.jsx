import React from 'react';
//import ElectricCarDataService from '../../service/ElectricCarDataService';
import AuthenticationService from '../../service/AuthenticationService';
import SelectInputField from './SelectInputField';
import Canvas from './Canvas';
import Main from './Main';
import ContainerWrapper from './ContainerWrapper';
import Button from './Button';
import { drawDiagram } from './Utils';
import styles from '../../styles.module.css';

class CompareElectricCars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [],
            message: ''
        }
    }

    componentDidMount() {
        this.getVehicles();
    }

    getVehicles() {
        let url = 'http://localhost:8080/electricCars/compareElectricCars';

        AuthenticationService.getData(url)
            .then(response => {
                const unauthorizedMessage = 'You are unauthorized'
                if (unauthorizedMessage !== response.message) {
                    this.setState({
                        vehicles: response,
                    })
                    console.log('Compare', response)
                    console.log('state', this.state.vehicles)
                } else {
                    this.setState({
                        message: response.message
                    })
                }
            }).catch(error => console.log('Error', error));
    }

    handelClick = () => {
        drawDiagram('canvas', 'leftColumn', 'rightColumn')
    }

    render() {
        let { vehicles } = this.state;
        let options = vehicles.map(vehicle =>
            <option value={vehicle.nominalRange} key={vehicle.id} >{vehicle.model}</option>
        )
        return (
            <Main>
                <Canvas canvasHeading='Compare nominal range' />
                <ContainerWrapper>
                    <SelectInputField options={options} className={[styles.dot, styles.dotLeftColor].join(' ')} name='leftColumn' id='leftColumn' label='Car' />
                    <SelectInputField options={options} className={[styles.dot, styles.dotRightColor].join(' ')} name='rightColumn' id='rightColumn' label='Car' />
                </ContainerWrapper>
                <Button name='Compare' handelClick={this.handelClick} />
                <h4 className='text-center'>{this.state.message}</h4>
            </Main>
        )
    }

}

export default CompareElectricCars
