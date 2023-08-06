
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SearchEntry from './pages/SearchEntry';


function App() {

  return (
    <>
      <BrowserRouter >
        <Navbar />
        <div className='flex justify-center'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/entry/:id" element={<SearchEntry />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
