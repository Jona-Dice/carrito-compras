import { createContext, useReducer, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

// Función para calcular el subtotal y la cantidad total de productos en el carrito
const calculateSubtotalAndTotalQuantity = (cart) => {
    const { subtotal: initialSubtotal, totalQuantity: initialTotalQuantity } = cart.reduce((acc, item) => {
        return {
            subtotal: acc.subtotal + (item.price * item.quantity),
            totalQuantity: acc.totalQuantity + item.quantity
        };
    }, { subtotal: 0, totalQuantity: 0 });

    return { subtotal: initialSubtotal, totalQuantity: initialTotalQuantity };
};


//const initialState = [];
//modificar el estado inicial para guardar lo del localStorage, o sea, lo que hay en el carrito
const initialState = JSON.parse(window.localStorage.getItem('cart')) || [];

//actualizar localStorage con el state para el carrito
export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state));
}

const reducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action;

    switch (actionType) {
        case 'ADD_TO_CART': {
            const { id } = actionPayload;
            const productInCartIndex = state.findIndex(item => item.id === id);
        
            if (productInCartIndex >= 0) {
                const newState = structuredClone(state);
                newState[productInCartIndex].quantity += 1;
                updateLocalStorage(newState);
                return newState;
            }
        
            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                }
            ];
            updateLocalStorage(newState);
            return newState;
        }
        
        case 'QUIT_TO_CART': {
            const { id } = actionPayload;
            const productInCartIndex = state.findIndex(item => item.id === id);
        
            if (productInCartIndex >= 0) {
                const newState = structuredClone(state);
                if (newState[productInCartIndex].quantity > 1) {
                    newState[productInCartIndex].quantity -= 1;
                    updateLocalStorage(newState);
                    return newState;
                }
                // Si la cantidad es 1, eliminamos el producto del carrito
                const filteredState = newState.filter(item => item.id !== id);
                updateLocalStorage(filteredState);
                return filteredState;
            }
        
            // Si el producto no está en el carrito, retornamos el estado sin cambios
            return state;
        }
        
        case 'REMOVE_FROM_CART': {
            const { id } = actionPayload;
            const newState = state.filter(item => item.id !== id);
            updateLocalStorage(newState);
            return newState;
        }
        
        case 'CLEAR_CART': {
            const newState = [];
            updateLocalStorage(newState);
            return newState;
        }
        

        default: {
            return state;
        }
    }
    return state;
};

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [subtotal, setSubtotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const { subtotal, totalQuantity } = calculateSubtotalAndTotalQuantity(state);
        setSubtotal(subtotal);
        setTotalQuantity(totalQuantity);
    }, [state]);

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    });

    const quitToCart = product => dispatch({
        type: 'QUIT_TO_CART',
        payload: product
    });

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    });

    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    return (
        <CartContext.Provider value={{
            cart: state,
            subtotal,
            totalQuantity,
            addToCart,
            quitToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}
