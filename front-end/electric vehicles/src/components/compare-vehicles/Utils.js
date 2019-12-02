const drawDiagram = (canvasId, leftSelectId, rightSelectId) => {
    let canvas = document.getElementById(canvasId);

    let leftSelectValue = document.getElementById(leftSelectId).value;
    let rightSelectValue = document.getElementById(rightSelectId).value;
    let sum = +leftSelectValue + +rightSelectValue;
    let leftSelectValuePercent = +leftSelectValue / +sum;
    let rightSelectValuePercent = +rightSelectValue / +sum;
    let maxHeight = 300;
    let leftColumnHeight = +maxHeight * +leftSelectValuePercent;
    let rightColumnHeight = +maxHeight * +rightSelectValuePercent;

    let clearCanvas = canvas.getContext("2d");
    clearCanvas.fillStyle = 'white';
    clearCanvas.fillRect(0, 0, 500, 400);

    let ctxLeftColumn = canvas.getContext("2d");
    ctxLeftColumn.fillStyle = "#c6f212";
    ctxLeftColumn.fillRect(80, (+400 - +leftColumnHeight), 130, leftColumnHeight);
    ctxLeftColumn.stroke();

    let ctxRightColumn = canvas.getContext("2d");
    ctxRightColumn.fillStyle = "#2449fc";
    ctxRightColumn.fillRect(290, (+400 - +rightColumnHeight), 130, rightColumnHeight);
    ctxRightColumn.stroke();
}

export { drawDiagram }