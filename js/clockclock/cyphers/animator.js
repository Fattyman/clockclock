function CypherAnimator(){
	return {
		view:null,
		animationSequences : null,
		animationFinished : true,
		animationTime : 0,
		animate: function(animationSequences){
			this.animationSequences=animationSequences;
			this.doCypherAnimation();
		},
		doCypherAnimation : function(){
			this.setAnimationStarted();
			this.view.drawAllCypherParts(this.animationSequences);
			this.finishAnimation();
		},
		setAnimationStarted : function(){
			this.animationFinished=false;
			this.animationTime=(new Date()).getTime();

		},
		isAnimationFinished : function(){
			return this.animationFinished;
		},
		finishAnimation : function(){
			var _this=this;
			if(this.animationSequences[0][1]!=this.animationSequences[0][3])
			{
				var diff = animationSpeedMillis-((new Date()).getTime()-this.animationTime);
				if(diff<0)diff=0;
				window.setTimeout(function(){_this.doCypherAnimation()},diff);
			}
			else {
				this.animationFinished=true;
			}
		}
	};
}