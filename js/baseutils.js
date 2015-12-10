
function getMemberInfoOf(obj){
	var info=obj; 
	for(var attribute in obj) 
		info += attribute + ':' + obj[attribute];
	return info;
}
			
Object.prototype.extend=function(ext){
	if(typeof(this.extensions) == 'undefined' ){
		this.extensions=[];
	}
	var extend = new Object();
	this.extensions.push(extend);
	for(var ele in ext){
		extend[ele]=ext[ele];
	}
	return this;
};

function getValueOrDefault(value,defaultValue){
	return value=="" ? defaultValue : value;
}
