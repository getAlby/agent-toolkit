import {BaseToolkit} from '@langchain/core/tools';
import LightningTool from './tool';
import LightningAPI from '../shared/api';
import tools from '../shared/tools';
import {isToolAllowed, type Configuration} from '../shared/configuration';

class LightningAgentToolkit implements BaseToolkit {
  private _lightning: LightningAPI;

  tools: LightningTool[];

  constructor({
    secret,
    configuration,
  }: {
    secret: string;
    configuration: Configuration;
  }) {
    this._lightning = new LightningAPI(secret);

    const filteredTools = tools.filter((tool) =>
      isToolAllowed(tool, configuration)
    );

    this.tools = filteredTools.map(
      (tool) =>
        new LightningTool(
          this._lightning,
          tool.method,
          tool.description,
          tool.parameters
        )
    );
  }

  getTools(): LightningTool[] {
    return this.tools;
  }
}

export default LightningAgentToolkit;
