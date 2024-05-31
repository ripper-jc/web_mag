import { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const useAuth = () => {
    const isRun = useRef(false);
    const [isLogin, setLogin] = useState(false);
    const [token, setToken] = useState('');
    const [keycloak, setKeycloak] = useState(null); // Add this line

    useEffect(() => {
        if(isRun.current) return;
        isRun.current = true;
        const client = new Keycloak({
            url: 'http://localhost:8080',
            realm: 'Shop',
            clientId: 'Shop_client',
        });

        client.init({ onLoad: 'login-required' })
            .then(res => {
                setLogin(res);
                setToken(client.token);
                setKeycloak(client); // Add this line
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return [isLogin, token, keycloak]; // Add keycloak to the return array
}

export default useAuth;