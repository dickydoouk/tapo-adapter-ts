import type { AddonManagerProxy } from "gateway-addon";

import { TapoAdapter } from "./tapo-adapter";

export = (addonManager: AddonManagerProxy, manifest: any, errorCallback: Function) => {
  const config = manifest.moziot.config;

  if (!config.username) {
    errorCallback(manifest.username, 'Tapo email/username is required!');
    return;
  }

  if (!config.password) {
    errorCallback(manifest.name, 'Tapo password is required!');
    return;
  }

  new TapoAdapter(addonManager);
};