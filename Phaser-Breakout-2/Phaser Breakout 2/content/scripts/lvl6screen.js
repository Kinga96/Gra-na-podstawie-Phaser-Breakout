var RycerzIKsiezniczka = RycerzIKsiezniczka || {};
RycerzIKsiezniczka.lvl6screen = function(game) {};
var Text;
var s;
RycerzIKsiezniczka.lvl6screen.prototype = 
{
	
	preload : function()
		{
			this.game.load.atlas('breakout', 'content/sprites/breakout.png', 'content/sprites/breakout.json');
			this.game.load.image('starfield', 'content/sprites/koniec.jpg');
		this.game.load.audio('music', 'content/auto/music/czarownica.ogg');
		
		},
		
		
	create : function()
		{
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			music=this.game.add.audio('music',1,true);
			music.play('',0,1,true);
			
				s = this.game.add.tileSprite(0, 0, 800, 600, 'starfield');
			Text = this.game.add.text(this.game.world.centerX, 550, 'I żyli długo i szczęśliwie... ', { font: "30px Arial", fill: "#000000", align: "center" });
		}
		};