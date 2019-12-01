import React from 'react';
import { Link } from 'react-router-dom'
//import ElectricTruckDataService from '../../service/ElectricTruckDataService';
import AuthenticationService from '../../service/AuthenticationService'
import { getDate } from './Utils';
import Table from './Table';
import TableHead from './TableHead';
import TableBody from './TableBody';
import ModalComponent from '../ModalComponent';


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

    deleteTruck = (event) => {

        let truckId = this.state.deleteId;
        let url = 'http://localhost:8080/electricTrucks/delete/' + truckId;

        AuthenticationService.postData('', url)
            .then(response => {
                let successMessage = 'The record was deleted'//'You successfully deleted the car';
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
        //  let id = event.target.id;
        let buttonId = event.target.id;
        let truckId = buttonId.split('/')[1];
        let model = buttonId.split('/')[0];
        this.setState({
            show: true,
            delete: truckId,
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
            //  handleShow: this.handleShow
        }

        let { vehicles } = this.state;
        let vehicleRow = vehicles.map((vehicle, index) =>
            <tr key={vehicle.id}>
                <td style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                <td style={{ verticalAlign: 'middle' }}>{vehicle.manufacturer}</td>
                <td style={{ verticalAlign: 'middle' }}>{vehicle.model}</td>
                <td style={{ verticalAlign: 'middle' }}>{vehicle.electricVehicleTypes.type}</td>
                <td style={{ verticalAlign: 'middle' }}>{vehicle.topSpeed}</td>
                <td style={{ verticalAlign: 'middle' }}>{vehicle.nominalRange}</td>
                <td style={{ verticalAlign: 'middle' }}>{getDate(vehicle.marketRelease)}</td>
                <td style={{ verticalAlign: 'middle' }}>{vehicle.payloadCapacity}</td>
                <td style={{ verticalAlign: 'middle' }}>{vehicle.numberOfAxel}</td>
                {(isAdmin || isModerator) && <td style={{ verticalAlign: 'middle' }}>
                    <Link to={'/edit-truck/' + vehicle.id} className="btn btn-primary">Edit</Link>
                </td>}
                {(isAdmin || isModerator) && <td style={{ verticalAlign: 'middle' }}>
                    <button id={vehicle.model + '/' + vehicle.id} type="button" className="btn btn-primary" onClick={this.handleShow}>Delete</button></td>}
            </tr>
        )
        let cells = ['#', 'Manufacturer ', 'Model ', 'Electric vehicle type', 'Top speed',
            'Nominal range', 'Market release', 'Payload capacity', 'Number of axel'];
        let actions = ['Edit ', 'Delete'];
        if (isModerator || isAdmin) {
            cells = cells.concat(actions)
        }
        return (
            <div className='mx-auto w-75'>
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