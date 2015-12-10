ClockClockPreparer = {
	target : null,
	color : null,
	backgroundColor : null,
	layout : null,
	node : null,
	circleBuffer : null,
	secondaryBuffer : null,
	
	prepare:function(target,node){
		node.extend(target);
		this.target=target;
		this.node=node;
		this.prepareLayout();
		this.preparePaintBuffers();
		this.prepareBackground();
		this.prepareCyphers();
	},
	prepareLayout:function(){
		var style=getComputedStyle(this.node);
		this.prepareColors(style);
		this.prepareTargetLayout(style);
	},
	prepareColors : function(style){
		this.color = getValueOrDefault(style.color,"#000");
		this.backgroundColor = getValueOrDefault(style.backgroundColor,"#fff");
	},
	prepareTargetLayout : function(style){
		this.setTargetLayout(this.getBaseLayoutWidth(style));
	},
	getBaseLayoutWidth : function(style){
		var w = style.width;
		if(w != "")
			w=w.substr(0,w.length-2);
		else
			w = window.innerWidth/4-10;
		w=w*(cyphersCount/6)/cyphersCount;
		return w;
	},
	setTargetLayout : function(w){
		this.layout = { 
			radius : (w-5)/4,
			width : w,
			height : 6*(w-5)/4+9,
			hand : (w-5)/4-5 
		};
	},
	preparePaintBuffers : function() {
		this.circleBuffer=this.getBuffer();
		this.secondaryBuffer=this.getBuffer();
	},
	getBuffer : function(){
		var buffer = document.createElement("canvas");  
		buffer.width = this.layout.width;
		buffer.height = this.layout.height;					
		return buffer;
	},
	prepareBackground: function(){
		var ctx = this.circleBuffer.getContext("2d");
		ctx.fillStyle="#fff";
		ctx.fillRect(0,0,this.layout.width,this.layout.height);
		for(var y=0; y<3; y++)
			for(var x = 0; x<2; x++)
				this.prepareClockCypherBackground(ctx,x,y);
	},
	prepareClockCypherBackground : function(ctx,x,y){
		var radius=this.layout.radius;
		var bigRadius = 2*radius+3;
		ClockClockDrawUtils.prepareCircle(ctx,bigRadius*x+radius+1,bigRadius*y+radius+1,radius);
		ctx.fillStyle=this.backgroundColor;
		ctx.fill();
		ctx.strokeStyle=this.color;
		ctx.lineWidth=1;
		ClockClockDrawUtils.prepareCircle(ctx,bigRadius*x+radius+1,bigRadius*y+radius+1,radius);
		ctx.stroke();
		for(var i=0;i<360;i+=30)
			ClockClockDrawUtils.drawAngleLine(ctx,radius,x,y,i,radius,this.color,i%90==0 ? 3 : 1);
		ClockClockDrawUtils.prepareCircle(ctx,bigRadius*x+radius+1,bigRadius*y+radius+1,radius-5);
		ctx.fillStyle=this.backgroundColor;
		ctx.fill();
	},
	prepareCyphers:function(){
		for(var cyphers=0;cyphers<cyphersCount;cyphers++)
			this.target.cyphers.push(new Cypher(this));
	},
}

CypherPreparer = {
	prepareCypher : function(cypher,ccPreparer){
		cypher.animator = new CypherAnimator();
		cypher.animator.view = this.getCypherView(ccPreparer);
	},
	getCypherView:function(ccPreparer){
		var cvs = this.getCanvas(ccPreparer);
		var view = new CypherView();
		view.ctx = cvs.getContext("2d");
		view.cbx = ccPreparer.secondaryBuffer.getContext("2d"),
		view.frontBuffer = ccPreparer.circleBuffer;
		view.backBuffer = ccPreparer.secondaryBuffer;
		view.radius = ccPreparer.layout.radius;
		view.hand = ccPreparer.layout.hand;
		view.color = ccPreparer.color;
		view.nodeHand = ccPreparer.node.getAttribute("hand");
		return view;
	},
	getCanvas : function(ccPreparer){
		var cvs = document.createElement("canvas");
		ccPreparer.node.appendChild(cvs);
		cvs.width=ccPreparer.layout.width;
		cvs.height=ccPreparer.layout.height;
		cvs.style.marginLeft=0;
		cvs.style.float="left";
		return cvs;
	}
};
