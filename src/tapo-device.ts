import { Device } from 'gateway-addon';
import { OnOffProperty } from './on-off-property';
import { TapoAdapter } from './tapo-adapter';


export class TapoDevice extends Device {
    private onOffProperty: OnOffProperty;

    constructor(
        adapter: TapoAdapter,
        device: any,
    ) {
        super(adapter, device.deviceId);
        this.setTitle(device.alias);
        this.addType('OnOffSwitch');
        this.addType('Light');
        this.onOffProperty = new OnOffProperty(this);
        this.addProperty(this.onOffProperty);
    }

    addType(type: string): void {
        ((this as unknown) as { '@type': string[] })['@type'].push(type);
    }

    
}