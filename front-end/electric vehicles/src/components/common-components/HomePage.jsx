import React from 'react';
import { UserContext } from '../user-provider/UserProvider';
import '../../styles/common-styles.css';

import UserProvider from '../user-provider/UserProvider';

const HomePage = () => {
    let styles = {
        height: '10vh',
        paddingTop: '30vh',
        paddingBottom: '60vh'
    }
    return (
        <UserProvider>
            <div className='text-center text-white' style={styles}>
                <UserContext.Consumer>
                    {(username) => {
                        if (username) {
                            return <h1 >Welcome, {username}</h1>
                        }
                    }}
                </UserContext.Consumer>
            </div>
        </UserProvider>
    )
}

export default HomePage