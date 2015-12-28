CypherPreparer = {
	prepareCypher : function(cypher, ccPreparer, node, layout, color){
		cypher.animator = new CypherAnimator();
		cypher.animator.view = CypherViewPreparer.preparCypherView(ccPreparer, node, layout, color);
	}
};