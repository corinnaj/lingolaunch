import React, { useContext } from "react";
import { Dictionary } from "./Dictionary.js";

export default function ProgressBar() {
    const {progress} = useContext(Dictionary)
    const words = progress() 

    const Filler = (props) => {
        return <div className="filler" style={{ width: `${props.percentage}%` }} />
    }

    return (
        <div className="progress-bar">
          <Filler percentage={(words[0]/words[1])*100} />
        </div> 
    )
}
