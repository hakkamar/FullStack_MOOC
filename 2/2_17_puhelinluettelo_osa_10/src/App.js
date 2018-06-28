import React from 'react';
import personService from './services/persons'

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
    var lisattavaNumero = this.state.newNumber
    var vanhaNumero = ''
    var id = ''
    var koko = this.state.persons.length
    const taulukko = {...this.state.persons}
    
    // tutkitaan onko nimi jo luettelossa
    var loytyiJoLuettelosta = false
    for (let i = 0; i < koko; i++) {
      if (pieniksi(taulukko[i].name) === pieniksi(lisattavaNimi)) {
        loytyiJoLuettelosta = true   
        vanhaNumero = taulukko[i].number
        id = taulukko[i].id
      }
    }

    if (loytyiJoLuettelosta) {
      // lisätään olemassa olevalle nimelle numero jos sitä ei ole, tai muutetaan vanha numero luvan kanssa
      if ((vanhaNumero === '') || (window.confirm(lisattavaNimi + " on jo luettelossa, korvataanko vanha uudella?"))) {
        const henkilo = this.state.persons.find(n => n.id === id)
        const changedNumero = { ...henkilo, number: lisattavaNumero }

        personService
        .update(id, changedNumero)
        .then(changedNumero => {
          const persons = this.state.persons.filter(n => n.id !== id)
          this.setState({
            persons: persons.concat(changedNumero),
            newName: '', 
            newNumber: ''
          })
        }).catch(error => {
          alert(`Puhelinnumero '${lisattavaNimi}' on jo valitettavasti poistettu palvelimelta. Päivitetään luettelo, saat lisätä tiedon sen jälkeen jos vielä haluat`)
          personService
          .getAll()
          .then(response => {
            this.setState({ persons: response })
          })     
        })
      }     
    // kokonaan uusi lisättävä henkilö ja mahdollinen numero
    } else {
        const nroObject = { name: this.state.newName, number: this.state.newNumber }                
        personService
        .create(nroObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '', 
            newNumber: ''
          })
        })
    }
  }

  delNro = (event) => {
    event.preventDefault()
    var id = event.target.value
    var poistettava = ''
    var koko = this.state.persons.length
    const taulukko = {...this.state.persons}
    
    for (let i = 0; i < koko; i++) {
      if (taulukko[i].id.toString() === id.toString()) {
        poistettava = taulukko[i].name
      }
    }    

    if (window.confirm("Poistetaanko " + poistettava)) {
      personService
      .poista(id)
      .then(changedPersons => {
        personService
          .getAll()
          .then(response => {
            this.setState({ persons: response })
          })
      }).catch(error => {
        alert(`Puhelinnumero '${poistettava}' on jo valitettavasti poistettu palvelimelta`)
        personService
        .getAll()
        .then(response => {
          this.setState({ persons: response })
        })
      })
    }  
  }

  handleNameChange   = (event) => { this.setState({ newName: event.target.value }) } 
  handleNumberChange = (event) => { this.setState({ newNumber: event.target.value }) }   
  handleRajausChange = (event) => { this.setState({ filtteri: event.target.value }) }
  
  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
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
                    <td>{x.name}</td><td>{x.number}</td><td><button onClick={this.delNro} value={x.id}> poista </button></td>
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