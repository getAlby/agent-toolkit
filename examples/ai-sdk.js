import 'dotenv/config';
import 'websocket-polyfill';
import {LightningAgentToolkit} from '../ai-sdk/index.js';
import {openai} from '@ai-sdk/openai';
import {
  generateText,
  experimental_wrapLanguageModel as wrapLanguageModel,
} from 'ai';

const lnAgentToolkit = new LightningAgentToolkit({
  secret: process.env.NWC_URL,
  configuration: {
    actions: {
      invoices: {
        create: true,
      },
    },
  },
});

const model = wrapLanguageModel({
  model: openai('gpt-4o'),
  middleware: {},
});

(async () => {
  const result = await generateText({
    model: model,
    tools: {
      ...lnAgentToolkit.getTools(),
    },
    maxSteps: 5,
    prompt:
      'Create an invoice for 10000 sats with a description about Satoshi Nakamoto. Return the invoice string at the end.',
  });

  console.log(result.text);
})();