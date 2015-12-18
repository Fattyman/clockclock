function applicationLoaded(){
	try
	{
		if(document.readyState !== "complete")
		{
			setTimeout("applicationLoaded()",1)
		}
		else
		{
			var clocks = document.getElementsByTagName("span");
			for(var cl = 0; cl < clocks.length; cl++){
				var span = clocks[cl];
				if(span.className.indexOf("clockclock") != -1)
				{
					new ClockClock(span);
				}
			}
		}
	}
	catch(e)
	{
		alert(getMemberInfoOf(e));
	}
};

function ClockClock(node)
{
	var v = {
		cyphers : [],
		morphToDateTime : function()
		{
			var dateTimeParts = ClockClockUtils.getDateTimeParts();
			for(var i = 0; i < cyphersCount; i++)
			{
				this.cyphers[i].morph(dateTimeParts[i],morphingMode);
			}
			var _this = this;
			window.setTimeout(
				function(){
					_this.morphToDateTime(morphingMode)
				},
				ClockClockConfig[cfgMode].animationIntervall
			);
		},
		init : function(node)
		{
			ClockClockPreparer.prepare(this,node);
			this.morphToDateTime();
		}
	};
	v.init(node);
	return v;
}