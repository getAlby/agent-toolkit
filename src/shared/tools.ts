import {
  getBalancePrompt,
  getBudgetPrompt,
  getInfoPrompt,
  listTransactionsPrompt,
  lookupInvoicePrompt,
  makeInvoicePrompt,
  payInvoicePrompt,
  payKeysendPrompt,
  signMessagePrompt,
  multiPayInvoicePrompt,
  multiPayKeysendPrompt,
} from './prompts';

import {
  getBalanceParameters,
  getBudgetParameters,
  getInfoParameters,
  listTransactionsParameters,
  lookupInvoiceParameters,
  makeInvoiceParameters,
  payInvoiceParameters,
  payKeysendParameters,
  signMessageParameters,
  multiPayInvoiceParameters,
  multiPayKeysendParameters,
} from './parameters';

export type Tool = {
  method: string;
  name: string;
  description: string;
  parameters: any;
  actions: {
    [key: string]: {
      [action: string]: boolean;
    };
  };
};

const tools: Tool[] = [
  {
    method: 'get_balance',
    name: 'Get Balance',
    description: getBalancePrompt,
    parameters: getBalanceParameters,
    actions: {
      wallet: {
        read: true,
      },
    },
  },
  {
    method: 'get_budget',
    name: 'Get Budget',
    description: getBudgetPrompt,
    parameters: getBudgetParameters,
    actions: {
      wallet: {
        read: true,
      },
    },
  },
  {
    method: 'get_info',
    name: 'Get Info',
    description: getInfoPrompt,
    parameters: getInfoParameters,
    actions: {
      node: {
        read: true,
      },
    },
  },
  {
    method: 'list_transactions',
    name: 'List Transactions',
    description: listTransactionsPrompt,
    parameters: listTransactionsParameters,
    actions: {
      transactions: {
        read: true,
      },
    },
  },
  {
    method: 'lookup_invoice',
    name: 'Lookup Invoice',
    description: lookupInvoicePrompt,
    parameters: lookupInvoiceParameters,
    actions: {
      invoices: {
        read: true,
      },
    },
  },
  {
    method: 'make_invoice',
    name: 'Make Invoice',
    description: makeInvoicePrompt,
    parameters: makeInvoiceParameters,
    actions: {
      invoices: {
        create: true,
      },
    },
  },
  {
    method: 'pay_invoice',
    name: 'Pay Invoice',
    description: payInvoicePrompt,
    parameters: payInvoiceParameters,
    actions: {
      payments: {
        create: true,
      },
    },
  },
  {
    method: 'pay_keysend',
    name: 'Pay Keysend',
    description: payKeysendPrompt,
    parameters: payKeysendParameters,
    actions: {
      payments: {
        create: true,
      },
    },
  },
  {
    method: 'sign_message',
    name: 'Sign Message',
    description: signMessagePrompt,
    parameters: signMessageParameters,
    actions: {
      signatures: {
        create: true,
      },
    },
  },
  {
    method: 'multi_pay_invoice',
    name: 'Multi Pay Invoice',
    description: multiPayInvoicePrompt,
    parameters: multiPayInvoiceParameters,
    actions: {
      payments: {
        create: true,
      },
    },
  },
  {
    method: 'multi_pay_keysend',
    name: 'Multi Pay Keysend',
    description: multiPayKeysendPrompt,
    parameters: multiPayKeysendParameters,
    actions: {
      payments: {
        create: true,
      },
    },
  },
];

export default tools;
