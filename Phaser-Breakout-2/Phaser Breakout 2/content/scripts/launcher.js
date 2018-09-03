banner: "'use strict';\n"

var RycerzIKsiezniczka = RycerzIKsiezniczka || {};

RycerzIKsiezniczka.launcher = function(game) {};

RycerzIKsiezniczka.launcher.prototype =
{
		init : function()
	{
		this.game.input.maxPointers = 1;
		this.game.stage.disableVisibilityChange = true;
		this.game.renderer.renderSession.roundPixels = true;
		this.game.stage.backgroundColor = "#c86464";
	} ,
	
		preload : function()
	{
		this.load.image ("logo", "content/sprites/logo.png");
		this.load.spritesheet ("LoadingBars", "content/sprites/loadingBar.gif", 256, 64);		
	} ,
	
		create : function()
	{
		this.state.start ("LoadingScreen");
		this.state.start ("Lvl1screen");
	
	}
};
