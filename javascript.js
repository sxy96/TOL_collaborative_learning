// Direct students to different videos based on their role in a pair
var studentId;
var videoURL = "";
var videoId = "";
function makeStudentPairs() {
    // $("#btnq0").html("<button onclick=\"loadVideo(videoId)\" class=\"button\">Submit</button>");
    var s1 = $("input[id=Q0S1]:checked").val();
    var s2 = $("input[id=Q0S2]:checked").val();
    if (s1) {
        studentId = 1;
        videoURL = "https://youtu.be/Rv87bbUwYJk";
        videoId  = "Rv87bbUwYJk";
    } else if (s2){
        studentId = 2;
        videoURL = "https://youtu.be/1aJNxWY9kzs";
        videoId  = "1aJNxWY9kzs";
    }
    player.loadVideoById(videoId);
}

// 2. This code loads the IFrame Player API code asynchronously.
var tag1 = document.createElement('script');
tag1.src = "https://www.youtube.com/iframe_api";
var tag2 = document.createElement('script');
tag2.src = "https://code.jquery.com/jquery-3.3.1.js";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag1, firstScriptTag);
firstScriptTag.parentNode.insertBefore(tag2, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '720',
        width: '1080',                                  //
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
// var time_prTeach
// var time_grpFrml;                                               //
// var time_grpQ1;                                               //
// var time_grpQ2;                                               //

var time_indvQ1 = 93.5;
var time_indvQ2 = 150.5;
var time_prTeach = 190;
var time_grpFrml = 206;
var time_grpQ1 = 272.5;
var time_grpQ2 = 311; 
var len_video = 315;

// if (studentId == 1){
//     time_indvQ1 = 93.5;
//     time_indvQ2 = 150.5;
//     time_prTeach = 190; //
//     time_grpFrml = 206;
//     time_grpQ1 = 272.5;
//     time_grpQ2 = 311;                                             
// } else if (studentId == 2){
//     time_indvQ1 = 92;
//     time_indvQ2 = 152;
//     time_prTeach = 190; //
//     time_grpFrml = 210;
//     time_grpQ1 = 275.5;
//     time_grpQ2 = 314.5;   
// }

function onPlayerReady(event) {
    event.target.playVideo();
    setInterval(
        function() {
            if (event.target.getCurrentTime() >= time_indvQ1 && event.target.getCurrentTime() <= (time_indvQ1 + 0.5)) {
                stopVideo("#S" + studentId + "Q1");
                // done1 = true;
                // stopVideo(studentId,1);
            } else if (event.target.getCurrentTime() >= time_indvQ2 && event.target.getCurrentTime() <= (time_indvQ2 + 0.5)) {
                // $("S" + studentId + "Q2").css("display", "block");
                stopVideo("#S" + studentId + "Q2");
                // done2 = true;
                // stopVideo(studentId,2);
            } else if (event.target.getCurrentTime() >= time_grpFrml && event.target.getCurrentTime() <= (time_grpFrml + 0.5)) {
                stopVideo("#finishPeerTeach");
                // $("#groupQ0").css("display", "block");
            } else if (event.target.getCurrentTime() >= time_grpFrml && event.target.getCurrentTime() <= (time_grpFrml + 0.5)) {
                stopVideo("#groupQ0");
                // $("#groupQ0").css("display", "block");
            } else if (event.target.getCurrentTime() >= time_grpQ1 && event.target.getCurrentTime() <= (time_grpQ1 + 0.5)) {
                stopVideo("#groupQ1");
                // $("#groupQ1").css("display", "block");
            } else if (event.target.getCurrentTime() >= time_grpQ2 && event.target.getCurrentTime() <= (time_grpQ2 + 0.5)) {
                stopVideo("#groupQ2");
                // $("#groupQ2").css("display", "block");
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
    if (event.data == YT.PlayerState.PLAYING) {
        $("#makePairs").css("display", "none");
        $("#S1Q1").css("display", "none");
        $("#S1Q2").css("display", "none");
        $("#S2Q1").css("display", "none");
        $("#S2Q2").css("display", "none");
        $("#finishPeerTeach").css("display", "none");
        $("#groupQ0").css("display", "none");
        $("#groupQ1").css("display", "none");
        $("#groupQ2").css("display", "none");
    }
}

function stopVideo(div_name) {
    $(div_name).css("display", "block");
    player.pauseVideo();
} 

function continueVideo(div_name) {
    $(div_name).css("display", "none");
    player.playVideo();
}

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

var questionId = "";

// Handle answers to individual questions
function handleS1Q1() {
    questionId = S1Q1;
    $("#btnS1A1").html("<button onclick=\"continueVideo(questionId)\" class=\"button\">Continue</button>");
    var A = $("input[id=S1Q1A]:checked").val();
    var B = $("input[id=S1Q1B]:checked").val();
    var C = $("input[id=S1Q1C]:checked").val();
    var str = ""
    if (B) {
        str = "<p>Great job, you’re right! Do you understand why?</p>";
    } else if (A || C) {
        str = "<p>Oops, you missed it. Don’t worry, you’ll learn it in a bit.</p>";
    }
    $("#S1A1").html(str);
}

function handleS1Q2() {
    questionId = S13;
    $("#btnS1A1").html("<button onclick=\"continueVideo(questionId)\" class=\"button\">Continue</button>");
    var A = $("input[id=S1Q2A]:checked").val();
    var B = $("input[id=S1Q2B]:checked").val();
    var C = $("input[id=S1Q2C]:checked").val();
    var str = ""
    if (B) {
        str = "<p>Correct, you got it!</p>";
    } else if (A || C) {
        str = "<p>That’s not right. Pay attention to the explanation and see why you got it wrong.</p>";
    }
    $("#S1A2").html(str);
}

function handleS2Q1() {
    questionId = S2Q1;
    $("#btnS2A1").html("<button onclick=\"continueVideo(questionId)\" class=\"button\">Continue</button>");
    var A = $("input[id=S2Q1A]:checked").val();
    var B = $("input[id=S2Q1B]:checked").val();
    var C = $("input[id=S2Q1C]:checked").val();
    var str = ""
    if (B) {
        str = "<p>Great job, you’re right! Do you understand why?</p>";
    } else if (A || C) {
        str = "<p>Oops, you missed it. Don’t worry, you’ll learn it in a bit.</p>";
    }
    $("#S2A1").html(str);
}

function handleS1Q2() {
    questionId = S2Q2;
    $("#btnS2A2").html("<button onclick=\"continueVideo(questionId)\" class=\"button\">Continue</button>");
    var A = $("input[id=S2Q2A]:checked").val();
    var B = $("input[id=S2Q2B]:checked").val();
    var C = $("input[id=S2Q2C]:checked").val();
    var str = ""
    if (A) {
        str = "<p>Correct, you got it!</p>";
    } else if (B || C) {
        str = "<p>That’s not right. Pay attention to the explanation and see why you got it wrong.</p>";
    }
    $("#S2A2").html(str);
}

// Continue watching the video after finish peer teach
function finishPeerTeach() {
    continueVideo("#finishPeerTeach");
}

// Handle group questions
function handleGroupQ0() {
    questionId = groupQ0;
    $("#btnGrpQ0").html("<button onclick=\"continueVideo(questionId)\" class=\"button\">Continue</button>");
    var A = $("input[id=GrQ0A]:checked").val();
    var B = $("input[id=GrQ0B]:checked").val();
    var C = $("input[id=GrQ0C]:checked").val();
    var D = $("input[id=GrQ0D]:checked").val();
    var str = ""
    if (C) {
        str = "<p>Correct, you got it!</p>";
    } else if (A || B || D) {
        str = "<p>That’s not right. Pay attention to the explanation and see why you got it wrong.</p>";
    }
    $("#groupQ0").html(str);
}

function handleGroupQ1() {
    questionId = groupQ1;
    $("#btnGrpQ1").html("<button onclick=\"continueVideo(questionId)\" class=\"button\">Continue</button>");
    var A = $("input[id=GrQ1A]:checked").val();
    var B = $("input[id=GrQ1B]:checked").val();
    var C = $("input[id=GrQ1C]:checked").val();
    var str = ""
    if (C) {
        str = "<p>Good job!</p>";
    } else if (A || B || D) {
        str = "<p>Oops! Seems like you didn’t fully understand the concept.</p>";
    }
    $("#groupQ1").html(str);
}

function handleGroupQ2() {
    questionId = groupQ1;
    $("#btnGrpQ2").html("<button onclick=\"continueVideo(questionId)\" class=\"button\">Continue</button>");
    var A = $("input[id=GrQ2A]:checked").val();
    var B = $("input[id=GrQ2B]:checked").val();
    var C = $("input[id=GrQ2C]:checked").val();
    var str = ""
    if (C) {
        str = "<p>Good job!</p>";
    } else if (A || B || D) {
        str = "<p>Oops! Seems like you didn’t fully understand the concept.</p>";
    }
    $("#groupQ2").html(str);
}

