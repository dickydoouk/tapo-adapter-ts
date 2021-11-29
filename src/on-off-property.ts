import { Property, } from 'gateway-addon';
import { MyTapoDevice } from './tapo-device';

export class OnOffProperty extends Property<boolean> {
  constructor(device: MyTapoDevice) {
    super(device, 'on', {
      '@type': 'OnOffProperty',
      label: 'On/Off',
      type: 'boolean',
    });
  }

  update(light: any): void {
    if (typeof light.state.on === 'boolean') {
      this.setCachedValueAndNotify(light.state.on);
    }
  }

  async setValue(value: boolean): Promise<boolean> {
    const newValue = await super.setValue(value);
 //   const state = { on: newValue };
    await (this.getDevice() as MyTapoDevice).on(newValue);
    
    return newValue;
  }
}