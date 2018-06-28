import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      persons: [
        { name: 'Arto Hellas' },
        { name: 'Marko Hakkarainen' },
        { name: 'Sirpa Hopiavuori' }
      ],
      newName: ''
    }
    this.handleNroChange = this.handleNroChange.bind(this)
    this.addNro = this.addNro.bind(this)
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
        newName: ''
      })      
    } else {
      const nroObject = { name: this.state.newName }
      const persons = this.state.persons.concat(nroObject)
        this.setState({
          persons,
          newName: ''
        })
    }
  }

  handleNroChange = (event) => {
    this.setState({ newName: event.target.value })
  } 

  render() {
 
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addNro}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNroChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <div>
          {this.state.persons.map(x => <p key={x.name}> {x.name} </p>)}
        </div>
      </div>
    )
  }
}

export default App