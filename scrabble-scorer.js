// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync"); //user input

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some Scrabble! "); // ask user to play game by entering a word
  let word = input.question("Enter a word to score: ");
  return word;
};

//takes word as a function and return a score. Word is worth 1 point.
function simpleScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   
   for (let i = 0; i < word.length; i++) {
     score += 1;
   }
   
   return score;
 }

//takes word as a function and return a score. Word is worth 3 points.
function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   const vowels = ['A', 'E', 'I', 'O', 'U'];
   
   for (let i = 0; i < word.length; i++) {
     if (vowels.includes(word[i])) {
       score += 3;
     } else {
       score += 1;
     }
   }
   
   return score;
 }

 //function returns cumulative score for the whole word
 function scrabbleScorer(word) {
  word = word.toLowerCase();
  let score = 0;
  
  for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]];
  }
  
  return score;
}

//Array that contain names, descriptions, and scoring options:
const scoringAlgorithms = [
  {name: "Simple Score", description: "Each letter is worth 1 point.", scorerFunction: simpleScorer}, //Simple Score point option
  {name: "Bonus Vowels", description: "Vowels are 3 pts, consonants are 1 pt.", scorerFunction: vowelBonusScorer}, //Bonus Vowels option
  {name: "Scrabble", description: "The traditional scoring algorithm.", scorerFunction: scrabbleScorer} //Scrabble point option
];

//Ask user to select scoring option and output the options
function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?");
  console.log("0 - Simple: One point per character");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points");
  console.log("2 - Scrabble: Uses scrabble point system");

  let selection;
  while (true) {
    selection = input.question("Enter 0, 1, or 2: ");
    if (selection === "0" || selection === "1" || selection === "2") {
      break; // if user enter number more than 3, it will ask user again
    } else {
      console.log("Please choose the options given. Please enter 0, 1, or 2.");
    }
  }

  return scoringAlgorithms[selection];
}

 function transform(oldPointStructure) {
  let newPointStructure = {};
  
  for (let pointValue in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[pointValue].length; i++) {
      let letter = oldPointStructure[pointValue][i].toLowerCase();
      newPointStructure[letter] = Number(pointValue);
    }
  }
  
  return newPointStructure;
}


let newPointStructure = transform(oldPointStructure);

//Output the User's word selection and score
function runProgram() {
  let word = initialPrompt();
  let selectedScoringAlgorithm = scorerPrompt();
  console.log(`Score for '${word}': ${selectedScoringAlgorithm.scorerFunction(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
