"use client"

import { Provider } from "react-redux"
import React from 'react'
import store from "@/app/_libs/store";

function Providers({ children }) {
    return (
        <Provider store={store}>
            <div>{children}</div>
        </Provider>
    );
}

export default Providers