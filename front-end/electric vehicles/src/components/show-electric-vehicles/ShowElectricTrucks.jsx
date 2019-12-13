import React from 'react';
import { Link } from 'react-router-dom'
import DataService from '../../service/DataService'
import { getDate, getTrucksTableHeadCells } from './Utils';
import Table from '../table/Table';
import TableHead from '../table/TableHead';
import TableBody from '../table/TableBody';
import ModalComponent from '../modal/ModalComponent';
import Loader from '../loader/Loader';
import Message from '../message/Message';
import '../../styles/common-styles.css';

class ShowElectricTrucks extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            vehicles: [],
            message: '',
            model: '',
            show: false,
            deleteId: '',
            isLoading: false
        })
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
        this.setState({
            isLoading: true
        })
        let url = 'http://localhost:8080/electricTrucks/show';
        DataService.getData(url)
            .then(response => {
                let message = response.message;
                if (message === undefined) {
                    this.setState({
                        vehicles: response,
                        isLoading: false
                    })
                }
            }
            ).catch(error => console.log('Error', error))
    }

    deleteTruck = () => {

        let truckId = this.state.deleteId;
        let url = 'http://localhost:8080/electricTrucks/delete/' + truckId;

        DataService.postData('', url)
            .then(response => {
                let successMessage = 'The record was deleted'
                let message = response.message;
                if (successMessage === message) {
                    this.setState({
                        message: response.message
                    });
                    this.getVehicles();
                } else {
                    this.setState({
                        message: response.messsage
                    })
                }
            })
    }

    handleClose = () => {
        this.setState({
            show: false
        });
    };
    handleShow = (event) => {
        let buttonId = event.target.id;
        let truckId = buttonId.split('/')[1];
        let model = buttonId.split('/')[0];
        this.setState({
            show: true,
            deleteId: truckId,
            model: model
        });

    };
    handleDelete = () => {
        this.setState({
            show: false
        });
        this.deleteTruck();
    }

    render() {
        const isAdmin = DataService.isAdmin()
        const isModerator = DataService.isModerator()

        const props = {
            show: this.state.show,
            record: this.state.model,
            handleDelete: this.handleDelete,
            handleClose: this.handleClose,
        }

        const { vehicles, isLoading, message } = this.state;
        const vehicleRow = vehicles.map((vehicle, index) =>
            <tr key={vehicle.id} className='data-row'>
                <td>{index + 1}</td>
                <td>{vehicle.manufacturer}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.electricVehicleTypes.type}</td>
                <td>{vehicle.topSpeed}</td>
                <td>{vehicle.nominalRange}</td>
                <td>{getDate(vehicle.marketRelease)}</td>
                <td>{vehicle.payloadCapacity}</td>
                <td>{vehicle.numberOfAxel}</td>
                {(isAdmin || isModerator) && <td>
                    <Link to={'/edit-truck/' + vehicle.id} className="btn btn-primary">Edit</Link>
                </td>}
                {(isAdmin || isModerator) && <td>
                    <button id={vehicle.model + '/' + vehicle.id} type="button" className="btn btn-primary" onClick={this.handleShow}>Delete</button></td>}
            </tr>
        )

        const cells = getTrucksTableHeadCells(isModerator, isAdmin);
        return (
            <div className='mx-auto px-5'>
                {isLoading ? <Loader /> :
                    <Table tableHeading='Electric trucks'>
                        <TableHead cells={cells} />
                        <TableBody>
                            {vehicleRow}
                        </TableBody>
                    </Table>}
                <ModalComponent {...props} />
                <Message message={message} deleteMessage={this.deleteMessage} />
            </div>
        )
    }
}

export default ShowElectricTrucks