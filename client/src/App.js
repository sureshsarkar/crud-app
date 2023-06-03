// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import About from './component/About';
import Signup from './component/Signup';
import Login from './component/Login';
import Contact from './component/Contact';
import Header from './component/inclueds/Header';
import Footer from './component/inclueds/Footer';
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Auth from './redux/authRoutes';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header/>
        <Routes>
          <Route exact path='/' element={<Auth> <Home/></Auth>}></Route>
          <Route exact path='/about' element={<Auth> <About /></Auth>}></Route>
          <Route exact path='/contact' element={<Auth><Contact /></Auth>}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
        </Routes>
        <Footer/>
      </div>
    </Provider>
  );
}

export default App;
