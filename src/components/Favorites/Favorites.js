import React, { Component } from 'react';
import './Favorites.css';
import store from '../../reducer/store';
import { remove } from '../actions/CartActions';
import { Link } from 'react-router-dom';

class Favorites extends Component {
    state = {
        title: '',
        movies: [
           // { imdbID: 'tt0068646', Title: 'The Godfather', Year: 1972 }
        ], 
        showList: false,
        id: ''
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
            payloadRemove: id
        })
    }
    saveHandler = (e) => { //поле ввода
        this.setState({ 
            title: e.target.value,
        });
        console.log(e.target.value)
    }
    buttonClick = (e) => {  //кнопка сохранить
        e.preventDefault();
        console.log(this.state)
        const info =  this.state
      
        fetch (
            `https://acb-api.algoritmika.org/api/movies/list `, {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify(info)
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                showList: true, 
                id: data.id
            });
        })
        }
    
    render() { 
        const {title} = this.state;
        return (
            <div className="favorites">
                <input  className="favorites__name" 
                    value={this.state.title}
                    name="task"
                    type="text"
                    placeholder="Введите название списка"
                    onChange={this.saveHandler}
                />
                <ul className="favorites__list">
                    {this.state.movies.map((item) => {
                        return (
                            <li className='flex' key={item.imdbID}>
                                <span>{item.Title} ({item.Year}) </span>
                                <span>
                                    <button type="button"
                                        className="btn"
                                        onClick={() => this.handleClose(item.imdbID)}
                                    >
                                        X
                                    </button>
                                </span>
                            </li>
                        )
                    })}
                </ul>
                {this.state.showList
                    ? <Link to={'/list/' + this.state.id}  className="favorites__save_btn">Перейти к списку</Link>
                    : <button type="button" className="favorites__save" onClick={this.buttonClick} disabled={!title}>Сохранить список</button>
                }
            </div>
        );
    }
}

 
export default Favorites;