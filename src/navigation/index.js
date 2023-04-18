import React from "react";
import { AuthProvider } from "./AuthProvider";
import Routes from "./Routes";
import {store} from "../Redux/Store"
import {Provider} from 'react-redux';

const Providers = () => {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </Provider>
    )
};

export default Providers;

