import React, {Component} from 'react';
import Header from '../Header.jsx';
import "../../../client/styles/cover.scss";
import "../../../client/styles/scroller.css";
import "../../../client/styles/boards.css";


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


    renderBody() {
        return (
            <div>

            </div>
        )
    }


    render() {

        return (
            <div>
                <Header/>
                {this.renderBody()}
            </div>
        )
    }

}


export default Subject;
