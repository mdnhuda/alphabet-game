import React from 'react';
import PropTypes from 'prop-types';
import {Media, Paper} from 'react-md';
import AlphabetCursive from "./AlphabetCursive";
import './styles.scss';

// ha
// const curvesX = [[{"x":52,"y":60},{"x":230,"y":58}],[{"x":85,"y":90},{"x":118,"y":96},{"x":128,"y":119},{"x":110,"y":142},{"x":83,"y":137},{"x":72,"y":111},{"x":107,"y":71},{"x":155,"y":72},{"x":187,"y":108},{"x":189,"y":145},{"x":167,"y":178},{"x":128,"y":192},{"x":80,"y":189}],[{"x":82,"y":192},{"x":225,"y":271}]];
// ja
const curvesX = [[{"x":60,"y":90},{"x":362,"y":90}],[{"x":188,"y":93},{"x":150,"y":181},{"x":160,"y":220},{"x":220,"y":212},{"x":218,"y":273},{"x":170,"y":315},{"x":102,"y":282},{"x":81,"y":234},{"x":78,"y":175}],[{"x":189,"y":94},{"x":239,"y":150},{"x":308,"y":182},{"x":288,"y":263},{"x":309,"y":334}]];

const MaterialDesignPage = ({children}) => (
    <div className="md-grid md-grid--no-spacing">
        <Paper className="md-cell md-cell--12 md-grid">
            <section className="md-cell md-cell--3-tablet md-cell--4-desktop">
                <Media aspectRatio="1-1">
                    <AlphabetCursive origCurves={curvesX} origWidth={400} origHeight={400}/>
                </Media>
            </section>
            <section className="md-cell md-cell--5-tablet md-cell--8-desktop">
                <Media aspectRatio="16-9">
                    <img src="https://c2.staticflickr.com/9/8573/15660416348_9f54088faf_z.jpg"/>
                </Media>
            </section>
        </Paper>
    </div>
);

MaterialDesignPage.propTypes = {
    children: PropTypes.node.isRequired,
};
export default MaterialDesignPage;