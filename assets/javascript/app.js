// constructor for Question object takes three arguments: 
//  question is the text for the question
//  choices is an array of possible choices and should contain Choice objects
//  answer is a Choice object and is the correct answer, it should also exist within the choices array  
function Question(question, choices, answer) {
    this.questionText = question;
    this.choiceList = choices;
    this.answer = answer;

    this.checkAnswer = function (choice) {
        if (choice === this.answer.check()) {
            return true
        } else {
            return false
        }
    }
}

//  constructor for Choice object
//  takes 1 arguement, text is the text for the choice 
function Choice(text) {
    this.choiceText = text
    this.check = function () {
        return this.choiceText
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




//  testing timer
// var questionTime = new Timer(15, $("#curTime"));
// questionTime.start();
// var testInterval = setInterval(function () { console.log(questionTime.showTime()) }, 1000);
// setTimeout(function () {
//     questionTime.stop(); clearInterval(testInterval);
// }, 1000 * 15);




// console.log(q1)
// console.log(q1.checkAnswer("Jennie"), "false")
// console.log(q1.checkAnswer("Dahyun"), "true")
// var blah = q1.answer.check()
// console.log(blah, q1.answer.check())




// $(document).ready(
//     function () {
//         // constructor for Question object takes three arguments: 
//         //  question is the text for the question
//         //  choices is an array of possible choices and should contain Choice objects
//         //  answer is a Choice object and is the correct answer, it should also exist within the choices array  
//         function Question(question, choices, answer) {
//             this.questionText = question;
//             this.choiceList = choices;
//             this.answer = answer;

//             this.checkAnswer = function (choice) {
//                 if (choice === this.answer.check()) {
//                     return true
//                 } else {
//                     return false
//                 }
//             }
//         }

//         //  constructor for Choice object
//         //  takes 1 arguement, text is the text for the choice 
//         function Choice(text) {
//             this.choiceText = text
//             this.check = function () {
//                 return this.choiceText
//             }
//         }

//         // sample question creation
//         var q1_choices = [new Choice("Lisa"), new Choice("Jennie"), new Choice("Rose"), new Choice("Jisoo"), new Choice("Dahyun")]
//         var q1 = new Question("Who is not a member of Blackpink?", q1_choices, q1_choices[4])
//         // console.log(q1)
//         // console.log(q1.checkAnswer("Jennie"), "false")
//         // console.log(q1.checkAnswer("Dahyun"), "true")
//         // var blah = q1.answer.check()
//         // console.log(blah, q1.answer.check())


//         $('#question').html(' <h3 class="my-auto mx-auto ">' + q1.questionText + '</h3>')
//         // need a function that loops through q1.choiceList and puts it on the page
//         choicesArr = q1.choiceList
// for (let index = 0; index < choicesArr.length; index++) {
//     const element = choicesArr[index];
//     $("#answer-list").append('<li class="choice list-group-item border-0 m-2" id="answer-' + index + 1 + '">' + element.choiceText + '</li>')

//         }
// $('.choice').hover(
//     function () {
//         $(this).removeClass("border-0")
//     }, function () {
//         $(this).addClass("border-0")
//     });
// $('.choice').on('click', function () {
//     let ans = $(this).text()
//     console.log(ans)
//     console.log(q1.checkAnswer(ans))
// })
//     }
// )

// set global variables:
// question_index (removed), num of correct answers, num of incorrect answers, num of questions unanswered, current question
// var q_index;
var correct;
var incorrect;
var unanswered;
var curQuestion;

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


// sample question creation
var q1_choices = [new Choice("Lisa"), new Choice("Jennie"), new Choice("Rose"), new Choice("Jisoo"), new Choice("Dahyun")]
var q1 = new Question("Who is not a member of Blackpink?", q1_choices, q1_choices[4])
// array of questions
var questionList = [q1];

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
        $("#answer-list").append('<li class="choice list-group-item border-0 m-1" id="answer-' + index + 1 + '">' + element.choiceText + '</li>')
    }
}
function init() {
    // q_index = 0
    correct = 0
    incorrect = 0
    unanswered = 0
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
    curQuestion = questionList.shift();
    showTitleOnly();
    addTimerRow();
    var questionTime = new Timer(30, $("#curTime"));
    // questionTime.start();
    showQuestion(curQuestion);
    showAnswers(curQuestion);
    $('.choice').hover(
        function () {
            $(this).removeClass("border-0")
        }, function () {
            $(this).addClass("border-0")
        });
    $('.choice').on('click', function () {
        let ans = $(this).text()
        console.log(ans)
        console.log(q1.checkAnswer(ans))
    })
}

init();