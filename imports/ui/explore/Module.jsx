import React, {Component} from 'react';
import Header from '../Header.jsx';
import "../../../client/styles/cover.scss";
import "../../../client/styles/scroller.css";
import "../../../client/styles/boards.css";
import SideNav, {MenuIcon} from 'react-simple-sidenav';
import {Meteor} from "meteor/meteor";
import Popup from "reactjs-popup";


class Subject extends Component {

    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            subjectId: props.subjectId,
            name: props.name,
            modules: [],
            moduleName: '',
            showNav: false
        };

        this.handleModuleName = this.handleModuleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        Meteor.call('loadModules', {subject: this.state.subjectId}, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    this.state.modules = res.map(module => {
                            return <a href={"/explore/chapters/module/" + module._id + "/" + this.state.name}> {module.name}</a>
                        }
                    );
                    this.state.modules.push(
                        <Popup trigger={this.renderButton} modal>
                            {close => (
                                <div className="modal">
                                    <a className="close" onClick={close}>
                                        &times;
                                    </a>
                                    {this.renderEdit()}
                                </div>
                            )}


                        </Popup>
                    )
                }
            }
        );
    }

    handleSubmit() {

    }


    renderBody() {
        return (
            <div>
                <MenuIcon onClick={() => this.setState({showNav: true})}/>
                <SideNav
                    showNav={this.state.showNav}
                    onHideNav={() => this.setState({showNav: false})}
                    title={this.state.name}
                    items={
                        this.state.modules

                    }


                />
            </div>
        )
    }


    renderButton() {
        return (<div className="button">
            <span>Add Module</span>
            <svg>
                <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
            </svg>
        </div>);

    }

    handleModuleName(event) {
        this.setState({
            subjectId: this.state.subjectId,
            name: this.state.name,
            moduleName: event.target.value,
            showNav: this.state.showNav
        })
    }

    handleSubmit() {
        Meteor.call('addZModule', {
            subject: this.state.subjectId,
            name: this.state.moduleName,
            chapters: []
        }, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        })
    }


    renderEdit() {
        return (
            <div className="container">
                <form className="login" onSubmit={this.handleSubmit}>
                    <label htmlFor="name"><b>New Module Name</b></label>
                    <input type="text" placeholder="Enter the Name" name="name" onChange={this.handleModuleName}/>
                    <button type="submit" className="registerbtn">Add</button>

                </form>
            </div>
        );
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


export default Subject;