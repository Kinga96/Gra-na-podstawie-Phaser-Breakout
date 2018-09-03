"use strict";

var RycerzIKsiezniczka = RycerzIKsiezniczka || {};
RycerzIKsiezniczka.lvl3screen = function(game) {};

var ball;
var paddle;
var bricks;
var cursors;

var ballOnPaddle = true;

var lives ;
var score;

var scoreText;
var livesText;
var introText;

var s;
var music;


RycerzIKsiezniczka.lvl3screen.prototype = 
{
	preload : function()
		{
			this.game.load.atlas('breakout', 'content/sprites/breakout.png', 'content/sprites/breakout.json');
			this.game.load.image('starfield', 'content/sprites/zamek.jpg');
			this.game.load.image('paddle', 'content/sprites/tarcza4.png');
			this.game.load.image('ball', 'content/sprites/strzala2.png');
		this.game.load.image('monety', 'content/sprites/monety.png');
		this.game.load.audio('music', 'content/auto/music/Piniadz.ogg');
	
		},
		
		
	create : function()
		{
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			music=this.game.add.audio('music',1,true);
			music.play('',0,1,true);
		
			//  We check bounds collisions against all walls other than the bottom one
			this.game.physics.arcade.checkCollision.down = false;

			s = this.game.add.tileSprite(0, 0, 800, 600, 'starfield');

			bricks = this.game.add.physicsGroup();
			bricks.enableBody = true;
			bricks.physicsBodyType = Phaser.Physics.ARCADE;

			//var rose;

			for (var y = 0; y < 3; y++)    //4    //to do klockow, przez to bylo 120 bledow
			{
				for (var x = 0; x < 7; x++) //15
				{
	
		var rose = bricks.create(240 + (x * 55), 150 + (y * 75), 'monety');
 rose.body.immovable = true;

		
					rose.body.bounce.set(1);
				
				}
			}

			paddle = this.game.add.sprite(this.game.world.centerX, 500, 'paddle', 'paddle.png'); //to do podstawki
			paddle.anchor.setTo(0.5, 0.5);

			this.game.physics.enable(paddle, Phaser.Physics.ARCADE);

			paddle.body.collideWorldBounds = true;
			paddle.body.bounce.set(1);
			paddle.body.immovable = true;

			
			ball = this.game.add.sprite(this.game.world.centerX, paddle.y - 16, 'ball', 'ball.png'); // to do pilki jakby nie mozna bylo po nazwie wywnioskowac XD
			ball.anchor.set(0.5);
			ball.checkWorldBounds = true;

			

			this.game.physics.enable(ball, Phaser.Physics.ARCADE);
			cursors = this.game.input.keyboard.createCursorKeys();

            //ball.body.velocity.x = 100;
            //ball.body.velocity.y = -150;
		  // ball.body.gravity.y = 500;
 //ball.body.bounce.y = 0.2;

			ball.body.collideWorldBounds = true;
			ball.body.bounce.set(1);

			ball.animations.add('breakout', [ 'ball1.png', 'ball2.png', 'ball3.png', 'ball4.png', 'ball5.png' ], 50, true, false);

			ball.events.onOutOfBounds.add(this.ballLost, this); //TU WYWALA

			scoreText = this.game.add.text(32, 550, 'score: ' +score, { font: "20px Arial", fill: "#000000", align: "left" });
			livesText = this.game.add.text(680, 550, 'lives: ' +lives, { font: "20px Arial", fill: "#000000", align: "left" });
			introText = this.game.add.text(this.game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#000000", align: "center" });
			introText.anchor.setTo(0.5, 0.5);

			this.game.input.onDown.add(this.releaseBall, this); // I TU WYWALA 

		
				},
				
	
				
	update: function()
	{
		
	/*
 paddle.body.velocity.x = 0;
			
  if (cursors.left.isDown) {
 paddle.body.velocity.x = -350;
 }
 else if (cursors.right.isDown) {
 paddle.body.velocity.x = 350;
 }
 */

 
 
          //Sterowanie myszką - trzeba cos poprawić bo nie da się w tym samym czasie sterować klawiaturą i myszką
	paddle.x = this.game.input.x;
	
		 if (paddle.x < 24)
			{
				paddle.x = 24;
			}
			else if (paddle.x > this.game.width - 24)
			{
				paddle.x =this.game.width - 24;
			}
			
	



			if (ballOnPaddle)
			{
				ball.body.x = paddle.x;
			}
			else
			{
				this.game.physics.arcade.collide(ball, paddle, this.ballHitPaddle, null, this);
				this.game.physics.arcade.collide(ball, bricks, this.ballHitBrick, null, this);
			}
	},

		
	
	releaseBall : function()
	{
				if (ballOnPaddle)
			{
				ballOnPaddle = false;
				ball.body.velocity.y = -300;
				ball.body.velocity.x = -75;
				ball.animations.play('spin');
				introText.visible = false;
			}
	},
	
	ballLost : function()
	{
			lives--;
			livesText.text = 'lives: ' + lives;

			if (lives === 0)
			{
				this.gameOver();
			}
			else
			{
				ballOnPaddle = true;

				ball.reset(paddle.body.x + 16, paddle.y - 16);
				
				ball.animations.stop();
			}
	},
	
	gameOver : function()
	{
			ball.body.velocity.setTo(0, 0);
			
			introText.text = 'Game Over!';
			introText.visible = true;
	},
	
	ballHitBrick : function(_ball, _rose)
	{
			_rose.kill();

			score += 50;

			scoreText.text = 'score: ' + score;

			//  Are they any bricks left?
			if (bricks.countLiving() == 0)
			{
				//  New level starts
				score += 1000;
				scoreText.text = 'score: ' + score;
				introText.text = '- Next Level -';

				//  Let's move the ball back to the paddle
				ballOnPaddle = true;
				ball.body.velocity.set(0);
				ball.x = paddle.x + 16;
				ball.y = paddle.y - 16;
				ball.animations.stop();

				//  And bring the bricks back from the dead :)
				//bricks.callAll('revive');
				 this.state.start("Lvl4screen");
				 music.pause();
			}
	},
	
	ballHitPaddle : function (_ball, _paddle)
	{
			var diff = 0;

			if (_ball.x < _paddle.x)
			{
				//  Ball is on the left-hand side of the paddle
				diff = _paddle.x - _ball.x;
				_ball.body.velocity.x = (-10 * diff);
			}
			else if (_ball.x > _paddle.x)
			{
				//  Ball is on the right-hand side of the paddle
				diff = _ball.x -_paddle.x;
				_ball.body.velocity.x = (10 * diff);
			}
			else
			{
				//  Ball is perfectly in the middle
				//  Add a little random X to stop it bouncing straight up!
				_ball.body.velocity.x = 2 + Math.random() * 8;
			}
	}
};