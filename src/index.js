import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main';
import NavBar from './NavBar';
import { CurrentCategory } from './TodoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CurrentCategory>
            <NavBar />
            <Main />
        </CurrentCategory>
    </React.StrictMode>
);
