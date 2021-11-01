import { Property } from 'gateway-addon';
import { TapoDevice } from './tapo-device';
export declare class OnOffProperty extends Property<boolean> {
    constructor(device: TapoDevice);
    update(light: any): void;
    setValue(value: boolean): Promise<boolean>;
}
//# sourceMappingURL=on-off-property.d.ts.map