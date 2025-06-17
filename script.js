let clickSound=new Audio("./assets/clickSound.wav")
let OverSound=new Audio("./assets/OverSound.mp3")
let winSound=new Audio("./assets/winSound.mp3")
let gameOver=false
let turn='X'
const changeTurn=()=>{
    return turn=='X'?'O':'X'
}
let checkWin=()=>{
        let boxText=document.getElementsByClassName("boxText");
        let someoneWon=false
        let wins=
        [
            [0,1,2,0,5,0],
            [3,4,5,0,15,0],
            [6,7,8,0,25,0],
            [0,3,6,-10,15,90],
            [1,4,7,0,15,90],
            [2,5,8,10,15,90],
            [0,4,8,0,15,45],
            [2,4,6,0,15,135],
        ]
        wins.forEach(e=>{
              if((boxText[e[0]].innerText===boxText[e[1]].innerText) && (boxText[e[1]].innerText===boxText[e[2]].innerText) && (boxText[e[0]].innerText!=="")){
                document.querySelector('.info').innerHTML = `<span style="font-size:30px;"> ${boxText[e[0]].innerText} </span> won`;
                gameOver=true;
                winSound.play()
                document.querySelector('.image img').style.width="200px"
                document.querySelector(".line").style.width="30vw"
                document.querySelector(".line").style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
                someoneWon=true
        }
        })
        if (!someoneWon && Array.from(boxText).every(ele=> ele.innerText !== "")) {
            document.querySelector('.info').innerText = "It's a Draw!";
            OverSound.play();
            gameOver = true;
        }
}

let boxes=document.getElementsByClassName("box")
Array.from(boxes).forEach(element=>{
   let boxText=element.querySelector(".boxText")
   element.addEventListener('click',()=>{
     if(boxText.innerText==="" && !gameOver){
        boxText.innerText=turn
        clickSound.currentTime = 0;
        clickSound.play()
        checkWin()
        if(!gameOver){
          turn=changeTurn()
          document.querySelector('.info').innerHTML = `Turn for <span style="font-size:30px;">${turn}</span>`;
        }
    }
   })      
})
function resetGame(){
    let boxtexts=document.querySelectorAll('.boxText')
    boxtexts.forEach(element=>{
         element.innerText=""
    })
    gameOver=false
    turn='X'
   document.querySelector('.info').innerHTML = `Turn for <span style="font-size:30px;">${turn}</span>`;
    document.querySelector(".line").style.width="0vw"
    document.querySelector('.image img').style.width="0"
}   
document.getElementById("reset").addEventListener('click',()=>{
   resetGame()
})