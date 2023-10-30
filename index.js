var gridLength = prompt("Welcome to the grid genarator, please insert a grid length. (max 50 cells!)");
var gridTotalCells = gridLength * gridLength;

//CREATE SECTION
$("section").prepend("<div></div>").addClass("grid-container");

//DEFINE DIMENSION
var gridCellWidth = Math.floor(700/gridLength);
var gridWidth = gridLength * gridCellWidth;

//SET DIMENSION
$(".grid-container").width(gridWidth);
$(".grid-container").height(gridWidth);

//
const gridTemplateColumns = 'repeat' + '(' + gridLength + ', ' + gridCellWidth + 'px)';
$(".grid-container").css("grid-template-columns", gridTemplateColums);
$(".grid-container").css("grid-template-rows", gridTemplateColumns);

for (let i=0; i<gridTotalCells; i++){
    var cell = new cellObj(i, i, i);
}

$(".grid-items").width(gridCellWidth);
$(".grid-items").height(gridCellWidth);

$("section div:last-child").remove();

function cellObj (cellIdValue, cellPosXValue, cellPosYValue) {
    this.cellId = cellIdValue;
    this.cellPosX =((cellPosXValue % gridlength) + 1);
    this.cellPosY = (Math.floor(( cellPosYValue / gridlength)+1));
    this.testInt = Math.floor( Math.random() * 100);
    $(".grid-container").append("<div></div>");
    $("div").eq(this.cellId).addClass("grid-item");

    if (this.testint> 20) {
        $(".grid-item").eq(this.cellId).css("opacity", 100);
    } else {
        $(".grid-item").eq(this.cellId).css("opacity", 0);
    }
}