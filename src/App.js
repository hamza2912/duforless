import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Header from './components/header';
import Footer from './components/footer';
import About from './pages/who';
import './App.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function App() {
  return (
    <BrowserRouter>

    <Header/>

    <Switch>

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />

    </Switch>

    <Footer />

    </BrowserRouter>
  );
}

export default App;
