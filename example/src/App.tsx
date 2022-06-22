import React, {useEffect, useState} from 'react';
import './App.css';
import {useWallet} from "./lib";

function App() {
    const wallet = useWallet()

    useEffect(() => {

    })

    return (
    <div className="App">
        <h3>{wallet.status}</h3>
        <h3>Accounts: {wallet.accounts?.join(', ')}</h3>
    </div>
    );
}

export default App;
