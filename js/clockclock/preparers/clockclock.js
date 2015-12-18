ClockClockPreparer = {
	app : null,
	color : null,
	backgroundColor : null,
	layout : null,
	circleBuffer : null,
	secondaryBuffer : null,
	
	prepare : function(app,node){
		node.extend(app);
		this.app=app;
		this.prepareColorsAndLayout(node);
		this.preparePaintBuffers();
		this.prepareBackground();
		this.prepareCyphers(node);
	},
	prepareColorsAndLayout : function(node){
		var style=getComputedStyle(node);
		this.prepareColors(style);
		this.setClockClockLayout(this.getClockClockLayoutWidth(style));
	},
	prepareColors : function(style){
		this.color = getValueOrDefault(style.color,"#000");
		this.backgroundColor = getValueOrDefault(style.backgroundColor,"#fff");
	},
	getClockClockLayoutWidth : function(style){
		var w = style.width;
		if(w != "")
			w=w.substr(0,w.length-2);
		else
			w = window.innerWidth/4-10;
		w=w*(cyphersCount/6)/cyphersCount;
		return w;
	},
	setClockClockLayout : function(w){
		this.layout = { 
			radius : (w-5)/4,
			width : w,
			height : 6*(w-5)/4+9,
			hand : (w-5)/4-5 
		};
	},
	preparePaintBuffers : function() {
		this.circleBuffer = createCanvas(this.layout.width,this.layout.height);
		this.secondaryBuffer = createCanvas(this.layout.width,this.layout.height);
	},
	prepareBackground : function(){
		var ctx = this.circleBuffer.getContext("2d");
		ctx.fillStyle="#fff";
		ctx.fillRect(0,0,this.layout.width,this.layout.height);
		doForAllCypherParts(this,function(lineNo,colNo){
			ClockClockDrawUtils.drawClockCypherBackground(ctx,colNo,lineNo,this.layout.radius,this.color,this.backgroundColor);
		});
	},
	prepareCyphers : function(node){
		for(var cyphers=0;cyphers<cyphersCount;cyphers++)
		{
			var cypher = new Cypher(this);
			CypherPreparer.prepareCypher(cypher,this,node);
			this.app.cyphers.push(cypher);
		}
	}
}