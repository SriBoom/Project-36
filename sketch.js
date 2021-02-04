var dog,sadDog,happyDog;
var button1, button2, foodObj;
var fedTime, lastFed;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(900, 95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  fill(255, 255, 254);
  textSize(15);

  if(lastFed>=12){
    text("Last Feed : 12 AM", 350, 30);
  } else if(lastFed==0){
    text("Last Feed : 12 AM", 350, 30);
  } else{
    text("Last Feed : "+lastFed + "AM", 350, 30);
  }

  drawSprites();
}

//function to read food Stock


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  datbase.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


//function to add food in stock
