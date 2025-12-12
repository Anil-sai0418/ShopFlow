import { BrowserRouter,Routes,Route } from 'react-router-dom';

import './App.css'
import Home from './Pages/Home';
import Error from './chunks/Error';
import Products from './Pages/Products';
import Cart from './chunks/Cart';

function App() {


  return (

     <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
         <Route path="/products" element={<Products />} />
          <Route path="/cartitems" element={<Cart />} />
       
     </Routes>
     </BrowserRouter>
  )
}

export default App
