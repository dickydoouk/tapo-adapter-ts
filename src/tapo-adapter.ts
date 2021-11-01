import { Adapter, AddonManagerProxy, Database } from 'gateway-addon';
import { cloudLogin, isTapoDevice, listDevices } from 'tp-link-tapo-connect';
import { TapoDevice } from './tapo-device';

export class TapoAdapter extends Adapter {

    constructor(addonManager: AddonManagerProxy) {
        super(addonManager, `tapo-adapter`, 'tapo-adapter-ts');
    
        addonManager.addAdapter(this);

        const config = this.getConfig();

        console.log({config})
      }

      startPairing(): void {
        this.attemptPairing();
      }

      private async attemptPairing(): Promise<void> {
        const { username, password } = await this.getConfig();
        console.log(`Searching for Tapo devices - ${username}`)

        const cloudToken = await cloudLogin(username, password);
        const devices = await listDevices(cloudToken);
        const tapoDevices = devices.filter(device => isTapoDevice(device.deviceType))

        console.log(`Found ${tapoDevices.length} Tapo devices`);
        console.log({tapoDevices})

        tapoDevices.map(device => {
          this.handleDeviceAdded(new TapoDevice(this, device));
        });
      }

      private async getConfig(): Promise<any> {
        const db = new Database('tapo-adapter-ts', '');
        await db.open();
        return (await db.loadConfig()) ?? {};
      }
}