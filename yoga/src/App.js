import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RegistrationScreen from './screens/RegistrationScreen';
import RegSuccess from './screens/RegSuccess';

function App() {
  return (
    <BrowserRouter>
    <div>
      <main>
        <Routes>
          <Route path="/" element={<RegistrationScreen/>}/>
          <Route path="/RegSuccess" element={<RegSuccess/>}></Route>
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
