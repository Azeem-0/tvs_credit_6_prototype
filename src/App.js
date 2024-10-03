
import './App.css';
import EmiInterface from "./components/EmiInterface.jsx";
import UserFinanceContext from "./contexts/UserFinanceContext.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Prediction from "./components/Prediction.jsx";
import NavigationBar from './components/NavigationBar.jsx';

function App() {
  return (
    <div className=' flex flex-col w-screen h-screen'>
      <Router>
        <NavigationBar />
        <div className=' flex flex-grow justify-center items-center'>
          <UserFinanceContext>

            <Routes>
              <Route path="/predict" element={<Prediction />} />
              <Route path="/" element={<EmiInterface />} />
            </Routes>
          </UserFinanceContext>
        </div>
      </Router>
    </div>
  );
}

export default App;
