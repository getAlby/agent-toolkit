import {nwc} from '@getalby/sdk';
import {z} from 'zod';
import {
  listTransactionsParameters,
  lookupInvoiceParameters,
  multiPayInvoiceParameters,
  multiPayKeysendParameters,
  makeInvoiceParameters,
  payInvoiceParameters,
  payKeysendParameters,
  signMessageParameters,
} from './parameters';

// FIXME: only return important values so the ai doesn't get confused
export const getBalance = async (
  lightning: nwc.NWCClient
) => {
  try {
    const result = await lightning.getBalance();
    return result;
  } catch (error) {
    return 'Failed to get balance';
  }
};

export const getBudget = async (
  lightning: nwc.NWCClient
) => {
  try {
    const result = await lightning.getBudget();
    return result;
  } catch (error) {
    return 'Failed to get budget';
  }
};

export const getInfo = async (
  lightning: nwc.NWCClient
) => {
  try {
    const result = await lightning.getInfo();
    return result;
  } catch (error) {
    return 'Failed to get info';
  }
};

export const listTransactions = async (
  lightning: nwc.NWCClient,
  params: z.infer<typeof listTransactionsParameters>
) => {
  try {
    const result = await lightning.listTransactions(params);
    return result;
  } catch (error) {
    return 'Failed to fetch transactions';
  }
};

export const lookupInvoice = async (
  lightning: nwc.NWCClient,
  params: z.infer<typeof lookupInvoiceParameters>
) => {
  try {
    const result = await lightning.lookupInvoice(params);
    return result;
  } catch (error) {
    return 'Failed to fetch invoice';
  }
};

export const makeInvoice = async (
  lightning: nwc.NWCClient,
  params: z.infer<typeof makeInvoiceParameters>
) => {
  try {
    const result = await lightning.makeInvoice(params);
    return result;
  } catch (error) {
    return 'Failed to create invoice';
  }
};

export const payInvoice = async (
  lightning: nwc.NWCClient,
  params: z.infer<typeof payInvoiceParameters>
) => {
  try {
    const result = await lightning.payInvoice(params);
    return result;
  } catch (error) {
    return 'Failed to pay invoice';
  }
};

export const payKeysend = async (
  lightning: nwc.NWCClient,
  params: z.infer<typeof payKeysendParameters>
) => {
  try {
    const result = await lightning.payKeysend(params);
    return result;
  } catch (error) {
    return 'Failed to pay via keysend';
  }
};

export const signMessage = async (
  lightning: nwc.NWCClient,
  params: z.infer<typeof signMessageParameters>
) => {
  try {
    const result = await lightning.signMessage(params);
    return result;
  } catch (error) {
    return 'Failed to create invoice';
  }
};

export const multiPayInvoice = async (
  lightning: nwc.NWCClient,
  params: z.infer<typeof multiPayInvoiceParameters>
) => {
  try {
    const result = await lightning.multiPayInvoice(params);
    return result;
  } catch (error) {
    return 'Failed to pay multiple invoices';
  }
};


export const multiPayKeysend = async (
  lightning: nwc.NWCClient,
  params: z.infer<typeof multiPayKeysendParameters>
) => {
  try {
    const result = await lightning.multiPayKeysend(params);
    return result;
  } catch (error) {
    return 'Failed to pay multiple invoices via keysend';
  }
};
