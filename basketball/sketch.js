

var scene1 = true;
var scene2 = false;
var scene3 = false;



//Scene 1 (Start screen)

var basketballPic
var start = "PRESS ENTER"
var openingText = "  KING     of    the    Court"
var kingCourt



//Scene 2
var sound
var swoosh
var makeShot
var player;
var platform;
var gravity = 0.7;
var jump = 25;
var ball;
var backboard
var powerUp = 0;
var counter = 0;
var timeleft = 60;
var timer = 0;
var rim;
var score = 0;
var justShot = false;
var theScore = "POINTS"
var didScore = false;
var didScoreTimer = 60; // how long to show the niceshot animation 60 = 1 sec
var playBuzz = false;

//Scene 3 End
var gameEnds
var yourScore = "Your Score"



function preload() {
    ballImg = loadImage("balll.png");
    hoop = loadImage("BBALLcoding.png");
    sound = loadSound("JazzSong.mp3");
    swish = loadSound("Swishnoise.mp3");
    makeShot = loadSound("BBALLswish.mp3");
    basketballPic = loadImage("blank Basketball.png");
    kingCourt = loadImage("Cartooncourt.png");
    gameEnds = loadImage("GameOver.png");
	elevatorSong = loadSound ("Elevatorsong.mp3");
  endGame = loadSound("Buzzer.mp3");
}


function setup() {
    createCanvas(1200, 800);
// elevatorSong.play(); //only during scene 1
  // sound.play();/////only during scene 2
    
    niceShot = loadImage("nice shot.png");


    // setInterval (timeIt, 1000);
    player = createSprite(mouseX, mouseY, 60, 60);
    // player.setCollider("rectangle", 0,0, 100,100);
    ballImg.resize(100, 100);
    player.addImage(ballImg);
    player.friction = 0.01;
    platform = createSprite(20, 790, 100, 20);
    backboard = createSprite(1176, 240, 3, 300);
    hoopCircle = createSprite(1090, 400, 25, 25);
    rim = createSprite(1012, 389, 1, 25);
    rim.visible = false;
    hoopCircle.visible = false;
    // hoopCircle.setCollider("circle", 550, 600, 50);
    player.restitution = 0.8;
    platform.immovable = true;
    backboard.immovable = true;
    rim.immovable = true;
    backboard.shapeColor = color(155, 72, 154);
    platform.shapeColor = color(179, 210, 52);


}


function draw() {
    if (scene1 == true) {
        drawScene1();
      if(!elevatorSong.isPlaying() ){
       elevatorSong.play(); 
        sound.stop();
      }
    } else if (scene2 == true) {
      if(!sound.isPlaying() ){
        elevatorSong.stop();
       sound.play(); 
      }
        // do more stuff
        drawScene2();
    } else if (scene3 == true) {
        drawScene3();
    }
}


////// start Scene 1 

function drawScene1() {
  createCanvas(700,700);
  
 
    push();
    background(0);

    push();
    fill(21, 200, 0);
    noStroke();
    ellipse(random() * 1000, random() * 1000, 30, 30);
    ellipse(random() * 1000, random() * 1000, 30, 30);
    ellipse(random() * 1000, random() * 1000, 30, 30);
    ellipse(random() * 1000, random() * 1000, 30, 30);
    pop();




    stroke(182, 56, 204);
    strokeWeight(10);
    fill(218, 43, 204);
    translate(width, height);
    rotate(PI / 1.02);


    pop();

    image(kingCourt, 0, 80, 700, 550);
    image(basketballPic, 225, 340, 250, 250);

    fill(0);
  
  if(keyDown(ENTER)){
  	scene1=false
    scene2=true
    
  }

    texting();

}

//ONLY FOR SCENE 1
function texting() {
    push();
    fill(21, 200, 0);
    textFont("IMPACT");
    textStyle(ITALIC);
    stroke(182, 56, 204);
    strokeWeight(35);
    textSize(70);
    text(openingText, 25, 180);
    pop();

    fill(182, 56, 204);
    stroke(random(80), random(80), random(80));
    strokeWeight(10);
    rect(240, 430, 200, 80);

    push();
    fill(21, 200, 0);
    textFont("IMPACT");
    textStyle(ITALIC);
    stroke(182, 56, 204);
    textSize(35);
    strokeWeight(5);
    text(start, 248, 485);
    pop();
  





}

