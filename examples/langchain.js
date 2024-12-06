import 'dotenv/config';
import 'websocket-polyfill';
import {LightningAgentToolkit} from '../langchain';
import {ChatOpenAI} from '@langchain/openai';
import {AgentExecutor, createStructuredChatAgent} from 'langchain/agents';
import {pull} from 'langchain/hub';

const llm = new ChatOpenAI({
  model: 'gpt-4',
});

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

(async () => {
  const prompt = await pull(
    'hwchase17/structured-chat-agent'
  );

  const tools = lnAgentToolkit.getTools();
  const agent = await createStructuredChatAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  const response = await agentExecutor.invoke({
    input: `
      Create an invoice for 10000 sats with a description about
      Satoshi Nakamoto. Return the invoice string at the end.
    `,
  });

  console.log(response);
})();
