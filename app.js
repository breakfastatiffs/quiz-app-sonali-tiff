'use strict';

function main() {
  handleStartButtonSubmit();
  registerAnswerSubmission();
  moveToNextQuestion();
  restartQuiz();
  render();
}
// Data

const store = {
  quizTemplate: [
    {
      question: "What stage in life does one have the strongest ability to taste sweet foods?",
      answers: ['Infancy', 'Puberty', 'Adulthood'],
      // update correct answer from string to number value, then compare index answer picked to correct answer value
      correctAnswer: 0,
      image: [`images/cake.png`, `A watercolor drawing of a piece of cake`]
    },
    {
      question: "Sour taste acts as a protective/warning system...",
      answers: ['To allow us to detect proton level of acids', 'To makes us scrunch up our face', 'To help us create saliva in our mouth'],
      correctAnswer: 0,
      image: [`images/grapefruit.png`, `A water color drawing of a sliced grapefruit`]
    },
    {
      question: "The ___ of our tongue is sensitive to bitter tastes so we can spit out poisonous or spoiled foods before we swallow them.",
      answers: ['Underside', 'Front', 'Back'],
      correctAnswer: 2,
      image: [`images/wine.png`, `A watercolor drawing of a wine bottle, a wine glass, an a bunch of grapes`]
    },
    {
      question: "What is the Japanese coined term for the 5th basic taste meaning ‘savory’?",
      answers: ['Unagi', 'Umami', 'Sarriette'],
      correctAnswer: 1,
      image: [`images/sushi.png`, `A watercolor drawing of a piece of shrimp sushi`]
    },
    {
      question: "Which substance do we need in order to function correctly?",
      answers: ['Sugar', 'Salt', 'Thyme'],
      correctAnswer: 1,
      image: [`images/popcorn.png`, `A watercolor drawing of a box of popcorn`]
    }
  ],
  quizStarted: false,
  submitedAnswer: '',
  userAnsweredRight: false,
  questionNumber: 0, //ea click = questionNumber++
  score: 0
};



// These functions return HTML templates

function generateStartPage() {

return `<h1> The Five Basic Tastes</h2>
  <main class="flexgroup"> =----6yt
    <p>Quiz yourself on how well you know your five basic tastes!</p>
    <figure>
    <img src="images/flavor-wheel.jpg" alt="Wheel of taste buds">
    </figure>
    <div>
      <button id="startButton">Start Button!</button>
   </div>
  </main>`;

}


function generateImageSrc(){
  let imageSrc = ""; 
  let imageTemplate = store.quizTemplate;
  for (let i = 0; i <imageTemplate.length; i++){
    if ((store.questionNumber - 1) === i){
      imageSrc = imageTemplate[i].image[0];
    }
  }
  return imageSrc;
}

function generateImageAlt(){
  let imageAlt = "";
  let imageTemplate = store.quizTemplate;
  for (let i = 0; i <imageTemplate.length; i++){
    if ((store.questionNumber - 1) === i){
      imageAlt = imageTemplate[i].image[1];
    }
  }
  return imageAlt;
}




function generateAnswers() {
  let answersArray = sampleAnswers();
  return (answersArray.reduce((html, answer, i) =>
    html + `<label> <input name="option" type="radio" value="${i}" required="required">${answer} </label><br>`
    , ''))
}

function sampleAnswers(){
  let answerTemplate = store.quizTemplate;
  for (let i = 0; i < answerTemplate.length; i++){
    if ((store.questionNumber -1) === i){
        return answerTemplate[i].answers;
    }
  }
}

function sampleQuestions(){
  let questionTemplate = store.quizTemplate;
  for (let i = 0; i < questionTemplate.length; i++){
    if ((store.questionNumber - 1) === i){
      return questionTemplate[i].question;
    }
  }
}


//input: Single question from arr matching page #
//output: render question page view
function generateQuestions() {
  let currentQuestion = sampleQuestions();
  return (
    `  <div class="flexgroup">

    <main>

    <div class="flexItem"><img src="${generateImageSrc()}" alt="${generateImageAlt()}"></div>
      <form>
        <h2>${sampleQuestions()}</h2>
        ${generateAnswers()}
        <br>
         <div><button class="button">Next</button></div>
      </form>

    </main>

    <footer class="fontHandlee">
      <p>${store.score} right out of 5</p>
      <p>Question ${getQuestionNumber()} of 5</p>
    </footer>`
  )
}

function generateReviewAnswers() {
  if(store.userAnsweredRight === true) {
    return generateCorrectAnswerPage();
  } 
  return generateIncorrectAnswerPage();
}

function generateCorrectAnswerPage()  {
  return ` <div class="flexgroup">
    <main>
      <h2>${sampleQuestions()}</h2>
      <p class="correctAnswer">Correct Answer: ${store.quizTemplate[store.questionNumber - 1].answers[store.quizTemplate[store.questionNumber - 1].correctAnswer]}</p>
      <p class="fontHandlee">Congrats, you did kermit proud! </p>
      <img class="kermitGif" src="images/kermit-dance.gif" alt="A gif of Kermit the Frog dancing">
      <div class="centerButton"><button id="navToNextQuestion">Next</button><div>
    </main>

    <footer class="fontHandlee">
    <p>${store.score} out of 5</p>
    <p>Question ${getQuestionNumber()} of 5</p>
    </footer>
    </div>`
}




