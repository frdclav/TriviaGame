// constructor for Question object takes three arguments: 
//  question is the text for the question
//  choices is an array of possible choices and should contain Choice objects
//  answer is a Choice object and is the correct answer, it should also exist within the choices array  
function Question(question, choices, answer) {
    this.questionText = question;
    this.choiceList = choices;
    this.answer = answer;

    this.checkAnswer = function (choice) {
        console.log('choice is', choice)
        console.log('answer is ', this.answer)
        if (choice === this.answer) {
            return true
        } else {
            return false
        }
    }
}


// timer object repurposed from in class activities
function Timer(seconds, displayId) {
    this.time = seconds;
    this.clockRunning = false;
    this.display = displayId;
    self = this;
    this.reset = function () {
        self.time = 0;
    }
    this.start = function () {
        if (!self.clockRunning) {
            self.intervalId = setInterval(self.count, 1000);
            self.clockRunning = true;
        }
    }
    this.stop = function () {
        clearInterval(self.intervalId);
        self.clockRunning = false;
    }
    this.count = function () {
        self.time--;
        if (self.time === 0) {
            self.stop()
            timeIsUp();
        }
        if (self.display) {
            self.display.text("Time Remaining: " + self.showTime());
        }

    }
    this.showTime = function () {
        var converted = self.timeConverter(self.time);
        return converted;
    }

    this.timeConverter = function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }

    self.display.text("Time Remaining: " + self.showTime());
}

// set global variables:
// question_index (removed), num of correct answers, num of incorrect answers, num of questions unanswered, current question

var correct;
var incorrect;
var unanswered;
var curQuestion;
var curQuestionDone = true;


//  create var for the title:

var titleRow = $("<div>")
titleRow.addClass("row");
titleRow.attr('id', 'title-row');
titleRow.attr('style', 'height:15vh;');
var titleHeader = $("<h1>")
titleHeader.addClass("my-auto mx-auto");
titleHeader.text("Trivia Game!");
titleRow.append(titleHeader)

// create var for timer on page:
var timerRow = $("<div>");
timerRow.addClass("row");
timerRow.attr('id', 'time-remaining-row')
timerRow.attr('style', 'height:7.5vh;')
var timerHeader = $("<h2>")
timerHeader.addClass("my-auto mx-auto");
timerHeader.attr('id', 'curTime');
timerRow.append(timerHeader)

//create var for question on page:
var questionRow = $("<div>");
questionRow.addClass("row");
questionRow.attr('id', 'question');
questionRow.attr('style', 'height:7.5vh;');

//create var for answers on page:
var answersRow = $("<div>");
answersRow.addClass("row");
answersRow.attr('id', 'answers');
answersRow.attr('style', 'height:45vh;');
var answersList = $("<ul>");
answersList.addClass("list-group mx-auto my-auto");
answersList.attr('id', 'answer-list');
answersRow.append(answersList);

// creat var for wrong answer screen
var wrongDiv = $("<div>");
wrongDiv.addClass("row my-3");
var wrongHeader = $("<h2>");
wrongHeader.addClass("my-auto mx-auto");
wrongHeader.text("Nope!");
wrongDiv.append(wrongHeader);

var correctAnswerDiv = $("<div>");
correctAnswerDiv.addClass("row");
var correctAnswer = $("<h4>");
correctAnswer.addClass("my-auto mx-auto");
correctAnswer.attr('id', 'corAns');
correctAnswerDiv.append(correctAnswer);

//create var for correct answer screen
var rightDiv = $("<div>");
rightDiv.addClass("row my-3");
var rightHeader = $("<h2>");
rightHeader.addClass("my-auto mx-auto");
rightHeader.text("Correct!");
rightDiv.append(rightHeader);

var questionList;
var questionTime;

