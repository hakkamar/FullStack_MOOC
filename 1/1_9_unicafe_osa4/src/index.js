import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const Statistics = ({ counter, txt}) => (
  <div> {txt} {counter}</div>
)

const Statistic = ({ counter, txt, loppu}) => (
  <div> {txt} {counter} {loppu}</div>
)

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
      kpl:  this.state.kpl + 1,
      yht:  this.state.yht + 1
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

    const statiikka = () => {
        if (this.state.kpl === 0) {
          return (
            <div>
              ei yhtään palautetta annettu
            </div>
          )
        }
        return (
            <div>
                <Statistics counter={this.state.hyva} txt="hyvä "/>
                <Statistics counter={this.state.neutraali} txt="neutraali "/>
                <Statistics counter={this.state.huono} txt="huono "/>
                <Statistic counter={ka()} txt="keskiarvo " loppu=""/>
                <Statistic counter={posi()} txt="positiivisia " loppu=" %"/>
            </div>
        )
      }

    return (
      <div>
        <h1> anna palautetta </h1>
        <div>
            <Button
                handleClick={this.klikHyva}
                text="Hyvä"
            />
            <Button
                handleClick={this.klikNeutraali}
                text="Neutraali"
            />            
            <Button
                handleClick={this.klikHuono}
                text="Huono"
            />    
        </div>
        <h1> statistiikka </h1>
        {statiikka()}
      </div>
    )
  }
} 

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )