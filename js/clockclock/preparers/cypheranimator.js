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
						360;
		return [startAngle,0,offset,steps];
	},
	getAngleForPosition : function(cypherPart,hand){
		return pos[cyphers[cypherPart][hand]];
	}
}