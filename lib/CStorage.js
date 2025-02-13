function CSGet(key) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(key, function (value) {
                const item = key == null ? value : value[key];
				console.log('Getting', key, '->', item);
                if (!item) {
                    resolve(undefined);
                    return;
                }

                // If item has no TTL or TTL has expired, remove it and return undefined
                if (!item._expires || item._expires < Date.now()) {
                    CSRemove(key);
                    resolve(undefined);
                    return;
                }

                // Return the value (without TTL metadata)
                resolve(item.value);
            });
        } catch (ex) {
            reject(ex);
        }
    });
}

function CSSet(key, value, ttlHours) {
    return new Promise((resolve, reject) => {
        try {
            let obj = {};
            // If TTL provided, wrap the value with expiration
            if (ttlHours) {
                obj[key] = {
                    value: value,
                    _expires: Date.now() + (ttlHours * 60 * 60 * 1000)
                };
            } else {
                obj[key] = value;
            }
            chrome.storage.local.set(obj, resolve);
        } catch (ex) {
            reject(ex);
        }
    });
}

function CSRemove(keys) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.remove(keys, resolve);
        } catch (ex) {
            reject(ex);
        }
    });
}