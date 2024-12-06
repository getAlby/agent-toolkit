import {z} from 'zod';
import {StructuredTool} from '@langchain/core/tools';
import {CallbackManagerForToolRun} from '@langchain/core/callbacks/manager';
import {RunnableConfig} from '@langchain/core/runnables';
import LightningAPI from '../shared/api';

class LightningTool extends StructuredTool {
  lightningAPI: LightningAPI;

  method: string;

  name: string;

  description: string;

  schema: z.ZodObject<any, any, any, any>;

  constructor(
    lightningAPI: LightningAPI,
    method: string,
    description: string,
    schema: z.ZodObject<any, any, any, any, {[x: string]: any}>
  ) {
    super();

    this.lightningAPI = lightningAPI;
    this.method = method;
    this.name = method;
    this.description = description;
    this.schema = schema;
  }

  _call(
    arg: z.output<typeof this.schema>,
    _runManager?: CallbackManagerForToolRun,
    _parentConfig?: RunnableConfig
  ): Promise<any> {
    return this.lightningAPI.run(this.method, arg);
  }
}

export default LightningTool;
