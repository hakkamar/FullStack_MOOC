import React from 'react'

const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
  return(    
    <div>
        {rivit(props)}
    </div>
  )
}

const rivit = (props) => props.kurssi.osat.map(x =>
    <p key={x.id}>
      {x.nimi} {x.tehtavia}
    </p>
)

const Yhteensa = (props) => {    
    const taulukko = {...props.kurssi.osat}
    let koko = props.kurssi.osat.length

    let summa = 0
    for (let i = 0; i < koko; i++) {   
        summa += taulukko[i].tehtavia
    }

    return(
        <div>
            yhteensä {summa} tehtävää
        </div>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
        <Otsikko kurssi={kurssi}/>
        <Sisalto kurssi={kurssi}/>
        <Yhteensa kurssi={kurssi}/>
        </div>
    )
}

export default Kurssi