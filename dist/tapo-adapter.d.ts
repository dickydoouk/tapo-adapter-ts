import { Adapter, AddonManagerProxy } from 'gateway-addon';
export declare class TapoAdapter extends Adapter {
    constructor(addonManager: AddonManagerProxy);
    startPairing(): void;
    private attemptPairing;
    private getConfig;
}
//# sourceMappingURL=tapo-adapter.d.ts.map