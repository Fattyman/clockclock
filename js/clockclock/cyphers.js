Cypher = function(preparer){
	var cypher = {
		cypherNumber:0,
		morph : function(newCypherNumber,morphingMode){
			if(this.shouldAnimationStart(newCypherNumber,morphingMode)){
				var animationSequences = this.prepareCypherAnimations(newCypherNumber);
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
		},
		prepareCypherAnimations : function(newCypherNumber){
			var animationSequences = [];
			for(var hand=0;hand<12;hand++){
				animationSequences.push(this.getSequenceConfiguration(newCypherNumber,hand));
			}
			this.saveCypherContent(newCypherNumber);
			return animationSequences;
		},
		saveCypherContent:function(newCypherNumber){
			this.cypherNumber=newCypherNumber;
		},
		getSequenceConfiguration : function(newCypherNumber,hand){
			var startAngle = this.getAngleForPosition(this.cypherNumber,hand);
			var endAngle = this.getAngleForPosition(newCypherNumber,hand);
			var offset = (endAngle-startAngle+ClockClockUtils.getSpeed()*360)/ClockClockConfig[cfgMode].steps;
			return [startAngle,ClockClockConfig[cfgMode].steps,offset,0];
		},
		getAngleForPosition : function(cypherPart,hand){
			return pos[cyphers[cypherPart][hand]];
		}
	};
	CypherPreparer.prepareCypher(cypher,preparer);
	return cypher;
}

CypherAnimator = function(){
	return {
		view:null,
		animationSequences:null,
		animationFinished:true,
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
		},
		isAnimationFinished : function(){
			return this.animationFinished;
		},
		finishAnimation : function(){
			var _this=this;
			if(this.animationSequences[0][STEPS]!=0)
				window.setTimeout(function(){_this.doCypherAnimation()},animationSpeedMillis);
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
		radius :null,
		hand : null,
		nodeHand : null,
		color : null,
		drawAllCypherParts : function(animationSequences){
			this.animationSequences=animationSequences;
			this.drawCypherBackground();
			this.drawCompleteCypher();
		},
		drawCypherBackground : function(){
			this.cbx.drawImage(this.frontBuffer,0,0);
		},
		drawCompleteCypher : function(){
			this.cbx.strokeStyle=this.color;
			this.drawAllClockHands();
			this.ctx.drawImage(this.backBuffer,0,0);
		},
		drawAllClockHands : function(){
			var cyphers=0;
			for(var y=0; y<3; y++){
				for(var x = 0; x<2; x++){
					this.drawTwoClockHands(x,y,cyphers++);
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
