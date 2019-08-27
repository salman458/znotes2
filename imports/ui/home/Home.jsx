import React from 'react';
import Header from '../Header.jsx';
import AbstractComponent from "../AbstractComponent";
import "../../../client/styles/cover.scss";
import "../../../client/styles/scroller.css";
import {Pager} from "react-bootstrap";
import ReactPageScroller from "react-page-scroller";
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import Autosuggest from 'react-autosuggest';


class Home extends AbstractComponent {


    keywords = [
        {
            name: 'C'
        },
        {
            name: 'Elm'
        },

    ];
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.keywords.filter(lang =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue = suggestion => suggestion.name;

    renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    );

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            value: '',
            suggestions: [],
            keywords: []
        };
        this._pageScroller = null;
    }

    componentDidMount() {
        Meteor.call('getKeywords', {}, (err, res) => {
            if (err)
                console.log(err);
            else {
                console.log(res);
                this.state.keywords = res;
                console.log(this.state.keywords);
            }
        })
    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };


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
        const {value, suggestions} = this.state;

        const inputProps = {
            placeholder: 'What do you want to study today?',
            value,
            onChange: this.onChange
        };
        return (
            <div className="search__container -layout-v -center">
                <ul>
                    <li><img className="logo-search" src="/img/logo.png"/></li>
                    <li><h1>For Students, By Students</h1></li>
                    <li><Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                    /></li>
                    {/*<li><input className="search__input -full-width" type="text" placeholder="What do you want to study today? E.G. AS Physics"/></li>*/}
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
