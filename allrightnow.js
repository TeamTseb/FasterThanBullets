
//Begin code with variable initalization
var shipSprite = document.getElementById("nisosPNG");
var testSquare;

var background = new Image();
//There's one way
background.src = document.getElementById("S1background");
//And then there's another
background.src = "images/backgrounds/stage1.png"
//But neither work!

//When the background image is loaded, draw the image at 0,0 on the canvas
background.onload = function(){
	ctx.drawImage(background,0,0);
}

//Starts a new game with square frame useing the squareFrame constructor
//The shipFrame constructor dosen't want to work with the shipFrame constructor
function startGame() {
	testSquare = new squareFrame(50, 50, "black", 617.5, 312.5);
	//testShip = new shipFrame(50, 50, "shipSprite");
	//Starts the canvas (known as SpaceStage)
	SpaceStage.start();
}

//Creats a new variable called SpaceStage with a whole bunch of parameters
var SpaceStage = {
	//Canvas is now a element within the HTML file known as "canvas"
	canvas : document.createElement("canvas"),
	//creats a start function
	start : function() {
		//Sets the width of the canvas to 1235
		this.canvas.width = 1235;
		//Sets height of the canvas to 625
		this.canvas.height = 625;
		//Makes the canvas 2 dimensional
		this.context = this.canvas.getContext("2d");
		//Not exactly sure what this does...
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		//Not to sure how this functions either
		this.frameNo = 0;
		//Sets the refresh interval for the canvas (SpaceStage) to be 20
		//Calls upon the updateSpaceStage function to refresh the canvas
		this.interval = setInterval(updateSpaceStage, 20);
		//Adds an EventListener to the canvas to check is a key is pressed down
		window.addEventListener('keydown',function (e){
			e.preventDefault();
			SpaceStage.keys = (SpaceStage.keys || []);
			SpaceStage.keys[e.keyCode] = (e.type == "keydown");
		})
		//Also adds an EventListener to check if a key is released
		window.addEventListener('keyup', function (e) {
			SpaceStage.keys[e.keyCode] = (e.type =="keydown");
		})

	},
	//Stop haults the refreshing of the canvas 
	stop : function() {		
		clearInterval(this.interval);
	},
	//Clear completly wipes the canvas, possobly drawing a big "clear(white?" rectangle at 0,0
	//With the exact same dimensions as the canvas's width and height
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width,this.canvas.height);
	}
}

/*
	Creats a new function called squareFrame with the parameters
	width, height, color, x (position), y (position) and shapetype (square, circle, oval, dodecahedron)
*/
function squareFrame(width, height, color, x, y, square) {

		//Fills in parameters for parentheses above
		this.type = square;
		this.width = width;
		this.height = height;
		this.speed = 0;
		this.angle = 0; 
		this.moveAngle = 0;
		this.x = x;
		this.y = y;
	
	//Updates the square created under the squareFrame function	
	this.update = function() {
		
		// ctx is what is on SpaceStage
		ctx = SpaceStage.context;
		ctx.save();
		//Translates the new square to it's new position
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		//Fills the square to a color
		ctx.fillStyle = color;
		// ???
		ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
		// ??? (Questions and Uncertianty Part 2: Electric Confusaloo)
		ctx.restore();

	}
	//Current home of the only functional lines of rotation code
	this.newPos = function() {
		
		this.angle += this.moveAngle * Math.PI / 180;
		this.x += this.speed * Math.sin(this.angle);
		this.y -= this.speed * Math.cos(this.angle);

	}
}

