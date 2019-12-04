import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ show, record, handleClose, handleDelete }) => {
    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {record}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete "{record}" </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );

}

export default ModalComponent