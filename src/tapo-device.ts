import { Device } from 'gateway-addon';
import { OnOffProperty } from './on-off-property';
import { TapoAdapter } from './tapo-adapter';
import { TapoDevice, turnOn, TapoDeviceKey } from 'tp-link-tapo-connect';

//import { cloudLogin, listDevices, listDevicesByType, loginDevice, loginDeviceByIp, getDeviceInfo, turnOn, setBrightness, setColour } from './api';


export class MyTapoDevice extends Device {
    private onOffProperty: OnOffProperty;

    constructor(
        adapter: TapoAdapter,
        private tapoDevice: TapoDevice,
        private deviceKey: TapoDeviceKey
    ) {
        super(adapter, tapoDevice.deviceId);
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
        console.log('Turning On/Off '+this.tapoDevice.alias);
        await turnOn(this.deviceKey, onState)
    }
      
}