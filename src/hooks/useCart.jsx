import { useContext } from "react";
import { CartContext } from "../context/cart";

//Crear nuestro Custom Hook
export const useCart = () => {
    const context = useContext(CartContext); //esto es para utilizar el contexto del carrito

    if (context === undefined) {
        throw new Error ("useCart debe ser usado dentro de un CartProveedor");
    }

    return context;
}