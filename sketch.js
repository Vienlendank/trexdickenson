
var trex ,trex_running,ground_image,cloud,cloud_image,pen,demon_face1,demon_face2,demon_face3,demon_face4,demon_face5,demon_face6;
var gameState='live'
var score
var gay
var unicorn
var gameover,gameover_image,restart,restart_image
var sound_dead, sound_jump, sound_checkpoint, trex_dead, trex_dead_animation
function preload(){ 
trex_running=loadAnimation('trex3.png','trex4.png')
ground_image=loadImage('ground2.png')
cloud_image=loadImage('cloud.png')
demon_face1=loadImage('obstacle1.png')
demon_face2=loadImage('obstacle2.png')
demon_face3=loadImage('obstacle3.png')
demon_face4=loadImage('obstacle4.png')
demon_face5=loadImage('obstacle5.png')
demon_face6=loadImage('obstacle6.png')
gameover_image=loadImage('gameOver.png')
restart_image=loadImage('restart.png')
sound_dead=loadSound('die.mp3')
sound_jump=loadSound('jump.mp3')
sound_checkpoint=loadSound('checkpoint.mp3')
trex_dead_animation=loadAnimation('trex_collided.png')
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
 trex=createSprite(50,180,20,50)
 trex.addAnimation('run',trex_running)
 trex.addAnimation('dead',trex_dead_animation)
 trex.scale=1/2
 ground=createSprite(200,180,400,10)
 ground.addImage(ground_image)
 bottom_line=createSprite(200,190,400,10)
 bottom_line.visible=false
 score=0
 //creating group cloud and cacti 
 gay=createGroup()
 unicorn=new Group()
 //creating restart and gameover
 gameover=createSprite(300,100,30,30)
 gameover.addImage(gameover_image)
 gameover.scale=1/2
 restart=createSprite(300,130,30,30)
 restart.addImage(restart_image)
 restart.scale=0.3
}


function draw(){
  background("steelblue")
  fill ('pink')
  text ('Score: '+score,450,20)
  
  if(gameState=='live'){
    //making gameover and restart disappear
    gameover.visible=false
    restart.visible=false
     //moving the ground
     ground.velocityX=-2 
     //increasing the score
     score=score+Math.round(getFrameRate()/60)
     //making trex jump
     if(keyDown('space')&&trex.collide(ground)){
      trex.velocityY=-20
      sound_jump.play()
    }
    // 500checkpoints to check
    if(score%500==0&&score>0){
      sound_checkpoint.play()
    }
    //making the ground infinite by 
    if(ground.x<0){
      ground.x=200
    }
    
    //gravity to trex and whoever did the if block is the gayest person
    trex.velocityY=trex.velocityY+2
    clouds()
ghost()

// check for collision of trex and cactus
if (trex.isTouching(gay)){
  gameState='dead'
  sound_dead.play()
}
  }
  else if (gameState=='dead'){
    gameover.visible=true
    restart.visible=true
    //stoping the ground
    ground.velocityX=0
    //freezing cacti and cloud
    unicorn.setVelocityXEach(0)
    gay.setVelocityXEach(0)
    trex.velocityY=0
  unicorn.setLifetimeEach(-10)
  gay.setLifetimeEach(-10)
trex.changeAnimation('dead')
//making the restart button active
if(mousePressedOver(restart)){
  ugly()
 
}
  }
  
  
   
 trex.collide(bottom_line)

drawSprites()

    
} 
function ugly(){
  gameState='live'
  gay.destroyEach()
  unicorn.destroyEach()
  trex.changeAnimation('run')
  score=0
}
function clouds(){

 if(frameCount%100==0){
  cloud=createSprite(610,20,20,20)
  unicorn.add(cloud)
  cloud.addImage(cloud_image)
  cloud.velocityX=-2
  cloud.y=Math.round(random(20,80))
  trex.depth=cloud.depth+1
  cloud.lifetime=650
 }

 }
 function ghost(){
   if(frameCount%40==0){
   demon_face=createSprite(610,160,5,5) 
  gay.add(demon_face)
   demon_face.velocityX=-7-score*2/100   
   demon_face.depth=trex.depth-1
   demon_face.x=Math.round(random(600,699))
  demon_face.lifetime=650
   demon_face.scale=1/3
   var stupid=Math.round(random(1,6))
   switch(stupid){
case 1: demon_face.addImage(demon_face1)
break;
case 2: demon_face.addImage(demon_face2)
break;
case 3: demon_face.addImage(demon_face3)
break;
case 4: demon_face.addImage(demon_face4)
break;
case 5: demon_face.addImage(demon_face5)
break;
case 6: demon_face.addImage(demon_face6)
break;
default:break;
   }
   }

 }

