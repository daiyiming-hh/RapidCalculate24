function Timer() {
	var layout = document.getElementById("div_timer");
	var startTimeStamp = 0;
	var time = 0;
	var isStop = false;

	// js计时器太坑，只有一直开着了
	setInterval(function() {
		if (! isStop) {
			setTime(time = new Date().getTime() - startTimeStamp);
		}	
	}, 1000);

	var getTime = function(time) {
		var seconds = parseInt(time / 1000 % 60);
		var minutes = parseInt(time / 1000 / 60);

		return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
	}

	var setTime = function(time) {
		layout.innerHTML = getTime(time);
	};

	this.start = function() {
		startTimeStamp = new Date().getTime();
		layout.innerHTML = "00:00";
		isStop = false;
	}

	this.restart = function() {
		startTimeStamp = new Date().getTime() - time;
		isStop = false;
	}

	this.stop = function() {
		isStop = true;
		return getTime(time = new Date().getTime() - startTimeStamp);
	}
}