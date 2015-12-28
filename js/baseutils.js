function getMemberInfoOf(obj)
{
	var info=obj; 
	for(var attribute in obj)
	{
		info += attribute + ':' + obj[attribute];
	}
	return info;
}
			
Object.prototype.extend=function(ext)
{
	if(typeof(this.extensions) == 'undefined' )
	{
		this.extensions=[];
	}
	var extend = new Object();
	this.extensions.push(extend);
	for(var ele in ext)
	{
		extend[ele]=ext[ele];
	}
	return this;
};

function getValueOrDefault(value,defaultValue)
{
	return value=="" ? defaultValue : value;
}

function doForAllCypherParts(ctx,fkt)
{
	for(var lineNo = 0; lineNo < 3; lineNo++)
	{
		for(var colNo = 0; colNo < 2; colNo++)
		{
			fkt.call(ctx,lineNo,colNo);
		}
	}
}

function createCanvas(width,height)
{
	var cvs = document.createElement("canvas");
	cvs.width = width;
	cvs.height = height;
	return cvs;
}