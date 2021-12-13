import { Property, } from 'gateway-addon';
import { TapoDeviceInfo } from 'tp-link-tapo-connect';
import { MyTapoDevice } from './tapo-device';

export class OnOffProperty extends Property<boolean> {
  constructor(device: MyTapoDevice) {
    super(device, 'on', {
      '@type': 'OnOffProperty',
      label: 'On/Off',
      type: 'boolean',
    });
  }

  update(deviceStatus: TapoDeviceInfo): void {
    this.setCachedValueAndNotify(deviceStatus.device_on);
  }

  async setValue(value: boolean): Promise<boolean> {
    const newValue = await super.setValue(value);
    await (this.getDevice() as MyTapoDevice).on(newValue);
    return newValue;
  }
}