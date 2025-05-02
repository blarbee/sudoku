// var cell00 = document.getElementById("0-0");
// cell00.innerHTML = 2;
// console.log("hi");
// console.log(cell00.innerHTML);

const setTheme = theme => document.documentElement.className = theme;

let grid_solution 
let cells = null;
let difficulty = null;
let selected_cell = null;



window.onload = function(){setGame();}
window.setInterval(grid_is_full, 1000);

function setGame(){
    fetch("https://sudoku-api.vercel.app/api/dosuku")
    .then(response => {
        console.log(response.ok, response.status);
        return response.json();
    })
    .then(data => {

        // console.log(data.newboard.grids[0].value[0]);

        fill_up_the_starting_grid(data);

        grid_solution = data.newboard.grids[0].solution;



        document.getElementById("difficulty").innerHTML = data.newboard.grids[0].difficulty;

    })
    .catch(error => console.error(error));
    select_cell();
    write_number();

}


function fill_up_the_starting_grid(data){
    for( let i = 0; i < 9; i++){ // loop over the rows

        for( let j = 0; j < 9; j++){ // loop over the cols
            let empty_cell = document.getElementById(i + "-" + j);

            let og_value = data.newboard.grids[0].value[i][j];
            // console.log(og_value);

            if(og_value != 0){
                empty_cell.innerHTML = og_value;
                empty_cell.classList.add("starting_cell");
                console.log(empty_cell);
            }
        }
    }
}

function check_if_completed_grid_is_valid(){
    // let grid  = document.getElementById("grid");
    // console.log(grid);

    // for( let i = 0; i < 9; i++){ // loop over the rows

    //     for( let j = 0; j < 9; j++){ // loop over the cols
    //         let cell = document.getElementById(i + "-" + j);

    //         if(cell.innerHTML == grid_solution[i][j]){
    //             console.log("true " + cell.innerHTML, grid_solution[i][j]);
    //         }
    //     }
    // }
    if(grid_is_full){
        if(JSON.stringify(grid) === JSON.stringify(grid_solution)){
            alert("you win");
            window.clearInterval();
            return true;
        }else{
            return false;
        }
    }


}

function write_number(){
    let selected_number = document.getElementsByClassName('number_button');

    for(let i = 0; i < selected_number.length; i++) {
        selected_number[i].addEventListener("click", function() {

            if(selected_cell){
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


            if(cells[i].classList.contains("selected")){

                cells[i].classList.remove("selected");
                // console.log(cells[i].id + " is unselected");

            }else{
                // TODO: doesnt seem optimal to loop that much, do better soon
                for (let j = 0; j < cells.length; j++) {
                    cells[j].classList.remove("selected");
                    // console.log(selected_cell[j].id + " is deselected automatically");
                }

                cells[i].classList.add("selected");
                selected_cell = document.getElementById(cells[i].id);
                // console.log(cells[i].id + " is selected");

            }
            // TODO: Add highlight the row and col of the selected_cell (possibly also add highlight other occurences of said selected_cell's innerhtml in the row/col)
            // if(selected_cell){
            //     console.log("row: " + Math.floor(i/9)); //row of the selected cell
            //     console.log("col: " + i%9); //colomn the selected cell
            // }
        })
    }
}


function grid_is_full(){
    
    for(let i = 0; i<cells.length; i++){
        if(cells[i].innerHTML == ""){
            // console.log("the grid is not full");
            // console.log(cells[i].innerHTML);
            check_if_completed_grid_is_valid();
            return false;
        }
        // console.log(cells[i].innerHTML);      
    }
    // console.log("the grid is full");  
    return true;

}
