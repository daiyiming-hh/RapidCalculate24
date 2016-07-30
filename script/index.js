//检测是否为手机登陆
if (! device.mobile()) { 
	window.location.href = "./error.html"; 
}
// 创建数字列表
var numList = new Array();
for (var i = 1; i < 14; i ++) {
	numList.push(i);
	numList.push(i);
}

// 创建符号列表
var symbolList = new Array();
symbolList.push("(");
symbolList.push(")");
symbolList.push("+");
symbolList.push("-");
symbolList.push("×");
symbolList.push("÷");

// 创建数字列表
var numDivList = new Array();
var numInputList = new Array();

// 输入框
var divInputBox = null;

// 输入的内容
var inputs = new Array();

// 计时器控件
var timer = null;

// 产生列表
function generateRandomNum() {
	var existIndexs = new Array();
	for (var i = 0; i < numDivList.length; i ++) {
		var index = parseInt(Math.random() * 26);
		while (existIndexs.indexOf(index) != -1) {
			index = parseInt(Math.random() * 26);
		}
		existIndexs.push(index);
		numInputList[i] = numList[index];
		numDivList[i].innerHTML = numList[index];
	}
}

// 获取元素
function getElement(id) {
	return document.getElementById(id);
}

// 初始化符号
function initSymbol(index) {
	getElement("div_symbol" + (index + 1)).addEventListener("touchstart", function(event) {
		inputs.push(symbolList[index]);
		divInputBox.innerHTML += symbolList[index];
	}, true);
}

// 初始化数字控件
function initNum(index) {
	numDivList.push(getElement("div_num" + (index + 1)));
	numDivList[index].addEventListener("touchstart", function(event) {
		if (numDivList[index].innerHTML == "") {
			return;
		}

		// 判断前一个被点击的是否是数字
		if (inputs.length > 0 
			&& inputs[inputs.length - 1] != symbolList[0] 
			&& inputs[inputs.length - 1] != symbolList[1] 
			&& inputs[inputs.length - 1] != symbolList[2] 
			&& inputs[inputs.length - 1] != symbolList[3]
			&& inputs[inputs.length - 1] != symbolList[4] 
			&& inputs[inputs.length - 1] != symbolList[5]) {
			timer.stop();
			new NotificationDialog("不能连续输入数字！", "继续", function() {
				timer.restart();
			}).show();
			return;
		}
		
		inputs.push(numDivList[index].innerHTML);
		divInputBox.innerHTML += numDivList[index].innerHTML;
		numDivList[index].innerHTML = "";
	}, true);
}

function refreashGame() {
	timer.stop();
	divInputBox.innerHTML = "";
	inputs = new Array();
	generateRandomNum();
	timer.start();
}

// 初始化游戏
function initGame() {
	for (var i = 0; i < 6; i ++) {
		initSymbol(i);
	}

	for (var i = 0; i < 4; i ++) {
		initNum(i);
	}

	divInputBox = getElement("div_input_box");

	getElement("div_next").addEventListener("touchstart", function(event) {
		timer.stop();
		var result = new Calculate24(numInputList).getExpression();
		new NotificationDialog("答案：" + (result == null? "无解" : result), "下一关", function() {
			refreashGame();
		}).show();
	}, true);


	getElement("div_sure").addEventListener("touchstart", function() {
		for (var i = 0; i < numDivList.length; i ++) {
			if (numDivList[i].innerHTML != "") {
				timer.stop();
				new NotificationDialog("所有的数字都要用到才行！", "继续", function() {
					timer.restart();
				}).show();
				return;
			}
		}
		try {
			var content = divInputBox.innerHTML.replace(new RegExp("×","gm"), "*").replace(new RegExp("÷","gm"), "/");
			var value = eval(content);
			if (parseFloat(value) == 24) {
				var time = timer.stop();
				new NotificationDialog("恭喜你得到24！用时" + time, "下一轮", function() {
					refreashGame();
				}).show();
			} else {
				timer.stop();
				new NotificationDialog("结果不对~再试试！", "继续", function() {
					timer.restart();
				}).show();
			}
		} catch(e) {
			timer.stop();
			new NotificationDialog("结果不对~再试试！", "继续", function() {
				timer.restart();
			}).show();
		}
	}, true);

	getElement("div_delete").addEventListener("touchstart", function() {
		if (inputs.length == 0) {
			return;
		}

		var lastInput = inputs[inputs.length - 1];

		for (var i = 0; i < symbolList.length; i ++) {
			if (lastInput == symbolList[i]) {
				inputs.pop();
				divInputBox.innerHTML = inputs.toString().replace(new RegExp(",","gm"), "");
				return;
			}
		}

		for (var i = 0; i < numInputList.length; i ++) {
			if (lastInput == numInputList[i] && numDivList[i].innerHTML == "") {
				numDivList[i].innerHTML = lastInput;
				inputs.pop();
				divInputBox.innerHTML = inputs.toString().replace(new RegExp(",","gm"), "");
				return;
			}
		}
	}, true);

	generateRandomNum();

	timer = new Timer();
	timer.start();
}

// 页面加载完成后执行
window.onload = function() {
	var divDialog = getElement("div_dialog");
	getElement("div_begin").addEventListener("touchstart", function(event) {
			divDialog.setAttribute("class", "hidden");
			setTimeout(function() {
				divDialog.style.display = "none";
				initGame();
			}, 300);
		}, true);
}