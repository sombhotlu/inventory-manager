import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ManageTypes from './pages/ManageTypes';
import TypeListings from './pages/TypeListings';

function App() {
  return (
    <>
      <NavBar />
      <div className="py-10">
        <Routes>
          <Route path="/all" element={<TypeListings />} />
          <Route path="/types/:typeId" element={<TypeListings />} />
          <Route path="/manage-types" element={<ManageTypes />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
