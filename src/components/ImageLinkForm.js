import React from "react"
import "./ImageLinkForm.css"
const ImageLinkForm=(props)=>{
    return(
        <div className="container">
        <div className="info">Input Your Image here.We will detect faces on it</div>
        <div className="box-content">
            <input className="field" type="text" onChange={e=>{props.onInputChange(e)}}/>
            <button className="button" onClick={e=>props.onSubmit(e)}>Detect</button>
        </div>
        </div>
    )
}
export default ImageLinkForm;