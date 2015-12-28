ClockClockPreparer = {
	circleBuffer : null,
	secondaryBuffer : null,
	
	prepare : function(app, node)
	{
		node.extend(app);
		var style = getComputedStyle(node);
		var color = getValueOrDefault(style.color, "#000");
		var backgroundColor = getValueOrDefault(style.backgroundColor, "#fff");
		var w = style.width;
		if(w != "")
			w=w.substr(0,w.length-2);
		else
			w = window.innerWidth/4-10;
		w=w*(cyphersCount/6)/cyphersCount;
		var radius = (w-5)/4;
		var layout = { 
				radius : radius,
				width : w,
				height : 6*radius+9,
				hand : radius-5 
			};

		this.circleBuffer = createCanvas(layout.width, layout.height);
		this.secondaryBuffer = createCanvas(layout.width, layout.height);

		var ctx = this.circleBuffer.getContext("2d");
		ctx.fillStyle="#fff";
		ctx.fillRect(0, 0, layout.width, layout.height);
		doForAllCypherParts(this, function(lineNo, colNo)
		{
			ClockClockDrawUtils.drawClockCypherBackground(ctx, colNo, lineNo, layout.radius, color, backgroundColor);
		});
		this.prepareCyphers(app, node, layout, color);
	},
	prepareCyphers : function(app, node, layout, color)
	{
		for(var cyphers = 0; cyphers < cyphersCount; cyphers++)
		{
			var cypher = new Cypher(this);
			CypherPreparer.prepareCypher(cypher, this, node, layout, color);
			app.cyphers.push(cypher);
		}
	}
}