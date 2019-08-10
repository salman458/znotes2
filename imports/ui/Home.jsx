import React from 'react';
import Header from './Header.jsx';
import AbstractComponent from "./AbstractComponent";

class Home extends AbstractComponent {

    renderBody() {
        return (
            <div>

            </div>
        )
    }

    render() {
        return (
            <div className="home-page -padding-20">
                <Header/>
                {this.renderBody()}
            </div>
        )
    }
}

export default Home;
