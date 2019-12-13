import React from 'react';
import '../../styles/common-styles.css';

const Index = () => {
    let styles = {
        height: '10vh',
        paddingTop: '30vh',
        paddingBottom: '60vh'
    }

    return (
        <div className="text-center text-white" style={styles}>
            <h1>Electric Vehicles</h1>
        </div>
    )
}

export default Index