//End of Scene 1
///////////


/// Start of Scene 2

function drawScene2() {
  createCanvas(1280,800);
    background(220);
  
  image (hoop, -25, -25, width +100,height+50);
  
   // player.bounce(platform);
  
  
  
  
  player.velocity.y += gravity;
  player.velocity.x += 0;
  
  if(player.bounce(platform)){
    //player.velocity.y=0;
  }
  
  if(player.bounce(backboard) ){
    // player.velocity.x *=-0.7;

  }
  
  if(player.bounce(rim)){
    
  }
  
  /////////NICE SHOT ANIMATION/////////
  
  
  
  if(player.overlap(hoopCircle)){
    if(justShot){
    	score++;
      	justShot = false;
      
      	// turn this on if you scored
      	didScore = true;
      // image(niceShot, 800, 300, 130,100);
      makeShot.play();
    }
  }
  
  // if you scored, draw the nice shot image and subtract from the timer
  // until it's zero, at which point everything gets reset
  if(didScore){
    image(niceShot, 800, 300, 130,100);
    didScoreTimer--;
    if(didScoreTimer <= 0){
     didScore = false; 
      didScoreTimer = 60;
    }
  }
  
  ////////////////////////////////////
  
  
  
  if(keyDown(UP_ARROW)){
  	powerUp += 0.1;
    powerUp = constrain(powerUp, 0, 20);
    
  }
  
  if ( keyWentUp(UP_ARROW) ){
    player.velocity.y = -jump - powerUp;
    player.velocity.x = jump/2 + powerUp/2;
     // player.setSpeed(30, 280);
    swish.play();
  }
  
  

  
  push();
  	fill(179,210,52);
	stroke(0);
  	strokeWeight(5);
  rect(800,790, 50, 1 - powerUp*15);
  pop();
 
  
  
  drawSprites();
  
  
  
  fill (0);
  stroke (188,80,158);
  strokeWeight (5);
  rect (1190, 270,80, 70);   
  textSize(35);
  text(timeleft, 1212, 315);
  
  textSize(60);
  text(score, 1215,190);
  
  textSize(15);
  textStyle (BOLD);
  text(theScore, 1205, 130);
  
  
  if( frameCount % 60 == 0){
   timeleft --; 
  }
  
  if(timeleft < 0){
   timeleft=0; 
  }
  
  
  /////////NICE SHOT ANIMATION/////////
  
  //BUZZER PLAYS THROUGHOUT for some reason
  
  // you had an extra semicolon in here
  if(timeleft == 0){
    playBuzz = true;
    scene2=false;
    scene3=true;
   
    // just play the sound once

    if(playBuzz){
    endGame.play();
    timeleft = 60;
    playBuzz = false;
    }
  }
  /////////////////////////////////////
  
  
  if(player.position.x > width + 20){
   resetLevel(); 
  }
  
  if(player.position.y > height + 20){
    resetLevel();
  }
  
}



function mousePressed(){
  
  resetLevel();
}


function resetLevel(){
 var randX = random(0, 470);
  var randY = random(255, height);
  
  platform.position.x = randX;
  platform.position.y = randY;
  
  player.position.x = randX;
  player.position.y = randY - 65;
  
  player.velocity.x = 0;
  player.velocity.y = 0;
  
  powerUp = 0;
  
  justShot = true;
  
}

//All Scene 2^^
//////////////////////////




//Start of scene 3

function drawScene3() {
    background(0);

    image(gameEnds, 0, 0, width, height);
    fill(21, 200, 0);
    textFont("IMPACT");
    textStyle(ITALIC);
    strokeWeight(30);
    stroke(182, 56, 204);
    textSize(70);
    text(yourScore, 450, 525);


    fill(182, 56, 204);
    stroke(21, 200, 0);
    strokeWeight(3);
    rect(205, 300, 800, 5);

    fill(182, 56, 204);
    stroke(21, 200, 0);
    strokeWeight(5);
    rect(480, 720, 250, 10);

  	textSize (100)
  	text(score, 565,718);


}