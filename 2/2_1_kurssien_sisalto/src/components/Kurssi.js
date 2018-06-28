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

const Kurssi = ({ kurssi }) => {
    return (
        <div>
        <Otsikko kurssi={kurssi}/>
        <Sisalto kurssi={kurssi} />
        </div>
    )
}

export default Kurssi