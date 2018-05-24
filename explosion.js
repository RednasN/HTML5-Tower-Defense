function Explosion(x, y, explosionIndex) {
	this.explosion_length = twdImages.explosions[explosionIndex].images.length;
	this.tics_per_frame = 5;
	this.current_tick = 20;

	this.explosion_index = 0;

	this.explosion_list_index = explosionIndex;

	this.drawx = x;
	this.drawy = y;


	this.calculate = function() {
		
		if(this.explosion_index < this.explosion_length)
		{
			this.current_tick--;

			if(this.current_tick == 0)
			{
				this.explosion_index++;
				this.current_tick = this.tics_per_frame;
			}
		}
	}

    this.draw = function() {
    	if(this.explosion_index < this.explosion_length)
    	{
    		//console.log(this.explosion_index);
			//console.log(twdImages.explosions[this.explosion_list_index].images[this.explosion_index].src);
    		//console.log(twdImages.explosions[this.explosion_list_index])

    		twdGrid.render(twdImages.explosions[this.explosion_list_index].images[this.explosion_index], Math.round(this.drawx) + mainCanvasXOffset, Math.round(this.drawy) + mainCanvasYOffset);
    		//mainCtx.drawImage(twdImages.explosions[this.explosion_list_index].images[this.explosion_index], Math.round(this.drawx) + mainCanvasXOffset, Math.round(this.drawy) + mainCanvasYOffset)
    	}
       	

    }

}