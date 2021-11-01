import { Property } from 'gateway-addon';
import { TapoDevice } from './tapo-device';

export class OnOffProperty extends Property<boolean> {
  constructor(private device: TapoDevice) {
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
    await this.device.turnOn(state.on);
    
    return newValue;
  }
}