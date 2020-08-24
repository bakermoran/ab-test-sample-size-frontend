import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Moment from 'react-moment';

function Result(props) {

    return (
        <Jumbotron>
            <p><small><Moment fromNow date={props.timestamp} /></small></p>
            <p><strong>Loss Value = {props.results.outputs.loss_value.toFixed(3)}</strong></p>
            <p><strong>Probability B {">"} A = {props.results.outputs.probability_B_over_A.toFixed(3)}</strong></p>
            <p><strong>Sample Size per Variant = {props.results.outputs.sample_size_per_variant}</strong></p>
        </Jumbotron>
    )
}

export default Result;
