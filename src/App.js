import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from './components/screens/Home';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import { createContext, useReducer } from 'react';
import Cart from './components/screens/Cart';
import History from './components/screens/History';
import Footer from './components/Footer';
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size }];
    case "REMOVE":
      let arr = [...state];
      arr.splice(action.index, 1);
      return arr;
    case "DROP":
      return [];
    default:
      console.log("REDUCER DEFAULT CASE");
  }
}
function App() {
  const [state, dispatch] = useReducer(Reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        <BrowserRouter>
          <div className="content">
            <Routes>
              <Route path="/myorders" element={<ProtectedRoute><History></History></ProtectedRoute>}></Route>
              <Route path="/cart" element={<ProtectedRoute><Cart></Cart></ProtectedRoute>} />
              <Route path="/" element={<Home></Home>} />
              <Route path="/signup" element={<Signup></Signup>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
          </div>
          <Footer></Footer>
        </BrowserRouter>
      </CartStateContext.Provider>

    </CartDispatchContext.Provider>
  );
}

export default App;
export function ProtectedRoute(props) {
  if (localStorage.getItem('AuthToken')) {
    return props.children;
  } else {
    return <Navigate to="/" />

  }
}
export { CartStateContext, CartDispatchContext };
