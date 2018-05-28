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
      kaikki: { 0: 0, 1: 0, 2: 0 },
      yht: 0,
      kpl: 0
    }
  }

  asetaArvoon = (mika, arvo) => {
    const kopio = {...this.state.kaikki}
    kopio[mika] += 1

    return () => {
        this.setState({ 
          kaikki: kopio, 
          yht: arvo, 
          kpl: this.state.kpl + 1
        })
    }
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
        let prossa = this.state.kaikki[0] / this.state.kpl * 100
        return prossa.toFixed(1)
    } 

    const statiikka = () => {
         if (this.state.kaikki.kpl === 0) {
          return (
            <div>
              ei yhtään palautetta annettu
            </div>
          )
        } 
        return (
            <div>
                <Statistics counter={this.state.kaikki[0]} txt="hyvä " />
                <Statistics counter={this.state.kaikki[1]} txt="neutraali "/>
                <Statistics counter={this.state.kaikki[2]} txt="huono "/>
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
                handleClick={this.asetaArvoon(0, this.state.yht + 1)}
                text="Hyvä"
            />
            <Button
                handleClick={this.asetaArvoon(1, this.state.yht)}
                text="Neutraali"
            />            
            <Button
                handleClick={this.asetaArvoon(2, this.state.yht - 1)}
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