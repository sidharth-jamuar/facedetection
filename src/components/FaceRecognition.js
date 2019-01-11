import React from "react"
import "./FaceRecognition.css"
const FaceRecognition = (props) => {
    console.log(props.box)
    return (
        <div className="face-container" >
            <img src={props.imageUrl} id="input-image" width="500px" height="auto" />
            <div className="face-box" style={{
                top: props.box.topRow, right: props.box.rightcol, bottom: props.box.bottomRow,
                left: props.box.leftcol
            }}></div>
        </div>
    )
}
export default FaceRecognition;