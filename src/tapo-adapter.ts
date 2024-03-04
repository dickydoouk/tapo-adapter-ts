import { Adapter, AddonManagerProxy, Database } from 'gateway-addon';
import { discoverLocalDevices } from 'tp-link-tapo-connect/dist/discover';
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

        const tapoDevices = await discoverLocalDevices(username, password);

        console.log(`Found ${tapoDevices.length} Tapo devices`);
        
        tapoDevices.map(async device => {
          const tapoDevice = await device.loginDevice();
          const deviceInfo = await tapoDevice.getDeviceInfo();
          this.handleDeviceAdded(new MyTapoDevice(this, deviceInfo, tapoDevice));
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