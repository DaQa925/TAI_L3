
function newQuestion(params) {
    var temp = {
        question:  params[0],
        choices: params[1],
        correctAnswer: params[2]
    };
    return temp;
}

var allQuestions = [
    ["<p><b>Pytanie nr 1:</b><br/> Ile to 1 + 1?<p/>", ["1", "2", "3", "4"], 1],
    ["<p><b>Pytanie nr 2:</b><br/>Ile to 2 + 2?<p/>", ["2", "6", "3", "4"], 3],
    ["<p><b>Pytanie nr 3:</b><br/>Ile to 3 + 3?<p/>", ["6", "9", "3", "12"], 0],
    ["<p><b>Pytanie nr 4:</b><br/>Ile to 4 + 4?<p/>", ["10", "12", "8", "4"], 2],
    ["<p><b>Pytanie nr 5:</b><br/>Ile to 5 + 5?<p/>", ["10", "15", "14", "11"], 0],
    ["<p><b>Pytanie nr 6:</b><br/>Ile to 6 + 6?<p/>", ["11", "12", "13", "14"], 1],
    ["<p><b>Pytanie nr 7:</b><br/>Ile to 7 + 7?<p/>", ["49", "21", "15", "14"], 3],
    ["<p><b>Pytanie nr 8:</b><br/>Ile to 8 + 8?<p/>", ["0", "16", "64", "24"], 1],
    ["<p><b>Pytanie nr 9:</b><br/>Ile tos 9 + 9?<p/>", ["81", "18", "15", "24"], 1],
    ["<p><b>Pytanie nr 10:</b><br/>Ile to 10 + 10?<p/>", ["10", "20", "30", "40"], 1]
].map(newQuestion);

var total = 0, number = 0, totalQuestions = allQuestions.length, answers = [];

$(document).ready(function() {

    function newQuestionAnswers() {
        $("#content").fadeOut(500, function() {
            $("#answers").empty();
            if (number < totalQuestions)
                $("#questCount").text("Pytanie: " + (number + 1) + " z 10");
            var query = allQuestions[number];
            $("#question").html(query.question);

                        for(var i = 0; i < query.choices.length; i++)
                $("#answers").append("<input type='radio' name='answers' id='radio" + i + "' value='answer" + i
                    + "'><label for='test" + i + "'>" + query.choices[i] + "</label><br>");
            if(answers.length > number)
                $("#radio" + answers[number]).prop("checked", true);
            if (number > 0)
                $("#back").prop("disabled", false);
        });
        $("#content").fadeIn(500);
    }

    function checkAnswer() {

        for(var i = 0; i < $("input").length; i++) {
            if ($("#radio" + i).is(":checked")) {
                answers[number] = i;
                break;
            }
            else if ( i === $("input").length -1 && !$("#radio" +i).is(":checked")) {
                $("#next").after("<p id='warning'>Zaznacz odpowiedź</p>");
                return false;
            }
        }


        var query = allQuestions[number];
        if($("#radio" + query.correctAnswer).is(":checked"))
            updateScore(10);
        number += 1;
        return true;
    }

    function finalScore() {
        $("#score").text("Twój wynik: " + total + "/" + totalQuestions * 10).show(1000);
        $("#question, #answers, #questCount, #next, #back").hide(10);
        $("#startagain").hide(100);
        $("#result").show(1000);

    }

    function updateScore(change) {
        total += change;
        $("#score").text("Score: " + total);
    }

    $("#back").hide();
    $("#next").hide();
    $("#startagain").hide();
    $("#score").hide();
    $("#bar10").hide();
    $("#result").hide();
    $("#resultbad").hide();


    $("#start").on('click', function() {
        $("#start").hide();
        $('#h4Start').hide(1000);
        $("#next").show(1000);
        $("#bar").width('5%');
        newQuestionAnswers();
        updateScore(0);
    });

    $("#startagain").on('click', function() {

        location.reload();

    });

    $("#next").on('click', function() {
        $("#back").show(100);
        $("#warning").remove();
        if(checkAnswer()) {
            if (number < totalQuestions)
                newQuestionAnswers();
            else
                finalScore();


        }

        if (number > 0)
            $("#back").prop("disabled", false);
        $("#bar").width('10%');

        if (number > 1)
            $("#bar").width('20%');
        if (number > 2)
            $("#bar").width('30%');
        if (number > 3)
            $("#bar").width('40%');
        if (number > 4)
            $("#bar").width('50%');
        if (number > 5)
            $("#bar").width('60%');
        if (number > 6)
            $("#bar").width('70%');
        if (number > 7)
            $("#bar").width('80%');
        if (number > 8)
            $("#bar").width('90%');
        if (number > 9)
            $("#bar").width('100%');



    });


    $("#back").on('click', function() {
        if ( number === totalQuestions) {
            $("#score").hide();
            $("#question, #answers, #questCount, #next, #score").show(2500);
        }

        if (number > 0)
            $("#bar").width('1%');
        if (number > 1)
            $("#bar").width('10%');
        if (number > 2)
            $("#bar").width('20%');
        if (number > 3)
            $("#bar").width('30%');
        if (number > 4)
            $("#bar").width('40%');
        if (number > 5)
            $("#bar").width('50%');
        if (number > 6)
            $("#bar").width('60%');
        if (number > 7)
            $("#bar").width('70%');
        if (number > 8)
            $("#bar").width('80%');
        if (number > 9)
            $("#bar").width('90%');

        number -= 1;
        $("#back").prop("disabled", true);
        if (allQuestions[number].correctAnswer === answers[number])
            updateScore(-10);
        newQuestionAnswers();


    });
});