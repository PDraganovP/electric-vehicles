import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, deleteMessage }) => {
    const pointer = {
        cursor: 'pointer'
    }
    const hide = {
        display: 'none'
    }

    return (
        <div className='text-center' style={{ color: 'red' }}>
            {{ message } && <div>
                <h5>{message}
                    {<span style={message ? pointer : hide} className='ml-3' onClick={deleteMessage}>&times;</span>}
                </h5>
            </div>}
        </div>
    )
}

Message.propTypes = {
    message: PropTypes.string,
    deleteMessage: PropTypes.func
}

export default Message