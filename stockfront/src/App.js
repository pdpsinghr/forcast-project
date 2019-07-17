import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import { Form } from 'semantic-ui-react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      baseCurrency: '',
      targetCurrency: '',
      amount: 0,
      waitingTime: 0
    }
  }
  componentWillMount() {
    // axios.get(`/currency`)
    //   .then((data) => {
    //     console.log(data.data)
    //     // this.setState({ contacts: data })
    //   })

    axios.get(`https://api.exchangeratesapi.io/latest`)
      .then((data) => {
        const rates = Object.keys(data.data.rates);
        let optionsArray = [];
        for (let i = 0; i < rates.length; ++i) {
          optionsArray.push({ text: rates[i], value: rates[i] });
        }
        this.setState({ options: optionsArray })
        // this.setState({ contacts: data })
      })
  }
  render() {

    const { options, baseCurrency, targetCurrency, amount, waitingTime } = this.state;
    return (
      <div className="App">
        <Form>
          <Form.Group widths='equal'>
            <Form.Select label='Base Currency'  options={options} placeholder='Base Currency' />
            <Form.Select label='Target Currency'  options={options} placeholder='Target Currency' />
          </Form.Group>
          <Form.Group>
            <Form.Input label='Amount' control='input' type='number' max={5}  placeholder='Amount' />
            <Form.Input label='Maximum Waiting Time' control='input' type='number' max={5}  placeholder='Maximum waiting time' />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default App;
