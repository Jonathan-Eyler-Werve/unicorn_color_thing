<!--  Contains functions to create, draw and modify creeps -->

    function drawCreep(ctx){


    	ctx.save();
      ctx.translate(creep.posX, creep.posY);
      ctx.rotate(to_rad(creep.direction));
    	ctx.drawImage(creep,0,0);
      ctx.restore();

    };