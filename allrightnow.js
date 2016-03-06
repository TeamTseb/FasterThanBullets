var shipSprite = document.getElementById("nisosPNG");
var testSquare;

var background = new Image();
background.src = document.getElementById("S1background");


background.onload = function(){
	ctx.drawImage(background,0,0);
}

function startGame() {
	testSquare = new squareFrame(50, 50, "black", 617.5, 312.5);
	//testShip = new shipFrame(50, 50, "shipSprite");
	SpaceStage.start();
}

var SpaceStage = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 1235;
		this.canvas.height = 625;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateSpaceStage, 20);
		window.addEventListener('keydown',function (e){
			e.preventDefault();
			SpaceStage.keys = (SpaceStage.keys || []);
			SpaceStage.keys[e.keyCode] = (e.type == "keydown");
		})
		window.addEventListener('keyup', function (e) {
			SpaceStage.keys[e.keyCode] = (e.type =="keydown");
		})

	},
	stop : function() {		
		clearInterval(this.interval);
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width,this.canvas.height);
	}
}

function squareFrame(width, height, color, x, y, square) {

		this.type = square;
		this.width = width;
		this.height = height;
		this.speed = 0;
		this.angle = 0; 
		this.moveAngle = 0;
		this.x = x;
		this.y = y;
		
	this.update = function() {
		
		ctx = SpaceStage.context;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.fillStyle = color;
		ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
		ctx.restore();

	}
	this.newPos = function() {
		
		this.angle += this.moveAngle * Math.PI / 180;
		this.x += this.speed * Math.sin(this.angle);
		this.y -= this.speed * Math.cos(this.angle);

	}
}

function shipFrame(x, y, image, type) {

		this.type = ship;
		this.image = image;
		this.speed = 0;
		this.angle = 0;
		this.moveAngle = 0;
		this.x = x;
		this.y = y;

	this.update = function() {
		ctx = SpaceStage.context;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.fillStyle = color;
		ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
		ctx.restore();	
	}
	this.newPos = function() {

		this.angle += this.moveAngle * Math.PI / 180;
		this.x += this.speed * Math.sin(this.angle);
		this.y -= this.speed * Math.cos(this.angle);

	}

}

function updateSpaceStage() {
	SpaceStage.clear();
	
	//---------------------------------------------\\

	testSquare.moveAngle = 0;
	testSquare.speed = 0;

	//Square movement

	//65 is A (left) 
	if (SpaceStage.keys && SpaceStage.keys[65]) {testSquare.moveAngle = -2; }
	//68 is D (right)
    if (SpaceStage.keys && SpaceStage.keys[68]) {testSquare.moveAngle = 2; }
    //87 is W (up)
    if (SpaceStage.keys && SpaceStage.keys[87]) {testSquare.speed= 2; }
    //83 is S (down)
    if (SpaceStage.keys && SpaceStage.keys[83]) {testSquare.speed= -2; }
    
    testSquare.newPos();
    testSquare.update();
}

function UpdateSquareStage() {
    //Ship Movement

    testShip.moveAngle = 0;
	testShip.speed = 0;

	//37 is Left Arrow (left) 
	if (SpaceStage.keys && SpaceStage.keys[37]) {testShip.moveAngle = -1; }
	//39 is Right Arrow (right)
    if (SpaceStage.keys && SpaceStage.keys[39]) {testShip.moveAngle = 1; }
    //38 is Up Arrow (up)
    if (SpaceStage.keys && SpaceStage.keys[38]) {testShip.speed= 1; }
    //40 is Down Arrow (down)
    if (SpaceStage.keys && SpaceStage.keys[40]) {testShip.speed= -1; }
    
    testShip.newPos();
    testShip.update();

}


