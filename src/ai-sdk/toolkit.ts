import LightningAPI from '../shared/api';
import tools from '../shared/tools';
import {isToolAllowed, type Configuration} from '../shared/configuration';
import type { CoreTool } from 'ai';
import LightningTool from './tool';

class LightningAgentToolkit {
  private _lightning: LightningAPI;

  tools: {[key: string]: CoreTool};

  constructor({
    secret,
    configuration,
  }: {
    secret: string;
    configuration: Configuration;
  }) {
    this._lightning = new LightningAPI(secret);
    this.tools = {};

    const filteredTools = tools.filter((tool) =>
      isToolAllowed(tool, configuration)
    );

    filteredTools.forEach((tool) => {
      // @ts-ignore
      this.tools[tool.method] = LightningTool(
        this._lightning,
        tool.method,
        tool.description,
        tool.parameters
      );
    });
  }

  getTools(): {[key: string]: CoreTool} {
    return this.tools;
  }
}

export default LightningAgentToolkit;
