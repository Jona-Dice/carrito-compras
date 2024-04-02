import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import './Cart.css';
import { useCart } from "../hooks/useCart";

function CartItem({ thumbnail, title, price, quantity, addToCart, quitToCart }) {
    return (
        <li>
            <img src= { thumbnail } alt= { title } />
            <div>
                <strong>{ title }</strong> - ${ price }
             </div>
             <footer>
                <button onClick={ quitToCart }>-</button>
                <small>Qty: { quantity }</small>
                <button onClick={ addToCart }>+</button>
            </footer>
        </li>
    )
}

export function Cart () {
    const cartCheckboxId = useId();

    const { cart, clearCart, addToCart, quitToCart, subtotal, totalQuantity } = useCart();

    return (
        <>
            <label className="cart-button" htmlFor={ cartCheckboxId }> 
                <CartIcon /> 
            </label>
            <input id={ cartCheckboxId } type="checkbox" hidden />
            <aside className="cart">
                <ul>
                    {
                        cart.map( product => (
                            <CartItem 
                            key={ product.id}
                            quitToCart={ () => quitToCart(product) }
                            addToCart={ () => addToCart(product) }
                            {...product} />
                        ))
                    }
                </ul>
                <div>
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>Total Quantity: {totalQuantity}</p>
                </div>
                <button style={{backgroundColor: '#E36414'}} onClick={ clearCart }>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}