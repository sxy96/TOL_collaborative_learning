var tag2 = document.createElement('script');
tag2.src = "https://code.jquery.com/jquery-3.3.1.js";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag2, firstScriptTag); 

// Direct students to different videos based on their role in a pair
var studentId;
var videoURL = "";
var videoId = "";
function makeStudentPairs() {
    $("#btnq0").html("<button onclick=\"downloadAPI()\" class=\"button\">Continue</button>");
    var s1 = $("input[id=Q0S1]:checked").val();
    var s2 = $("input[id=Q0S2]:checked").val();
    if (s1) {
        studentId = 1;
        videoURL = "https://youtu.be/Rv87bbUwYJk";                                          //NEEDS URL
        videoId  = "Rv87bbUwYJk";                                              //NEEDS id
    } else if (s2){
        studentId = 2;
        videoURL = "https://youtu.be/1aJNxWY9kzs";                                          //NEEDS URL
        videoId  = "1aJNxWY9kzs";                                              //NEEDS id        
    }
}

// 2. This code loads the IFrame Player API code asynchronously.
function downloadAPI(){
    var tag1 = document.createElement('script');
    tag1.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag2, firstScriptTag);    
}


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '720',
        width: '1080',
        videoId: videoId,                                     //
        playerVars: {'autoplay': 0, 'wmode': 'transparent', 'fs': 0, 'controls':1, 'rel':0, 'modestbranding':1, 'showinfo':0},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
// var done1 = false;
// var done2 = false;
// var time_indvQ1;                                               //
// var time_indvQ2;                                               //
// var time_grpFrml;                                               //
// var time_grpQ1;                                               //
// var time_grpQ2;                                               //

var time_indvQ1 = 93.5;
var time_indvQ2 = 150.5;
var time_grpFrml = 206;
var time_grpQ1 = 272.5;
var time_grpQ2 = 311; 

// if (studentId == 1){
//     time_indvQ1 = 93.5;
//     time_indvQ2 = 150.5;
//     time_grpFrml = 206;
//     time_grpQ1 = 272.5;
//     time_grpQ2 = 311;                                             
// } else if (studentId == 2){
//     time_indvQ1 = 92;
//     time_indvQ2 = 152;
//     time_grpFrml = 210;
//     time_grpQ1 = 275.5;
//     time_grpQ2 = 314.5;   
// }

function onPlayerReady(event) {
    event.target.playVideo();
    setInterval(
        function() {
            if (event.target.getCurrentTime() >= time_indvQ1 && event.target.getCurrentTime() <= (time_indvQ1 + 0.5)) {
                $("S" + studentId + "Q1").css("display", "block");
                // done1 = true;
                // stopVideo(studentId,1);
            } else if (event.target.getCurrentTime() >= time_indvQ2 && event.target.getCurrentTime() <= (time_indvQ2 + 0.5)) {
                $("S" + studentId + "Q2").css("display", "block");
                // done2 = true;
                // stopVideo(studentId,2);
            } else if (event.target.getCurrentTime() >= time_grpFrml && event.target.getCurrentTime() <= (time_grpFrml + 0.5)) {
                $("#groupQ0").css("display", "block");
            } else if (event.target.getCurrentTime() >= time_grpQ1 && event.target.getCurrentTime() <= (time_grpQ1 + 0.5)) {
                $("#groupQ1").css("display", "block");
            } else if (event.target.getCurrentTime() >= time_grpQ2 && event.target.getCurrentTime() <= (time_grpQ2 + 0.5)) {
                $("#groupQ2").css("display", "block");
            } 
            if (event.target.getCurrentTime() >= len_video && event.target.getCurrentTime()) {
                event.target.pauseVideo();
                setTimeout(continueVideo, 20000, 4);
            }
        },
        500
    );
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //   setTimeout(stopVideo, 6000);
    //   done = true;
    // }
    if (event.data == YT.PlayerState.PLAYING) {
        $("#S1Q1").css("display", "none");
        $("#S1Q2").css("display", "none");
        $("#S2Q1").css("display", "none");
        $("#S2Q2").css("display", "none");
        $("#groupQ0").css("display", "none");
        $("#groupQ1").css("display", "none");
        $("#groupQ2").css("display", "none");
    }
}


// function stopVideo(studentId, questionId) {
//     var div_name = "S" + studentId + "Q" + questionId;
//     $(div_name).css("display", "block");
//     player.pauseVideo();
// } 

// function handleAnswer(questionId, correctAnswer, fdbckA, fdbckB, fdbckC) {
//     $("#btnS1Q1").html("<button onclick=\"continueVideo("S1Q1")\" class=\"button\">Continue</button>");
//     var A = $("input[id=" questionId + "A]:checked").val();
//     var B = $("input[id=" questionId + "B]:checked").val();
//     var C = $("input[id=" questionId + "C]:checked").val();
//     if (correctAnswer) {
//         str = "<p>Great job, you’re right! Do you understand why?</p>";
//     } else if (A || C) {
//         str = "<p>Oops, you missed it. Don’t worry, you’ll learn it in a bit.</p>";
//     }
//     $("#S1A1").html(str);
// }


