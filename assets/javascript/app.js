// constructor for Question object takes three arguments: 
//  question is the text for the question
//  choices is an array of possible choices and should contain Choice objects
//  answer is a Choice object and is the correct answer, it should also exist within the choices array  
function Question(question, choices, answer) {
    this.questionText = question;
    this.choiceList = choices;
    this.answer = answer;

    this.checkAnswer = function(choice) {
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
    this.check = function() {
        return this.choiceText
    }
}

// sample question creation
var q1_choices = [new Choice("Lisa"), new Choice("Jennie"), new Choice("Rose"), new Choice("Jisoo"), new Choice("Dahyun")]
var q1 = new Question("Who is not a member of Blackpink?", q1_choices, q1_choices[4])
    // console.log(q1)
    // console.log(q1.checkAnswer("Jennie"), "false")
    // console.log(q1.checkAnswer("Dahyun"), "true")
    // var blah = q1.answer.check()
    // console.log(blah, q1.answer.check())

$(document).ready(
    function() {
        // constructor for Question object takes three arguments: 
        //  question is the text for the question
        //  choices is an array of possible choices and should contain Choice objects
        //  answer is a Choice object and is the correct answer, it should also exist within the choices array  
        function Question(question, choices, answer) {
            this.questionText = question;
            this.choiceList = choices;
            this.answer = answer;

            this.checkAnswer = function(choice) {
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
            this.check = function() {
                return this.choiceText
            }
        }

        // sample question creation
        var q1_choices = [new Choice("Lisa"), new Choice("Jennie"), new Choice("Rose"), new Choice("Jisoo"), new Choice("Dahyun")]
        var q1 = new Question("Who is not a member of Blackpink?", q1_choices, q1_choices[4])
            // console.log(q1)
            // console.log(q1.checkAnswer("Jennie"), "false")
            // console.log(q1.checkAnswer("Dahyun"), "true")
            // var blah = q1.answer.check()
            // console.log(blah, q1.answer.check())


        $('#question').html(' <h3 class="my-auto mx-auto ">' + q1.questionText + '</h3>')
            // need a function that loops through q1.choiceList and puts it on the page
    }
)