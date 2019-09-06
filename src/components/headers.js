import React, { Component } from 'react';
import logo from '../img/bobby-logo-header.svg';

export default class Headers extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="item">Bobbybots score board</h1>
                <img src={logo} className="item logo" alt="Bobby logo"  />
            </div>
        )
    }
}
