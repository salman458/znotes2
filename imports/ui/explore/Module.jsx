import React, {Component} from 'react';
import Header from '../Header.jsx';
import "../../../client/styles/cover.scss";
import "../../../client/styles/scroller.css";
import "../../../client/styles/boards.css";
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';

import {Meteor} from "meteor/meteor";
import Popup from "reactjs-popup";


class Subject extends Component {

    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            subjectId: props.subjectId,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {

    }

    handleSubmit() {

    }


    // renderBody() {
    //     return (
    //         <SideNav onSelect={(selected) => {
    //             // Add your code here
    //         }}>
    //             <SideNav.Toggle/>
    //             <SideNav.Nav defaultSelected="home">
    //                 <NavItem eventKey="home">
    //                     <NavIcon>
    //                         <i className="fa fa-fw fa-home" style={{fontSize: '1.75em'}}/>
    //                     </NavIcon>
    //                     <NavText>
    //                         Home
    //                     </NavText>
    //                 </NavItem>
    //                 <NavItem eventKey="charts">
    //                     <NavIcon>
    //                         <i className="fa fa-fw fa-line-chart" style={{fontSize: '1.75em'}}/>
    //                     </NavIcon>
    //                     <NavText>
    //                         Charts
    //                     </NavText>
    //                     <NavItem eventKey="charts/linechart">
    //                         <NavText>
    //                             Line Chart
    //                         </NavText>
    //                     </NavItem>
    //                     <NavItem eventKey="charts/barchart">
    //                         <NavText>
    //                             Bar Chart
    //                         </NavText>
    //                     </NavItem>
    //                 </NavItem>
    //             </SideNav.Nav>
    //         </SideNav>
    //     )
    // }


    render() {

        return (
            <div>
                <Header/>
                {/*{this.renderBody()}*/}
            </div>
        )
    }

}


export default Subject;