// function handleS1Q1() {
//     var answer = "A";
//     handleAnswer("S1Q1", answer, fdbckA, fdbckB, fdbckC)


// Handle answers to individual questions
// function handleS1Q1() {
//     $("#btnS1Q1").html("<button onclick=\"continueVideo("S1Q1")\" class=\"button\">Continue</button>");
//     var A = $("input[id=S1Q1A]:checked").val();
//     var B = $("input[id=S1Q1B]:checked").val();
//     var C = $("input[id=S1Q1C]:checked").val();
//     var str = ""
//     if (B) {
//         str = "<p>Great job, you’re right! Do you understand why?</p>";
//     } else if (A || C) {
//         str = "<p>Oops, you missed it. Don’t worry, you’ll learn it in a bit.</p>";
//     }
//     $("#S1A1").html(str);
// }

// function handleS1Q2() {
//     $("#btnS1Q2").html("<button onclick=\"continueVideo("S1Q2")\" class=\"button\">Continue</button>");
//     var A = $("input[id=S1Q2A]:checked").val();
//     var B = $("input[id=S1Q2B]:checked").val();
//     var C = $("input[id=S1Q2C]:checked").val();
//     var str = ""
//     if (B) {
//         str = "<p>Correct, you got it!</p>";
//     } else if (A || C) {
//         str = "<p>That’s not right. Pay attention to the explanation and see why you got it wrong.</p>";
//     }
//     $("#S1A3").html(str);
// }

// function handleS2Q1() {
//     $("#btnS2Q1").html("<button onclick=\"continueVideo("S2Q1")\" class=\"button\">Continue</button>");
//     var A = $("input[id=S2Q1A]:checked").val();
//     var B = $("input[id=S2Q1B]:checked").val();
//     var C = $("input[id=S2Q1C]:checked").val();
//     var str = ""
//     if (B) {
//         str = "<p>Great job, you’re right! Do you understand why?</p>";
//     } else if (A || C) {
//         str = "<p>Oops, you missed it. Don’t worry, you’ll learn it in a bit.</p>";
//     }
//     $("#S2A1").html(str);
// }

// function handleS2Q2() {
//     $("#btnS2Q2").html("<button onclick=\"continueVideo("S2Q2")\" class=\"button\">Continue</button>");
//     var A = $("input[id=S2Q2A]:checked").val();
//     var B = $("input[id=S2Q2B]:checked").val();
//     var C = $("input[id=S2Q2C]:checked").val();
//     var str = ""
//     if (A) {
//         str = "<p>Correct, you got it!</p>";
//     } else if (A || C) {
//         str = "<p>That’s not right. Pay attention to the explanation and see why you got it wrong.</p>";
//     }
//     $("#S2A2").html(str);
// }

// function continueVideo(div_name) {
//     $(div_name).css("display", "none");
//     player.playVideo();
// }


// Original
// function handleQ1() {
//     $("#btnq1").html("<button onclick=\"continueVideo(1)\" class=\"button\">Continue</button>");
//     var A = $("input[id=A1]:checked").val();
//     var B = $("input[id=B1]:checked").val();
//     var C = $("input[id=C1]:checked").val();
//     var D = $("input[id=D1]:checked").val();
//     var str = ""
//     if (A && C && !B && !D) {
//         str = "<p>Great job! You got it right!</p>";
//     } else if (!B && !D && (A || C)) {
//         str = "<p>You are almost there, missing only one correct answer. The correct answer is A and C.</p>";
//     } else if (A || C) {
//         str = "<p>Your answers are partially correct. Nice try! The correct answer is A and C.</p>";
//     } else {
//         str = "<p>Oops, you didn’t catch the correct answers. Seems like you will learn a lot today! The correct answer is A and C.</p>";
//     }
//     $("#answer1").html(str);
// }

// function handleQ2() {
//     $("#btnq2").html("<button onclick=\"continueVideo(2)\" class=\"button\">Continue</button>");
//     var A = $("input[id=A2]:checked").val();
//     var B = $("input[id=B2]:checked").val();
//     var C = $("input[id=C2]:checked").val();
//     var str = "";
//     if (!A && !B && C) {
//         str = "<p>Nice job! Your answer is correct. Let’s move on to see the explanation.</p>";
//     } else {
//         str = "<p>Oops, you didn’t catch the correct answer C. Let’s continue to see why we should choose C.</p>";
//     }
//     $("#answer2").html(str);
// }

// function continueVideo(id_num) {
//     if (id_num == 1) {
//         finish1 = true;
//     } else if (id_num == 2) {
//         finish2 = true;
//     }
//     var id = "#invent"+id_num;
//     $(id).css("display", "none");
//     player.playVideo();
// }

