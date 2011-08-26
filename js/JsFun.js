var JsFun = (function() {
	
	var ScrollingMessage = function(message, listener) {
		console.log("#ScrollingMessage: listener");
		this.message = message || "no message provided";
		this.listener = listener || null;
		this.intervalId = null;
	};
	ScrollingMessage.prototype.changeMessage = function(s) {
		this.message = s;
	};
	ScrollingMessage.prototype.toString = function() {
		return this.message + " [" + this.time + "]";
	};
	ScrollingMessage.prototype.notify = function() {
		if (this.listener) {
			this.listener(this.message);
		}
	};
	ScrollingMessage.prototype.shiftMessage = function() {
		console.log("#shiftMessage");
		this.message = (this.message.substring(1, this.message.length)) + (this.message.substring(0,1)); 
	};
	ScrollingMessage.prototype.scroll = function() {
		console.log("#scroll");
		this.shiftMessage();
		this.notify();
	}
	ScrollingMessage.prototype.run = function(n) {
		console.log("#run");
		var self = this;
 		this.intervalId = setInterval(function() { self.scroll() }, n);
	};
	ScrollingMessage.prototype.stop = function() {
		console.log("#stop");
		console.log(this.intervalId);
		clearInterval(this.intervalId);
	};
	var HtmlScrollingMessage = function(el) {
		console.log("#HtmlScrollingMessage");
		this.el = el;
		var listener = function(message) {
			console.log("notified(" + message + ")")
			this.el.innerText = this.message;
		};
		ScrollingMessage.apply(this, [el.innerText, listener]);
	};
	HtmlScrollingMessage.prototype = new ScrollingMessage();
	return {
		windowLoaded: function(event) {
			console.log("#windowLoaded");
			var messageHandler = function(message) {console.log(message)};
			//event.target.defaultView.sm = new ScrollingMessage("      Hello World       ", messageHandler);
			event.target.defaultView.htmlSm = new HtmlScrollingMessage(event.target.getElementById('messageBox'));
			//sm.run(1000);
		}
	}
})();
window.addEventListener('load', JsFun.windowLoaded, false);	

