# Lightning Agent Toolkit

The Lightning Agent Toolkit provides integration between popular agent frameworks (such as LangChain and Vercel's AI SDK) and a Lightning Network wallet using Nostr Wallet Connect (NWC). Inspired by the [Stripe Agent Toolkit](https://github.com/stripe/stripe-agent-toolkit), this library simplifies the process of allowing AI models to interact with Lightning Network functionalities like creating invoices, paying invoices, retrieving balances, and more.

## Installation

You don't need this source code unless you want to modify the package. If you just
want to use the package run:

```
npm install @getalby/agent-toolkit
```

### Requirements

- Node 18+
- A Lightning wallet accessible via [NWC (Nostr Wallet Connect)](https://nwc.dev) like [Alby Hub](https://albyhub.com)
- OpenAI API key


### Environment Variables

Set the following environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key for LLM integration.
- `NWC_URL`: Your NWC connection URL to interface with the Lightning wallet.

Example .env file:

```
OPENAI_API_KEY=sk-proj-
NWC_URL=nostr+walletconnect://wallet_pubkey?relay=wss://relay.getalby.com/v1&secret=client_secret_key
```

## Usage

The library needs to be configured with your NWC connection string. Additionally, `configuration` enables you to specify the types of actions that can be taken using the toolkit.

```ts
import {LightningAgentToolkit} from '@getalby/agent-toolkit/langchain';

const lnAgentToolkit = new LightningAgentToolkit({
  secretKey: process.env.NWC_URL!,
  configuration: {
    actions: {
      invoices: {
        create: true,
      },
      payments: {
        create: true,
      },
    },
  },
});
```

This configuration enables the agent to create invoices and make payments through the provided LN tools.

### Tools

The toolkit works with LangChain and Vercel's AI SDK and can be passed as a list of tools. For example:

## Example with Vercel AI SDK

```ts
import {LightningAgentToolkit} from '@lightning/agent-toolkit/ai-sdk';
import {openai} from '@ai-sdk/openai';
import {generateText} from 'ai';

require('dotenv').config();

const lnAgentToolkit = new LightningAgentToolkit({
  nwcUrl: process.env.NWC_URL!,
  configuration: {
    actions: {
      invoices: {
        create: true,
      },
    },
  },
});

(async () => {
  const result = await generateText({
    model: openai('gpt-4'),
    tools: {
      ...lnAgentToolkit.getTools(),
    },
    maxSteps: 5,
    prompt: 'Create an invoice for 10000 msats with a description about Satoshi Nakamoto.',
  });

  console.log(result);
})();
```

#### What happens here?

- The model reads your prompt asking to create an invoice.
- The agent then uses the Lightning toolkit's make_invoice [NIP-47](https://github.com/nostr-protocol/nips/blob/master/47.md) method under the hood.
- The final result includes the invoice string and any additional information the model returns.


You can find more in examples folder.

[js-sdk]: https://github.com/getalby/js-sdk
[nwc-url]: https://my.albyhub.com/#/apps/new
