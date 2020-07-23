/* // THX blue
const mainColor     = '#28aadc';
const mainColorRgba = '40, 170, 220';*/

 // RZR green
const mainColor     = '#44d62c';
const mainColorRgba = '68,214,44';
const mainColor03   = '#2c5825';

const mainGray      = '#ccc';
const mainGrayRgba  = '204, 204, 204';

var tutorialMode = false;

function degreeToRadian(d=0) {
	return d*Math.PI/180;
}

function radianToDegree(r=0) {
	return Math.floor(r/Math.PI*180);
}

function fullRadian() {
	return Math.PI*2;
}

function eventDegreeToCenter(e, cX, cY) {

	var x = e.x-cX;
	var y = e.y-cY;
	var d = 0;

	if(x != 0) {
		var atan = Math.atan(y/x);
		d = radianToDegree(atan);
	} else {
		if(y < 0) {
			d = -90;
		} else {
			d = 90;
		}
	}

	if(x < 0 && y >= 0) { d = d-180; }
	if(x < 0 && y <= 0) { d = d+180; }
	if(d < 0) { d = d + 360; }

	return d;
}

function handlePopout(e, triggerId, popId, toggleClass, callbackFunc = function(){}) {
	let popElem = document.getElementById(popId);

	if(!popElem.classList.contains(toggleClass) && e.target.id == triggerId) {
		popElem.classList.add(toggleClass);
	} else {
		let rect = popElem.getBoundingClientRect();
		
		let ymin = rect.top;
		let ymax = rect.bottom;
		let xmin = rect.left;
		let xmax = rect.right;

		if((xmin <= e.x && e.x <= xmax) && (ymin <= e.y && e.y <= ymax)) {
		} else {
			popElem.classList.remove(toggleClass);	
		}
	}
	callbackFunc();
	return;
}

function smartFloat(rect, tooltipWidth, windowWidth) {
	let leftPx;
	let topPx;
	if(rect.right + tooltipWidth > windowWidth) {
		leftPx = (rect.right - tooltipWidth - 9) + 'px';
	} else {
		leftPx = (rect.right + 2) + 'px';
	}
	topPx = rect.bottom - 48 + 3 + 'px';
	return {left: leftPx, top: topPx};
}

function isBetween(x, min, max) {
	return x >= min && x <= max;
}

function removeClassFromElements(searchArea, className, addTo) {

	var replace = className;
	var re = new RegExp(replace,"g");
	
	let activeTab = searchArea.getElementsByClassName(className);
	while(activeTab.length) {
		if(activeTab[0].isSameNode(addTo)) { break; } else {
			activeTab[0].className = activeTab[0].className.replace(re, "");
		}
    }
	addTo.classList.add(className);
}