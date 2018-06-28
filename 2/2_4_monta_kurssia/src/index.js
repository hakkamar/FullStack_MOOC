import React from 'react'
import ReactDOM from 'react-dom'
import Kurssi from './components/Kurssi'

const App = () => {
    const kurssit = [
      {
        nimi: 'Half Stack -sovelluskehitys',
        id: 1,
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10,
            id: 1
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7,
            id: 2
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14,
            id: 3
          },
          {
            nimi: 'Pix Pox',
            tehtavia: 12,
            id: 4
          }
        ]
      },
      {
        nimi: 'Node.js',
        id: 2,
        osat: [
          {
            nimi: 'Routing',
            tehtavia: 3,
            id: 1
          },
          {
            nimi: 'Middlewaret',
            tehtavia: 7,
            id: 2
          },
          {
            nimi: 'Pix Pox',
            tehtavia: 12,
            id: 3
          }
        ]
      },
      {
        nimi: 'Cobol elää ja voi hyvin',
        id: 3,
        osat: [
          {
            nimi: 'Identification Division',
            tehtavia: 3,
            id: 1
          },
          {
            nimi: 'Environment Division',
            tehtavia: 7,
            id: 2
          },
          {
            nimi: 'Data Division',
            tehtavia: 12,
            id: 3
          },
          {
            nimi: 'Procedure Division',
            tehtavia: 43,
            id: 4
          }
        ]
      }
    ]

    const kokonaisuudet = ( kurssit ) => kurssit.map(x => <div key={x.id}> <Kurssi kurssi={x} /> </div>)    

    return (
        <div>           
            {kokonaisuudet(kurssit)} 
        </div>            
    )    
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)