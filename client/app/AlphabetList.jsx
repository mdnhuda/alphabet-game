import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Media, Paper} from 'react-md';
import AlphabetCursive from "./AlphabetCursive";
import './styles.scss';
import SampleData from './SampleData';

class AlphabetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...SampleData};
    }

    componentDidMount() {
        const {language} = this.state.settings;

        axios.get(`/api/alphabets?type=${language}`).then(resp => {
            this.setState({alphabets: resp.data})
        })
    }

    render() {
        const {alphabets} = this.state;
        return (
            <div>
                {alphabets.map((alphabet, index)=> {
                    return <div key={index} className="md-grid md-grid--no-spacing">
                        <Paper className="md-cell md-cell--12 md-grid">
                            <section className="md-cell--2-mobile md-cell--4-tablet md-cell--6-desktop">
                                <div className="md-display-4">{alphabet.label}</div>
                            </section>
                            <section className="md-cell--2-mobile md-cell--4-tablet md-cell--6-desktop">
                                {alphabet.words &&
                                <Media aspectRatio="4-3">
                                    <img src={alphabet.words[0].imageUrl}/>
                                </Media>
                                }
                            </section>
                        </Paper>
                    </div>;
                })}
            </div>
        )

    }
}

export default AlphabetList;