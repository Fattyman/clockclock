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
		var offset = (endAngle-startAngle+ClockClockUtils.getSpeed()*360)/ClockClockConfig[cfgMode].steps;
		return [startAngle,ClockClockConfig[cfgMode].steps,offset,0];
	},
	getAngleForPosition : function(cypherPart,hand){
		return pos[cyphers[cypherPart][hand]];
	}
}