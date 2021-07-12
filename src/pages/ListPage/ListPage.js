import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [
            { title: 'The Godfather', Year: 1972, imdbID: 'tt0068646' }
        ]
    }
    componentDidMount() {
        const id = this.props.match.params;
        console.log(id);
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID
        const getList = async (id) => {
            if (id === 0) {
                throw 'Invalid id';
            }
            const response = await fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`);
            const data = await response.json();

            return data;
        }
        getList().then().catch()
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href="https://www.imdb.com/title/tt0068646/" target="_blank">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;