import { Device } from 'gateway-addon';
import { OnOffProperty } from './on-off-property';
import { TapoAdapter } from './tapo-adapter';
import { TapoDevice } from 'tp-link-tapo-connect';

export class MyTapoDevice extends Device {
    private onOffProperty: OnOffProperty;
    
    constructor(
        adapter: TapoAdapter,
        private tapoDevice: TapoDevice,
        private deviceApi: any
    ) {
        super(adapter, 'tapo-'+tapoDevice.deviceId);
        this.setTitle(tapoDevice.alias);
        this.addType('OnOffSwitch');
        this.addType('Light');
        this.onOffProperty = new OnOffProperty(this);
        this.addProperty(this.onOffProperty);

        console.log(`Found Tapo device ${tapoDevice.alias}`);
        console.log({tapoDevice})
    }

    addType(type: string): void {
        ((this as unknown) as { '@type': string[] })['@type'].push(type);
    }

    async on(onState: boolean) {
        console.log(`Turning ${this.tapoDevice.alias} ${onState?'On':'Off'}`);
        if (onState) {
            await this.deviceApi.turnOn();
        } else {
            await this.deviceApi.turnOff();
        }
    }
      
    async update() {
        try {
            const deviceStatus = await this.deviceApi.getDeviceInfo();
            console.log(`Updating Tapo device ${this.tapoDevice.alias}`);
            console.trace({deviceStatus})
            this.onOffProperty.update(deviceStatus)
        } catch (error) {
            console.log(`Error updating ${this.tapoDevice.alias}`)
            console.error(error);
        }
    }
}