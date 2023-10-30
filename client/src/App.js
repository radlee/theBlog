
import './App.css';
import Login from './components/accouunt/Login';
import DataProvider from './context/DataProvider';
import Home from './coomponents/home.Home';

function App() {
  return (
      <div style={{ marginTop: 60 }}>
        <DataProvider>
          <Login />
          <Home />
        </DataProvider>
    </div>
  );
}

export default App;
