var space,spaceImg;
var ship,shipImg;
var gem,gemImg,gem_group;
var stone,stoneImg,stone_group;
var score=0;
var restart,restartImg;
var gameState = "play";

function preload(){
  spaceImg = loadImage("space.jpg");
  shipImg  = loadImage("ships.png");
  gemImg   = loadImage("gems.png");
  stoneImg = loadImage("stones.png");
  restartImg = loadImage("restart.png");
}

function setup() {
 createCanvas(600,600);
 space = createSprite(300,300);
 space.addImage("tower",spaceImg);
 space.velocityY = 2;
 

 // creating ship
 ship = createSprite(200,200,50,50);
 ship.addImage("ship", shipImg);
 ship.scale = 0.3;
 ship.debug=true;

 // creating groups
 stone_group = new Group();
 gem_group = new Group();

  // creating reload button
  restart = createSprite(300,330);
  restart.addImage("restart", restartImg);
  restart.scale = 0.4;
 
}

function draw() {
  background("black");
  drawSprites();
  textSize(20);
  fill("white")
  text("Score: "+score,50,50 )
  if(gameState === "play")
  {
    restart.visible = false;
    // making infinite background
    if(space.y > 400)
    {
      space.y = 300;
    }

    // ghost moveent left or right 

    if(keyDown("left_arrow"))
    {
      ship.x = ship.x - 3;
    }

    if(keyDown("right_arrow"))
    {
      ship.x = ship.x + 3;
    }
 

  // using for jumping
    if(keyDown("space"))
    {
      ship.velocityY = -10;
    }

    //giving gravity to ship
    ship.velocityY = ship.velocityY + 0.5;

    if(gem_group.isTouching(ship))
    {
      score = score+1;
      gem_group.destroyEach  ();
     
    }

    if(stone_group.isTouching(ship) || ship.y > 600)
    {
      ship.destroy();
      stone_group.destroyEach()
      gameState = "end";
      console.log("Game Over");
    }
    spawnStone();
    spawnGem();
  }


  //ending game
  if(gameState === "end"){
    stroke("purple");
    fill("pink");
    textSize(80);
    text("Game Over", 90,230);
    restart.visible = true;
    space.visible = false;
    stone_group.setVelocityEach(0)
    gem_group.setVelocityEach(0)
    stone_group.destroyEach(0)
    gem_group.destroyEach(0)

    if(mousePressedOver(restart))
    {
      document.location.reload();
    }
   }

  
  

}

function spawnStone()
{ 
  if(frameCount%220 === 0)
  {
  //stones
   var stone = createSprite(200,-50);
   stone.velocityY = 1
   stone.scale = 0.3;
   stone.addImage(stoneImg);
   stone.debug=true;

  // Random Positions
   stone.x = Math.round(random(50,400));   
  
  
  
  stone_group.add(stone);
  stone.lifetime = 600;
 
  }
}

function spawnGem(){
  if(frameCount%150 === 0)
  {
//gems
var gem = createSprite(220,10);
gem.velocityY = 1;
gem.x = Math.round(random(50,400));  
gem.scale = 0.2;  
gem.addImage(gemImg);
gem.debug=true;
gem_group.add(gem);
gem.lifetime = 600;   
ship.depth = gem.depth;
  ship.depth += 1; 
}
}