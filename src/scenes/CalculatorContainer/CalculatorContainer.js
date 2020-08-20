import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LossValueExplainer from '../LossValueExplainer/LossValueExplainer'
import Result from './components/Result'



class CalculatorContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sample_size_returned: false,
        prior_alpha: 1,
        prior_beta: 1,
        show_explainer: false,
        results: [],
        baseline_conversion_rate: '',
        expected_relative_lift: '',
        loss_tolerance: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleExplainer = this.handleExplainer.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      })
    } // handleChange()

    handleClick(event) {
      event.preventDefault();
      let params = `?baseline_conversion_rate=${this.state.baseline_conversion_rate}&expected_relative_lift=${this.state.expected_relative_lift}&loss_tolerance=${this.state.loss_tolerance}&prior_alpha=${this.state.prior_alpha}&prior_beta=${this.state.prior_beta}`;

      fetch('https://ab-test-sample-size-backend.herokuapp.com/api/v1/sample_size/' + params,
        {credentials: 'same-origin',
          method: 'GET',
          mode: 'cors'
        }
      )
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
      })
        .then((data) => {
          this.setState(prevState => ({
            sample_size_returned: true,
            results: [data, ...prevState.results]
          }))
          // history.pushState(this.state, 'index');
        })
        .catch(error => console.log(error)); // eslint-disable-line no-console
    } // handleClick()

    handleExplainer(event) {
      this.setState({show_explainer: !this.state.show_explainer});
    } // handleExplainer()

    render() {
      // if (history.state
      //    && performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
      //   this.state = history.state;
      // }
      let input_form = <Form>
      <Row>
        <Col>
          <Jumbotron>
            <h2>Required Parameters</h2>
            <Form.Group>
              <Form.Label>Baseline Conversion Rate</Form.Label>
              <Form.Control type="text" name="baseline_conversion_rate" value={this.state.baseline_conversion_rate} onChange={this.handleChange} placeholder="Baseline Conversion Rate" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expected Relative Lift</Form.Label>
              <Form.Control type="text" name="expected_relative_lift" value={this.state.expected_relative_lift} onChange={this.handleChange} placeholder="Expected Relative Lift" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Loss Tolerance</Form.Label> <Button size='sm' variant="outline-info" onClick={this.handleExplainer}>What is this?</Button>
              <Form.Control type="text" name="loss_tolerance" value={this.state.loss_tolerance} onChange={this.handleChange} placeholder="Loss Tolerance" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
          </Jumbotron>
          </Col>
          <Col>
          <Jumbotron>
            <h2>Beta Prior Parameters</h2>
            <h6>Defaults to uninformed prior</h6>
            <Form.Group>
              <Form.Label>Prior Alpha</Form.Label>
              <Form.Control type="text" name="prior_alpha" value={this.state.prior_alpha} onChange={this.handleChange} placeholder="Prior Alpha" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prior Beta</Form.Label>
              <Form.Control type="text" name="prior_beta" value={this.state.prior_beta} onChange={this.handleChange} placeholder="Prior Beta" />
            </Form.Group>
          </Jumbotron>
          </Col>
        </Row>
      <Button variant="outline-primary"
              type="submit"
              onClick={this.handleClick}>
        Submit
      </Button>
    </Form>
    ;

      return (
        <Container>
          {this.state.show_explainer ?
            <Jumbotron>
              <Button size='sm' variant="outline-info" onClick={this.handleExplainer}>Back</Button>
              <LossValueExplainer />
            </Jumbotron>
            : <div>
                {input_form}
                {/* {this.state.results} */}
                {this.state.results.map((data, i) => <Result key={i} results={data} timestamp={Date.now()}/> )}
              </div>}
        </Container>
      );
    } // render
  }

  export default CalculatorContainer;
