function CypherView(){
	return {
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
			doForAllCypherParts(this,function(lineNo,colNo){
				this.drawTwoClockHands(colNo,lineNo,cyphers++);
				cyphers++;
			})
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
}