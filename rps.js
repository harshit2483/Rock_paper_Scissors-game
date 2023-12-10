let userMove='';
let computerMove='';
let result='';
let id=1;
let game =JSON.parse(localStorage.getItem('game')) || {
    wins:0,
    looses:0,
    ties:0
};
let gameHistory=JSON.parse(localStorage.getItem('gameHistory')) || [];
renderGameHistory();
renderGameSummary();



function capture_usermove(move){
    userMove=move;
}

function resetScore(){
    console.log('hi');
    game={
        wins:0,
        looses:0,
        ties:0
    };
    gameHistory=[];
    renderGameHistory();
    renderGameSummary();

}

function renderGameHistory(){

    let finalgame=
    `
    <tr>
        <th>#</th>
        <th>User Move</th>
        <th>Computer Move</th>
        <th>Result</th>
    
    </tr>`;
    for(let i=0;i<gameHistory.length;i++)
    {
        finalgame+=
        `
        <tr>
            <td>${i+1}</td>
            <td>${gameHistory[i].userMove}</td>
            <td>${gameHistory[i].computerMove}</td>
            <td>${gameHistory[i].result}</td>
        
        </tr>`;

    }

    const html=document.getElementById('history');
    html.innerHTML=finalgame;
    
}
function renderGameSummary(){
    console.log(`usermove: ${userMove} ComputerMove: ${computerMove}` );
    console.log(result);
    console.log(game);
    const gamesPlayed=game.looses+game.wins+game.ties;
    console.log(`Games Played: ${gamesPlayed}`);
    document.getElementById('wins').innerHTML=game.wins;
    document.getElementById('looses').innerHTML=game.looses;
    document.getElementById('ties').innerHTML=game.ties;
    
    document.getElementById('GamesPlayed').innerHTML=gamesPlayed;
    

}
function generate_Computer_Move(){
    const randNum=Math.random();
    if(randNum<1/3){
        computerMove='rock';
    }
    else if(randNum<2/3){
        computerMove='paper';
    }
    else{
        computerMove='scissors';
    }
    // update_history();
    // id=id+1;

}

function evaluateMoves(){
    if(userMove===computerMove){
        result='Tie';
    }
    else if( (userMove==='rock' && computerMove==='scissors' ) || (userMove==='paper' && computerMove==='rock' ) || (userMove==='scissors' && computerMove==='paper' )
    )
    {
        result='Win';
    }
    else {
        result='Loose';
    }
}

function updateGameScore(){
    if(result==='Win'){
        game.wins++;
    }
    else if(result==='Tie'){
        game.ties++;
    }
    else{
        game.looses++;
    }
    

    const gameHistoryitem={userMove: userMove,computerMove : computerMove, result :result};

    gameHistory.push(gameHistoryitem);

    localStorage.setItem('game',JSON.stringify(game));
    localStorage.setItem('gameHistory',JSON.stringify(gameHistory));
}


