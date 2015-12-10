ONLY_TIME=6;
TIME_AND_DATE=12;
SHORT=4;

STEPS_LONG=75;
STEPS_VERY_LONG=500;
STEPS_SHORT=45;

ANIMATION_INTERVAL_ONE_SECOND=1000;
ANIMATION_INTERVAL_FIVE_SECONDS=5000;

START=0;
OFFSET=2;
STEPS=1;

MORPH_ALL_CYPHERS=true;
MORPH_ONLY_CHANGING_CYPHERS=false;
ANIMATIONS_MILLIS=5;

var cyphersCount=TIME_AND_DATE;
var animationSpeedMillis=ANIMATIONS_MILLIS;
var morphingMode=MORPH_ALL_CYPHERS;
var cfgMode='slow';

var ClockClockConfig = {
	slow : {
		steps : STEPS_VERY_LONG,
		animationIntervall : ANIMATION_INTERVAL_FIVE_SECONDS
	},
	mixed : {
		steps : STEPS_LONG,
		animationIntervall : ANIMATION_INTERVAL_FIVE_SECONDS
	},
	fast : {
		steps : STEPS_LONG,
		animationIntervall : ANIMATION_INTERVAL_ONE_SECOND
	},
	blitz : {
		steps : STEPS_SHORT,
		animationIntervall : ANIMATION_INTERVAL_ONE_SECOND
	}
};

var pos = [270,315,0,45,90,135,180,225];
var cyphers = [
	[2,4,4,6,0,4,0,4,0,2,0,6],
	[5,5,4,4,5,5,0,4,5,5,0,0],
	[2,2,4,6,2,4,0,6,0,2,6,6],
	[2,2,4,6,2,2,0,6,2,2,0,6],
	[4,4,4,4,0,2,0,2,5,5,0,0],
	[2,4,6,6,0,2,4,6,2,2,0,6],
	[2,4,6,6,0,4,4,6,0,2,0,6],
	[2,2,4,6,5,5,0,2,5,5,0,0],
	[4,2,6,4,0,2,0,6,0,2,0,6],
	[2,4,4,6,0,2,0,4,2,2,0,6],
];

