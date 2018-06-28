import React from 'react'

const Otsikko = (props) => (<h1>{props.kurssi.nimi}</h1>)
const Sisalto = (props) => (<div> {rivit(props)} </div>)
const rivit = (props) => props.kurssi.osat.map( x => <p key={x.id}> {x.nimi} {x.tehtavia} </p> )

const Yhteensa = (props) => {    
    const taulukko = {...props.kurssi.osat}
    const tehtavaTaulukko = []
    for (let i = 0; i < props.kurssi.osat.length; i++) {   
        tehtavaTaulukko.push(taulukko[i].tehtavia)
    }
    let summa = tehtavaTaulukko.reduce((acc, val) => acc + val)
    return( <div> yhteensä {summa} tehtävää </div> )
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