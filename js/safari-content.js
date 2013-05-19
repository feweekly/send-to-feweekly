(function () {
	if (window.top != window) return;
	if (!window.safari) return;

	safari.self.addEventListener("message", function (msg) {
		var name = msg.name;
		var message = msg.message;

		if (name === "executeScript") {
			eval(message);
		}
		else if (name === "__performCb") {
			var cbId = message.cbId;
			var data = message.data;
			Callbacker.performCbFromIdWithData(data, cbId);
		}
		else if (name === "isSafariContentAvailable") {
			safari.self.tab.dispatchMessage("safariContentAvailable", message);
		}
	});

	document.addEventListener("contextmenu", function handleContextMenu(event) {
		safari.self.tab.setContextMenuEventUserInfo(event, event.target.href);
	}, false);

	var Callbacker = window.Callbacker = {
		addCb: function (cb) {
			if (!this._cbsToIds) {
				this._cbsToIds = {};
			}
			if (!this._cbCounter) {
				this._cbCounter = 0;
			}

			var cbId = ++this._cbCounter;
			this._cbsToIds[cbId] = cb;
			return cbId;
		},
		performCbFromIdWithData: function (data, cbId) {
			if (!this._cbsToIds) return;

			var cb = this._cbsToIds[cbId];
			if(!cb) return;

			this._cbsToIds[cbId] = undefined;

			cb(data);
		}
	};
}());
