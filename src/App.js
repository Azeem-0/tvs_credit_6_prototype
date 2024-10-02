import logo from './logo.svg';
import './App.css';
import EmiInterface from "./components/EmiInterface.jsx";
import UserFinanceContext from "./contexts/UserFinanceContext.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Prediction from "./components/Prediction.jsx";
import PredictionUtility from './utilities/PredictionUtility.jsx';
// import UserFinanceContext from './components/UserFinanceContext';

function App() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <UserFinanceContext>
        <Router>
          <Routes>
            <Route path="/predict" element={<Prediction />} />
            <Route path="/" element={<EmiInterface />} />
          </Routes>
        </Router>
      </UserFinanceContext>
    </div>
  );
}

export default App;
