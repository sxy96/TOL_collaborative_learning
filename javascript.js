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
        videoURL = "https://youtu.be/oe_gqxyFtZM";
        videoId  = "oe_gqxyFtZM";
    } else if (s2){
        studentId = 2;
        videoURL = "https://youtu.be/gfGjdeRn84k";
        videoId  = "gfGjdeRn84k";
    }
    player.loadVideoById(videoId);
    decideIntervalTime(studentId);
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

var time_indvQ1;
var time_indvQ2;
var time_prTch;
var time_grpQ0;
var time_grpQ1;
var time_grpQ2;
var len_video;

function decideIntervalTime(studentId){
    if (studentId == 1){
        time_indvQ1 = 93.5;     //1:33
        time_indvQ2 = 150.5;    //2:30
        time_prTch = 178;       //2:58
        time_grpQ0 = 206;       //3:26
        time_grpQ1 = 272.5;     //4:32
        time_grpQ2 = 311;       //5:11
        len_video = 362;        //6:02                                            
    } else if (studentId == 2){
        time_indvQ1 = 92;       //1:32
        time_indvQ2 = 152;      //2:32
        time_prTch = 180;       //3:00
        time_grpQ0 = 210;       //3:30
        time_grpQ1 = 275.5;     //4:35
        time_grpQ2 = 314.5;     //5:14
        len_video = 366;        //6:06
    }
}
var done1,done2,done3,done4,done5,done6=false;

