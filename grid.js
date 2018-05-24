function TowerDefenseGrid()
{
	this.grid = [];
	this.route = [];

	this.grid_height = null;
	this.grid_width = null;

	this.enemies = [];
	this.bullets = [];
	this.turrets = [];
	this.explosions = [];

	this.money = 100;

	this.mode = "Canvas"; //Canvas
	
	this.startx = null;
	this.starty = null;
	this.endx = null;
	this.endy = null;
	this.widthx = null;
	this.widthy = null;
	this.height = null;
	this.width = null;
	
	this.setupOpenGrid = function(startx, starty, endx, endy, widthx, widthy, height, width) {
		this.startx = startx;
		this.starty = starty;
		this.endx = endx;
		this.endy = endy;
		this.widthx = widthx;
		this.widthy = widthy;
		this.height = height;
		this.width = width;
		
		this.initGrid();
		this.searchRoute();		
	};

	this.setupLevelOne = function () {
		this.widthx = 50;
		this.widthy = 50;
		this.height = 50;
		this.width = 50;

		this.route = JSON.parse('[{"x":2,"y":1,"drawx":100,"drawy":50,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":2,"drawx":100,"drawy":100,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":3,"drawx":100,"drawy":150,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":4,"drawx":100,"drawy":200,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":5,"drawx":100,"drawy":250,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":6,"drawx":100,"drawy":300,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":7,"drawx":100,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":8,"drawx":100,"drawy":400,"width":50,"height":50,"imageIndex":"12"},{"x":3,"y":8,"drawx":150,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":4,"y":8,"drawx":200,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":5,"y":8,"drawx":250,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":8,"drawx":300,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":8,"drawx":350,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":8,"y":8,"drawx":400,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":9,"y":8,"drawx":450,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":10,"y":8,"drawx":500,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":11,"y":8,"drawx":550,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":12,"y":8,"drawx":600,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":13,"y":8,"drawx":650,"drawy":400,"width":50,"height":50,"imageIndex":"11"},{"x":13,"y":7,"drawx":650,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":6,"drawx":650,"drawy":300,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":5,"drawx":650,"drawy":250,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":4,"drawx":650,"drawy":200,"width":50,"height":50,"imageIndex":"10"},{"x":12,"y":4,"drawx":600,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":11,"y":4,"drawx":550,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":10,"y":4,"drawx":500,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":9,"y":4,"drawx":450,"drawy":200,"width":50,"height":50,"imageIndex":"8"},{"x":8,"y":4,"drawx":400,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":4,"drawx":350,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":4,"drawx":300,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":4,"drawx":250,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":4,"y":4,"drawx":200,"drawy":200,"width":50,"height":50,"imageIndex":"12"},{"x":4,"y":3,"drawx":200,"drawy":150,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":2,"drawx":200,"drawy":100,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":1,"drawx":200,"drawy":50,"width":50,"height":50,"imageIndex":"9"},{"x":5,"y":1,"drawx":250,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":1,"drawx":300,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":1,"drawx":350,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":8,"y":1,"drawx":400,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":9,"y":1,"drawx":450,"drawy":50,"width":50,"height":50,"imageIndex":"10"},{"x":9,"y":2,"drawx":450,"drawy":100,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":3,"drawx":450,"drawy":150,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":4,"drawx":450,"drawy":200,"width":50,"height":50,"imageIndex":"8"},{"x":9,"y":5,"drawx":450,"drawy":250,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":6,"drawx":450,"drawy":300,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":7,"drawx":450,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":8,"drawx":450,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":9,"y":9,"drawx":450,"drawy":450,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":10,"drawx":450,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":11,"drawx":450,"drawy":550,"width":50,"height":50,"imageIndex":"11"},{"x":8,"y":11,"drawx":400,"drawy":550,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":11,"drawx":350,"drawy":550,"width":50,"height":50,"imageIndex":"8"},{"x":6,"y":11,"drawx":300,"drawy":550,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":11,"drawx":250,"drawy":550,"width":50,"height":50,"imageIndex":"13"},{"x":4,"y":11,"drawx":200,"drawy":550,"width":50,"height":50,"imageIndex":"12"},{"x":4,"y":10,"drawx":200,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":9,"drawx":200,"drawy":450,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":8,"drawx":200,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":4,"y":7,"drawx":200,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":6,"drawx":200,"drawy":300,"width":50,"height":50,"imageIndex":"9"},{"x":5,"y":6,"drawx":250,"drawy":300,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":6,"drawx":300,"drawy":300,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":6,"drawx":350,"drawy":300,"width":50,"height":50,"imageIndex":"10"},{"x":7,"y":7,"drawx":350,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":8,"drawx":350,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":7,"y":9,"drawx":350,"drawy":450,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":10,"drawx":350,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":11,"drawx":350,"drawy":550,"width":50,"height":50,"imageIndex":"8"},{"x":7,"y":12,"drawx":350,"drawy":600,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":13,"drawx":350,"drawy":650,"width":50,"height":50,"imageIndex":"12"},{"x":8,"y":13,"drawx":400,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":9,"y":13,"drawx":450,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":10,"y":13,"drawx":500,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":11,"y":13,"drawx":550,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":12,"y":13,"drawx":600,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":13,"y":13,"drawx":650,"drawy":650,"width":50,"height":50,"imageIndex":"11"},{"x":13,"y":12,"drawx":650,"drawy":600,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":11,"drawx":650,"drawy":550,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":10,"drawx":650,"drawy":500,"width":50,"height":50,"imageIndex":"14"}]');
		this.grid = JSON.parse('[[{"x":0,"y":0,"drawx":0,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":1,"drawx":0,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":2,"drawx":0,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":3,"drawx":0,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":4,"drawx":0,"drawy":200,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":5,"drawx":0,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":6,"drawx":0,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":7,"drawx":0,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":8,"drawx":0,"drawy":400,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":9,"drawx":0,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":10,"drawx":0,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":11,"drawx":0,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":12,"drawx":0,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":13,"drawx":0,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":0,"y":14,"drawx":0,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":1,"y":0,"drawx":50,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":1,"drawx":50,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":2,"drawx":50,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":3,"drawx":50,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":4,"drawx":50,"drawy":200,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":5,"drawx":50,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":6,"drawx":50,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":7,"drawx":50,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":8,"drawx":50,"drawy":400,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":9,"drawx":50,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":10,"drawx":50,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":11,"drawx":50,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":12,"drawx":50,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":13,"drawx":50,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":1,"y":14,"drawx":50,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":2,"y":0,"drawx":100,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":2,"y":1,"drawx":100,"drawy":50,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":2,"drawx":100,"drawy":100,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":3,"drawx":100,"drawy":150,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":4,"drawx":100,"drawy":200,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":5,"drawx":100,"drawy":250,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":6,"drawx":100,"drawy":300,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":7,"drawx":100,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":2,"y":8,"drawx":100,"drawy":400,"width":50,"height":50,"imageIndex":"12"},{"x":2,"y":9,"drawx":100,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":2,"y":10,"drawx":100,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":2,"y":11,"drawx":100,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":2,"y":12,"drawx":100,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":2,"y":13,"drawx":100,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":2,"y":14,"drawx":100,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":3,"y":0,"drawx":150,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":1,"drawx":150,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":2,"drawx":150,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":3,"drawx":150,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":4,"drawx":150,"drawy":200,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":5,"drawx":150,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":6,"drawx":150,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":7,"drawx":150,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":8,"drawx":150,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":3,"y":9,"drawx":150,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":10,"drawx":150,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":11,"drawx":150,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":12,"drawx":150,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":13,"drawx":150,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":3,"y":14,"drawx":150,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":4,"y":0,"drawx":200,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":4,"y":1,"drawx":200,"drawy":50,"width":50,"height":50,"imageIndex":"9"},{"x":4,"y":2,"drawx":200,"drawy":100,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":3,"drawx":200,"drawy":150,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":4,"drawx":200,"drawy":200,"width":50,"height":50,"imageIndex":"12"},{"x":4,"y":5,"drawx":200,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":4,"y":6,"drawx":200,"drawy":300,"width":50,"height":50,"imageIndex":"9"},{"x":4,"y":7,"drawx":200,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":8,"drawx":200,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":4,"y":9,"drawx":200,"drawy":450,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":10,"drawx":200,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":4,"y":11,"drawx":200,"drawy":550,"width":50,"height":50,"imageIndex":"12"},{"x":4,"y":12,"drawx":200,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":4,"y":13,"drawx":200,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":4,"y":14,"drawx":200,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":5,"y":0,"drawx":250,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":1,"drawx":250,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":2,"drawx":250,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":3,"drawx":250,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":4,"drawx":250,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":5,"drawx":250,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":6,"drawx":250,"drawy":300,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":7,"drawx":250,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":8,"drawx":250,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":9,"drawx":250,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":10,"drawx":250,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":11,"drawx":250,"drawy":550,"width":50,"height":50,"imageIndex":"13"},{"x":5,"y":12,"drawx":250,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":13,"drawx":250,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":5,"y":14,"drawx":250,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":6,"y":0,"drawx":300,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":1,"drawx":300,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":2,"drawx":300,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":3,"drawx":300,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":4,"drawx":300,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":5,"drawx":300,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":6,"drawx":300,"drawy":300,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":7,"drawx":300,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":8,"drawx":300,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":9,"drawx":300,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":10,"drawx":300,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":11,"drawx":300,"drawy":550,"width":50,"height":50,"imageIndex":"13"},{"x":6,"y":12,"drawx":300,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":13,"drawx":300,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":6,"y":14,"drawx":300,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":7,"y":0,"drawx":350,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":7,"y":1,"drawx":350,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":2,"drawx":350,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":7,"y":3,"drawx":350,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":7,"y":4,"drawx":350,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":7,"y":5,"drawx":350,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":7,"y":6,"drawx":350,"drawy":300,"width":50,"height":50,"imageIndex":"10"},{"x":7,"y":7,"drawx":350,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":8,"drawx":350,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":7,"y":9,"drawx":350,"drawy":450,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":10,"drawx":350,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":11,"drawx":350,"drawy":550,"width":50,"height":50,"imageIndex":"8"},{"x":7,"y":12,"drawx":350,"drawy":600,"width":50,"height":50,"imageIndex":"14"},{"x":7,"y":13,"drawx":350,"drawy":650,"width":50,"height":50,"imageIndex":"12"},{"x":7,"y":14,"drawx":350,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":8,"y":0,"drawx":400,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":1,"drawx":400,"drawy":50,"width":50,"height":50,"imageIndex":"13"},{"x":8,"y":2,"drawx":400,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":3,"drawx":400,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":4,"drawx":400,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":8,"y":5,"drawx":400,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":6,"drawx":400,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":7,"drawx":400,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":8,"drawx":400,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":8,"y":9,"drawx":400,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":10,"drawx":400,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":11,"drawx":400,"drawy":550,"width":50,"height":50,"imageIndex":"13"},{"x":8,"y":12,"drawx":400,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":8,"y":13,"drawx":400,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":8,"y":14,"drawx":400,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":9,"y":0,"drawx":450,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":9,"y":1,"drawx":450,"drawy":50,"width":50,"height":50,"imageIndex":"10"},{"x":9,"y":2,"drawx":450,"drawy":100,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":3,"drawx":450,"drawy":150,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":4,"drawx":450,"drawy":200,"width":50,"height":50,"imageIndex":"8"},{"x":9,"y":5,"drawx":450,"drawy":250,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":6,"drawx":450,"drawy":300,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":7,"drawx":450,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":8,"drawx":450,"drawy":400,"width":50,"height":50,"imageIndex":"8"},{"x":9,"y":9,"drawx":450,"drawy":450,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":10,"drawx":450,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":9,"y":11,"drawx":450,"drawy":550,"width":50,"height":50,"imageIndex":"11"},{"x":9,"y":12,"drawx":450,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":9,"y":13,"drawx":450,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":9,"y":14,"drawx":450,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":10,"y":0,"drawx":500,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":1,"drawx":500,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":2,"drawx":500,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":3,"drawx":500,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":4,"drawx":500,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":10,"y":5,"drawx":500,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":6,"drawx":500,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":7,"drawx":500,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":8,"drawx":500,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":10,"y":9,"drawx":500,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":10,"drawx":500,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":11,"drawx":500,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":12,"drawx":500,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":10,"y":13,"drawx":500,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":10,"y":14,"drawx":500,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":11,"y":0,"drawx":550,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":1,"drawx":550,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":2,"drawx":550,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":3,"drawx":550,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":4,"drawx":550,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":11,"y":5,"drawx":550,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":6,"drawx":550,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":7,"drawx":550,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":8,"drawx":550,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":11,"y":9,"drawx":550,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":10,"drawx":550,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":11,"drawx":550,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":12,"drawx":550,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":11,"y":13,"drawx":550,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":11,"y":14,"drawx":550,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":12,"y":0,"drawx":600,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":1,"drawx":600,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":2,"drawx":600,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":3,"drawx":600,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":4,"drawx":600,"drawy":200,"width":50,"height":50,"imageIndex":"13"},{"x":12,"y":5,"drawx":600,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":6,"drawx":600,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":7,"drawx":600,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":8,"drawx":600,"drawy":400,"width":50,"height":50,"imageIndex":"13"},{"x":12,"y":9,"drawx":600,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":10,"drawx":600,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":11,"drawx":600,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":12,"drawx":600,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":12,"y":13,"drawx":600,"drawy":650,"width":50,"height":50,"imageIndex":"13"},{"x":12,"y":14,"drawx":600,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":13,"y":0,"drawx":650,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":13,"y":1,"drawx":650,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":13,"y":2,"drawx":650,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":13,"y":3,"drawx":650,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":13,"y":4,"drawx":650,"drawy":200,"width":50,"height":50,"imageIndex":"10"},{"x":13,"y":5,"drawx":650,"drawy":250,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":6,"drawx":650,"drawy":300,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":7,"drawx":650,"drawy":350,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":8,"drawx":650,"drawy":400,"width":50,"height":50,"imageIndex":"11"},{"x":13,"y":9,"drawx":650,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":13,"y":10,"drawx":650,"drawy":500,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":11,"drawx":650,"drawy":550,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":12,"drawx":650,"drawy":600,"width":50,"height":50,"imageIndex":"14"},{"x":13,"y":13,"drawx":650,"drawy":650,"width":50,"height":50,"imageIndex":"11"},{"x":13,"y":14,"drawx":650,"drawy":700,"width":50,"height":50,"imageIndex":"3"}],[{"x":14,"y":0,"drawx":700,"drawy":0,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":1,"drawx":700,"drawy":50,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":2,"drawx":700,"drawy":100,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":3,"drawx":700,"drawy":150,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":4,"drawx":700,"drawy":200,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":5,"drawx":700,"drawy":250,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":6,"drawx":700,"drawy":300,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":7,"drawx":700,"drawy":350,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":8,"drawx":700,"drawy":400,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":9,"drawx":700,"drawy":450,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":10,"drawx":700,"drawy":500,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":11,"drawx":700,"drawy":550,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":12,"drawx":700,"drawy":600,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":13,"drawx":700,"drawy":650,"width":50,"height":50,"imageIndex":"3"},{"x":14,"y":14,"drawx":700,"drawy":700,"width":50,"height":50,"imageIndex":"3"}]]');
		this.route = this.route.reverse();

		for (x = 0; x < 15; x++) {
			this.turrets[x] = [];
			for (y = 0; y < 15; y++) {

				this.turrets[x][y] = null;
				if(twdGrid.grid[x][y].imageIndex == 3)
				{
					//var turret = new Turret(x, y, 0);
	                //		twdGrid.turrets[x][y] = turret;
	              }
				//this.turrets[x][y] = null;
			}
		}

	};

	this.calculateEnemies = function ()
	{
		for (x = 0; x < this.enemies.length; x++) {
			this.enemies[x].calculate();
        }
	}

	this.calculateExplosions = function ()
	{
		for (x = 0; x < this.explosions.length; x++) {
			this.explosions[x].calculate();
        }
	}


	this.calculateBullets = function ()
	{
		for (x = 0; x < this.bullets.length; x++) {
            this.bullets[x].calculate();
        }
	}

	this.calculateTurrets = function ()
	{
		for (x = 0; x < this.turrets.length; x++) {
			for (y = 0; y < this.turrets[x].length; y++) {
            	
				if(this.turrets[x][y] != null)
				{
            		this.turrets[x][y].calculate();
            	}
            }
        }
	}


	this.drawEnemies = function ()
	{
		for (x = 0; x < this.enemies.length; x++) {
			this.enemies[x].draw();
        }
	}

	this.drawExplosions = function ()
	{
		for (x = 0; x < this.explosions.length; x++) {
			this.explosions[x].draw();
        }
	}

	this.render = function(image, x, y)
	{	
		if(DRAWMODE == "Canvas")
		{
			mainCtx.drawImage(image, x, y);

		}

		if(DRAWMODE == "WebGL")
		{
	  		//console.log(image);
	    	mainCtx.bindTexture(mainCtx.TEXTURE_2D, image);

		    // Tell WebGL to use our shader program pair
		    

		    //mainCtx.enable ( mainCtx.BLEND ) ;

		    //mainCtx.enable(mainCtx.BLEND);
		    //mainCtx.blendFunc(mainCtx.GL_SRC_ALPHA, mainCtx.GL_ONE_MINUS_SRC_ALPHA);


		   	// glEnable(GL_BLEND);  

		    //mainCtx.blendFunc(mainCtx.SRC_ALPHA, mainCtx.SRC_ALPHA_SATURATE);

		    //mainCtx.blendFunc(mainCtx.SRC_ALPHA, mainCtx.ONE_MINUS_SRC_ALPHA);
		    //mainCtx.enable(mainCtx.BLEND);
		    //mainCtx.disable(mainCtx.DEPTH_TEST);

		    // this matirx will convert from pixels to clip space
		    var matrix = m4.orthographic(0, mainCtx.canvas.width, mainCtx.canvas.height, 0, -1, 1);

		    // this matrix will translate our quad to dstX, dstY
		    matrix = m4.translate(matrix, x, y, 0);

		    // this matrix will scale our 1 unit quad
		    // from 1 unit to texWidth, texHeight units
		    matrix = m4.scale(matrix, 50, 50, 1);

		    // Set the matrix.
		    mainCtx.uniformMatrix4fv(matrixLocation, false, matrix);

		    // Tell the shader to get the texture from texture unit 0
		    mainCtx.uniform1i(textureLocation, 0);

		    // draw the quad (2 triangles, 6 vertices)
		    mainCtx.drawArrays(mainCtx.TRIANGLES, 0, 6);
		}

	}

	this.drawBullets = function ()
	{
		for (x = 0; x < this.bullets.length; x++) {
            this.bullets[x].draw();
        }
	}

	this.drawTurrets = function ()
	{
		for (x = 0; x < this.turrets.length; x++) {
			for (y = 0; y < this.turrets[x].length; y++) {
            	
				if(this.turrets[x][y] != null)
				{
            		this.turrets[x][y].draw();
            	}
            }
        }
	}

	

	this.draw = function()
	{	
		if(this.grid_width == null && this.grid_height == null)
		{
			this.grid_width = this.grid[0].length;
			this.grid_height = this.grid.length
		}

		//var nextrow = 0;
        for (x = 0; x < this.grid_width; x++) {
            //var nextcell = 0;

            for (y = 0; y < this.grid_height; y++) {

                twdGrid.render(twdImages.gridImages[this.grid[x][y].imageIndex].image, this.grid[x][y].drawx + mainCanvasXOffset, this.grid[x][y].drawy + mainCanvasYOffset);
            }
        }
	}
	
	this.neighbours = function(position, endPosition) {
		this.grid[position.x][position.y].done = true;

		var neighbourList = []
		if (this.grid[position.x - 1] != undefined && !this.grid[position.x - 1][position.y].done) {
			neighbourList.push(this.grid[position.x - 1][position.y]);
		}

		if (this.grid[position.x + 1] != undefined && !this.grid[position.x + 1][position.y].done) {
			neighbourList.push(this.grid[position.x + 1][position.y]);
		}

		if (this.grid[position.y + 1] != undefined && !this.grid[position.x][position.y + 1].done) {
			neighbourList.push(this.grid[position.x][position.y + 1]);
		}

		if (this.grid[position.y - 1] != undefined && !this.grid[position.x][position.y - 1].done) {
			neighbourList.push(this.grid[position.x][position.y - 1]);
		}

		//neighbourList = neighbourList.reverse();

		neighbourList.forEach(function(value, i) {
			neighbourList[i].parentcell = position;

			//console.log(neighbourList[i].done);
			//console.log(endPosition);
			//neighbourList[i].steps = neighbourList[i].x + neighbourList[i].y;

			if (neighbourList[i].y > endPosition.y) {
				neighbourList[i].steps += neighbourList[i].y - endPosition.y;
			}

			if (neighbourList[i].y < endPosition.y) {
				neighbourList[i].steps += endPosition.y - neighbourList[i].y;
			}

			if (neighbourList[i].x > endPosition.x) {
				neighbourList[i].steps += neighbourList[i].x - endPosition.x;
			}

			if (neighbourList[i].x < endPosition.x) {
				neighbourList[i].steps += endPosition.x - neighbourList[i].x;
			}

		});
		//console.log(neighbourList);
		return neighbourList;
	}
	
	this.colorRoute = function(cell) {
		this.route.push(cell);
		if (cell.parentcell != null) {
			cell.cellcolor = "blue";
			
			this.colorRoute(cell.parentcell);
		}
	}
	
	this.searchRoute = function (){
		var openList = [];
		openList.push(this.grid[this.startx][this.starty]);

		var trip = 0;
		while (openList.length > 0) {
			trip++;
			if (trip > 5000) {
				return true;
			}

			var cell = openList.pop();

			if (cell.x == this.endx && cell.y == this.endy) {
				//this.startPosition.cellcolor = "red";
				this.grid[this.startx][this.starty].cellcolor = "red";

				this.route = [];
				
				this.colorRoute(cell);
				
				this.grid[this.endx][this.endy].cellcolor = "red";

				return true;
			}

			if(
				//cell.x == 3 && cell.y == 9
				


				  cell.x == 6 && cell.y == 8
				||  cell.x == 5 && cell.y == 8
	

				||  cell.x == 3 && cell.y == 7
				||  cell.x == 3 && cell.y == 6
				||  cell.x == 3 && cell.y == 5
				||  cell.x == 3 && cell.y == 4
				||  cell.x == 3 && cell.y == 3
				||  cell.x == 3 && cell.y == 3
				||  cell.x == 3 && cell.y == 2
				||  cell.x == 3 && cell.y == 2
				||  cell.x == 3 && cell.y == 2
				||  cell.x == 8 && cell.y == 9
				||  cell.x == 8 && cell.y == 8
				||  cell.x == 8 && cell.y == 7
				||  cell.x == 8 && cell.y == 6
				||  cell.x == 7 && cell.y == 6
				||  cell.x == 6 && cell.y == 6

				||  cell.x == 3 && cell.y == 0
				||  cell.x == 3 && cell.y == 1
				||  cell.x == 3 && cell.y == 2
				||  cell.x == 3 && cell.y == 3
				||  cell.x == 3 && cell.y == 4
				||  cell.x == 3 && cell.y == 5

				||  cell.x == 3 && cell.y == 4
				||  cell.x == 3 && cell.y == 5
				||  cell.x == 3 && cell.y == 6
				||  cell.x == 3 && cell.y == 7
				)
			{
				continue;
			}



			openList = openList.concat(this.neighbours(cell, this.grid[this.endx][this.endy]));

			openList.sort(function(a, b) {
				return parseFloat(b.steps) - parseFloat(a.steps);
			});
		}
	};
	
	this.initGrid = function()
	{
		for (x = 0; x < this.widthx; x++) {
			gridRow = [];

			this.turrets[x] = [];
			for (y = 0; y < this.widthy; y++) {

				//this.turrets[x][y] = null;
				

				var cell = {
					x: x,
					y: y,
					drawx : this.width * x,
					drawy : this.height * y,
					width: this.width,
					steps: 0,
					height: this.height,
					done: false,
					parentcell: null,
					placeHolder: null,
					cellcolor: "grey"
				};
				gridRow.push(cell);
			}
			this.grid.push(gridRow);
		}
	}
	
}