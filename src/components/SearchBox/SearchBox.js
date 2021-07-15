import React, { Component } from 'react';
import './SearchBox.css';
import { search } from '../actions/CartActions';
import store from '../../reducer/store';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
        console.log(e.target.value)
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        let input = e.target.choise.value
        console.log(input)
     
        fetch(`http://www.omdbapi.com/?s=${input}&apikey=341e2618 `)
           .then((res) => res.json())
           .then((data) => {
              // this.setState(console.log(data))
                store.dispatch({
                    type: search,
                    payloadFetch: data.Search
                })
            })
           .catch((err) => console.log(err));
        
       
    }
    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={this.state.searchLine}
                            name="choise"
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
export default SearchBox;