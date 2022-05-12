import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

import Home from './components/Home'
import Navigointi from './components/Navigointi'
import Customerlist from './components/Customerlist'
import Traininglist from './components/Traininglist'

function App() {
  return (
    <BrowserRouter>
      <Navigointi />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/customerlist' element={<Customerlist />} />
        <Route path='/traininglist' element={<Traininglist />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
