import type { ResourceConfig } from "./types.js";
import { config as taskConfig } from "./task/config.js";
import { config as projectConfig } from "./project/config.js";

export const resourceConfigs: ResourceConfig[] = [projectConfig, taskConfig];
