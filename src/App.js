import './App.scss';
import Header from './components/header';
import { Route, Routes } from 'react-router-dom';
import Cart from './components/cart';
import Home from './components/home';
import Profile from './components/profile';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/:cate" element={<Home />} />
          <Route path="/*" element={<Home />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
