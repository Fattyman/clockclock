Cypher = function(){
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

CypherAnimator = function(){
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
			if(this.animationSequences[0][STEPS]!=0)
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

CypherView = function(){
	var v={
		ctx : null,
		cbx : null,
		frontBuffer : null,
		backBuffer : null,
		radius : null,
		hand : null,
		nodeHand : null,
		color : null,
		drawAllCypherParts : function(animationSequences){
			this.animationSequences=animationSequences;
			this.drawCypherBackground();
			this.drawCypherForeground();
		},
		drawCypherBackground : function(){
			this.cbx.drawImage(this.frontBuffer,0,0);
		},
		drawCypherForeground : function(){
			this.cbx.strokeStyle=this.color;
			this.drawCompleteCypher();
			this.ctx.drawImage(this.backBuffer,0,0);
		},
		drawCompleteCypher : function(){
			var cyphers=0;
			for(var lineNo=0; lineNo<3; lineNo++){
				for(var colNo = 0; colNo < 2; colNo++){
					this.drawTwoClockHands(colNo,lineNo,cyphers++);
					cyphers++;
				}
			}
		},
		drawTwoClockHands : function(x,y,cyphers){
			this.drawClockHand(x,y,ClockClockUtils.getStartOfAnimation(cyphers,this.animationSequences));
			this.drawClockHand(x,y,ClockClockUtils.getStartOfAnimation(cyphers+1,this.animationSequences));
		},
		drawClockHand : function(x,y,animationStart){
			ClockClockDrawUtils.drawAngleLine(
				this.cbx, this.radius,
				x, y,
				animationStart,
				this.hand-3, this.color, this.nodeHand );
		}
	};
	return v;
}
