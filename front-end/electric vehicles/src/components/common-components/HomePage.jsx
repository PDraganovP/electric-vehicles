import React, { useContext } from 'react';
import { UserContext } from '../user-provider/UserProvider';
import '../../styles/common-styles.css';

const HomePage = () => {
    const username = useContext(UserContext);

    return (
        <div>
        </div>
    )
}

export default HomePage