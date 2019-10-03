import React, {Component} from 'react';
import Header from '../Header.jsx';
import "../../../client/styles/cover.scss"
import {Meteor} from "meteor/meteor";

class AddBio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bio: '',
            title: '',
            mediaLinks: []
        };


        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeBio = this.handleChangeBio.bind(this);
        this.handleChangeFacebook = this.handleChangeFacebook.bind(this);
        this.handleChangeLinkedIn = this.handleChangeLinkedIn.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleChangeBio(event) {
        this.setState({
            bio: event.target.value
        });
    }

    handleChangeFacebook(event) {
        this.state.mediaLinks.push({facebook: event.target.value});
    }

    handleChangeLinkedIn(event) {
        this.state.mediaLinks.push({linkedIn: event.target.value});
    }

    renderBody() {
        return (
            <div className="search__container -layout-v -center">
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <ul>
                            <li><h1>Add Contributor Info</h1></li>

                            <li><input className="search__input -full-width" type="text" placeholder="Your Title"
                                       onChange={this.handleChangeTitle}/>
                            </li>

                            <li><input className="search__input -full-width" type="text" placeholder="Your Bio"
                                       onChange={this.handleChangeBio}/>
                            </li>

                            <li><input className="search__input -full-width" type="text" placeholder="Facebook Profile"
                                       onChange={this.handleChangeFacebook}/>
                            </li>

                            <li><input className="search__input -full-width" type="text" placeholder="Facebook Profile"
                                       onChange={this.handleChangeLinkedIn}/>
                            </li>

                            <li>
                                <button type="submit" className="searchBtn">Save</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>


        )
    }


    render() {
        return (
            <div className="home-page1 -padding-20">
                <Header/>
                {this.renderBody()}
            </div>
        )
    }

    handleSubmit() {
        let userId = Meteor.userId();
        let dbObject = {
            userId: userId,
            fields: {
                "bio": this.state.bio,
                "title": this.state.title,
                "mediaLinks": this.state.mediaLinks
            }
        };
        Meteor.call('extendProfile', dbObject, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    alert("Success");
                    FlowRouter.go('/');
                }
            }
        );
    }
}

export default AddBio;
