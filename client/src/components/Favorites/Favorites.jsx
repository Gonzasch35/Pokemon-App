import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './Favorites.module.css'
import Card from '../Card/Card'

export class Favorites extends Component {
    constructor(props) {
        super(props)
    }

  render() {
    return (
        <div className={style.fav_container}>
        <h1 className={style.title}>Your FAVORITES</h1>
        {this.props.favorites && 
            this.props.favorites.map(poke => {
                return (
                        <Card 
                            poke={poke}
                        />
                )
            })}
    </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
       favorites: state.favorites
    }
}

export default connect(mapStateToProps, null)(Favorites)