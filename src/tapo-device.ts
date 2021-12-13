import { Device } from 'gateway-addon';
import { OnOffProperty } from './on-off-property';
import { TapoAdapter } from './tapo-adapter';
import { TapoDevice, turnOn, getDeviceInfo, TapoDeviceKey } from 'tp-link-tapo-connect';

export class MyTapoDevice extends Device {
    private onOffProperty: OnOffProperty;

    constructor(
        adapter: TapoAdapter,
        private tapoDevice: TapoDevice,
        private deviceKey: TapoDeviceKey
    ) {
        super(adapter, 'tapo-'+tapoDevice.deviceId);
        this.setTitle(tapoDevice.alias);
        this.addType('OnOffSwitch');
        this.addType('Light');
        this.onOffProperty = new OnOffProperty(this);
        this.addProperty(this.onOffProperty);
    }

    addType(type: string): void {
        ((this as unknown) as { '@type': string[] })['@type'].push(type);
    }

    async on(onState: boolean) {
        await turnOn(this.deviceKey, onState)
    }
      
    async update() {
        try {
            const deviceStatus = await getDeviceInfo(this.deviceKey);
            this.onOffProperty.update(deviceStatus)
        } catch (error) {
            console.log(`Error updating ${this.tapoDevice.alias} with ${this.deviceKey.token}`)
            console.error(error);
        }
    }
}