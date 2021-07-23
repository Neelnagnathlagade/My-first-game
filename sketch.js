var canvas, backgroundImage;

var form, player, game;

var ground,groundImg;
var car1;
var obstacles;
var obstacleGroup;
var jet;
var jetGroup;
var reStart,reStartImage;
var gameover,gameoverImage;
var coin,coinImage,coinGroup;
var score=0
var PLAY=1
var END=0
var gameState=PLAY



function preload(){
  groundImg=loadImage("images/track.png")
  car1=loadImage("images/car1.png")
  obstacleImage=loadImage("images/obstacles1.png")
  jetImage=loadImage("images/jet.png")
  gameoverImage=loadImage("images/game over.png")
  reStartImage=loadImage("images/restart.png")
  coinImage=loadImage("images/coin.png")

  
}

function setup(){
  canvas = createCanvas(600, 600);
  
  ground=createSprite(300,300)
    ground.addImage(groundImg)
    ground.scale=1.9
    
  
  player=createSprite(270,450);
    player.shapeColor="red"
    player.addImage(car1)
    player.setCollider("rectangle",0,0,20,100)
    player.debug=false


    gameover=createSprite(300,300)
    gameover.addImage(gameoverImage)
    gameover.visible=false
    gameover.scale=0.5
    
    reStart=createSprite(300,420)
    reStart.addImage(reStartImage)
    reStart.visible=false


    obstacleGroup=new Group()
    jetGroup=new Group()
    coinGroup=new Group()

    
   
  
    //player.collide(ground)

}


function draw(){
  background(225)
 /* camera.position.x = displayWidth/2;
  camera.position.y = player.y*/
  drawSprites()
  if(gameState===PLAY){
    if(ground.y>600){
      ground.y=ground.height/2
    
    }
    ground.velocityY=+5

    if(keyDown(RIGHT_ARROW)){
      player.x=player.x+4
    }
    if(keyDown(LEFT_ARROW)){
      player.x=player.x-4
    }
    if(player.isTouching(obstacleGroup)||player.isTouching(jetGroup)){
      gameState=END
    }
    obstacle()
    jets()
    coins()


    if(player.isTouching(coinGroup)){
      coinGroup.destroyEach()
      score=score+2
    }
  }
  if(gameState===END){

    gameover.visible=true
    obstacleGroup.setVelocityYEach(0)
    obstacleGroup.destroyEach()
    ground.velocityY=0

    jetGroup.setVelocityYEach(0)
    jetGroup.destroyEach()

    reStart.visible=true


  }
  if(mousePressedOver(reStart)){
    gameState=PLAY
    score=0
    gameover.visible=false
    reStart.visible=false
  }
textSize(20)
fill("black")
text("score:"+score,520,50)
  
  
    
  
  
 
 
  

}
function obstacle(){
  if(frameCount%105===0){
    obstacles=createSprite(random(40,580),0)
    obstacles.velocityY=+15
    obstacles.lifetime=250  
    obstacles.addImage(obstacleImage)
    obstacles.scale=0.2
    obstacleGroup.add(obstacles)

    

    }

  }
   function jets(){

    
    if(frameCount%100===0){
      jet=createSprite(random(20,580),0)
      jet.velocityY=+25
      jet.lifetime=250  
    jet.addImage(jetImage)
    jet.scale=0.3
    jetGroup.add(jet)
   
    }
    
   }

   function coins(){

    if(frameCount%90===0){
      coin=createSprite(random(20,580),0)
      coin.velocityY=+25
      coin.lifetime=250  
      coin.addImage(coinImage)
    coin.scale=0.3
    coinGroup.add(coin)

   }
  }





