import React from 'react';
import { Link } from 'react-router-dom'
import DataService from '../../service/DataService'
import { getDate, getCarsTableHeadCells } from './Utils';
import Table from '../table/Table';
import TableHead from '../table/TableHead';
import TableBody from '../table/TableBody';
import ModalComponent from '../modal/ModalComponent';
import Loader from '../loader/Loader';
import '../../styles/common-styles.css';

class ShowElectricCars extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            vehicles: [],
            message: '',
            model: '',
            show: false,
            delete: '',
            isLoading: false
        })
    }

    componentDidMount() {
        this.getVehicles();
    }

    getVehicles() {
        this.setState({
            isLoading: true
        })
        let url = 'http://localhost:8080/electricCars/show';
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

    deleteCar = () => {
        let carId = this.state.delete;
        let url = 'http://localhost:8080/electricCars/delete/' + carId;

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
        let carId = buttonId.split('/')[1];
        let model = buttonId.split('/')[0];
        this.setState({
            show: true,
            delete: carId,
            model: model
        });

    };
    handleDelete = () => {
        this.setState({
            show: false
        });
        this.deleteCar();
    }

    render() {
        const isAdmin = DataService.isAdmin()
        const isModerator = DataService.isModerator()

        let props = {
            show: this.state.show,
            record: this.state.model,
            handleDelete: this.handleDelete,
            handleClose: this.handleClose,
        }

        let { vehicles, isLoading } = this.state;
        let vehicleRow = vehicles.map((vehicle, index) =>
            <tr key={vehicle.id} className='data-row'>
                <td>{index + 1}</td>
                <td>{vehicle.manufacturer}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.electricVehicleTypes.type}</td>
                <td>{vehicle.topSpeed}</td>
                <td>{vehicle.nominalRange}</td>
                <td>{vehicle.autonomous ? 'Yes' : 'No'}</td>
                <td>{getDate(vehicle.marketRelease)}</td>
                {(isAdmin || isModerator) && <td>
                    <Link to={'/edit-car/' + vehicle.id} className="btn btn-primary">Edit</Link></td>}
                {(isAdmin || isModerator) && <td>
                    <button id={vehicle.model + '/' + vehicle.id} type="button" className="btn btn-primary" onClick={this.handleShow}>Delete</button></td>}
            </tr>
        )
        const cells = getCarsTableHeadCells(isModerator, isAdmin);

        return (
            <div className='mx-auto px-5'>
                {isLoading ? <Loader /> :
                    <Table tableHeading='Electric cars' >
                        <TableHead cells={cells} />
                        <TableBody>
                            {vehicleRow}
                        </TableBody>
                    </Table>}
                <ModalComponent {...props} />
            </div >
        )
    }
}

export default ShowElectricCars

