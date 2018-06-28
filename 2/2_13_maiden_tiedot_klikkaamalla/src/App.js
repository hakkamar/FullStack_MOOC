import React from 'react';
import axios from 'axios'

function pieniksi(merkit) { return merkit.toLowerCase() }

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      maat: [],
      filtteri: ''
    }
  }

  klikkaus = () => {
    var mikaMaa = getSelection().baseNode.nodeValue
    this.setState({
      filtteri: mikaMaa
    })
  }  

  handleRajausChange = (event) => { this.setState({ filtteri: event.target.value }) }
  
  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ maat: response.data })
      })
  }

  render() {

    const maatToShow = this.state.filtteri === '' ?
      this.state.maat :
      this.state.maat.filter(x => pieniksi(x.name).includes(pieniksi(this.state.filtteri)))

    const rajaaNaytettavia = () => {
      return ( 
        <div>
          find countries: <input value={this.state.filtteri} onChange={this.handleRajausChange} />
        </div> 
      )
    }

    const maaLista = () => {
      var maaRajaus = this.state.filtteri
      var maita = maatToShow.length

      if (maaRajaus === '') {
        return (<div> Too many matches, specify another filter </div>)
      }

      if (maita > 10) {
        return (<div> Too many matches, specify another filter </div>)        
      }

      if (maita < 1) {
        return (<div> No matches, specify another filter </div>)        
      }      

      if (maita === 1) {
        let loytynyt = maatToShow[0]
        return (
          <div>
            <h2>{loytynyt.name}</h2>
            <p>capital: {loytynyt.capital}</p>
            <p>population: {loytynyt.population}</p>
            <img src={loytynyt.flag} width="300" border="1" alt={loytynyt.name} />
          </div>
        )
      }  else {
        return (
          <div>
               {maatToShow.map(x => <div key={x.name} onClick={ this.klikkaus }> {x.name} </div>)}
          </div>
        )
      }         
    }

    return (
      <div>
        <h1>Maailman maat</h1>
        {rajaaNaytettavia()}
        {maaLista()}
      </div>
    )
  }
}

export default App