import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      kpl: 0,
      yht: 0
    }
  }

  klikHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1,
      kpl: this.state.kpl + 1,
      yht: this.state.yht + 1
    })
  }
  klikNeutraali = () => {
    this.setState({
        neutraali: this.state.neutraali + 1,
        kpl: this.state.kpl + 1        
        //yht: this.state.yht
    })
  }
  klikHuono = () => {
    this.setState({
        huono: this.state.huono + 1,
        kpl: this.state.kpl + 1,
        yht: this.state.yht - 1
    })
  }

  render() {
    const ka = () => {
        if (this.state.kpl === 0) {
            return 0
        }
        let keskari = this.state.yht / this.state.kpl
        return keskari.toFixed(1)
    } 

    const posi = () => {
        if (this.state.kpl === 0) {
            return 0
        }
        let prossa = this.state.hyva / this.state.kpl * 100
        return prossa.toFixed(1)
    } 

    return (
      <div>
        <h1> anna palautetta </h1>
        <div>
          <button onClick={this.klikHyva}>Hyvä</button>
          <button onClick={this.klikNeutraali}>Neutraali</button>
          <button onClick={this.klikHuono}>Huono</button>
          <h1> statistiikka </h1>
          <div>hyvä {this.state.hyva}</div>
          <div>neutraali {this.state.neutraali}</div>
          <div>huono {this.state.huono}</div>
          <div>keskiarvo {ka()}</div>
          <div>positiivisia {posi()} %</div>
        </div>
      </div>
    )
  }
} 

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )