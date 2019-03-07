// Set up required variables
var Word = require('./word.js')
var inquirer = require('inquirer'); 

// Array of possible words to guess
var words = ['rick and morty', 'the office', 'sherlock', 'breaking bad', 'mr. robot']; 

// Generate new words and establish initial stats
var correctWord = new Word(words[Math.floor(Math.random() * words.length)]); 
correctWord.stringWord();
var guessesRemaining = 10;
var guessesSoFar = [];

// Welcome message
console.log("\nWelcome to the TV Show Guess Game!");

// endGame function
function endGame(outcome) {

  // Win result
  if (outcome === 'win') {
    console.log("\nYou won!");
    console.log("You guessed " + correctWord.correctWord + " with " + guessesRemaining + " guesses remaining.\n");
  } else {

    // Lose result
    console.log("\nYou lost...");
    console.log("The correct word was: " + correctWord.correctWord + "\n");
  };

  // Generate new word and reset stats
  correctWord = new Word(words[Math.floor(Math.random() * words.length)]);
  correctWord.stringWord();
  guessesRemaining= 10;
  guessesSoFar = [];

  // Restart game prompt
  inquirer.prompt([
    {
      message: "Play again?",
      name: "confirm",
      type: "confirm",
    }
  ]).then(function(response) {
    if (response.confirm) {
      console.log("\nGenerating a new word...");
      main();
    } else {
      console.log("\nBye!\n");
      return; 
    };
  });
};

// Main game
function main() {
  inquirer.prompt([
    {
      name: "guess",
      prefix: '', 
      message: 
        "\nWord: " + correctWord.update() +
        "\n\nGuesses remaining: " + guessesRemaining +
        "\nIncorrect guesses so far: " + guessesSoFar.join(' ') + "\n" +
        "Guess a letter:"
    }
  ]).then(function (data) {
    
    // Validate user input
    if ((data.guess === "")) {
      console.log("\nERROR: You didn't enter a letter.");
      return main();
    } else if (data.guess.length > 1) {
      console.log("\nERROR: Please guess one letter at a time.");
      return main();
    } else if (guessesSoFar.includes(data.guess)) {
      console.log("\nERROR: You already guessed that! Choose another letter.");
      return main();
    };

    // Only decrement guessesRemaining on an incorrect guess
    if (!correctWord.correctWord.includes(data.guess)) {
      guessesRemaining--;
    }

    // push letters guessed
    guessesSoFar.push(data.guess);
    
    // checks the user's guess with the letters of the correct word??
    for (var i = 0; i < correctWord.letters.length; i++) {
      correctWord.letters[i].checkGuess(data.guess);
    };
    
    // if correct word update to lowercase is the same as WHAT?? then win
    if (correctWord.update() == correctWord.correctWord) {
      endGame('win');
      return;
    };

    // no more guesses == loss
    if (guessesRemaining == 0) {
      endGame('loss');
      return;
    };

    main();
  });
};

// Start the game upon start
main();