CypherPreparer = {
	prepareCypher : function(cypher,ccPreparer,node){
		cypher.animator = new CypherAnimator();
		cypher.animator.view = this.getCypherView(ccPreparer,node);
	},
	getCypherView : function(ccPreparer,node){
		var cvs = createCanvas(ccPreparer.layout.width,ccPreparer.layout.height);
		node.appendChild(cvs);
		var view = new CypherView();
		view.ctx = cvs.getContext("2d");
		view.cbx = ccPreparer.secondaryBuffer.getContext("2d"),
		view.frontBuffer = ccPreparer.circleBuffer;
		view.backBuffer = ccPreparer.secondaryBuffer;
		view.radius = ccPreparer.layout.radius;
		view.hand = ccPreparer.layout.hand;
		view.color = ccPreparer.color;
		view.nodeHand = node.getAttribute("hand");
		return view;
	}
};