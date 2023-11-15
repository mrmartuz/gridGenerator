//project GRID GAME
//animation title level n play audio little melody
//set grid length 
//set % of activeCell
//at ready.dom create navBar and gridBackground
//START - LVL 0
//3X3 GRID WITH 70%-80% CELLS TO PRESS
//TIMER START AT FIRST PRESS IF TIMER ENDS GAME OVER
//AT PRESS PLAY RANDOM AUDIO
//add audio to arrayPlay
//AT COMPLETE CELLS PRESSED
//PLAY MUSIC AT END
//play arrayPlay
//ADD NEW CELLS - NEW LEVEL
//INFINITE LEVEL

var gridLength = prompt("Welcome to the grid genarator, please insert a grid length. (max 50 cells!)");
var gridTotalCells = gridLength * gridLength;
 
//CREATE SECTION
$("section").prepend("<div></div>").addClass("grid-container");
 
//DEFINE DIMENSION
var gridCellWidth = Math.floor( 700 / gridLength );
var gridWidth = gridLength * gridCellWidth;
 
//SET DIMENSION
$(".grid-container").width(gridWidth);
$(".grid-container").height(gridWidth);
 
//GRID TEMPLATE
const gridTemplateColumns = 'repeat' + '(' + gridLength + ', ' + gridCellWidth + 'px)';
$(".grid-container").css("grid-template-columns", gridTemplateColumns);
$(".grid-container").css("grid-template-rows", gridTemplateColumns);
 
//FORLOOP CREATING GRID
var cell = [];
for (let i=0; i<gridTotalCells; i++){
    cell.push( new cellObj(i, i, i));
}
 
$(".grid-item").width(gridCellWidth);
$(".grid-item").height(gridCellWidth);
 
$("section div:last-child").remove();
 
//EVENT LISTENER
$(".grid-item").on("click", function() {
    $(this).toggleClass("grid-item-active");
});
 
//INTERVALLO UPDATE TESTINT
setInterval(function(){updateScore()}, (Math.random()*300));
 
 
//UPDATE SCORE
function updateScore() {
    let scoreValue = 0;
    $(".grid-container").children().each(function (i) {
        if ($(this).hasClass("grid-item-active")) {
            scoreValue += 1;
        }
    });
    if (scoreValue === gridTotalCells) {
        alert("YOU HAVE WON!");
    }
}
 
 
//CELL OBJECT
function cellObj (cellIdValue, cellPosXValue, cellPosYValue) {
    this.cellId = cellIdValue;
    this.cellPosX =((cellPosXValue % gridLength) + 1);
    this.cellPosY = (Math.floor(( cellPosYValue / gridLength)+1));
    this.testInt = Math.random();
    $(".grid-container").append("<div></div>");
    $("div").eq(this.cellId).addClass("grid-item");
 
 
    $(".grid-item").eq(this.cellId).css("opacity", this.testInt);
 
    const self = this;
 
    self.updateTestInt = function(){
        self.testInt += (Math.random()*0.1);
        if (self.testInt > 1){
            self.testInt = 0;
            if ($(".grid-item").eq(this.cellId).hasClass("grid-item-active")===true) {
                $(".grid-item").eq(this.cellId).removeClass("grid-item-active");
                console.log("removedClass");
            }
            $(".grid-item").eq(self.cellId).css("opacity", this.testInt);
        } else {
            $(".grid-item").eq(self.cellId).css("opacity", this.testInt);
        }
    }
 
    //INTERVALLO UPDATE TESTINT
    setInterval(function(){ self.updateTestInt();}, (Math.random()*600));
}