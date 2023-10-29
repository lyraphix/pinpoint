import React from 'react';
import './LoginPage.css';
import LoginButton from '../LoginButton';
import logoImage from '../../images/MappyLogo.png';

function LoginPage() {
    return (
        <div className="background-container">
            <div className="card">
                <img src={logoImage} alt="Mappy Logo" className="logo"/>
                <h1>Mappy</h1>
                {/* <input type="email" placeholder="Enter your university email" /> */}
                <LoginButton/>
            </div>
        </div>
    );
}

export default LoginPage;