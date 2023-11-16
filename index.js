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

var timerValue = 0;
var gridLength = 2;
var gridTotalCells = gridLength * gridLength;
var windowWidth = ($(window).width()/2);
console.log("window width " + windowWidth);
 
//CREATE SECTION
$("section").prepend("<div></div>").addClass("grid-container");
 
//DEFINE DIMENSION
//needs change
//check if bigger heigth or width window
var gridCellWidth = Math.floor( windowWidth / gridLength );
console.log("cell width " + gridCellWidth);
var gridWidth = gridLength * gridCellWidth;
console.log("grid-container width " + gridWidth);
 
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
setInterval(function(){updateScore()}, 500);
 
 
//UPDATE SCORE
function updateScore() {
    let scoreValue = 0;
    $(".grid-container").children().each(function (i) {
        if ($(this).hasClass("grid-item-active")) {
            scoreValue += 1;
        }
    });
    if (scoreValue === gridTotalCells) {
        $(".grid-container").empty();
        setTimeout(function(){
            alert("YOU HAVE WON!");
            gridLength +=1;
            gridTotalCells = gridLength * gridLength;
            console.log(gridTotalCells);
            gridCellWidth = Math.floor( windowWidth / gridLength );
            console.log("cell width " + gridCellWidth);
            gridWidth = gridLength * gridCellWidth;
            console.log("grid-container width " + gridWidth);
 
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

        
            //EVENT LISTENER
            $(".grid-item").on("click", function() {
                $(this).toggleClass("grid-item-active");
                timerValue += 10;
            });

        },50);
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
    setInterval(function(){ self.updateTestInt();}, ((Math.random()*600)+600+timerValue));
}
