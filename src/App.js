import './App.css';
import NavBar from './components/NavBar';
import ManageTypes from './pages/ManageTypes';

function App() {
  return (
    <>
      <NavBar />
      <div className="py-10">
        <ManageTypes />
      </div>
    </>
  );
}

export default App;
