import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';


function Result(props) {

    return (
        <Jumbotron>
            <p>loss value = {props.results.outputs.loss_value} </p>
            <p>Probability B {">"} A = {props.results.outputs.probability_B_over_A}</p>
            <p>sample size per variant = {props.results.outputs.sample_size_per_variant}</p>
        </Jumbotron>
    )
}

export default Result;
