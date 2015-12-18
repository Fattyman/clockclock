function Cypher(){
	return {
		cypherNumber : 0,
		animator : null,
		morph : function(newCypherNumber,morphingMode){
			if(this.shouldAnimationStart(newCypherNumber,morphingMode)){
				var animationSequences = CypherAnimatorPreparer.prepareCypherAnimations(this.cypherNumber,newCypherNumber);
				this.cypherNumber=newCypherNumber;
				this.animator.animate(animationSequences);
			}
		},
		shouldAnimationStart : function(newCypherNumber,morphingMode){
			if(this.animator.isAnimationFinished() && (this.hasCypherChanged(newCypherNumber) || morphingMode==MORPH_ALL_CYPHERS))
				return true;
			else
				return false;
		},
		hasCypherChanged : function(newCypherNumber){
			return this.cypherNumber!=newCypherNumber;
		}
	};
}