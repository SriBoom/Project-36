var dog,sadDog,happyDog, database;
var button1, button2, foodObj, foodStock, food;
var fedTime, lastFed;


function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
  food=loadImage("Milk.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  foodObj=new Food();
  foodStock= database.ref('food');
  foodStock.on("value", readStock);

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
function readStock(data){
    foods=data.val();
    foodObj.updateFoodStock(foods);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  } else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  datbase.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
   foods++;
   database.ref('/').update({
     foods:foods
   });
}