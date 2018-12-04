import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow'
import $ from 'jquery'

class App extends Component {
constructor(props){
  super(props);
console.log('constructor');

this.state={}
 this.performSearch("ant man")
}
performSearch(searchTerm) {
  const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm
  $.ajax({
    url:urlString,
    success:(searchResults)=>{
      const results = searchResults.results;
      var movieRows = []
      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        const movieRow = <MovieRow key={movie.id} movie={movie}/>
        movieRows.push(movieRow)
      })
      this.setState({rows:movieRows})
    },
    error:(xhr,status,err)=>{
      console.error("Failed to fetch data")
    }

  })
}

searchChangeHandler(event){
  console.log(event.target.value)
  const boundObject = this
  const searchTerm = event.target.value
  boundObject.performSearch(searchTerm)
}


  render() {
    return (
      <div className="App">
        <table className="titleBar" >
          <body>
            <tr><td><img alt="app icon" width="50" src="green_app_icon.svg"/> </td>
              <td >
                <h1> MoviesDb Search</h1></td>
              </tr>
          </body>
        </table>
        <input  style={{fontSize:24,
        display:'block',
        width:'99%',
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:16
      }} onChange={this.searchChangeHandler.bind(this)}
        placeholder="Enter search term" />
        
         <div className="movie__box"> 
         {this.state.rows}
         </div>
        
      </div>
    );
  }
}

export default App;
