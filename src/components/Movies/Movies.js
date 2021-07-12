import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import store from '../../reducer/store';

class Movies extends Component {
    state = { 
        movies: []
    }
    componentDidMount() {
        let globalState = store.getState(); // сохраним то что есть в глобальном стате
        console.log(globalState)
        this.setState({
            movies: globalState.movies
        })
        store.subscribe(() => {
            const globalState = store.getState(); //получить данные из глобального состояния
            this.setState({   //обновить локальное состояние
                movies: globalState.movies
            })
        })
    }
    render() { 
        return ( 
            <ul className="movies">
                {this.state.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul>
        );
    }
}
 
export default Movies;