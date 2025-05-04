// var cell00 = document.getElementById("0-0");
// cell00.innerHTML = 2;
// console.log("hi");
// console.log(cell00.innerHTML);

const setTheme = theme => document.documentElement.className = theme;

let grid_solution;
let cells = null;
let difficulty = null;
let selected_cell = null;

let insertions = null;

let eraser = document.getElementById("eraser");
let pencil = document.getElementById("pencil");


window.onload = function(){setGame();}
window.setInterval(grid_is_full, 1000);

function setGame(){
    retrieve_medium_grid();
    select_cell();
    write_number();
}

function fill_up_the_starting_grid(data){
    for( let i = 0; i < 9; i++){ // loop over the rows

        for( let j = 0; j < 9; j++){ // loop over the cols
            let empty_cell = document.getElementById(i + "-" + j);

            let og_value = data.value[i][j];
            // console.log(og_value);
            if(og_value != 0){
                empty_cell.innerHTML = og_value;
                empty_cell.classList.add("starting_cell");
 
                // console.log(empty_cell);
            }
        }
    }
}

function check_if_completed_grid_is_valid(){
    for( let i = 0; i < 9; i++){ // loop over the rows
        for( let j = 0; j < 9; j++){ // loop over the cols
            let cell = document.getElementById(i + "-" + j);

            if(cell.innerHTML != grid_solution[i][j]){
                console.log("false " + cell.innerHTML, grid_solution[i][j]);
                document.getElementById("throbber").innerHTML = "you're done and wrong"
                return false;
            }
        }
    }
    document.getElementById("throbber").innerHTML = "congraats you completed itt! :D"
    window.clearInterval();
    return true;

    // console.log(cells);
    // console.log(grid_solution);
   
    // if(JSON.stringify(cells) === JSON.stringify(grid_solution)){
    //     alert("you win");
    //     window.clearInterval();
    //     return true;
    // }else{
    //     document.getElementById("throbber").innerHTML = "you're done and wrong i fear"
    //     return false;
    // }
}

function write_number(){
    let selected_number = document.getElementsByClassName('number_button');

    for(let i = 0; i < selected_number.length; i++) {
        selected_number[i].addEventListener("click", function() {

            if(selected_cell && !selected_cell.classList.contains("starting_cell")){
                selected_cell.innerHTML = selected_number[i].id;
                // console.log(selected_number[i].id);
                // console.log(selected_cell);
            }
        })
    }
}

function select_cell(){
    cells = document.getElementsByClassName('cell');


    for(let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function() {
     
            for (let j = 0; j < cells.length; j++) { // uncelect everything
                cells[j].classList.remove("selected");
                cells[j].classList.remove("selectedRowCol");
            }
        
            if(!cells[i].classList.contains("selected")){ // if when clicked unselected, select it

                cells[i].classList.add("selected");
                console.log(cells[i].id + " is selected");
                selected_cell = document.getElementById(cells[i].id);

                for (let j = 0; j < 9; j++) {
                    let row = Math.floor(i/9);
                    let col = i%9;
                    // console.log("row: " + Math.floor(i/9)); //row of the selected cell
                    // console.log("col: " + i%9); //colomn of the selected cell
                    document.getElementById(row + "-" + j).classList.add("selectedRowCol");
                    document.getElementById(j + "-" + col).classList.add("selectedRowCol");
                }
                console.log(cells[i].classList);
            }


        });
    }
}

