import { Fragment } from 'react'
import {Route, Routes} from 'react-router-dom'
import Landing from './Landing/Landing.js'
import Home from './Home/Home.js'
import Form from './Form/Form.js'
import GameDetail from './GameDetail/GameDetail.js'

function App () {
  return (
  <Fragment>
     <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/videogames' element={<Home/>}/>
        <Route path='/videogames/:id' element={<GameDetail/>}/>
        <Route path='/create' element={<Form/>} />
      </Routes>
  </Fragment>
  );
}

export default App;