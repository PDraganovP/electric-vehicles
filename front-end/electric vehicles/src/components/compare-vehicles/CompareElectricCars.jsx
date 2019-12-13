import React from 'react';
import DataService from '../../service/DataService';
import SelectInputField from '../canvas-elements/SelectInputField';
import Canvas from '../canvas-elements/Canvas';
import Main from '../canvas-elements/Main';
import ContainerWrapper from '../canvas-elements/ContainerWrapper';
import Button from '../canvas-elements/Button';
import Message from '../message/Message';
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

    deleteMessage = () => {
        this.setState({
            message: ''
        })
    }

    getVehicles() {
        let url = 'http://localhost:8080/electricCars/compareElectricCars';

        DataService.getData(url)
            .then(response => {
                const unauthorizedMessage = 'You are unauthorized'
                if (unauthorizedMessage !== response.message) {
                    this.setState({
                        vehicles: response,
                    })
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
        let { vehicles, message } = this.state;
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
                <Message message={message} deleteMessage={this.deleteMessage} />
            </Main>
        )
    }

}

export default CompareElectricCars
