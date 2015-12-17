ClockClockUtils = {
	getSpeed : function(){
		var speed = 0;
		while(speed == 0){
			var sign = Math.round(Math.random())*2-1;
			speed=sign*(0+Math.round(Math.random()*1));
		}
		return speed;
	},
	getDateTimeParts : function(){
		var now = new Date();
		var hours = now.getHours();
		var mins = now.getMinutes();
		var days = now.getDate();
		var month = now.getMonth()+1;
		var secs = now.getSeconds();
		var year = now.getFullYear()%100;
		return [
			Math.floor(hours/10),hours%10,
			Math.floor(mins/10) ,mins%10,
			Math.floor(secs/10) ,secs%10,
			Math.floor(days/10) ,days%10,
			Math.floor(month/10),month%10,
			Math.floor(year/10),year%10
		];
	},
	getStartOfAnimation : function(i,animationSequences){
		var animationSequence=animationSequences[i];
		var start = animationSequence[START]+animationSequence[OFFSET];
		animationSequence[START] = (start<0) ? start+360 : (start>360) ? start-360 : start;
		animationSequence[STEPS]--;
		return animationSequence[START];
	}

}

ClockClockDrawUtils = {
	drawAngleLine : function(drawContext,radius,rectX,rectY,arc,length,col,width){
		var x = (2*radius+3)*rectX+radius+1;
		var y = (2*radius+3)*rectY+radius+1;
		var alpha = arc*Math.PI/180;
		var dx = x+Math.cos(alpha)*length;
		var dy = y+Math.sin(alpha)*length;
		this.drawLine(drawContext,x,y,dx,dy,col,width);
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
		ClockClockDrawUtils.drawCircle(ctx,bigRadius*x+radius+1,bigRadius*y+radius+1,radius);
		ctx.fillStyle=backgroundColor;
		ctx.fill();
		ctx.strokeStyle=color;
		ctx.lineWidth=1;
		ClockClockDrawUtils.drawCircle(ctx,bigRadius*x+radius+1,bigRadius*y+radius+1,radius);
		ctx.stroke();
		for(var i=0;i<360;i+=30)
			ClockClockDrawUtils.drawAngleLine(ctx,radius,x,y,i,radius,color,i%90==0 ? 3 : 1);
		ClockClockDrawUtils.drawCircle(ctx,bigRadius*x+radius+1,bigRadius*y+radius+1,radius-5);
		ctx.fillStyle=backgroundColor;
		ctx.fill();
	}
}