import { Adapter, AddonManagerProxy, Database } from 'gateway-addon';
import { cloudLogin, isTapoDevice, listDevices, loginDevice } from 'tp-link-tapo-connect';
import { MyTapoDevice } from './tapo-device';

export class TapoAdapter extends Adapter {

    constructor(addonManager: AddonManagerProxy) {
        super(addonManager, `tapo-adapter`, 'tapo-adapter-ts');
    
        addonManager.addAdapter(this);

        const config = this.getConfig();

        console.log({config})

        this.startPairing();
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

        tapoDevices.map(async device => {
          const deviceKey = await loginDevice(username, password, device)
          this.handleDeviceAdded(new MyTapoDevice(this, device, deviceKey));
        });
      }

      private async getConfig(): Promise<any> {
        const db = new Database('tapo-adapter-ts', '');
        await db.open();
        return (await db.loadConfig()) ?? {};
      }
}