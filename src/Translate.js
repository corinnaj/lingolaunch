import React, { useRef } from 'react';
import Camera from 'react-camera';

export function Translate() {
    const camera = useRef();

    function takePicture() {
        camera.current.capture()
            .then(blob => {
                //image.src = URL.createObjectURL(blob);
                //image.onload = () => { URL.revokeObjectURL(this.src); }
            })
    }

    return (<div>
        <Camera ref={camera} >
            <div onClick={takePicture}>
                camera
                <div />
            </div>
        </Camera>
    </div>);
}