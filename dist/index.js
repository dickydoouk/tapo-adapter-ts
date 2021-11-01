"use strict";
const tapo_adapter_1 = require("./tapo-adapter");
module.exports = (addonManager, manifest, errorCallback) => {
    const config = manifest.moziot.config;
    if (!config.username) {
        errorCallback(manifest.username, 'Tapo email/username is required!');
        return;
    }
    if (!config.password) {
        errorCallback(manifest.name, 'Tapo password is required!');
        return;
    }
    new tapo_adapter_1.TapoAdapter(addonManager);
};
//# sourceMappingURL=index.js.map