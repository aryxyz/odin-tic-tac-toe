


const gameboard = (function(gameboardContainer){
    let grid = ["","","","","","","","",""];
    const addMark = (index,mark)=>{
        if(grid[index] == ""){
            grid[index] = mark;
        }
        
    };

    const reset = ()=>{
        grid = ["","","","","","","","",""];
        display();
        
    };

    const checkWinner = (mark) => {
    
        let markIndex = [];
        let numGrid =[];
        for(let i = 0 ; i < grid.length ; i++){
            
            if(grid[i] == mark){
                markIndex.push(`${i}`)
                numGrid.push(i);

            }else if(grid[i] != ""){
                numGrid.push(i);
            }
        }

      
     
       
        
        if((markIndex.includes("0") && markIndex.includes("1") && markIndex.includes("2")) ||
        (markIndex.includes("3") && markIndex.includes("4") && markIndex.includes("5")) ||
        (markIndex.includes("6")&& markIndex.includes("7") && markIndex.includes("8")) ){
            return "win";
        }else if((markIndex.includes("0") && markIndex.includes("3") && markIndex.includes("6")) ||
        (markIndex.includes("1") && markIndex.includes("4") && markIndex.includes("7")) ||
        (markIndex.includes("2") && markIndex.includes("5") && markIndex.includes("8")) ){
            return "win";
        }else if((markIndex.includes("0") && markIndex.includes("4") && markIndex.includes("8")) ||
        (markIndex.includes("2") && markIndex.includes("4") && markIndex.includes("6")) ){
            return "win";
        }else if([1,2,3,4,5,6,7,8].every(item => numGrid.includes(item))){
            return "tie";
        }


    }
    const display = () =>{
    
        let board ="";
    
    
        for(let i = 0 ; i < grid.length ; i++){
            board += ` <div class="grid" data-number=${i}><div class="mark ${grid[i] == "x" ? "mark-x" : "mark-o"}
            ">${grid[i]}</div></div>`;
        }
       
        gameboardContainer.innerHTML = board;
    };

    return {addMark,reset,checkWinner,display};



    

})(document.querySelector(".gameboard-container"));

function player(name,mark){
  

    const getName = () => name;
  
    const getMark = () => mark;




    return {getName  , getMark };


}


function control(gameboard,player1,player2){
    let turn = player1;

    const changeTurn =function(){
        turn = turn == player1 ? player2 : player1;
    };

    const action = function(index){
        gameboard.addMark(index,turn.getMark());
        if(gameboard.checkWinner(turn.getMark()) == "win"){
        
         
            gameboard.display();
            return turn;
        }else if(gameboard.checkWinner(turn.getMark()) == "tie"){
            gameboard.display();
            return "tie";

        }
        gameboard.display();

        

        changeTurn();

    };

    return {action};
    

};




playerO = player("arian","o");
playerX = player("amin","x");
const rootStyle = getComputedStyle(document.documentElement);
let controlFlow = {};
document.querySelector(".btn-start").addEventListener('click',(e)=>{
    const playerXName  = document.querySelector("#player-x-name");
    const playerOName = document.querySelector("#player-o-name");
    if(playerOName.value && playerXName.value){
        playerO = player(playerOName.value,"o");
        playerX = player(playerXName.value,"x");
        controlFlow = control(gameboard,playerX,playerO);
        document.querySelector(".empty-error").textContent = ""
        document.querySelector(".gameboard-container").style.visibility = "visible";
        document.querySelectorAll(".player-input").forEach(input =>{input.setAttribute("disabled","")})
        document.querySelector(".btn-start").style.display = "none";
        document.querySelector(".btn-restart").style.width = "100%";
    }else{
        
        document.querySelector(".empty-error").textContent = "Please Enter Names"
    }
});


document.querySelector(".btn-restart").addEventListener('click',()=>{
    document.querySelector(".btn-start").style.display = "block";
    document.querySelector(".btn-restart").style.width = "50%";
    

    document.querySelectorAll(".player-input").forEach(input =>{input.removeAttribute("disabled");
        input.value = "";
        
    });
    document.querySelector(".gameboard-container").style.visibility = "hidden";
    document.querySelector("#winner-name").textContent = "";
    document.querySelector("#turn-light").style.backgroundColor = rootStyle.getPropertyValue("--x-color");
    gameboard.reset();



});


gameboard.display();


document.querySelector(".gameboard-container").addEventListener('click',(e)=>{
    const winner = controlFlow.action(e.target.dataset.number);
    if(typeof winner == "object" && winner !=null  ){
        document.querySelector("#winner-name").textContent = winner.getName();
        document.querySelector("#winner-name").style.color = winner.getMark() == "x" ? rootStyle.getPropertyValue("--x-color"): rootStyle.getPropertyValue("--o-color"); 
        

    }else if(winner == "tie"){

        document.querySelector("#winner-name").textContent = "Tie";
        document.querySelector("#winner-name").style.color = "gray"; 

    }else{
        console.log(document.querySelector("#turn-light").style.backgroundColor);
        console.log(rootStyle.getPropertyValue("--o-color"));
        document.querySelector("#turn-light").style.backgroundColor =   document.querySelector("#turn-light").style.backgroundColor==rootStyle.getPropertyValue("--o-color") ? rootStyle.getPropertyValue("--x-color"): rootStyle.getPropertyValue("--o-color"); 
    }
});




















