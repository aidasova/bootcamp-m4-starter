import React, { Component } from 'react';
import store from '../../reducer/store';
import './MovieItem.css';
import { add } from '../actions/CartActions'


class MovieItem extends Component {
    addToCartHandler = (imdbID) => {
        console.log(imdbID)    //id кликнутого на добавить фильм
        store.dispatch({
            type: add,
            payload: imdbID
            
        })
    }
    render() {
        const { Title, Poster, Year, imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={() => this.addToCartHandler(imdbID)}>Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;