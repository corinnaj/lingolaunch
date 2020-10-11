import React, { useContext } from "react";
import { Dictionary } from "./Dictionary.js";
import { Typography } from "@material-ui/core";

export default function ProgressBar() {
    const {progress} = useContext(Dictionary)
    const words = progress() 

    const Filler = (props) => {
        return <div className="filler" style={{ width: `${props.percentage}%` }} />
    }

    return (
        <div>
            <Typography variant="body2" color="textSecondary">You learned {words[0]} of 500 words</Typography>
            <div className="progress-bar">
                <Filler percentage={(words[0]/words[1])*100} />
            </div> 
        </div>
    )
}
