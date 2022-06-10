import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ManageTypes from './pages/ManageTypes';
import ProductListings from './pages/ProductListings';

function App() {
  return (
    <>
      <NavBar />
      <div className="py-10">
        <Routes>
          <Route path="/products" element={<ProductListings />} />
          <Route path="/types/:typeId" element={<ProductListings />} />
          <Route path="/manage-types" element={<ManageTypes />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