function grid_is_full(){
    
    for(let i = 0; i<cells.length; i++){
        if(cells[i].innerHTML == ""){
            // console.log("the grid is not full");
            // console.log(cells[i].innerHTML);
            return false;
        }   
    }
    // console.log("the grid is full");  
    check_if_completed_grid_is_valid();
    return true;

}
// Dosuku API doesnt support queries
function retrieve_easy_grid(){
    if(cells)clear_grid();

    fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:5){grids{value,solution,difficulty},results,message}}")
    .then(response => {
        console.log(response.ok, response.status);
        return response.json();
    })
    .then(data => {
        // console.log(data.newboard.grids[0].value[0]);
        const easyPuzzle = data.newboard.grids.find(grid => grid.difficulty === "Easy");
        // console.log(easyPuzzle);
            
       
        if(easyPuzzle){
            console.log("here it is!");
            document.getElementById("throbber").innerHTML = "";
            document.getElementById("difficulty").innerHTML = easyPuzzle.difficulty;
            grid_solution = easyPuzzle.solution;
            fill_up_the_starting_grid(easyPuzzle);
        }else{
            console.log("Couldn't find an easy grid, imma try again chief...");
            document.getElementById("throbber").innerHTML = "Searching for an easy grid...";
            retrieve_easy_grid();
        }
        // console.log(easyPuzzle.difficulty);
    })
    .catch(error => console.error(error));
}

function retrieve_medium_grid(){
    if(cells)clear_grid();

    fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:5){grids{value,solution,difficulty},results,message}}")
    .then(response => {
        console.log(response.ok, response.status);
        return response.json();
    })
    .then(data => {
        // console.log(data.newboard.grids[0].value[0]);
        const mediumPuzzle = data.newboard.grids.find(grid => grid.difficulty === "Medium");
        // console.log(mediumPuzzle);
            
       
        if(mediumPuzzle){
            console.log("here it is!");
            document.getElementById("throbber").innerHTML = "";
            document.getElementById("difficulty").innerHTML = mediumPuzzle.difficulty;
            grid_solution = mediumPuzzle.solution;
            fill_up_the_starting_grid(mediumPuzzle);
        }else{
            console.log("Couldn't find a medium grid, imma try again chief...");
            document.getElementById("throbber").innerHTML = "Searching for a medium grid...";
            retrieve_easy_grid();
        }
        // console.log(mediumPuzzle.difficulty);
    })
    .catch(error => console.error(error));
}

function retrieve_hard_grid(){
    if(cells)clear_grid();

    fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:5){grids{value,solution,difficulty},results,message}}")
    .then(response => {
        console.log(response.ok, response.status);
        return response.json();
    })
    .then(data => {
        // console.log(data.newboard.grids[0].value[0]);
        const hardPuzzle = data.newboard.grids.find(grid => grid.difficulty === "Hard");
        // console.log(hardPuzzle);
            
       
        if(hardPuzzle){
            console.log("here it is!");
            document.getElementById("throbber").innerHTML = "";
            document.getElementById("difficulty").innerHTML = hardPuzzle.difficulty;
            grid_solution = hardPuzzle.solution;
            fill_up_the_starting_grid(hardPuzzle);
        }else{
            console.log("Couldn't find a hard grid, imma try again chief...");
            document.getElementById("throbber").innerHTML = "Searching for a hard grid...";
            retrieve_hard_grid();
        }
        // console.log(hardPuzzle.difficulty);
    })
    .catch(error => {
        console.log(error);
        if(error){
            document.getElementById("throbber").innerHTML = "Sorryyyyy, there was an error ask for it again";

        }
    });
}

function clear_grid(){
    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = "";
        cells[i].classList.remove("starting_cell");
    }
}

function erase_number(){
    // console.log(eraser);

    // if(eraser.classList.contains("selected")){
    //     eraser.classList.remove("selected");
    // }else{
    //     eraser.classList.add("selected");
    // }
    if(selected_cell){
        if(!selected_cell.classList.contains("starting_cell")){
            selected_cell.innerHTML = "";
        }
    }
}

// TODO: implement note taking functionnality
function note_taking(){
    console.log(pencil);

    if(pencil.classList.contains("selected")){
        pencil.classList.remove("selected");
    }else{
        pencil.classList.add("selected");
    }

}

// TODO: implement trivia/pokemon quiz every 9 insertions or every 2min (might get frustrating and not fun so idk ill think about it)