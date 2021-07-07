import React, { Component } from "react"; //instantiates react components into proj front end
import axios from "axios"; // imports axios after npm i axios in terminal
import { Link } from "react-router-dom"; // imports react Link into proj to show up on DOM

export class Movie extends Component {
  //sets state for Movie func
  state = {
    movie: "", //empty string
    movieArray: [], //empty arr
  };

  async componentDidMount() {
    //console.log(this.props.location.search);
    //list of movies

    let randomMovieArray = [
      "7500",
      "The devil wears prada",
      "West World",
      "The Matrix",
      "Coco",
    ];

    let randomSelectedMovieIndex = Math.floor(
      Math.random() * randomMovieArray.length
    );

    try {
      let randomMovieData = await axios.get(
        `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&s=${randomMovieArray[randomSelectedMovieIndex]}`
      );
      this.setState({
        movieArray: randomMovieData.data.Search,
      });
    } catch (e) {
      console.log(e);
    }

    //both try blocks essentially share the same logic\\
    //-> refactor this so that there's only one try and catch block<-\\

    try {
      let searchedMovieTitle =
        window.sessionStorage.getItem("searchedMovieTitle"); //sessionStorage only lives in the lifespan of the open window

      if (searchedMovieTitle) {
        let result = await axios.get(
          `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&s=${searchedMovieTitle}`
        );
        this.setState({
          movieArray: result.data.Search,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  //updates changes when values are inputted
  handleOnChange = (event) => {
    this.setState({
      movie: event.target.value,
    });
  };

  //run the onSubmit asynchronously
  onSubmit = async (event) => {
    try {
      //wait for axios to retrieve the API req with private key
      let result = await axios.get(
        `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&s=${this.state.movie}`
      );

      console.log(result); // log the result

      window.sessionStorage.setItem("searchedMovieTitle", this.state.movie); //local storage only exists within lifetime of tab

      this.setState({
        //update the state of the movie array when user searches
        movieArray: result.data.Search,
      });
    } catch (e) {
      //catch errs
      console.log(e); // and log them in the console
    }
  };

  //direct link to the path name for movie title, inline styling, an img of the movie poster, a space for the title + year of the movie
  showMovieList = () => {
    return this.state.movieArray.map((item) => {
      return (
        <div
          key={item.imdbID}
          style={{ width: 300, height: 300, marginRight: 25 }}
        >
          <Link
            to={{
              pathname: `/movie-detail/${item.Title}`,
              //search: `?t=${item.Title}`, //?minPrice=20&maxPrice=59&color=white&size=10
            }}
          >
            <div>
              <img src={item.Poster} alt={item.Title} />
            </div>
            <div>
              Title: {item.Title}
              Year: {item.Year}
            </div>
          </Link>
        </div>
      );
    });
  };

  //dynamically render on the DOM
  // search a movie, search button, displayed movie list all with inline styling
  render() {
    console.log(this.props);

    return (
      <div>
        <div
          style={{
            width: 500,
            margin: "0 auto",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <input
            type="text"
            placeholder="Search something..."
            name="movie"
            onChange={this.handleOnChange}
          />
          <button onClick={this.onSubmit}>Search</button>
        </div>

        <div
          style={{
            width: 1200,
            margin: "0 auto",
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
          }}
        >
          {this.showMovieList()}
        </div>
      </div>
    );
  }
}

export default Movie; //run Movie
