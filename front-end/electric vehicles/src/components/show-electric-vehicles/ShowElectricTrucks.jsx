import React from 'react';
import { Link } from 'react-router-dom'
import AuthenticationService from '../../service/AuthenticationService'
import { getDate, getTrucksTableHeadCells } from './Utils';
import Table from '../table/Table';
import TableHead from '../table/TableHead';
import TableBody from '../table/TableBody';
import ModalComponent from '../modal/ModalComponent';
import '../../styles/common-styles.css';

class ShowElectricTrucks extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            vehicles: [],
            message: '',
            model: '',
            show: false,
            deleteId: ''
        })
    }

    componentDidMount() {
        this.getVehicles();
    }

    getVehicles() {
        let url = 'http://localhost:8080/electricTrucks/show';

        AuthenticationService.getData(url)
            .then(response => {
                let message = response.message;
                if (message === undefined) {
                    this.setState({
                        vehicles: response
                    })
                }
                console.log('Success', JSON.stringify(response));
            }
            ).catch(error => console.log('Error', error))
    }

    deleteTruck = () => {

        let truckId = this.state.deleteId;
        let url = 'http://localhost:8080/electricTrucks/delete/' + truckId;

        AuthenticationService.postData('', url)
            .then(response => {
                let successMessage = 'The record was deleted'
                let message = response.message;
                if (successMessage === message) {
                    this.setState({
                        message: response.message
                    });
                    this.getVehicles();
                    console.log('Delete message', response.message)
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
        const isAdmin = AuthenticationService.isAdmin()
        const isModerator = AuthenticationService.isModerator()

        let props = {
            show: this.state.show,
            record: this.state.model,
            handleDelete: this.handleDelete,
            handleClose: this.handleClose,
        }

        let { vehicles } = this.state;
        let vehicleRow = vehicles.map((vehicle, index) =>
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
                <Table tableHeading='Electric trucks'>
                    <TableHead cells={cells} />
                    <TableBody>
                        {vehicleRow}
                    </TableBody>
                </Table>
                <ModalComponent {...props} />
            </div>
        )
    }
}

export default ShowElectricTrucks