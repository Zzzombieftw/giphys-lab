import { Component } from 'react';
const apikey = process.env.REACT_APP_API_KEY

class App extends Component {
  
    state ={
      searchValue:'',
      giphys:[],
    }
  

  handleChange = (event)=> {
    console.log(event.target)
    this.setState({ 
      [event.target.name]: event.target.value
    })
  }
  
  handleSubmit = (event)=>{
    event.preventDefault()

    
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${this.state.searchValue}&limit=10&offset=0&rating=m&lang=en`)
      .then(response=> response.json())
      .then(data=> {
        this.setState({
          giphys: data.data
        })
      })

  
  }



  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor=''>Title</label>
          <input name='searchValue' type='text' onChange={this.handleChange}
          />
          <input
            type='submit'
            value='Find Giphy Info'
          />
        </form>
        {this.state.giphys.map((gif, idx)=>{
          return(
            <img src={gif.images.original.url} key={idx}></img>
          )
        })}
        
       
      </>
    );
  }
}

export default App;
