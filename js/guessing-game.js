/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber(){
    let numRand = Math.ceil(Math.random()*100)
    return numRand

}

function shuffle(arr){
    let unshuffled = arr;
    let shuffled =[];

    while(unshuffled.length>0){
    let elem = unshuffled.shift()
    let i = Math.ceil(Math.random()*(shuffled.length))
    
    if(i === shuffled.length){
        shuffled.push(elem)
    }else{
        let arrBefore= shuffled.slice(0, i)
        let arrAfter = shuffled.slice(i)
        shuffled = arrBefore.concat(elem).concat(arrAfter)
    }

    }
    return shuffled

}

class Game{
    constructor(){
        this.playersGuess= null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
        this.called = 0;
        this.hint =[]
    }

    difference(){
        return Math.abs(this.playersGuess - this.winningNumber)
    }

    isLower(){
        if(this.playersGuess< this.winningNumber){
            return true
        }
            return false 
        
    }

    
    playersGuessSubmission(num){
        this.called ++
        if(num<1|| num>100 ||num === NaN||num ==='not a number'){
            throw 'That is an invalid guess.'
        }else{
        this.playersGuess = num
        return this.checkGuess()
        }
        
    }

    checkGuess(){
        if(this.playersGuess === this.winningNumber){
            return "You Win!"
        }else if(this.called > 4){
            return `You Lose. The winning number is ${this.winningNumber}.`


        }else if(this.pastGuesses.includes(this.playersGuess)){
            return 'You have already guessed that number.'

        }else if(Math.abs(this.playersGuess- this.winningNumber)<10){
            this.pastGuesses.push(this.playersGuess)
            return "You\'re burning up!"
        }else if(Math.abs(this.playersGuess- this.winningNumber)<25){
            this.pastGuesses.push(this.playersGuess)
            return "You\'re lukewarm."
        }else if(Math.abs(this.playersGuess- this.winningNumber)<50){
            this.pastGuesses.push(this.playersGuess)
            return "You\'re a bit chilly."
        }else if(Math.abs(this.playersGuess- this.winningNumber)<100){
            this.pastGuesses.push(this.playersGuess)
            return "You\'re ice cold!"
        }
        
    }

   

    provideHint(){
        let hintArr = [generateWinningNumber(),generateWinningNumber(),this.winningNumber]
        return shuffle(hintArr)
    }

}

function newGame(){
    return new Game()

}

let game = newGame()

buttonSubmit = document.getElementById('submit')
buttonSubmit.addEventListener('click', function(){
    let text = Number(document.getElementById('text').value)
    let result = game.playersGuessSubmission(text)
    
    document.querySelector('H2').textContent = result
    if(game.pastGuesses.length<6){
        document.getElementById('text').value ='';
        document.getElementById('text').placeholder = `Guesses left: ${5-game.pastGuesses.length}`
    }

    //update guess history
    if(game.called===1){
        document.getElementById('first').textContent= text
    }else if(game.called ===2){
        document.getElementById('second').textContent = text
    }else if(game.called ===3){
        document.getElementById('third').textContent = text
    }else if(game.called ===4){
        document.getElementById('fourth').textContent = text
    }else if(game.called ===5){
        document.getElementById('fifth').textContent = text
    }

    
})


buttonHint = document.getElementById('hint')
buttonHint.addEventListener('click', function(){
    if(game.hint.length ===0){
        game.hint = game.provideHint()
        document.querySelector('H2').textContent = game.hint
    }
    
    document.getElementById('text').value =''
})

buttonReset = document.getElementById('reset')
buttonReset.addEventListener('click', function(){
    location.reload()
})