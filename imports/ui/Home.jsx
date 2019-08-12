import React from 'react';
import Header from './Header.jsx';
import AbstractComponent from "./AbstractComponent";
import "../../client/styles/cover.scss"

class Home extends AbstractComponent {

    renderBody() {
        return (
            <div className="search__container -layout-v -center">
                <ul>
                    <li><img className="logo-search" src="/img/logo.png"/></li>
                    <li><h1>For Students, By Students</h1></li>
                    <li><input className="search__input -full-width" type="text" placeholder="What do you want to study today? E.G. AS Physics"/></li>
                    <li><button type="submit" className="searchBtn">Search</button></li>
                </ul>
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
