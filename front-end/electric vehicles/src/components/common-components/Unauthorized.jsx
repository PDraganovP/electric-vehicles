import React from 'react';

const Unauthorized = () => {
    let styles = {
        height: '10vh',
        paddingTop: '45vh',
        paddingBottom: '45vh'
    }
    return (
        <div className="text-center">
            <h1 style={styles}>You are unauthorized</h1>
        </div>
    )
}

export default Unauthorized