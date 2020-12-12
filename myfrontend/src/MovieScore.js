 import React, {Component} from 'react';
 import './MovieScore.css';
 import axios from 'axios';
 import url from './assets/scraper-bike.mp3';

 class Form extends Component {
   constructor(){
     super();
     this.state = {
       movie: '',
     }

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);


     this.audio = new Audio(url);
   }

   handleChange(event) {
     this.setState({movie: event.target.value});
   }

   handleSubmit(event) {
     this.audio.play();
     this.props.chooseMovie(this.state.movie);
     event.preventDefault();
   }

   render() {
     return (
       <form onSubmit = {this.handleSubmit}>
        <label>Enter movie title:
          <input
          type='text'
          value={this.state.movie}
          onChange={this.handleChange}/>
        </label>
      <input type="submit" value="Submit"/>
    </form>
     )
   }
 }

 class Score extends Component {
   render() {
     if (this.props.score === 'Movie not found') {
       return (
         <h1>
          Movie not found
         </h1>
       )
     } else {
       return (
         <div>
          <h1>
            The movie {this.props.movie} got a score of {this.props.score}
          </h1>
         </div>
       )
     }
   }
 }

 export default class MovieScore extends Component {
   constructor(props) {
     super(props);
     this.state = {
       movie: null,
       score: null,
       show: 'form',
     };

     this.chooseMovie = this.chooseMovie.bind(this);
     this.toggleElements = this.toggleElements.bind(this);
     this.chooseAnother = this.chooseAnother.bind(this);
   }

   chooseMovie(movie) {
     this.setState({
       movie: movie,
       show: 'fetching',
     })

     axios.get(`/scrapeMovie/${movie}`).then(response => {
       if (response.data.score == null) {
         response.data.score = 'Movie not found';
       }
       this.setState({
         score: response.data.score,
         show: 'score',
       })
     })
    .catch(err => {
      console.error(err);
    })
   }

   chooseAnother() {
     this.setState({
       show: 'form',
     })
   }

   toggleElements() {
     if (this.state.show === 'form') {
       return (
         <Form chooseMovie = {this.chooseMovie}/>
       )
     } else if (this.state.show === 'fetching') {
       return (
         <div className="loader-container">
           <div className="loader">
           </div>
         </div>
       )
     } else if (this.state.show === 'score') {
       return (
         <div>
           <Score
             score = {this.state.score}
             movie = {this.state.movie}
           />
           <button onClick = {this.chooseAnother}>
            Choose A Different Movie!
           </button>
         </div>
        )
     }
   }

   render() {
     return (
       <div>
          <div className = "description">
            <h1>
              Movie Review Scraper
            </h1>
            <p>
              Enter a movie title below to find out what redditors think of the movie. Reviews are collected from the subreddit r/MovieCritic, and analyzed for negative and positive words. <br /> <br /> A score between -5 and 5 is calculated, with -5 representing purely negative reviews and 5 representing purely positive.
            </p>
            <br />
            <br />
          </div>

          <div className = "toggleElements">
            {this.toggleElements()}
          </div>
        </div>
     )
   }
 }
