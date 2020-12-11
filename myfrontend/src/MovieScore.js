 import React, {Component} from 'react';
 import axios from 'axios';

 export default class Form extends Component {
   constructor(){
     super();
     this.state = {
       movie: '',
       score: 0,
     }

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }


   handleChange(event) {
     this.setState({movie: event.target.value});
   }

   handleSubmit(event) {
     axios.get(`/scrapeMovie/${this.state.movie}`).then(response => {
       this.setState({
         score: response.data.score,
       })
       console.log(`${this.state.movie} got a score of ${this.state.score}`);
     })
    .catch(err => {
      console.error(err);
    })
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
 //
 // class Score extends Component {
 //
 // }
 //
 // export default class MovieScore extends Component {
 //   render() {
 //     return (
 //       <div>
 //          <Form/>
 //          <Score/>
 //        </div>
 //
 //     )
 //   }
 // }
