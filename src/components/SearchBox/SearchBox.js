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

        let transliterate = (input, engToRus) => {
            let eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g),
                rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g)
            for (let x = 0; x < rus.length; x++) {
              input = input.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x])
              input = input.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase())
            }
            return input
          }

        if (e.target.choise.value) {
            input = transliterate(input)
          }
          else {
              input = transliterate(input, true)
        }
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
                            pattern="[a-zA-Z]{3,30}"
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