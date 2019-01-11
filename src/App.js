import React, { Component } from 'react';
import logo from './logo.svg';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from "./components/Navigation"
import ImageLinkForm from "./components/ImageLinkForm"
import Rank from "./components/Rank"
import Clarifai from "clarifai"
import FaceRecognition from "./components/FaceRecognition"
const app = new Clarifai.App({
  apiKey: 'f79298ce0b6c4a58975d0e52373652c2'
 });
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      input:"",
      imageUrl:"",
      box:{}
    }
    this.paramoptions={
      particles:{number:{
        value:30,
        density:{
          enable:true,
          value_area:800
        }
      }}
    }
  }
  calculateFaceLocation=(data)=>{
    const face=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('input-image')
    const width=Number(image.width)
    const height=Number(image.height)
    console.log(width,height)
    const box= {
      topRow:face.top_row*height,
      leftcol:face.left_col*width,
      bottomRow:height-(face.bottom_row*height),
      rightcol:width-(face.right_col*width)
    }
    
    return box;
  }
  displayBox=(box)=>{
    console.log(box)
    this.setState({box})
  }
  onInputChange=(e)=>{
    this.setState({input:e.target.value})
  }
  onSubmit=(e)=>{
    this.setState({imageUrl:this.state.input})
    // app.models.initModel({id: Clarifai.FACE_DETECT_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
    // .then(generalModel => {
    //   return generalModel.predict(this.state.input);
    // })
    // .then(response => {
    //   this.calculateFaceLocation(response)
   
    // })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
  (response)=> {
    // do something with response4
    this.displayBox(this.calculateFaceLocation(response))
  },
  function(err) {
    // there was an error
  }
);

  }
  render() {
   
    return (
      <div className="App">
    
        <Particles className="particles" 
                params={this.paramoptions} />
       <Navigation />
       <Rank />
       <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
       <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
    );
  }
}

export default App;
