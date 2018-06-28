import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      persons: [
        { name: 'Arto Hellas', 
          number: '091234567'
        },
        { name: 'Marko Hakkarainen',
          number: '0403446584' 
        },
        { name: 'Sirpa Hopiavuori', 
          number: '0401234567' 
        },
        { name: 'Sirpa', 
          number: '0407654321' 
        }        
      ],
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
    for (let index = 0; index < koko; index++) {
      if (taulukko[index].name === lisattavaNimi) {
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

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  } 
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }   
  handleRajausChange = (event) => {
    this.setState({ filtteri: event.target.value })
  }

  render() {

    function pieniksi(merkit) {
      return merkit.toLowerCase()
    }
        
    const notesToShow =
    this.state.filtteri === '' ?
      this.state.persons :
      this.state.persons.filter(x => pieniksi(x.name).includes(pieniksi(this.state.filtteri)))

    return (
      <div>
        <h1>Puhelinluettelo</h1>
          <div>
            rajaa näytettäviä <input value={this.state.filtteri} onChange={this.handleRajausChange} />
          </div>        
        <h2>Lisää uusi</h2>
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
        <h2>Numerot</h2>
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
      </div>
    )
  }
}

export default App