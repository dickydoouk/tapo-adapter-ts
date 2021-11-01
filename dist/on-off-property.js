"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnOffProperty = void 0;
const gateway_addon_1 = require("gateway-addon");
class OnOffProperty extends gateway_addon_1.Property {
    constructor(device) {
        super(device, 'on', {
            '@type': 'OnOffProperty',
            label: 'On/Off',
            type: 'boolean',
        });
    }
    update(light) {
        if (typeof light.state.on === 'boolean') {
            this.setCachedValueAndNotify(light.state.on);
        }
    }
    async setValue(value) {
        const newValue = await super.setValue(value);
        // const state = { on: newValue };
        // await this.turnOn(state.on);
        return newValue;
    }
}
exports.OnOffProperty = OnOffProperty;
//# sourceMappingURL=on-off-property.js.map