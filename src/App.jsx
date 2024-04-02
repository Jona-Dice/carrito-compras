import { useContext, useState } from "react";
import { Products } from "./components/Products"
import { products as initialProducts } from "./mocks/products.json"
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { IS_DEVELOPMENT } from "./config.js";
//import { FiltersContext } from "./context/filters.jsx";
import { useFilters } from "./hooks/useFilters.jsx";
import { Cart } from "./components/Cart.jsx";
import { CartProvider } from "./context/cart.jsx";


//Crear un Custom Hook, para separar la lógica de como se procesan los filtros
//function useFilters () {
  //const [ filters, setFilters ] = useState({
  //  category: 'all',
  //  minPrice: 0
  //});
  //const { filters, setFilters } = useContext(FiltersContext);
  
  //const setFilters = () => {} 

  /*const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice && (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  return { filters, filterProducts, setFilters }*/
//} //Fin del Custom Hook.

function App() {
  const [products] = useState (initialProducts );

  const { filters, filterProducts, setFilters } = useFilters();

  const filteredProducts = filterProducts( products );

  return (
    <CartProvider>
      <Header  />
      <Cart />
      <Products products={ filteredProducts }/>
      { IS_DEVELOPMENT && <Footer /> }
      
    </CartProvider>
  );
}

export default App
