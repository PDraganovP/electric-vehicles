import React from 'react';

const Canvas = ({ canvasHeading, id, width, height }) => {
    return (
        <React.Fragment>
            <h1 className="text-center">{canvasHeading}</h1>
            <div className="text-center">
                <canvas id={id} width={width} height={height} style={{ border: '3px solid red' }}></canvas>
            </div>
        </React.Fragment>
    )
}

Canvas.defaultProps = {
    id: 'canvas',
    width: '500',
    height: '400'
}
export default Canvas