import './App.css';
import Example from './components/NavBar';
import ManageTypes from './pages/ManageTypes';

function App() {
  return (
    <>
      <Example />
      <div className="py-10">
        <ManageTypes />
      </div>
    </>
  );
}

export default App;