function showTitleOnly() {

    $("#main").empty();
    $("#main").append(titleRow);
}
function addTimerRow() {


    $("#main").append(timerRow);

}
function showQuestion(ques) {
    $("#main").append(questionRow);
    $('#question').html(' <h3 class="my-auto mx-auto ">' + ques.questionText + '</h3>');
}
function showAnswers(ques) {
    $("#main").append(answersRow);
    var choicesArr = ques.choiceList
    for (let index = 0; index < choicesArr.length; index++) {
        const element = choicesArr[index];
        $("#answer-list").append('<li class="choice list-group-item border-0 m-1" id="answer-' + index + 1 + '">' + element + '</li>')
    }
}
function userWrong(ques) {
    $("#main").append(wrongDiv);
    $("#main").append(correctAnswerDiv);
    $("#corAns").text("The correct answer was: " + ques.answer);
}
function userRight() {
    $("#main").append(rightDiv);
}
function init() {
    // sample question creation
    var q1_choices = ["Lisa", "Jennie", "Rose", "Jisoo", "Dahyun"]
    var q1 = new Question("Who is not a member of Blackpink?", q1_choices, q1_choices[4])

    var q2_choices = ["BBIBBI", "What is Love?", "DDU-DU DDU-DU"]
    var q2 = new Question("Which of these is a Blackpink song?", q2_choices, q2_choices[2])

    var q3_choices = ["Dara", "IU", "Heize", "Hwasa", "Tiffany"]
    var q3 = new Question("Which artist collaborates with DEAN in the song 'And July'", q3_choices, q3_choices[2])

    var q4_choices = ["Lee Hyori", "Ock Joo-hyun", "Lee Jin", "Sung Yu-ri"]
    var q4 = new Question("Which member of Fin K.L. is a guest on the very first episode of variety show 'Running Man'?", q4_choices, q4_choices[0])

    var q5_choices = ["Red Velvet", "Mamamoo", "TWICE", "IZ*ONE"]
    var q5 = new Question("'Twit' singer Hwasa is a member of which idol girl group?", q5_choices, q5_choices[1])
    // array of questions
    questionList = [q2, q1, q3, q4, q5];
    correct = 0
    incorrect = 0
    unanswered = 0
    curQuestionDone = true;
    showTitleOnly();
    var startDiv = $("<div>");
    startDiv.addClass("row");
    var startBtn = $("<button>");
    startBtn.addClass("btn btn-primary mx-auto");
    startBtn.attr('type', 'button');
    startBtn.attr('id', 'startBtn');
    startBtn.text('START!')
    startDiv.append(startBtn);
    $("#main").append(startDiv);
    $("#startBtn").on('click', function () { console.log('you clicked start!'); nextQuestion(); })
}

function nextQuestion() {
    curQuestionDone = false;
    if (questionTime) {
        questionTime.stop();
    }
    if (questionList.length === 0) {
        showEndScreen();
    } else {
        curQuestion = questionList.shift();
        showTitleOnly();
        addTimerRow();
        questionTime = new Timer(30, $("#curTime"));
        questionTime.start();
        showQuestion(curQuestion);
        showAnswers(curQuestion);
        $('.choice').hover(
            function () {
                $(this).removeClass("border-0")
            }, function () {
                $(this).addClass("border-0")
            });
        $('.choice').on('click', function () {
            let ans = $(this).text();
            let result = curQuestion.checkAnswer(ans);
            console.log(ans, result);
            submitAnswer(result);
        })
    }

}

function submitAnswer(isCorrect) {

    $("#question").empty();
    $("#answer-list").empty();
    $("#question").detach();
    $("#answers").detach();
    curQuestionDone = true;
    setTimeout(nextQuestion, 5000);
    if (isCorrect) {
        correct++;
        userRight();
    } else {
        incorrect++;
        userWrong(curQuestion);
    }
}
function timeIsUp() {
    if (!curQuestionDone) {
        $("#question").empty();
        $("#answer-list").empty();
        $("#question").detach();
        $("#answers").detach();
        setTimeout(nextQuestion, 5000);
        unanswered++;
        userWrong(curQuestion);
    }

}

function showEndScreen() {
    showTitleOnly();
    addTimerRow();
    questionTime.stop();
    var message = $("<div>")
    message.addClass("row my-3");
    var messageHeader = $("<h2>");
    messageHeader.addClass("my-auto mx-auto");
    messageHeader.text("All done, here's how you did!");
    message.append(messageHeader);

    $("#main").append(message);
    var statsCor = $("<div>").addClass("row");
    var statsCorP = $("<h4>").addClass("text-center mx-auto");
    var statsIn = $("<div>").addClass("row ");
    var statsInP = $("<h4>").addClass("text-center mx-auto");
    var statsUn = $("<div>").addClass("row");
    var statsUnP = $("<h4>").addClass("text-center mx-auto");

    statsCorP.text("Correct Answers: " + correct);
    statsInP.text("Incorrect Answers: " + incorrect);
    statsUnP.text("Unanswered: " + unanswered);
    statsCor.append(statsCorP)
    statsIn.append(statsInP)
    statsUn.append(statsUnP)
    $("#main").append(statsCor, statsIn, statsUn);
    var reset = $("<div>");
    reset.addClass("row");
    var resetBtn = $("<button>");
    resetBtn.addClass("btn btn-primary mx-auto my-2");
    resetBtn.attr('type', 'button');
    resetBtn.attr('id', 'resetBtn');
    resetBtn.text('Play Again?')
    reset.append(resetBtn);
    $("#main").append(reset);
    $("#resetBtn").on('click', function () { console.log('you clicked reset!'); init(); })
}
init();