import { Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home'; 
import CountryDetail from './pages/CountryDetail';


function App() {

  return (
     <div className="min-h-screen bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100 transition-colors">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryDetail />} />
      </Routes>
    </div>
  )
}

export default App
