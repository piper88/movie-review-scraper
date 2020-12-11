 import React, {Component} from 'react';
 import axios from 'axios';

 class Form extends Component {
   constructor(){
     super();
     this.state = {
       movie: '',
     }

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }


   handleChange(event) {
     this.setState({movie: event.target.value});
   }

   handleSubmit(event) {
     console.log(`this.state.movie in handleSubmit in Child Component ${this.state.movie}`);
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
     return (
       <div>
        <h1>
          The movie {this.props.movie} got a score of {this.props.score}
        </h1>
       </div>
     )
   }

 }

 export default class MovieScore extends Component {
   constructor(props) {
     super(props);
     this.state = {
       movie: null,
       score: null,
     };

     this.chooseMovie = this.chooseMovie.bind(this);
     this.showScore = this.showScore.bind(this);
   }

   chooseMovie(movie) {
     this.setState({
       movie: movie,
     })

     axios.get(`/scrapeMovie/${movie}`).then(response => {
       this.setState({
         score: response.data.score,
       })
     })
    .catch(err => {
      console.error(err);
    })
   }

   showScore() {
     if (this.state.movie && this.state.score) {
       return (
         <Score
           score = {this.state.score}
           movie = {this.state.movie}
         />
       )
     } else {
       return null;
     }
   }

   render() {
     return (
       <div>

          <div className = "form">
            <Form chooseMovie = {this.chooseMovie}/>
          </div>

          <div className = "score">
            {this.showScore()}
          </div>
        </div>
     )
   }
 }
