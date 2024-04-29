song1 = "";
song2 = "";
scoreLeftWrist = 0;

leftWristX =0;
leftWristY =0;

rightWristX =0;
rightWristY =0;


function preload(){
    
    song1 = loadSound("new_1.mp3");
    song2 = loadSound("new_2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('PoseNet Is Initialized');
}
function draw(){
    img(video,0,0,600,500);
    status_of_song1 = song1.isPlaying()
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20)
        song2.stop()
        if(status_of_song1 == false){
            song1.play()
            document.getElementById("song").innerText = "Song 1";

        }

        
    }

}


function play(){
 song1.play();
 
}
  

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX" +rightWristX+"rightWristY"+rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX" +leftWristX+"leftWristY"+leftWristY);

        
       
    }
}


