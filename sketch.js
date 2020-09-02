var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage, climberGroup;
var ghost,ghostImage;
var invisbleBlock,invisbleGroup;
var gameState,PLAY=1,END=0;
var soundi

function preload(){
 towerImage=loadImage("tower.png") 
 doorImage=loadImage("door.png") 
 climberImage=loadImage("climber.png") 
 ghostImage=loadImage("ghost-standing.png") 
 soundi=loadSound("spooky.wav")
}

function setup(){
 createCanvas(600,600)
  tower=createSprite(300,300,10,10);
  tower.addImage("tower",towerImage);
  tower.velocityY=2;
  
  ghost=createSprite(300,300,10,10);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.3;

  climberGroup=new Group()
  doorGroup= new Group()
  invisbleGroup= new Group()
  
 soundi.loop();
  
}
 gameState=PLAY;

function draw(){
    background("white")
  if(gameState===PLAY){
    
    if(tower.y>600){
  tower.y=300;
  }
  if(keyDown(LEFT_ARROW)){
 ghost.x=ghost.x-8;   
  }
   if(keyDown(RIGHT_ARROW)){
 ghost.x=ghost.x+8;   
  }
   if(keyDown("space")){
 ghost.velocityY=-6;   
  }
  ghost.velocityY=ghost.velocityY+0.5;
    
  if(climberGroup.isTouching(ghost)){
  ghost.velocityY=0;  
  }
  if(invisbleGroup.isTouching(ghost)||ghost.y>600){
   ghost.destroy();  
  gameState=END
  }
 spawnDoors();
    
  drawSprites();
   
  } if(gameState===END){
   background("black") 
    fill("white")
    text("Game Over",200,200);
    climberGroup.destroyEach();
     doorGroup.destroyEach();
     invisbleGroup.destroyEach();
    
  }
  



}
function spawnDoors(){
 if(frameCount%240===0){
  door=createSprite(100,0,10,10);
  climber=createSprite(100,50,10,10);
   invisbleBlock=createSprite(100,70,10,10);
   invisbleBlock.visible= false;
  door.x=Math.round(random(200,500));
   door.addImage("door",doorImage);
   climber.addImage("climb",climberImage);
   invisbleBlock.width=climber.width;
   invisbleBlock.x=door.x;
   door.velocityY=2;
    climber.velocityY=2;
    invisbleBlock.velocityY=2;
    climber.x=door.x
   door.lifeime=300;
   climber.lifetime=300;
   invisbleBlock.lifetime=300;
   ghost.depth=door.depth;
   ghost.depth=ghost.depth+1;
   
   doorGroup.add(door)
   climberGroup.add(climber)
   invisbleGroup.add(invisbleBlock)
   
 }
  
}
