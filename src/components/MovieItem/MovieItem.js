import React, { Component } from 'react';
import store from '../../reducer/store';
import './MovieItem.css';
import {add} from '../actions/CartActions'


class MovieItem extends Component {
    addToCartHandler = (imdbID) => {
        console.log(imdbID)    //id кликнутого на добавить фильм
        store.dispatch({
            type: add,
            playload: imdbID
            
        })
    }
    render() {
        const { title, year, poster, imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={poster} alt={title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{title}&nbsp;({year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={() => this.addToCartHandler(imdbID)}>Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;