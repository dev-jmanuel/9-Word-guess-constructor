// Letter.js: Contains a constructor, Letter.
function Letter(character) {

    // A string value to store the underlying character for the letter
    this.character = character;
    // A boolean value that stores whether that letter has been guessed yet
    this.isCorrect = false;

    // A function that takes a character as an argument and checks it against the underlying character, 
    // updating the stored boolean value to true if it was guessed correctly
    this.checkGuess = function(userGuess) {
        if (this.character === userGuess) {
            this.isCorrect = true;
        }
    };

    // A function that returns the underlying character if the letter has been guessed, 
    // or a placeholder (like an underscore) if the letter has not been guessed
    this.returnChar = function () {
        if ((this.character === ".") || (this.character === " ") || (this.isCorrect === true)) {
            return this.character;
        } else {
            return '_ ';
        }
    };
};

module.exports = Letter;