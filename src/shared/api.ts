import {nwc} from '@getalby/sdk';
import {
  getBalance,
  getBudget,
  getInfo,
  listTransactions,
  lookupInvoice,
  makeInvoice,
  payInvoice,
  payKeysend,
  signMessage,
  multiPayInvoice,
  multiPayKeysend,
} from './functions';

class LightningAPI {
  lightning: nwc.NWCClient;

  constructor(secret: string) {
    const nwcClient = new nwc.NWCClient({
      nostrWalletConnectUrl: secret,
    });
    this.lightning = nwcClient;
  }

  async run(method: string, arg: any) {
    if (method === 'get_balance') {
      const output = JSON.stringify(await getBalance(this.lightning));
      return output;
    } else if (method === 'get_budget') {
      const output = JSON.stringify(await getBudget(this.lightning));
      return output;
    } else if (method === 'get_info') {
      const output = JSON.stringify(await getInfo(this.lightning));
      return output;
    } else if (method === 'list_transactions') {
      const output = JSON.stringify(await listTransactions(this.lightning, arg));
      return output;
    } else if (method === 'lookup_invoice') {
      const output = JSON.stringify(await lookupInvoice(this.lightning, arg));
      return output;
    } else if (method === 'make_invoice') {
      const output = JSON.stringify(await makeInvoice(this.lightning, arg));
      return output;
    } else if (method === 'pay_invoice') {
      const output = JSON.stringify(await payInvoice(this.lightning, arg));
      return output;
    } else if (method === 'pay_keysend') {
      const output = JSON.stringify(await payKeysend(this.lightning, arg));
      return output;
    } else if (method === 'sign_message') {
      const output = JSON.stringify(await signMessage(this.lightning, arg));
      return output;
    } else if (method === 'multi_pay_invoice') {
      const output = JSON.stringify(await multiPayInvoice(this.lightning, arg));
      return output;
    } else if (method === 'multi_pay_keysend') {
      const output = JSON.stringify(await multiPayKeysend(this.lightning, arg));
      return output;
    } else {
      throw new Error('Invalid method ' + method);
    }
  }
}

export default LightningAPI;
