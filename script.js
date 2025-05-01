// var cell00 = document.getElementById("0-0");
// cell00.innerHTML = 2;
// console.log("hi");
// console.log(cell00.innerHTML);

var num_selected = null;
var cell_selected = null;

window.onload = function(){setGame();}

function setGame(){
    fetch("https://sudoku-api.vercel.app/api/dosuku")
    .then(response => {
        console.log(response.ok, response.status);
        return response.json();
    })
    .then(data => {

        // console.log(data.newboard.grids[0].value[0]);

        for( let i = 0; i < 9; i++){ // loop over the rows

            for( let j = 0; j < 9; j++){ // loop over the cols
                let empty_cell = document.getElementById(i + "-" + j);

                let og_value = data.newboard.grids[0].value[i][j];
                // console.log(og_value);

                if(og_value != 0){
                    empty_cell.innerHTML = og_value;
                }
                
            

            }
        }
    })
    .catch(error => console.error(error));
}


function selectedNumber(){
    num_selected = this;
    num_selected.classList.add("num_selected");
    console.log(num_selected.classList.add("num_selected"));
}
