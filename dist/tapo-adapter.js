"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapoAdapter = void 0;
const gateway_addon_1 = require("gateway-addon");
const tp_link_tapo_connect_1 = require("tp-link-tapo-connect");
const tapo_device_1 = require("./tapo-device");
class TapoAdapter extends gateway_addon_1.Adapter {
    constructor(addonManager) {
        super(addonManager, `tapo-adapter`, 'tapo-adapter-ts');
        addonManager.addAdapter(this);
        const config = this.getConfig();
        console.log({ config });
    }
    startPairing() {
        this.attemptPairing();
    }
    async attemptPairing() {
        const { username, password } = await this.getConfig();
        console.log(`Searching for Tapo devices - ${username}`);
        const cloudToken = await tp_link_tapo_connect_1.cloudLogin(username, password);
        const devices = await tp_link_tapo_connect_1.listDevices(cloudToken);
        const tapoDevices = devices.filter(device => tp_link_tapo_connect_1.isTapoDevice(device.deviceType));
        console.log(`Found ${tapoDevices.length} Tapo devices`);
        console.log({ tapoDevices });
        tapoDevices.map(device => {
            this.handleDeviceAdded(new tapo_device_1.TapoDevice(this, device));
        });
    }
    async getConfig() {
        var _a;
        const db = new gateway_addon_1.Database('tapo-adapter-ts', '');
        await db.open();
        return (_a = (await db.loadConfig())) !== null && _a !== void 0 ? _a : {};
    }
}
exports.TapoAdapter = TapoAdapter;
//# sourceMappingURL=tapo-adapter.js.map