//@ts-check
$(document).ready(function(){

    // start when start button is clicked
    $("#start").on("click", game.startTimer);
    console.log("You clicked me!")
  
  });
  
  // game structure info
  var game = {
  
    // set the timer fr 45 seconds and count down from 45 at one second intervals
    timeRemaining : 45,
  
    // start the timer & dispay the questions
    startTimer: function() {
      $("#timer").text("Time remaining: " + game.timeRemaining);
      setInterval(game.countdown, 1000);
      $("#start-page").hide();
      trivia.displayQuestions();
    },
  
    // countdown; stop the timer at 0
    countdown: function() {
      game.timeRemaining--;
      $("#timer").text("Time remaining: " + game.timeRemaining);
      if (game.timeRemaining === 0) {
        game.stopTimer();
        $("#timer").empty();
      }
    },
  
    // when timer stops, end game check answers
    stopTimer: function() {
      clearInterval();
      trivia.checkAnswers();
    },
  
    // hide qustions and display results
    showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
      $("#end-page").show();
      $("#questions-box").empty();
      $("#timer").empty();
      $("#timer").hide();
      $("#correct-answers").text("Correct:" + numCorrect);
      $("#incorrect-answers").text("Incorrect: " + numIncorrect);
      $("#unanswered").text("Unanswered: " + numUnanswered);
    }
  }
  
  // function for multiple choice questions
  var trivia = {
  
    // pull questions from the array of questions, loop through them, and append to UI
    displayQuestions: function() {
      var divContainer = $("#questions-box");
      var answerGroup = $(".form-check");
    //   divContainer.append('<h2>Answer the Following Questions:</h2>');
              
      for (var i = 0; i < questions.length; i++) {
  
        divContainer.append('<div id="question">' + questions[i].question + '</div>');
  
        var answer1 = questions[i].answers[0];
        var answer2 = questions[i].answers[1];
        
  
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
        
      }
  
      // add a Done button to the end of the page and register its click handler
      var finishedButton = '<button class="btn btn-primary" id="finished-button" type="submit">Finish</button>';
      divContainer.append(finishedButton);
      $("#finished-button").on("click", game.stopTimer);
    },
  
    // test if the user answers are correct, incorrect, or if there are unanswered questions
    checkAnswers: function() {
      var correctAnswer;
      var userAnswer;
      var numCorrect = 0;
      var numIncorrect = 0;
      var numUnanswered = 0;
  
      // loop through to compare answers
      // change score counts
      for (var i = 0; i < questions.length; i++) {
        correctAnswer = questions[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
        if (userAnswer === correctAnswer) {
          numCorrect++;
        } else if (userAnswer === "") {
          numUnanswered++;
        } else if (userAnswer !== correctAnswer) {
          {
            numIncorrect++;
          }
        }
      }
  
      // show the end page with the score tally
      game.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
  }
  
  // array of questions and answers
  var questions =
  [
    {
      question: "Which one of these princesses is NOT part of Disney’s official princess lineup?",
      answers: ["Elsa", "Merida"],
      correct: "Elsa"
    },
  
    {
      question: "What popular Disney character makes an appearance as a stuffed animal in Frozen?",
      answers: ["Tinkerbell", "Mickey Mouse"],
      correct: "Mickey Mouse"
    },
    {
      question: "Who was the first Disney princess?",
      answers: ["Snow White", "Cinderella"],
      correct: "Snow White"
    },
    {
      question: "What do Aladdin and his monkey Abu steal from the marketplace when you’re first introduced to them in the movie??",
      answers: ["An Apple", "A Loaf Of Bread"],
      correct: "A Loaf Of Breade"
    },
    {
      question: "What are the names of Cinderella's evil stepsisters?",
      answers: ["Anastasia & Drizella", "Beatrice & Daphne"],
      correct: "Anastasia and Drizella"
    },
    {
      question: "Which is NOT a Disney prince?",
      answers: ["Prince Neveen", "Prince George"],
      correct: "Prince George"
    },
    {
      question: "What does the enchanted cake in Brave turn Merida's mother into?",
      answers: ["A Tea Pot", "A Bear"],
      correct: "A Bear"
    },
    {
      question: "Who did Pocahontas’ father want her to marry?",
      answers: ["John Smith", "Kocoum"],
      correct: "Kocoum"
    },
    {
      question: "In The Little Mermaid, what name does Ursula go by when she disguises herself and uses Ariel’s voice to try and win over Eric?",
      answers: ["Vanessa", "Athena"],
      correct: "Vanessa"
    },
    {
      question: "What U.S. city is the setting of The Princess and The Frog inspired by?",
      answers: ["Austin", "New Orleans"],
      correct: "New Orleans"
    }
  ]