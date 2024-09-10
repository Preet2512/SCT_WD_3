let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg");
let msg = document.querySelector("#message");
let turnMsg = document.querySelector("#turnMessage");
let turnX = true;

const winPatterns= [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnMsg.innerText = "Player X's turn";
};

boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
        if(turnX){
            box.innerText = "X";
            turnX = false;
            box.style.backgroundColor="#c0392b";
            box.style.color="#fff";
            turnMsg.innerText = "Player 0's turn";
        } else{
            box.innerText = "0";
            turnX = true;
            box.style.backgroundColor="#f39c12";
            box.style.color="#fff";
            turnMsg.innerText = "Player X's turn";
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText="";
        box.style.backgroundColor="#fff";
    }
};

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
    turnMsg.innerText = "";
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    turnMsg.innerText = "";
};

const checkWinner = () => {
    let isDraw = true;
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val) {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });
    if (isDraw) {
        showDraw();
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);