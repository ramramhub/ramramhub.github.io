// Movie Sentiment Analysisss
// Ramit Kapoor
// June 17th, 2020

// Extra for Experts:
// - added code to determine most positive/negative words in a given phrase
// - almost completely foolproof

//defines display and data variables
let reviewData; 
let wordScores;
let phraseInput, analyseButton;
let result;

//preloads all reviews from data file
function preload() {
  reviewData = loadStrings("assets/movieReviews.txt");
}

//displays web content, input bar, and analysis button
function setup() {
  //phrase input set-up
  phraseInput = createInput("");
  phraseInput.attribute("placeholder", "Enter a phrase to be analyzed...");
  phraseInput.parent("phrase");

  //analysis button set-up - when button is pressed, the inputted phrase will be assigned an average sentiment score based on what words were used
  analyseButton = createButton("Analyse Now");
  analyseButton.attribute("type", "button");
  analyseButton.parent("phrase");
  analyseButton.mousePressed(runAnalysis);

  //creates result text paragraph
  result = createP();
  result.parent("container");

  //creates most postive/negative stats paragraph
  otherStats = createP();
  otherStats.parent("container");

  //sets-up map with word/score pairs
  wordScores = new Map();

  learnWordScores();
}

//draw-loop - no code is needed here since the analysis only runs when button is pressed in setup()
function draw() {

}

//runs through each word in reviewData and assigns them a sentiment score that is averaged out based on all its occurences
function learnWordScores() {
  for (let i = 0; i < reviewData.length; i++) {
    let reviewWords = reviewData[i].split(" ");
    let reviewScore = float(reviewWords[0]);

    reviewWords.splice(0, 1);

    //if the current word isn't already in the wordScores map, it will be added with details of its scores and average score
    for (let j = 0; j < reviewWords.length; j++) {
      if (!wordScores.has(reviewWords[j])) {
        let scoreList = [reviewScore];

        let newWordInfo = {
          scores: scoreList,
          averageScore: reviewScore,
        }

        wordScores.set(reviewWords[j], newWordInfo);
      }

      //if current word is already in the wordScores map, it's average score will be updated based on the current review's score
      else {
        let currentWordInfo = wordScores.get(reviewWords[j]);

        currentWordInfo.scores.push(reviewScore);
        currentWordInfo.averageScore = (currentWordInfo.averageScore * (currentWordInfo.scores.length - 1) + reviewScore) / currentWordInfo.scores.length;

        wordScores.set(reviewWords[j], currentWordInfo);
      }
    }
  }
}

//runs when the "analyse now" button is pressed - iterates through phrase words and assigns an average score for the phrase
function runAnalysis() {
  let wordsToLookup = phraseInput.value().split(" ");
  let totalSentiment = 0;
  let averageSentiment = 0;

  //new map is created to store words from the inputted phrase 
  let phraseWordScores = new Map();


  //iterates through inputted phrase, calculates total sentiment, and averages it out based on number of words in phrase
  for (let i = 0; i < wordsToLookup.length; i++) {
    if (wordScores.has(wordsToLookup[i])) {
      totalSentiment += wordScores.get(wordsToLookup[i]).averageScore;
      phraseWordScores.set(wordsToLookup[i], wordScores.get(wordsToLookup[i]).averageScore);
    }

    //if a phrase word isn't in the wordScores map, it will be assigned a neutral value of 2
    else {
      totalSentiment += 2;
      phraseWordScores.set(wordsToLookup[i], 2);
    }

    averageSentiment = totalSentiment / wordsToLookup.length;
  }

  //defines max/min values to determine the most positive and negative words in a phrase
  let maxValue = null;
  let maxKey = null;
  let minKey = null;
  let minValue = null;

  //for of loops that runs through all key/value pairs from the words that were inputted
  for (let [key, value] of phraseWordScores) {
    if (maxValue === null || value > maxValue) {
      maxValue = value;
      maxKey = key;
    }

    if (minValue === null || value < minValue) {
      minValue = value;
      minKey = key;
    }
  }

  displayResults(averageSentiment, minKey, minValue, maxKey, maxValue, phraseWordScores);
}

//displays average phrase sentiment score and most positive/negative words
function displayResults(averageSentiment, minKey, minValue, maxKey, maxValue, phraseWordScores) {
  
  //determines if a phrase is positive or negative depending on if it's score is higher or lower than 2
  if (averageSentiment > 2) {
    result.style("color", "green");
    result.html("Positive Statement<br>An average sentiment of " + averageSentiment);
  }
  else {
    result.style("color", "red");
    result.html("Negative Statement<br>An average sentiment of " + averageSentiment);
  }

  otherStats.style("color", "orange")

  //if minValue = maxValue, then all words have the same sentiment, else the paragraph will display the most positive/negative words
  if (minValue === maxValue) {
    otherStats.html("All your words have the same sentiment value!")
  }

  else if (phraseWordScores.size > 1) {
    otherStats.html("Your most positive word is ''" + maxKey + "'' and your most negative word is ''" + minKey + "''");
  }
}
