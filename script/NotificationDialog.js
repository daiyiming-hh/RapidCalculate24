function NotificationDialog(content, buttonName, buttonClickedFunction) {
	this.content = content;
	this.buttonName = buttonName;
	this.buttonClickedFunction = buttonClickedFunction;
	this.isShowen = false;
	var layout = document.getElementById("div_notification");
	var button = document.getElementById("div_button");
	var _this = this;

	this.show = function() {
		if (! this.isShowen) {
			this.isShowen = true;
			document.getElementById("div_text").innerHTML = this.content;
			button.innerHTML = this.buttonName;
			
			button.addEventListener("touchstart", function() {
				if (_this.buttonClickedFunction != null) {
					_this.buttonClickedFunction();
				}
				_this.hide();
			}, true);
			
			layout.style.display = "block";
			layout.setAttribute("class", "show");
		}
	}

	this.hide = function() {
		if (this.isShowen) {
			layout.setAttribute("class", "hidden");
			button.onclick = null;
			this.isShowen = false;

			setTimeout(function() {
				layout.style.display = "none";
			}, 300);
		}
	}
}