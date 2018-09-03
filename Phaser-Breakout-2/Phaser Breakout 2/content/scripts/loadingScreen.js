"use strict";

var RycerzIKsiezniczka = RycerzIKsiezniczka || {};
"use strict";

var RycerzIKsiezniczka = RycerzIKsiezniczka || {};
RycerzIKsiezniczka.loadingScreen = function(game) {};

RycerzIKsiezniczka.loadingScreen.prototype = 
{
		preload : function()
		{
			// * ładowanie wszystkich elementów
		
			
			this.logo = this.add.sprite (this.game.width * 0.5, this.game.height * 0.5, "logo");
			this.emptyBar = this.add.sprite (this.game.width * 0.5, (this.game.height * 0.5) + 256, "LoadingBars");
			this.fullBar = this.add.sprite (this.emptyBar.x, (this.emptyBar.y), "LoadingBars", 1);
			this.percentage=this.add.text(this.emptyBar.x,this.emptyBar.y,"0%");
			
			this.logo.anchor.setTo (0.5);
			this.emptyBar.anchor.setTo (0.5);
			this.fullBar.anchor.setTo (0.5);
			this.percentage.anchor.setTo(0.5);
			
		//	this.load.setPreloadSptite(this.fullBar);
		},
		
		create: function()
		{
		  this.state.start("Lvl1screen");
		},
		
		loadUpdate: function()
		{
			this.percentage.text=this.load.progress + "%";
		}
		
};