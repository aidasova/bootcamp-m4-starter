import React, { Component } from 'react';
import './Favorites.css';
import store from '../../reducer/store';
import {add, remove} from '../actions/CartActions'

class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [
           // { imdbID: 'tt0068646', title: 'The Godfather', year: 1972 }
        ]
    }
    componentDidMount() {
        store.subscribe(() => {
            const globalState = store.getState(); //получить данные из глобального состояния
            this.setState({   //обновить локальное состояние
                movies: globalState.cartMovie
            })
        })
    }
    handleClose = (id) => {
       // console.log(id)    //id кликнутого на фильм
        store.dispatch({
            type: remove,
            playload: id
            
        })
    }
    render() { 
        return (
            <div className="favorites">
                <input value="Новый список" className="favorites__name" />
                <ul className="favorites__list">
                    {this.state.movies.map((item) => {
                        return <li key={item.imdbID}>{item.title} ({item.year}) 
                        <button type="button"
                        className="btn"
                        onClick={() => this.handleClose(item.imdbID)}>X</button></li>;
                    })}
                </ul>
                <button type="button" className="favorites__save">Сохранить список</button>
            </div>
        );
    }
}

 
export default Favorites;