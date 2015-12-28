ClockClockUtils = {
	getSpeed : function(){
		return Math.round(Math.random())*2-1;
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
			Math.floor(hours/10) , hours%10,
			Math.floor(mins/10)  , mins%10,
			Math.floor(secs/10)  , secs%10,
			Math.floor(days/10)  , days%10,
			Math.floor(month/10) , month%10,
			Math.floor(year/10)  , year%10
		];
	},
	getStartOfAnimation : function(i,animationSequences){
		var animationSequence=animationSequences[i];
		var start = animationSequence.start + this.easeInOut(animationSequence.size,animationSequence.time,animationSequence.duration);
		animationSequence.time++;
		return start;
	},
	easeInOut : function(size,time,duration){
	    var s= size/2
		if((time/=duration/2)<1)
	    	return s*time*time;
	    return -s*((time-1)*(time-3)-1);
	},
	easeOut : function(size,time,duration){
		var s = 1 - time/duration;
		return size * ( 1 - s * s );		
	}
}