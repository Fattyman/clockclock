CypherViewPreparer = {
	preparCypherView : function(ccPreparer, node, layout, color){
		var cvs = createCanvas(layout.width, layout.height);
		node.appendChild(cvs);
		var view = new CypherView();
		view.ctx = cvs.getContext("2d");
		view.cbx = ccPreparer.secondaryBuffer.getContext("2d"),
		view.frontBuffer = ccPreparer.circleBuffer;
		view.backBuffer = ccPreparer.secondaryBuffer;
		view.radius = layout.radius;
		view.hand = layout.hand;
		view.color = color;
		view.nodeHand = node.getAttribute("hand");
		return view;
	}
};