$(document).ready(function() {
    // Handler for .ready() called.

    var selection;
    var percentScore;

    var triviaQandA = [{
            "question": "By the year 2020, what percent of b2b interactions will not include humans?",
            "answers": ["A. 40%", "B. 65%", "C. 85%", "D. 95%", "E. A and B Only"],
            "correct": "C. 85%",
            "response": "According to Gartner Research, 85% of all interactions will not involve humans."
        },
        {
            "question": "Influencers can:",
            "answers": ["A. Find more leads", "B. Convert more opportunities", "C. Upsell", "D. Create advocates", "E. All of the above"],
            "correct": "E. All of the above",
            "response": "By learning and living the traits of an influencer, the end result will be an increase in revenue."
        },
        {
            "question": "Which of the following is NOT a common trait found in Influencers?",
            "answers": ["A. They know their audience", "B. They are famous", "C. They are considered experts", "D. They are credible", "E. They share their knowledge"],
            "correct": "B. They are famous",
            "response": "Influencers are not always famous, except to the people who rely on their advice!"
        },
        {
            "question": "When our buyer is in the EXPLORE phase of their journey, our strategy is to...?",
            "answers": ["A. Create Intrigue", "B. Share Relevant Content", "C. Be fabulous, first and fearless", "D. Be Clear, Compelling and Confident", "E. All of the above"],
            "correct": "B. Share Relevant Content",
            "response": "We want to position ourselves as trusted advisors and thought leaders so we share great content."
        },
        {
            "question": " Which application/program can help you find great content to share?",
            "answers": ["A. Buzzsumo.", "B. Sniply.", "C. Arthur", "D. Feedly.", "E. A & D"],
            "correct": "E. A & D",
            "response": "Both Buzzsumo and Feedly can help you find great content to share."
        }

        
            

    ];

    var questionIndex = 0;
    var correctAnswer = 0;
    var wrongAnswer = 0;
    var timeOutAnswer = 0;

    //Timer program
    var interValID;
    var timeLeft = 25
    var counter = 0;
    var timer = $("#timer");

    function timeIt() {
        
        timer.html("<h3>You have " + (timeLeft - counter) + " seconds left</h3>");
        if (counter == timeLeft) {
            timer.html("<h2>Your time is up!</h2>");
            clearInterval(interValID);
            $("#response").show();
            $("#response").html("You ran out of time. " + selection.response);
            timeOutAnswer++;
            checkEnd();
        }
        counter++
    }


    $("#startGame").click(function() {
        timer.html("<h2>Starting timer...</h2>")
        getQuestion();
    });

    function showProgress() {
        var currentQuestionNumber = questionIndex + 1;
        var element = $("#progress");
        element.text("Question " + currentQuestionNumber + " of " + triviaQandA.length);

    }

    function getQuestion() {
        //var a = 0;

        $("#startTheGame").hide();
        $("#startGame").hide();
        $("#response").hide();
        $(".grid").show();
        interValID = setInterval(timeIt, 1000);
        selection = triviaQandA[questionIndex];
        $("#question").html(selection.question);
        console.log(question);

        for (var i = 0; i < selection.answers.length; i++) {
            btn = $("button#btn" + [i]).text(selection.answers[i]);


        }
        showProgress();
    }


    $("button").click(function() {
        var choice = $(this).text();



        checkAnswer(choice);

    });



    function checkAnswer(choice) {

        if (choice === selection.correct) {
            correctAnswer++
            $("#response").show();
            $("#response").html("Way to go!  You are correct! " + selection.response);

        } else {
            wrongAnswer++
            $("#response").show();
            $("#response").html("Oops, you are incorrect! " + selection.response);
        }

        
        
        clearInterval(interValID);

        checkEnd();


    }

    function showResults() {
         var percentScore = (correctAnswer/triviaQandA.length)*100
    

        $(".grid").hide();
        $("#resultsCorrect").show();
        $("#resultsCorrect").html("# of Correct Answers = " + correctAnswer) 
        $("#resultsIncorrect").show();
        $("#resultsIncorrect").html("# of Incorrect Answers = " + 
            wrongAnswer)
        $("#resultsTimedOut").show();
        $("#resultsTimedOut").html("# of Timed Out = " + timeOutAnswer );
        $("#resultsPercent").show();
        $("#resultsPercent").html("Your score is " + percentScore + "%")
      
if (percentScore > 70) {
    var wayToGo = $("<img/>");
    wayToGo.attr("src", "images/tenorWayToGo.gif")
    $("#scoreImg").show();
    $("#scoreImg").append(wayToGo);
} else {
   var tryHarder = $("<img/>");
    tryHarder.attr("src", "images/tenorTryHarder.gif")
    $("#scoreImg").show();
    $("#scoreImg").append(tryHarder);
}
        $("#resultsTwo").show();
    }

    function checkEnd() {
            questionIndex++;
            if (questionIndex === (triviaQandA.length)){

            setTimeout(showResults, 4000);
            } else  {
                counter=0;
                
                setTimeout(getQuestion, 4000);

            }
    }

});