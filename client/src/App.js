import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateActivity from './components/CreateActivity';
import Details from './components/Details';
import CountryNotFound from './components/CountryNotFound';
import axios from 'axios';

axios.defaults.baseURL = 'https://countries-pi-sixl.onrender.com';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/activity' component={CreateActivity}/>
          <Route exact path='/home/:id' component={Details}/>
          <Route path='*' component={CountryNotFound}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
