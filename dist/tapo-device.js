"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapoDevice = void 0;
const gateway_addon_1 = require("gateway-addon");
const on_off_property_1 = require("./on-off-property");
class TapoDevice extends gateway_addon_1.Device {
    constructor(adapter, device) {
        super(adapter, device.deviceId);
        this.setTitle(device.alias);
        this.addType('OnOffSwitch');
        this.addType('Light');
        this.onOffProperty = new on_off_property_1.OnOffProperty(this);
        this.addProperty(this.onOffProperty);
    }
    addType(type) {
        this['@type'].push(type);
    }
}
exports.TapoDevice = TapoDevice;
//# sourceMappingURL=tapo-device.js.map