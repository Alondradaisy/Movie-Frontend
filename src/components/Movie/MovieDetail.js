import React, { Component } from "react"; //brings in react into proj
import axios from "axios"; //brings in axios post npm i axios

export class MovieDetail extends Component {
  //sets state to MovieDetail properties
  state = {
    Actors: "",
    Awards: "",
    Country: "",
    Plot: "",
    Poster: "",
    Rated: "",
    Ratings: [],
    Title: "",
    imdbID: "",
    isLoading: true,
  };

  async componentDidMount() {
    try {
      let result = await axios.get(
        //result = axios API req with person access key
        `https://omdbapi.com/?apikey=6332b1e1&t=${this.props.match.params.movieTitle}`
      );

      this.setState({
        Actors: result.data.Actors, //how to retrieve the value for Actors
        Awards: result.data.Awards, // how to retrieve the value for Awards
        Country: result.data.Country, // how to retrieve the value for Country
        Plot: result.data.Plot, //how to retrieve the value for Plot
        Poster: result.data.Poster, // how to retrieve the value for Poster
        Rated: result.data.Rated, //how to retrieve the value for Rated
        Ratings: result.data.Ratings, // how to retrieve the value for Ratings
        Title: result.data.Title, // how to retrieve the value for Title
        imdbID: result.data.imdbID, // how to retrieve the value for imdbID
        isLoading: false,
      });

      console.log(result); //console log axios req
    } catch (e) {
      //catch errs
      console.log(e);
    }
  }

  //display movie details
  //an img with movie poster and title as alt description
  // separate divs for each detail
  showMovieDetail = () => {
    return (
      <div style={{ display: "flex" }}>
        <div>
          <img src={this.state.Poster} alt={this.state.Title} />
        </div>
        <div>
          <div>Actors: {this.state.Actors}</div>
          <div>Awards: {this.state.Awards}</div>
          <div>Country: {this.state.Country}</div>
          <div>Plot: {this.state.Plot}</div>
          <div>Poster: {this.state.Poster}</div>
          <div>Rated: {this.state.Rated}</div>
          <div>
            Ratings:{" "}
            {this.state.Ratings.map((item) => {
              return (
                <span key={item.Source}>
                  {item.Source} {item.Value}
                </span>
              );
            })}
          </div>
          <div>Title: {this.state.Title}</div>
          <div>imdbID: {this.state.imdbID}</div>
        </div>
      </div>
    );
  };
  //render the state of loading centered on the top at 50 pixels
  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            ...Loading
          </div>
        ) : (
          this.showMovieDetail()
        )}
      </div>
    );
  }
}

export default MovieDetail; //run MovieDetail
