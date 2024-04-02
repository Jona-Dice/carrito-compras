import { useCart } from '../hooks/useCart';
import { useFilters } from '../hooks/useFilters'
import './Footer.css'

export function Footer () {
    const { filters } = useFilters();
    const { cart } = useCart();
    return (
        <footer className="footer">
            {/*JSON.stringify(filters, null, 2)*/}
            <h4><span>Jonathan Moran</span></h4>
            <h5>© JonaStudio´s Online Shop</h5> 
            {/*
                JSON.stringify(cart, null, 2)*/
            }
        </footer>
    )
}