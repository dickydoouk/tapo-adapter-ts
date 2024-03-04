import { Device } from 'gateway-addon';
import { OnOffProperty } from './on-off-property';
import { TapoAdapter } from './tapo-adapter';
import { TapoDeviceInfo } from 'tp-link-tapo-connect';

export class MyTapoDevice extends Device {
    private onOffProperty: OnOffProperty;
    
    constructor(
        adapter: TapoAdapter,
        private tapoDevice: TapoDeviceInfo,
        private deviceApi: any
    ) {
        super(adapter, 'tapo-'+tapoDevice.device_id);
        this.setTitle(tapoDevice.nickname);
        this.addType('OnOffSwitch');
        this.addType('Light');
        this.onOffProperty = new OnOffProperty(this);
        this.addProperty(this.onOffProperty);

        console.log(`Found Tapo device ${tapoDevice.nickname}`);
        console.trace({tapoDevice})
    }

    addType(type: string): void {
        ((this as unknown) as { '@type': string[] })['@type'].push(type);
    }

    async on(onState: boolean) {
        console.log(`Turning ${this.tapoDevice.nickname} ${onState?'On':'Off'}`);
        if (onState) {
            await this.deviceApi.turnOn();
        } else {
            await this.deviceApi.turnOff();
        }
    }
      
    async update() {
        try {
            const deviceStatus = await this.deviceApi.getDeviceInfo();
            this.onOffProperty.update(deviceStatus)
        } catch (error) {
            console.log(`Error updating ${this.tapoDevice.nickname}`)
            console.error(error);
        }
    }
}