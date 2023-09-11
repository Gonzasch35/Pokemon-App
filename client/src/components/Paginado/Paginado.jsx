import React from 'react'
import styles from './Paginado.module.css'

const Paginado = ({pokemonsPerPage, pokemons, paginado, currentPage, setCurrentPage}) => {

    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(pokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i + 1)
        
    }

    const handlePrev = () => {
        if(currentPage === 1) return;
        setCurrentPage(currentPage - 1)
    }
    
    const handleNext = () => {
        if(currentPage === pageNumbers.length) return;
        setCurrentPage(currentPage + 1)
    }

  return (
    <div>
        <ul className={styles.pages}>
            {currentPage > 1 && <button onClick={e=> handlePrev(e)}>Anterior</button>}
            {
                pageNumbers && 
                pageNumbers.map(number => (
                    <li key={number} className={styles.page_number}>
                        <a className={currentPage === number ? styles.number_active : styles.number} onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))
            }
            {currentPage < pageNumbers.length && <button onClick={e=> handleNext(e)}>Siguiente</button>}
        </ul>
    </div>
  )
}

export default Paginado