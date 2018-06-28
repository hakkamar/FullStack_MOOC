import React from 'react'
import Kurssi from './components/Kurssi'

const App = ({ kurssit }) => {
    const kokonaisuudet = ( kurssit ) => kurssit.map(x => <div key={x.id}> <Kurssi kurssi={x} /> </div>)    

    return (
        <div>           
            {kokonaisuudet(kurssit)} 
        </div>            
    ) 
}

export default App