ClockClockDrawUtils = {
	drawAngleLine : function(drawContext,radius,rectX,rectY,arc,length,color,width, shadow){
		var x = (2*radius+3)*rectX+radius+1;
		var y = (2*radius+3)*rectY+radius+1;
		var alpha = arc*Math.PI/180;
		var dx = x+Math.cos(alpha)*length;
		var dy = y+Math.sin(alpha)*length;
		if(shadow){
			this.drawLine(drawContext,x+2,y-2,dx+2,dy-2,"#777",3);
		}
		this.drawLine(drawContext,x,y,dx,dy,color,width);
	},
	drawLine : function(objContext, intMoveX, intMoveY, intDestX, intDestY, strColor,width){
		 objContext.beginPath();
		 objContext.moveTo(intMoveX, intMoveY);
		 objContext.lineTo(intDestX, intDestY);
		 objContext.lineWidth=width;
		 objContext.strokeStyle = strColor;
		 objContext.stroke();
	},
	drawCircle : function(ctx,x,y,radius){
		ctx.beginPath();
		ctx.arc(x,y,radius,2*Math.PI,0,true);
		ctx.closePath();
	},
	drawClockCypherBackground : function(ctx,x,y,radius,color,backgroundColor){
		var radius=radius;
		var bigRadius = 2*radius+3;
		ctx.strokeStyle=color;
		ctx.fillStyle=color;
		ctx.lineWidth=1;
		for(i=0;i<7;i++){
			if(i==0)
				ctx.fillStyle=color;
			else
				ctx.fillStyle="#fff";
			ClockClockDrawUtils.drawCircle(ctx,bigRadius*x+radius+1+(6-i),bigRadius*y+radius+1-(6-i),radius-5);
			ctx.fill();
		}
		ClockClockDrawUtils.drawCircle(ctx,bigRadius*x+radius+1,bigRadius*y+radius+1,radius-5);
		ctx.fillStyle=backgroundColor;
		ctx.fill();
		ctx.strokeStyle=color;
		ctx.lineWidth=1;
		ClockClockDrawUtils.drawCircle(ctx,bigRadius*x+radius+1,bigRadius*y+radius+1,radius-5);
		ctx.stroke();
		for(var i=0;i<360;i+=30)
			ClockClockDrawUtils.drawAngleLine(ctx,radius,x,y,i,radius-4,color,i%90==0 ? 3 : 1, false);
		ClockClockDrawUtils.drawCircle(ctx,bigRadius*x+radius+1,bigRadius*y+radius+1,radius-9);
		ctx.fillStyle=backgroundColor;
		ctx.fill();
	}
}