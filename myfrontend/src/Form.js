 import React, {Component} from 'react';
 import axios from 'axios';

 export default class Form extends Component {
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
     axios.get('/scrapeMovie').then(response => {
       console.log(response);
     })
     //Send movie to controller
     event.preventDefault();
     // controller.scrape(this.state.movie)

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
