import React, { useContext } from 'react';
import { UserContext } from '../user-provider/UserProvider'

const HomePage = () => {
    const username = useContext(UserContext);
    let styles = {
        height: '10vh',
        paddingTop: '30vh',
        paddingBottom: '60vh'
    }

    return (
        <div className="text-center" style={styles}>
            {username && <h1 >Welcome, {username}</h1>}
        </div>
    )
}

export default HomePage