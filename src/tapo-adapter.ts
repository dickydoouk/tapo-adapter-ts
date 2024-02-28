import { Adapter, AddonManagerProxy, Database } from 'gateway-addon';
import { cloudLogin, loginDevice } from 'tp-link-tapo-connect';
import { isTapoDevice } from 'tp-link-tapo-connect/dist/tapo-utils';
import { MyTapoDevice } from './tapo-device';

export class TapoAdapter extends Adapter {

    constructor(addonManager: AddonManagerProxy) {
        super(addonManager, `tapo-adapter`, 'tapo-adapter-ts');
        addonManager.addAdapter(this);

        this.startPairing();

        this.updateDevices();
      }

      startPairing(): void {
        this.attemptPairing();
      }

      private async attemptPairing(): Promise<void> {
        const { username, password } = await this.getConfig();
        console.log(`Searching for Tapo devices - ${username}`)

        const cloudApi = await cloudLogin(username, password);
        const devices = await cloudApi.listDevices();
        const tapoDevices = devices.filter(device => isTapoDevice(device.deviceType))

        console.log(`Found ${tapoDevices.length} Tapo devices`);
        
        tapoDevices.map(async device => {
          const deviceApi = await loginDevice(username, password, device);
          const deviceInfo = await deviceApi.getDeviceInfo();
          this.handleDeviceAdded(new MyTapoDevice(this, device, deviceApi));
        });
      }

      private async updateDevices(): Promise<void> {
        const devices = await this.getDevices() as Record<string, MyTapoDevice>;
        Object.entries(devices).forEach(([_, device]) => device.update());
        setTimeout(() => this.updateDevices(), 5000);
      }

      private async getConfig(): Promise<any> {
        const db = new Database('tapo-adapter-ts', '');
        await db.open();
        return (await db.loadConfig()) ?? {};
      }
}