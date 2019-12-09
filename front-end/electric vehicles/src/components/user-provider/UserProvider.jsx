import React, { useEffect, useState } from "react";
import DataService from '../../service/DataService'

export const UserContext = React.createContext('');

const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        let url = 'http://localhost:8080/users/profile';
        DataService.getData(url)
            .then(response => {
                let username = response.username;
                if (username !== undefined) {
                    setUsername(response.username)
                } else {
                    setUsername('')
                }
            }).catch(error => console.log('error', error));
    })

    return (
        <UserContext.Provider value={username}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider