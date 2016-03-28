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


Deathpong {

	Defaults: {
		width: 640,
		height: 480,
		wallWidth: 12,
		paddleWidth: 12,
		paddleHeight: 60,
		paddleSpeed: 2,
		ballSpeed: 4,
		ballAcceleration: 8,
		ballRadius: 5,
		sound: true
	}, //Commas are here as these are within the Deathpong bracket

	Colours: {
		walls: 'white',
		ball: 'white',
		score: 'white',
		footprint: '#333',
		predictGuess: 'yellow',
		predictExact: 'red'
	},

	Images: [ //String array of images used
		"IMAGES/press1.png",
		"IMAGES/press2.png",
		'IMAGES/winner.png'
	],

	Levels: [
	    {aiReaction: 0.2, aiError:  40}, // 0:  ai is losing by 8
	    {aiReaction: 0.3, aiError:  50}, // 1:  ai is losing by 7
	    {aiReaction: 0.4, aiError:  60}, // 2:  ai is losing by 6
	    {aiReaction: 0.5, aiError:  70}, // 3:  ai is losing by 5
	    {aiReaction: 0.6, aiError:  80}, // 4:  ai is losing by 4
	    {aiReaction: 0.7, aiError:  90}, // 5:  ai is losing by 3
	    {aiReaction: 0.8, aiError: 100}, // 6:  ai is losing by 2
	    {aiReaction: 0.9, aiError: 110}, // 7:  ai is losing by 1
	    {aiReaction: 1.0, aiError: 120}, // 8:  tie
	    {aiReaction: 1.1, aiError: 130}, // 9:  ai is winning by 1
	    {aiReaction: 1.2, aiError: 140}, // 10: ai is winning by 2
	    {aiReaction: 1.3, aiError: 150}, // 11: ai is winning by 3
	    {aiReaction: 1.4, aiError: 160}, // 12: ai is winning by 4
	    {aiReaction: 1.5, aiError: 170}, // 13: ai is winning by 5
	    {aiReaction: 1.6, aiError: 180}, // 14: ai is winning by 6
	    {aiReaction: 1.7, aiError: 190}, // 15: ai is winning by 7
	    {aiReaction: 1.8, aiError: 200}  // 16: ai is winning by 8
  ],

	initialize: function(runner, cfg) {
		game.loadImages(Deathpong.IMAGES, function(Images) {
			this.cfg = cfg;
			this.runner = runner;
			this.width = runner.width;
			this.height = runner.height;
			//Check naming convention. I'm fuzzy on these capital letters
			this.images = images;
			//The playeris not playing by default.
			this.playing = false;
			this.scores = [0, 0];
			this.menu = Object.construct(Deathpong.Menu, this);
			this.court = Object.coustruct(Deathpong.Court, this);
			this.leftPaddle = Object.coustruct(Deathpong.Paddle, this);
			this.rightPaddle = Object.coustruct(Deathpong.Paddle, this, true);
			this.ball = Object.construct(Deathpong.Ball, this);	
			this.sounds = Object.coustruct(Deathpong.Sounds, this);
			this.runner.start();
		}.bind(this)); //Second close parenthesses is from game.loadImages line
	},   

	startDemo: function() { this.start(0); },
	startSinglePlayer: function() { this.start(1); },
	startTwoPlayer: function () { this.start(2); },

	start: function(numPlayers) {
		if (!this.playing) {
			this.scores = [0, 0];
			this.playing = true;
			this.leftPaddle.setAuto(numPlayers < 1, this.level(0));
			this.rightPaddle.setAuto(numPlayers < 2, this.level(1));
			this.ball.reset(); 
			this.runner.hideCursor();
		}
	},

	stop: function(ask) {
		if (this.playing) {
			//Send a JavaScript prompt asking the user if they want to quit their game
			if (!ask || this.runenr.confirm('Quit current game?')) {
				this.playing = false;
				this.leftPaddle.setAuto(false);
				this.rightPaddle.setAuto(false);
				this.runner.showCursor();
			}
		}
	},

	level: function(playerNo) {
		return 8 + (this.scores[playerNo] - this.scores[playerNo ? 0 : 1]); 
	}

	goal: function(playerNo) {
		this.sounds.goal();
		this.scores[playerNo] += 1;
		if (this.scores[playerNo] == 9) {
			this.menu.declareWinner(playerNo);
			this.stop();
		}
		else {
			this.ball.reset(playerNo);
			this.leftPaddle.setLevel(this.level(0));
			this.rightPaddle.setLevel(this.level(1));
		}
	},

	update: function(dt) {
		this.leftPaddle.update(dt, this.ball);
		this.rightPaddle.update(dt, this.ball);
		if (this.playing) {
			var dx = this.ball.dx;
			var dy = this.ball.dy;
			this.ball.update(dt, this.leftPaddle, this.rightPaddle);
			if (this.ball.dx < 0 && dx > 0)
				this.sounds.ping(); 
			else if (this.ball.dx > 0 && dx < 0)
				this.sounds.pong();
			else if (this.ball.dy * dy < 0)
				this.sounds.wall();

			if (this.ball.left > this.width)
				this.goal(0);
			else if (this.ball.right < 0)
				this.goal(1);
		}
	},

	draw: function(ctx) {
		this.court.draw(ctx, this.scores[0], this.scores[1]);
		this.leftPaddle.draw(ctx);
		this.rightPaddle.draw(ctx);
		if (this.playing)
			this.ball.draw(ctx);
		else
			this.menu.draw(ctx);
	},

	onkeydown: function(keyCode) {
		switch(keyCode) {
			case Game.KEY.ZERO: this.startDemo();            break;
			case Game.KEY.ONE:  this.startSinglePlayer();    break;
	        case Game.KEY.TWO:  this.startTwoPlayer();       break;
   	        case Game.KEY.ESC:  this.stop(true);             break;
		    case Game.KEY.Q:    if (!this.leftPaddle.auto)  this.leftPaddle.moveUp();    break; //Change to W
		    case Game.KEY.A:    if (!this.leftPaddle.auto)  this.leftPaddle.moveDown();  break; //Change to S
		    case Game.KEY.P:    if (!this.rightPaddle.auto) this.rightPaddle.moveUp();   break; //Change to Up arrow or I
 		    case Game.KEY.L:    if (!this.rightPaddle.auto) this.rightPaddle.moveDown(); break; //Change to Down arrow or K
		}
	},

	onkeyup: function(keycode) {
		switch(keyCode) {
	        case Game.KEY.Q: if (!this.leftPaddle.auto)  this.leftPaddle.stopMovingUp();    break;
	        case Game.KEY.A: if (!this.leftPaddle.auto)  this.leftPaddle.stopMovingDown();  break;
	        case Game.KEY.P: if (!this.rightPaddle.auto) this.rightPaddle.stopMovingUp();   break;
	        case Game.KEY.L: if (!this.rightPaddle.auto) this.rightPaddle.stopMovingDown(); break;
		}

	},

	Menu: {
		initialize: function(Deathpong) {
			var press1 = Deathpong.IMAGES["IMAGES/press1.png"];
			var press2 = Deathpong.IMAGES["IMAGES/press2.png"];
			var winner = Deathpong.IMAGES["IMAGES/winner.png"];
		}
	}

}


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

