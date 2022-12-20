song = "";
leftwristx = 0;
leftwristy = 0;

rightwristx = 0;
rightwristy = 0;

scorerightwrist = 0;
scoreleftwrist = 0;
function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotposes);
}

function stop(){
    song.stop();
}

function pause(){
    song.pause();
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("left wrist score = "+ scoreleftwrist);

        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("right wrist score = "+ scorerightwrist);

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("leftwristx = " + leftwristx + "leftwristy = " + leftwristy);

        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("rightwristx = " + rightwristx + "rightwristy = " + rightwristy);
    }
}

function modelloaded(){
    console.log("model is initialized");
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("FF0000");
    if(scoreleftwrist > 0.2){
        circle(leftwristx,leftwristy, 20);
        numberleftwristy = Number(leftwristy);
        removedecimal = floor(numberleftwristy);
        volume = removedecimal/500;
        document.getElementById("volume").innerHTML = "volume = "+ volume;
        song.setVolume(volume);
    }

    if(scorerightwrist > 0.2){
        circle(rightwristx, rightwristy, 20);
        if(rightwristy > 0 && rightwristy <= 100){
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }

        else if(rightwristy > 100 && rightwristy <= 200){
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }

        else if(rightwristy > 200 && rightwristy <= 300){
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }

        else if(rightwristy > 300 && rightwristy <= 400){
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        }

        else if(rightwristy > 400 && rightwristy <= 500){
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}