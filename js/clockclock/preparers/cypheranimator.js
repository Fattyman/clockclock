CypherAnimatorPreparer = {
	prepareCypherAnimations : function(cypherNumber,newCypherNumber){
		var animationSequences = [];
		for(var hand=0;hand<12;hand++){
			animationSequences.push(this.getSequenceConfiguration(cypherNumber,newCypherNumber,hand));
		}
		return animationSequences;
	},
	getSequenceConfiguration : function(cypherNumber,newCypherNumber,hand){
		var startAngle = this.getAngleForPosition(cypherNumber,hand);
		var endAngle = this.getAngleForPosition(newCypherNumber,hand);
		var steps = morphingMode ?  
				ClockClockConfig[cfgMode].fullsteps : 
				ClockClockConfig[cfgMode].steps;
		var offset = 	endAngle -
						startAngle +
						ClockClockUtils.getSpeed() *
						(hand%2==0 ? 360 : 720);
		return {
					start : startAngle, 
					time : 0, 
					size : offset, 
					duration : steps
				};
	},
	getAngleForPosition : function(cypherPart,hand){
		return pos[cyphers[cypherPart][hand]];
	}
}