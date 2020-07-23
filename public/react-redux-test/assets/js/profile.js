var activeProfile = document.getElementById('profile1');
var profileList   = document.getElementById('profileList');
var editDom = document.getElementById('profileRename'); editDom.value = activeProfile.innerText;

var editIcon = document.getElementById('profileEdit');
var deleteIcon = document.getElementById('profileDelete');

var trimLength = 25;
var tempName = '';

var profileDown = function() {
    if(profileList.offsetHeight <= activeProfile.offsetTop + 30) {
    	return false;
    }
    profileList.insertBefore(activeProfile.nextElementSibling, activeProfile);
    checkUpDown();
};

var profileUp = function() {
	var prev = activeProfile.previousElementSibling;
    if(prev == null) {
    	return false; 
    }
	profileList.insertBefore(activeProfile, prev);
    checkUpDown();
};

var editCallback = function() {
	if(!editDom.classList.contains('show')) {
		saveAndClose();
		return;
	}

    tempName = activeProfile.innerText;

    editDom.value = activeProfile.innerText;
    editDom.style.top = activeProfile.offsetTop + 'px';
	editDom.focus();
  	editDom.select();
};

function saveAndClose() {
	if(trimValue(editDom.value) == '') {
		escapeAndClose();
		return;
	}
	activeProfile.innerText = trimValue(editDom.value);
	editDom.classList.remove('show');	
}

function escapeAndClose() {
	activeProfile.innerText = tempName;
	editDom.classList.remove('show');
	document.getElementById('eqTitle').innerText = tempName;
}

function checkUpDown() {
    if(profileList.offsetHeight <= activeProfile.offsetTop + 30) {

    	document.getElementById('profileDown').classList.add('disabled');
    } else if(activeProfile.offsetTop == 0) {
    	document.getElementById('profileUp').classList.add('disabled');
    } else {
    	document.getElementById('profileUp').classList.remove('disabled');
    	document.getElementById('profileDown').classList.remove('disabled');
    }
}

function changeProfile(activeId) {
	activeProfile = document.getElementById(activeId);
	removeClassFromElements(profileList, 'active', activeProfile);
	
	document.getElementById('eqTitle').innerText = activeProfile.innerText;

	if(activeProfile.classList.contains('no-edit')) {
		editIcon.classList.remove('show');
		deleteIcon.classList.remove('show');
	} else {
		editIcon.classList.add('show');
		deleteIcon.classList.add('show');
	}

	editDom.value = activeProfile.innerText;

	checkUpDown();
}

function deleteCallback() {
	document.getElementById('delName').innerText = activeProfile.innerText;
}

var cfmDelete = function() {
	var nextOfKin = activeProfile.previousElementSibling;
    if(nextOfKin == null) {
    	// deleted top item
    	nextOfKin = activeProfile.nextElementSibling;
	}
	activeProfile.remove();
	changeProfile(nextOfKin.id);
	document.getElementById('profileDelCfm').classList.remove('show');
};

var addProfile = function() {
	var newItem = document.createElement('div');
	newItem.classList.add('profile-item');
	newItem.classList.add('custom');
	newItem.innerText = 'New Profile';
	var timestamp = new Date().getUTCMilliseconds(); // dummy div id
	newItem.id = timestamp;
	profileList.append(newItem);

	changeProfile(timestamp);
	profileList.scrollTo(0, profileList.scrollHeight);
};

document.getElementById('profileUp').addEventListener("click", profileUp);
document.getElementById('profileDown').addEventListener("click", profileDown);
document.getElementById('cfmDelete').addEventListener("click", cfmDelete);
document.getElementById('profileAdd').addEventListener("click", addProfile);

profileList.addEventListener("scroll", function(event) {
	saveAndClose();
});

document.addEventListener("click", function(e) {
	handlePopout(e, 'profileDelete', 'profileDelCfm', 'show', deleteCallback);
	handlePopout(e, 'profileEdit', 'profileRename', 'show', editCallback);
	if(e.target.classList.contains('profile-item') && !e.target.classList.contains('active') && e.target.id !='profileRename') {
		changeProfile(e.target.id);
	}
});

function trimValue(value) {
	value = value.trim();
	return value.substring(0, trimLength);
}
function liveUpdate() {
	document.getElementById('eqTitle').innerText = trimValue(editDom.value);
}

editDom.addEventListener('keyup', function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		saveAndClose();
	} else if (event.keyCode === 27) {
		escapeAndClose();
	} else {
		liveUpdate();
	}
});