//Create variables here
var dog,happyDog;
var database;
var foodS;
var foodStock;



function preload()
{
  //load images here
  i1=loadImage("images/dogImg.png");
  i2=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog=createSprite(250,250);
  dog.addImage(i1);
  dog.scale=0.15
  database=firebase.database()

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(0);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(i2);
}

  drawSprites();
  //add styles here
  text("Food remaining : "+foodS,170,200);
if(foodS===0){
  text("Food completed",180,100);
  dog.addImage(i1)
}
}
function readStock(data){
  foodS=data.val();
  
}

function writeStock(x){
  if(x<=0){
   x=0 
  }
else{
  x=x-1

}

database.ref('/').update({
Food:x
})
}
