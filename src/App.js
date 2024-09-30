import logo from './logo.svg';
import './App.css';
import EmiInterface from "./components/EmiInterface.jsx";
import UserFinanceContext from "./contexts/UserFinanceContext.jsx";
// import UserFinanceContext from './components/UserFinanceContext';

function App() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <UserFinanceContext>
        <EmiInterface />
      </UserFinanceContext>
    </div>
  );
}

export default App;
