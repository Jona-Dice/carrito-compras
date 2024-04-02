import { useId, useState } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters';

export function Filters () {
    const { filters, setFilters } = useFilters();
    //const [ minPrice, setMinPrice ] = useState(0);

    //Generar dos ids
    const minPriceFilterId = useId();
    const categoryFilterId = useId();

    const handleChangePrice = (event) => {
        //setMinPrice(event.target.value);

        setFilters (prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters (prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }

    return (
        <section className="filtros">
            <div>
                <label htmlFor={ minPriceFilterId }>Precio</label>
                <input 
                    type="range" 
                    id={ minPriceFilterId } 
                    min='0' 
                    max='1000' 
                    onChange={ handleChangePrice }
                />
                <span> ${ filters.minPrice }</span>
            </div>
            <div>
                <label htmlFor={ categoryFilterId }>Categoría</label>
                <select name="category" id={ categoryFilterId } onChange={ handleChangeCategory }>
                    <option value="all">Todas</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>
        </section>
    )
}