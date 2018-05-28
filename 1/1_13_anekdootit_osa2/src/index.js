import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
    }
  }

klikNextAnecdote = () => {
    let luku = getRndInteger(0, anecdotes.length - 1)
      this.setState({
        selected: luku
    })
}

klikVote = () => {    
    let luku = this.state.selected
    const kopio = {...this.state.pisteet}

    kopio[luku] += 1

    this.setState({
      pisteet: kopio
    })
}
  render() {
    return (
      <div>
        <div> {this.props.anecdotes[this.state.selected]} </div>
        <div> has {this.state.pisteet[this.state.selected]} votes </div>
        <div>
            <Button
                handleClick={this.klikVote}
                text="vote"
            />            
            <Button
                handleClick={this.klikNextAnecdote}
                text="next anecdote"
            />
        </div>                
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Kauas on pitkä matka',
  'Epäonnistumisen riski on olemassa, kun kyvytön käskee haluttoman tekemään tarpeetonta',
  'Kehitystä se on taantumuskin',
  'Kun mielipidettäsi kysytään, mieti ensin; haluatko olla oikeassa, vai haluatko olla töissä…'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)