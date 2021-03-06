import React from 'react';
import axios from 'axios'

function pieniksi(merkit) { return merkit.toLowerCase() }

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filtteri: ''
    }
  }

  addNro = (event) => {
    event.preventDefault()

    var lisattavaNimi = this.state.newName
    var koko = this.state.persons.length
    const taulukko = {...this.state.persons}
    
    let loytyi = false
    for (let i = 0; i < koko; i++) {
      if (pieniksi(taulukko[i].name) === pieniksi(lisattavaNimi)) {
        loytyi = true   
      }
    }

    if (loytyi) {
      alert('Löytyy jo muistiosta. Ei lisätä samaa henkilöä.')
      this.setState({
        newName: '',
        newNumber: ''
      })      
    } else {
        const nroObject = { name: this.state.newName, number: this.state.newNumber }
        const persons = this.state.persons.concat(nroObject)
        this.setState({
          persons,
          newName: '', 
          newNumber: ''
        })
    }
  }

  handleNameChange   = (event) => { this.setState({ newName: event.target.value }) } 
  handleNumberChange = (event) => { this.setState({ newNumber: event.target.value }) }   
  handleRajausChange = (event) => { this.setState({ filtteri: event.target.value }) }
  
  componentWillMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  render() {

    const notesToShow = this.state.filtteri === '' ?
      this.state.persons :
      this.state.persons.filter(x => pieniksi(x.name).includes(pieniksi(this.state.filtteri)))

    const rajaaNaytettavia = () => {
      return ( 
        <div>
          rajaa näytettäviä <input value={this.state.filtteri} onChange={this.handleRajausChange} />
        </div> 
      )
    }
    const lisaaUusi = () => {
      return (
        <form onSubmit={this.addNro}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>          
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
      )
    }
    const numeroLista = () => {
      return (
        <div>
          <table>
          <tbody>          
             {notesToShow.map(x => 
                <tr key={x.name}>
                    <td>{x.name}</td><td>{x.number}</td>
                </tr>)}
          </tbody>             
          </table>
        </div>
      )
    }

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        {rajaaNaytettavia()}
        <h2>Lisää uusi</h2>
        {lisaaUusi()}
        <h2>Numerot</h2>
        {numeroLista()}
      </div>
    )
  }
}

export default App