function generateIncorrectAnswerPage() {
  return ` <div class="flexgroup">
    <main>
      <h2>${sampleQuestions()}</h2>
      <p class="wrongAnswerPicked">Your Answer: ${store.quizTemplate[store.questionNumber - 1].answers[parseInt(store.submitedAnswer)]}</p>
      <p class="correctAnswer">Correct Answer: ${store.quizTemplate[store.questionNumber - 1].answers[store.quizTemplate[store.questionNumber - 1].correctAnswer]}</p>
      <p class="fontHandlee">That wasn't it, better luck next time!<p>
      <img src="images/kermit-no.gif" alt="A gif of Kermit the Frog shaking his head no and bitting his muppet hands">
      <button id="navToNextQuestion">Next</button>
    </main>

    <footer class="fontHandlee">
    <p>${store.score} right out of 5</p>
    <p>Question ${getQuestionNumber()} of 5</p>
    </footer>
    </div>`
}


function generateFinalResultsPage(){
  return ` <main>
    <div class="flexgroup flexgroupAnswerMargin">
    <h2>Final Results</h2>
    <p class="fontHandlee"> ${store.score / 5 * 100} %</p>

    <p class="fontHandlee">You got ${store.score} right out of 5</p>

    <!--Restart meme / maybe find back up image, this image should be hidden and only appear when submit is clicked, then after X seconds redirect to intro page-->
    <Figure class="hideImage">
    <img src="images/grapefruit.png" alt="">
    </Figure>
<!-- maybe we can change the text after the button is pressed once to 'here we go' or something  -->
    <button id="restart">Restart Quiz?</button>
    
  </div>

  </main>`;
}




/********** RENDER FUNCTION(S) **********/


// render should 
//if start button is never clicked, render should never run
//if the startButton is clicked the next view should always be the Questions page
  //if user input is correct display correct page
  //if user input is incorrect display incorrect page
  // if user has answered the final question, display final results page




function render() {
  let html = ``;
  if (store.quizStarted === false) {
    html += generateStartPage();
  } else if (store.questionNumber === store.quizTemplate.length + 1) {
    html = generateFinalResultsPage();
  } else if (store.submitedAnswer === '') {
    html += generateQuestions();
  } else {
    html += generateReviewAnswers();
  }
  $('body').html(html);
}




/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// listens for a click on start button, changes quizStarted to true, updates questionNumber to 1, calls render
function handleStartButtonSubmit() {
  $('body').on('click', '#startButton', function (event) {
    event.preventDefault();
    store.quizStarted = true;
    store.questionNumber++;
    render();
  });
}
// this function stores the index of the user answer selected
function registerAnswerSubmission() {
  $('body').on('click','.button',function (event) {
    event.preventDefault();
    //stores users answer choice
    store.submitedAnswer = parseInt($("input[name='option']:checked").val());
    //user answers correct
    if (store.submitedAnswer === store.quizTemplate[store.questionNumber - 1].correctAnswer) {
      store.score++;
      store.userAnsweredRight = true;
      render();
    } else if (store.quizTemplate[store.questionNumber - 1].answers[parseInt(store.submitedAnswer)] === undefined) {
      alert('You need to select an answer before continuing')
    } else {
    render();
  }
  });
}


function moveToNextQuestion () {
  $('body').on('click', '#navToNextQuestion', function(event) {
    event.preventDefault();
    store.userAnsweredRight = false;
    store.submitedAnswer = '';
    store.questionNumber++;
    render();
  });
}

function restartQuiz() {
  $('body').on('click', '#restart', function (event) {
    event.preventDefault();
     store.userAnsweredRight = false;
     store.submitedAnswer = '';
     store.questionNumber = 0;
     store.quizStarted = false;
     store.score= 0;
    render()
    console.log('LAST BUTTON WORKS')
  });
  
}


function getQuestionNumber() {
  return store.questionNumber;
}



//data model vqu




// renderQuestion() //pulls view to code
// generateQuestion() //brings proper question to view
// countPageNumber() // counts page user is on
// updateUserScore() // counts total correct vs incorrect
// checkUserInputButton() // next button brings user to answer page
// isAnswerCorrect() // tests checkUserInput() if true return correctAnswerPage else return incorrectAnswerPage
// correctAnswerPage() // displays html for correct page and calls countPageNumber() & updateUserScore
// inccorectAnswerPage // displays html for incorrect page and calls countPageNumber() & updateUserScore
// finalQuestionCheck() // button that determines whether user will move forward to next question or results page
// displayFinalResults() // user see results view with total score 
// restartButton() // user can restart quiz 


/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

$(main);