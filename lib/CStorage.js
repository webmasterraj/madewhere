function CSGet(key) {
	return new Promise((resolve, reject) => {
		try {
			chrome.storage.local.get(key, function (value) {
				if (key == null)
					resolve(value);
				else
					resolve(value[key]);
			});
		} catch (ex) {
			reject(ex);
		}
	});
}

function CSSet(key, value) {
	return new Promise((resolve, reject) => {
		try {
			let obj = {};
			obj[key] = value;
			chrome.storage.local.set(obj, function () {
				resolve();
			});
		} catch (ex) {
			reject(ex);
		}
	});
};


function CSRemove(keys) {
	return new Promise((resolve, reject) => {
		try {
			chrome.storage.local.remove(keys, function () {
				resolve();
			});
		} catch (ex) {
			reject(ex);
		}
	});
};