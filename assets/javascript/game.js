var arrayOfWords = ["POLICE", "EAGLES", "BEATLES", "JOURNEY", "STYX", "WHO", "SQUEEZE", "CLASH", "MONKEES", "AEROSMITH"];
var guessesRemaining = 10;
var wordStatus = [];
var gameStarted = false;
var wordToGuess = "";
var numberOfLettersRemaining;
var letterGuess;
var guessedLetters = [];
var wins = 0;
var losses = 0;

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {
    letterGuess = event.key;
    letterGuess = letterGuess.toUpperCase();  // convert user entered letter to upper case.
    if (gameStarted) {
        guessesRemaining--;   // Decrement the number of guesses remaining.

        // If the guessed letter has not been entered, then add it to the list of guesses.
        if (guessedLetters.indexOf(letterGuess) === -1) {
            guessedLetters.push(letterGuess);
        }
        for (var j = 0; j < wordToGuess.length; j++) {
            if (wordToGuess[j] === letterGuess) {
                wordStatus[j] = letterGuess;
                numberOfLettersRemaining = numberOfLettersRemaining - 1;
            }
        }
        $("#current-word").text(wordStatus.join("  "));
        $("#guesses-remaining").text(guessesRemaining);
        $("#guessed-letters").text(guessedLetters);


        // Check to see if user has won the game.  If so, increment number of wins, announce result and reset the game.
        if (numberOfLettersRemaining == 0) {
            $("#game-status").text("YOU WIN!  PRESS ANY KEY TO PLAY AGAIN..");
            wins++;
            $("#wins").text(wins);
            gameStarted = false;
            guessedLetters = [];
            wordStatus = [];
            wordtoGuess = "";
            guessesRemaining = 10;
        }

         // Check to see if user has lost the game.  If so, announce it and reset the game.
        if (guessesRemaining < 1) {
            $("#game-status").text("BETTER LUCK NEXT TIME!  PRESS ANY KEY TO PLAY AGAIN..");
            losses++;
            $("#losses").text(losses);
            gameStarted = false;
            guessedLetters = [];
            wordStatus = [];
            wordtoGuess = "";
            guessesRemaining = 10;
        }

    }
    else {   // start game
        $("#game-status").text("GAME ON!");

        // Randomly pick a word from the list of array of words.
        wordToGuess = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];

        // Create the sequence of underscores equal in length to the word to be guessed.
        for (var i = 0; i < wordToGuess.length; i++) {
            wordStatus[i] = "_";
        }

        // Set the game up by printing out the hidden word, the wins and losses, letters guessed and guesses remaining.
        $("#current-word").text(wordStatus.join("  "));
        numberOfLettersRemaining = wordToGuess.length;
        $("#wins").text(wins);
        $("#losses").text(losses);
        $("#guessed-letters").text(guessedLetters);
        $("#guesses-remaining").text(guessesRemaining);
        // Set gameStarted to true so that the section of code for the game execution is run.
        gameStarted = true;
    }
}
