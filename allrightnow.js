// DEATHPONG! 
// IT'S LIKE LETHAL LEAGUE BUT IT'S WORSE

//When refreing to the construction of 

var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
var oneHeight = 80;
var oneWidth = 10;
var twoHeight = 80;
var twoWidth = 10;

var black = "#000000";

var Initial_Y_Left = (canvas.width-oneWidth)/2;
var Initial_Y_Right = (canvas.width-twoWidth)/2;
var oneDisplacement = 5;
var twodisplacement = 5;

var W_Up = false;
var S_Down = false;
var I_Up = false;
var K_Down = false;

function leftPaddle() {
	ctx.beginPath();
	ctx.rect(Initial_Y_Left, canvas.height-oneHeight, oneWidth, oneHeight);
	ctx.fillStyle = "#000000" //Fills black
	ctx.closePath();
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

