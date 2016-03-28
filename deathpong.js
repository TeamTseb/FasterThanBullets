//     ____  _________  ________  ______  ____  _   ________
//    / __ \/ ____/   |/_  __/ / / / __ \/ __ \/ | / / ____/
//   / / / / __/ / /| | / / / /_/ / /_/ / / / /  |/ / / __  
//  / /_/ / /___/ ___ |/ / / __  / ____/ /_/ / /|  / /_/ /  
// /_____/_____/_/  |_/_/ /_/ /_/_/    \____/_/ |_/\____/  

//---------------------------------------------------------------------------------------------------
//	When refreing to the construction of this game (Specifically the paddle and colision detection) |
//	I've been basing it on almost completly on Atari Breakout. But this game takes place mainly on  |
//	The Y axis, not the X axis. So, you tell me, do we just need to swap all meantions of width and |
//	height? If you figure that out let me know. It'd sure solve alot of my worries.					|
//---------------------------------------------------------------------------------------------------


//Canvas width is 1235, canvas height is 625
var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
var oneHeight = 80;
var oneWidth = 10;
var twoHeight = 80;
var twoWidth = 10;

var black = "#000000";

var Initial_X_Left = (canvas.width)-(canvas.width + 5)
var Initial_X_Right = (canvas.width)- 5;
var Initial_Y_Left = (canvas.height)/2;
var Initial_Y_Right = (canvas.height)/2;
var oneDisplacement = 5;
var twodisplacement = 5;

var W_Up = false;
var S_Down = false;
var U_Arrow_Up = false;
var S_Arrow_Down = false;

function leftPaddle() {
	ctx.beginPath();
	//Rectangle construction properties are height, width, X position, Y position
	ctx.rect(oneHeight, oneWidth, , Initial_X_Left, Initial_Y_Left);
	ctx.fillStyle = "#000000" //Fills black
	ctx.fill();
	ctx.closePath();
}

function rightPaddle() {
	ctx.beginPath();
	ctx.rect(twoHeight, twoWidth, Initial_X_Right, Initial_Y_Right);
	ctx.fillStyle = "#000000"
	ctx.fill();
	ctx.closePath();
}


// W is 87 (Paddle one up)
// S is 83 (Paddle one down)
// Up arrow is 38 (Paddle two up)
// Down arrow is 40 (Paddle two down)

function keyPressed(e) {
	if (e.keyCode == 87) {
		W_Up = true;
	}
	if (e.keyCode == 83) {
		S_Down = true;
	}
	if (e.keyCode == 38) {
		U_Arrow_Up = true;
	}
	if (e.keyCode == 40) {
		S_Arrow_Down = true;
	}
}

function keyReleased(e) {
	if (e.keyCode == 87) {
		W_Up = false;
	}
		if (e.keyCode == 83) {
		S_Down = false;
	}
	if (e.keyCode == 38) {
		U_Arrow_Up = false;
	}
	if (e.keyCode == 40) {
		D_Arrow_Down = false;
	}
}

function moveLeft_Paddle() {
	if (W_Up && Initial_Y_Left < 920) {
		Initial_Y_Left += oneDisplacement;
	}
	else if (S_Down && Initial_Y_Left > 0) {
		Initial_Y_Left -= oneDisplacement;
	}
}

function moveRight_Paddle() {
	if (U_Arrow_Up && Initial_Y_Right < 920) {
		Initial_Y_Right += twodisplacement;
	}
	else if (D_Arrow_Down && Initial_Y_Right > 0) {
		Initial_Y_Right -= twodisplacement;
	}
}


function draw_paddles() {
	ctx.clearRect(0, 0, canvas.height, canvas.width);
	leftPaddle();
	rightPaddle();
}
function draw() {
	draw_paddles();
}

window.addEventListener("keydown", KeyPressed,true);
window.addEventListener("keyup", KeyReleased,true);
setInterval(draw, 20);

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