// Exactly the same as squareFrame, it just dosen't work
function shipFrame(x, y, image, type) {

		//I have a feeling ship isn't a pre-defined shape...
		this.type = ship;
		//This looks wrong as well
		this.image = image;
		this.speed = 0;
		this.angle = 0;
		this.moveAngle = 0;
		this.x = x;
		this.y = y;

	/*
	Meant to move the ship to the other 
	side of the canvas when it touches it
	but it dosen't work at all. It dosen't
	break or affect anything as far as I know 
	though so I guess there's no point in 
	commenting it out or anything...
	*/
	this.update = function() {

		if (this.x > game.canvas.width) {
				this.x -= game.canvas.width;
			}
			if (this.x < 0) {
				this.x += game.canvas.width;
			}
			if (this.y > game.canvas.height) {
				this.y -= game.canvas.height;
			}
			if (this.y < 0) {
				this.y += game.canvas.height;
		}

		//The same as what's above
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

//Updates the canvas based on user input 
function updateSpaceStage() {
	SpaceStage.clear();
	
	//Don't remind me what this line was for...
	//---------------------------------------------\\

	/*
	Speed and angle are at 0 by default 
	because the square starts when it is
	not in motion and pointing diretly
	upwards
	*/
	testSquare.moveAngle = 0;
	testSquare.speed = 0;

	/*
		Checks for user input. EventListeners are initalized at the bottom half of
		the first function within the SpaceStage function
	*/

	//65 is A (left) 
	if (SpaceStage.keys && SpaceStage.keys[65]) {testSquare.moveAngle = -2; }
	//68 is D (right)
    if (SpaceStage.keys && SpaceStage.keys[68]) {testSquare.moveAngle = 2; }
    //87 is W (up)
    if (SpaceStage.keys && SpaceStage.keys[87]) {testSquare.speed= 2; }
    //83 is S (down)
    if (SpaceStage.keys && SpaceStage.keys[83]) {testSquare.speed= -2; }
    
    //Runs the new position function for the testSquare
    testSquare.newPos();
    /*
    	Updates the position, speed, rotation and everything else about 
    	the testSquare by running the update function
    */
    testSquare.update();
}

/*
	The exact same about everything above, just not in use
	And probably will not be put to use as the Ship and the 
	testSquare do not want to load at the same time
*/
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

// ASCII Art, because why not?

/*
###########################+++++###########
##########++++++++++++#++''''''''''+++++###
########++++++++++++++++++++++++++++++#####
####++:++'++++++++++++++++++++++''';;+,'###
###:,+,,,;;'';;;;;''+#@+++++++'''':..,:+###
###+:;';.;;'++++++#@.` #@++++++'';.::;++###
##+',;;:,;`;'++#@' `` `` ,@##+'';,+::',:###
##+'.:.,,+:;;,`              .;';`;.,:;'++#
##+';.',.:: `.:'+         '';,.`,+,,,..'+##
##++';`'+:.'`+###;        ####+, ';+;;:'+##
###++';: ':,: +###        ###+'`;';:.:'++##
###++';::`+::.;+#@       `##+'.:;:::;''+++#
####++'';;,''; '+#       ;#+','':,,''++++##
####++++''; +++ '#       ++'.'':, ''++++###
#####++++'' .'.+ +       #'`::'`;''++++####
###+++'';;; ;,'#+`.      +:'.;, #;''''++###
#####++++++ +;`@;+       ,@'#.` #+++++#####
#####++++++`'+;.+@+      @+#`:+ #+++++#####
##+++';::,,`'#+;'++:    ++#,,+# @;;;'+++###
######+++++.:##+;'@#.  ;##;,+## #+++++#####
######+++++:.###+,'++  @#;:+##@ #+++++#####
###+++'''';; ####+,,:.+#:;+###@ +''''++####
######+++++# ####+;``## :'+###+ ++++++#####
####++'''''@ @###+: ## ,,'+###,.''''+++####
######+++++# ###+; ## ;;::'### +++++++#####
#####+++++++`:#+; @#.  #+,:'## @++++++#####
#####+++++++' +;`@+,    @#.:'# ++++++++####
####++++''';# '.@+::   ; ##`:.,;'''''+++###
#####++++++'' `@+;:'.  +; ##` +'+++++++####
#####+++++'';,@+':'#;  #+;`#@ :;'++++++####
#####++++'';,+'+:;+##  ##+;.+@`:''+++++####
####++++';:.''# ;+##@ .###+`,+@.:;'+++++###
####+++';: #;@, .###@ '#### :,'@`:''+++####
####++';`+#;@.,+ @### ####  ;.#;#,:;'++####
####+':`##;#`:'+: @##`@##. #': #;#+:;++####
###++;:@#'##:''+#` @#,@#. @+'',##;#+:'+####
###+':.####.;''';#` @:@` @''+';`##+#.;+####
####':+@##`;'+++++#,`:  @+++++':'##@+:+####
####+;;';.:'+++++++#+``@+++++++':.@##:+####
#####+;.:;'+++++++++###+++++++++;::.,'+####
######+'+++++++++++++++++++++++++';;'+#####
#################################+++#######
###########################################

*/

