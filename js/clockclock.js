ClockClock = function(n){
	var v = {
		cyphers : [],
		morphToDateTime : function(){
			var dateTimeParts = ClockClockUtils.getDateTimeParts();
			for(var i=0;i<cyphersCount;i++)
				this.cyphers[i].morph(dateTimeParts[i],morphingMode);
			var _this= this;
			window.setTimeout(function(){_this.morphToDateTime(morphingMode)},ClockClockConfig[cfgMode].animationIntervall);
		},
		init : function(node){
			ClockClockPreparer.prepare(this,node);
			this.morphToDateTime();
		}
	};
	v.init(n);
	return v;
}

