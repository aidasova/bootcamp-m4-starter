import {add, remove, search} from '../components/actions/CartActions'

let initialState = {
    cartMovie: [], 
    movies: [ 
    //     {
    //     imdbID: 'tt3896198',
    //     title: "Guardians of the Galaxy Vol. 2",
    //     year: 2017,
    //     poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"

    // },
    // {
    //     imdbID: 'tt0068646',
    //     title: "The Godfather",
    //     year: 1972,
    //     poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"

    // }
    ] 
}
function reducer(state = initialState, action) {
    //console.log(action)
   // console.log(state)
    if(action.type === add) {
        if(state.cartMovie.find(item => item.imdbID === action.payload)) {
            return state;
        };
        let movieItem = state.movies.find(item => item.imdbID === action.payload);
        console.log(movieItem) // кликнутый товар попадаемый в корзину

        let updatedCart = [...state.cartMovie, movieItem]
        console.log(updatedCart) // массив из товаров плюс добавленный в корзине

        let updatedState = {...state};
        updatedState.cartMovie = updatedCart;

        return updatedState; // корзина с фильмами
    } else if(action.type === remove) {
        let clone = state.cartMovie.filter((item) => { // все фильмы кроме удаленного

        return item.imdbID !== action.payloadRemove 
        });   

        return ({ ...state, cartMovie: clone});
    } else if(action.type === search) {
         let cloneFetch = action.payloadFetch
         console.log(cloneFetch)
        return ({ ...state, movies: cloneFetch})
    }  
    return state;
}
export default reducer;