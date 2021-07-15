import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        loading: false,
        movies: [
         //   { title: 'The Godfather', Year: 1972, imdbID: 'tt0068646' }
        ]
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);

        // TODO: запрос к серверу на получение списка
        this.setState({loading: true})
            fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    //    console.log(data.movies)
                    //    console.log(this.state)
                    let listMovies = [...this.state.movies];
                    listMovies.push(data.movies)
                    //    console.log(listMovies[0])
                    let list = listMovies[0]
                    let imdbIDItems = [];
                        for(let i=0; i < list.length; i++)  {
                        imdbIDItems.push(list[i].imdbID)
                        //    console.log(imdbIDItems)
                        }      
                    imdbIDItems.map((item) => {
                        let linkItem = item
                        console.log(linkItem)
                
                        getLink(linkItem)
                    })  

                    this.setState({
                        loading: false,
                        movies: list
                    });
                })
                .catch((err) => console.log(err));
      
        // TODO: запросы к серверу по всем imdbID
        const getLink = async (linkItem) => {
            const response = await fetch(`http://www.omdbapi.com/?i=${linkItem}&apikey=341e2618`);
            const data = await response.json();
            console.log(data)
            return data
        }
   
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                 <a href={"https://www.imdb.com/title/" + item.imdbID} target="_blank">{item.Title} ({item.Year})</a> 
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;