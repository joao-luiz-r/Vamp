import React from 'react';
import logo from '../assets/logo.png';

const VampireLogo = () => (
    <div className="vamp-logo-container">
        <img src={logo} alt="Vampire The Masquerade" style={{ maxHeight: '100px', width: 'auto' }} />
    </div>
);

export default VampireLogo;
