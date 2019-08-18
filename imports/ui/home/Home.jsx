import React from 'react';
import Header from '../Header.jsx';
import AbstractComponent from "../AbstractComponent";
import "../../../client/styles/cover.scss";
import "../../../client/styles/scroller.css";
import {Pager} from "react-bootstrap";
import ReactPageScroller from "react-page-scroller";
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";


class Home extends AbstractComponent {

    constructor(props) {
        super(props);
        this.state = {currentPage: 1};
        this._pageScroller = null;
    }

    goToPage = (eventKey) => {
        this._pageScroller.goToPage(eventKey);
    };

    pageOnChange = (number) => {
        this.setState({currentPage: number});
    };

    getPagesNumbers = () => {

        const pageNumbers = [];

        for (let i = 1; i <= 6; i++) {
            pageNumbers.push(
                <Pager.Item key={i} eventKey={i - 1} onSelect={this.goToPage}>{i}</Pager.Item>
            )
        }

        return [...pageNumbers];
    };


    renderBody() {
        return (
            <div className="search__container -layout-v -center">
                <ul>
                    <li><img className="logo-search" src="/img/logo.png"/></li>
                    <li><h1>For Students, By Students</h1></li>
                    <li><input className="search__input -full-width" type="text" placeholder="What do you want to study today? E.G. AS Physics"/></li>
                    <li>
                        <button type="submit" className="searchBtn">Search</button>
                    </li>
                </ul>
            </div>


        )
    }

    // render() {
    //
    //     return (
    //         <div className="home-page -padding-20">
    //             <Header/>
    //             {this.renderBody()}
    //         </div>
    //     )
    // }
    render() {
        const pagesNumbers = this.getPagesNumbers();

        return <React.Fragment>
            <ReactPageScroller ref={c => this._pageScroller = c} pageOnChange={this.pageOnChange}>
                <div className="home-page -padding-20">
                    <Header/>
                    {this.renderBody()}
                </div>
                <SecondComponent/>
            </ReactPageScroller>
            <Pager className="pagination-additional-class" bsSize="large">
                {pagesNumbers}
            </Pager>
        </React.Fragment>
    }


}


export default Home;