function onPlayerReady(event) {
    event.target.playVideo();
    setInterval(
        function() {
            if (event.target.getCurrentTime() >= time_indvQ1 && event.target.getCurrentTime() <= time_indvQ1 + 1 && !done1) {
                stopVideo("#S" + studentId + "Q1");
                done1 = true;
                // stopVideo(studentId,1);
            } else if (event.target.getCurrentTime() >= time_indvQ2 && event.target.getCurrentTime() <= time_indvQ2 + 1 && !done2) {
                // $("S" + studentId + "Q2").css("display", "block");
                stopVideo("#S" + studentId + "Q2");
                done2 = true;
            } else if (event.target.getCurrentTime() >= time_prTch && event.target.getCurrentTime() <= time_prTch + 1 && !done3) {
                stopVideo("#finishPeerTeach");
                done3 = true;
            } else if (event.target.getCurrentTime() >= time_grpQ0 && event.target.getCurrentTime() <= time_grpQ0 + 1  && !done4) {
                stopVideo("#GrQ0");
                done4 = true;
            } else if (event.target.getCurrentTime() >= time_grpQ1 && event.target.getCurrentTime() <= time_grpQ1 + 1 && !done5) {
                stopVideo("#GrQ1");
                done5 = true;
            } else if (event.target.getCurrentTime() >= time_grpQ2 && event.target.getCurrentTime() <= time_grpQ2 + 1 && !done6) {
                stopVideo("#GrQ2");
                done6 = true;
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
        $("#GrQ0").css("display", "none");
        $("#GrQ1").css("display", "none");
        $("#GrQ2").css("display", "none");
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
    $("#S1Q1Fdbck").html(str);
}

function handleS1Q2() {
    questionId = S1Q2;
    $("#btnS1A2").html("<button onclick=\"continueVideo(questionId)\" class=\"button\">Continue</button>");
    var blank1 = $("#S1Q2blank1").val();
    var blank2 = $("#S1Q2blank2").val();
    var str = ""
    if (blank1 == "heavier" && blank2 == "balanced") {
        str = "<p>Correct, you got it!</p>";
    } else {
        str = "<p>Corret answer: heavier, balanced</p><p>Remember the previous example, when Anna and Tom sits at the position where the distance from the fulcrum to their seats are the same, the seesaw will lean towards the side where objects are heavier. So when the distance is the same, the heavier the objects are on one side, the more tilted will the seesaw be to that side.</p>";
    }
    $("#S1Q2Fdbck").html(str);
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
    $("#S2Q1Fdbck").html(str);
}

function handleS2Q2() {
    questionId = S2Q2;
    $("#btnS2A2").html("<button onclick=\"continueVideo(questionId)\" class=\"button\">Continue</button>");
    var blank1 = $("#S2Q2blank1").val();
    var blank2 = $("#S2Q2blank2").val();
    var str = ""
    if (blank1 == "farther" && blank2 == "balanced") {
        str = "<p>Correct, you got it!</p>";
    } else {
        str = "<p>Corret answer: farther, balanced</p><p>Remember the previous example, when Anna and Tom are of the same weight, the seesaw will lean towards the side where objects are farther away from the fulcrum. So when the mass is the same, the farther the objects are from the fulcrum, the more tilted will the seesaw be to that objects’ side.</p>";
    }
    $("#S2Q2Fdbck").html(str);
}

// Continue watching the video after finish peer teach
function finishPeerTeach() {
    continueVideo("#finishPeerTeach");
}

// Handle group questions
function handleGrQ0() {
    questionId = GrQ0;
    $("#btnGrQ0").html("<button onclick=\"continueVideo(questionId)\" class=\"button\">Continue</button>");
    var A = $("input[id=GrQ0A]:checked").val();
    var B = $("input[id=GrQ0B]:checked").val();
    var C = $("input[id=GrQ0C]:checked").val();
    var D = $("input[id=GrQ0D]:checked").val();
    var str = ""
    if (C) {
        str = "<p>Good job! You seem to understand how lever works.</p>";
    } else if (A) {
        str = "<p>That’s not right. You seem to understand that to make the lever balanced, m1 should increase with m2, but didn’t get that d1 should also increase with d2.</p>";
    } else if (B) {
        str = "<p>That’s not right. You seem to understand that to make the lever balanced, d1 should increase with d2, but didn’t get that m1 should also increase with m2.</p>";
    } else if (D) {
        str = "<p>That’s not right. You didn’t seem to understand the relationship between m1 and m2 or d1 and d2 in lever principle.</p>";
    }
    $("#GrQ0Fdbck").html(str);
}

function handleGrQ1() {
    questionId = GrQ1;
    $("#btnGrQ1").html("<button onclick=\"continueVideo(questionId)\" class=\"button\">Continue</button>");
    var A = $("input[id=GrQ1A]:checked").val();
    var B = $("input[id=GrQ1B]:checked").val();
    var C = $("input[id=GrQ1C]:checked").val();
    var str = ""
    if (C) {
        str = "<p>Good job! You’ve understood how to apply the lever principle.</p>";
    } else if (A || B) {
        str = "<p>That’s not right. The lever principle tells us: the lever will be balanced when m1d1 = m2d2. In this case, m2 (the mass of the apple) is 1/3 of m1 (the mass of the watermelon). To make the equation tenable, d1 should be 1/3 of d2. Given than the watermelon is as heavy as 3 apples, the watermelon should be placed at point  C. Option C is the right answer.</p>";
    }
    $("#GrQ1Fdbck").html(str);
}

function handleGrQ2() {
    questionId = GrQ2;
    $("#btnGrQ2").html("<button onclick=\"continueVideo(questionId)\" class=\"button\">Continue</button>");
    var A = $("input[id=GrQ2A]:checked").val();
    var B = $("input[id=GrQ2B]:checked").val();
    var C = $("input[id=GrQ2C]:checked").val();
    var str = ""
    if (B) {
        str = "<p>Good job! You’ve understood how to apply the lever principle.</p>";
    } else if (A || C) {
        str = "<p>That’s not right. The lever principle tells us: the lever will be balanced when m1d1 = m2d2. In this case, d1 (the distance of the watermelon to the fulcrum) is 3 times of d1 (the distance of apples to the fulcrum). To make the equation tenable, m2 should be 3 times as m2. Given than the watermelon is as heavy as 3 apples, we should put 9 apples at point A. Option B is the right answer.</p>";
    }
    $("#GrQ2Fdbck").html(str);
}
