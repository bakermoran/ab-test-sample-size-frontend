import React from 'react';

class CalculatorContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        baseline_conversion_rate: 0.1,
        expected_relative_lift: 0.2,
        loss_tolerance: 0.02,
        prior_alpha: 1,
        prior_beta: 1,
        sample_size_returned: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
      fetch('https://ab-test-sample-size-backend.herokuapp.com/api/v1/sample_size/?baseline_conversion_rate=.1&expected_relative_lift=.2', { credentials: 'same-origin' })
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
      })
        .then((data) => {
          this.setState({
            results: data,
            loss_value: data.outputs.loss_value,
            probability_B_over_A: data.outputs.probability_B_over_A,
            sample_size_per_variant: data.outputs.sample_size_per_variant,
          });
          // history.pushState(this.state, 'index');
        })
        .catch(error => console.log(error)); // eslint-disable-line no-console
    } // componentDidMount()

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
          this.setState({
            results: data,
            loss_value: data.outputs.loss_value,
            probability_B_over_A: data.outputs.probability_B_over_A,
            sample_size_per_variant: data.outputs.sample_size_per_variant,
            sample_size_returned: true
          });
          // history.pushState(this.state, 'index');
        })
        .catch(error => console.log(error)); // eslint-disable-line no-console
    } // handleClick()

    showResults() {
      return (
        this.state.sample_size_returned ?
      <div>
        <p>loss value = {this.state.loss_value} </p>
        <p>Probability B {">"} A = {this.state.probability_B_over_A}</p>
        <p>sample size per variant = {this.state.sample_size_per_variant}</p>
      </div> : <div></div>
      )
    }

    render() {
      // if (history.state
      //    && performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
      //   this.state = history.state;
      // }
      let results = this.showResults()
      return (
        <div>
          Required Parameters
          <form>
            <label>
              Baseline Conversion Rate:
              <input type="text"
                value={this.state.baseline_conversion_rate}
                name="baseline_conversion_rate"
                onChange={this.handleChange} />
            </label> <br></br>
            <label>
              Expected Relative Lift:
              <input type="text"
                value={this.state.expected_relative_lift}
                name="expected_relative_lift"
                onChange={this.handleChange}
                />
            </label>
            <br></br>
            <label>
              Loss Tolerance:
              <input type="text"
                value={this.state.loss_tolerance}
                name="loss_tolerance"
                onChange={this.handleChange} />
            </label>
            <br></br>
            <br></br>

            Optional Parameters <br></br>
            <label>
              Prior Alpha Parameter:
              <input type="text"
                value={this.state.prior_alpha}
                name="prior_alpha"
                onChange={this.handleChange}
                />
            </label>
            <br></br>
            <label>
              Prior Beta Parameter:
              <input type="text"
                value={this.state.prior_beta}
                name="prior_beta"
                onChange={this.handleChange}
                />
            </label>
            <br></br>
            <button type="submit" onClick={this.handleClick}>Submit</button>
          </form>
          <br></br>
          {results}
        </div>
      );
    } // render
  }

  export default CalculatorContainer;
