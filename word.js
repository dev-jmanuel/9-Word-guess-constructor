// Word.js: Contains a constructor, Word that depends on the Letter constructor. 
// This is used to create an object representing the current word the user is attempting to guess. 
const Letter = require('./letter.js');

function Word(correctWord) {
    
    // An array of new Letter objects representing the letters of the underlying word
    this.correctWord = correctWord;
    this.letters = [];
    
    // A function that converts the word into a string.
    this.stringWord = function () {
        var correctWordArray = this.correctWord.split('');
        for (var i=0; i < correctWordArray.length; i++) {
          var newLetter = new Letter(correctWordArray[i]);
          this.letters.push(newLetter);
        };
    };
    
    // This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
    this.update = function() {
        var string = ''
        for (var k=0; k < this.letters.length; k++) {
          string += this.letters[k].returnChar();
        };
        return string;
    };

    // A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)
    this.makeGuess = function(guess) {
        for (var j=0; j < this.letters.length; j++) {
          this.letters[j].checkGuess(guess);
        };
    };

}

module.exports = Word;