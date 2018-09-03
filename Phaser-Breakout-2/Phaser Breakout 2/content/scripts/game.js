"use strict";

var RycerzIKsiezniczka = RycerzIKsiezniczka || {};
var configuration=
{
	width: 800,
	height: 600,
	renderer: Phaser.CANVAS
};

RycerzIKsiezniczka.game = new Phaser.Game (configuration);

RycerzIKsiezniczka.game.state.add ("Launcher", RycerzIKsiezniczka.launcher);
RycerzIKsiezniczka.game.state.add ("LoadingScreen", RycerzIKsiezniczka.loadingScreen);
RycerzIKsiezniczka.game.state.add ("Lvl1screen", RycerzIKsiezniczka.lvl1screen);
RycerzIKsiezniczka.game.state.add ("Lvl2screen", RycerzIKsiezniczka.lvl2screen);
RycerzIKsiezniczka.game.state.add ("Lvl3screen", RycerzIKsiezniczka.lvl3screen);
RycerzIKsiezniczka.game.state.add ("Lvl4screen", RycerzIKsiezniczka.lvl4screen);
RycerzIKsiezniczka.game.state.add ("Lvl5screen", RycerzIKsiezniczka.lvl5screen);
RycerzIKsiezniczka.game.state.add ("Lvl6screen", RycerzIKsiezniczka.lvl6screen);
RycerzIKsiezniczka.game.state.start ("Launcher");
