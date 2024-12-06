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
} from '../../shared/functions';

const LNClient = jest.fn().mockImplementation(() => ({
  getBalance: jest.fn(),
  getBudget: jest.fn(),
  getInfo: jest.fn(),
  listTransactions: jest.fn(),
  lookupInvoice: jest.fn(),
  makeInvoice: jest.fn(),
  payInvoice: jest.fn(),
  payKeysend: jest.fn(),
  signMessage: jest.fn(),
  multiPayInvoice: jest.fn(),
  multiPayKeysend: jest.fn(),
}));

let lnClient: ReturnType<typeof LNClient>;

beforeEach(() => {
  lnClient = new LNClient();
});

describe('getBalance', () => {
  it('should retrieve the current balance', async () => {
    const mockBalance = { balance: 100000 };
    lnClient.getBalance.mockResolvedValue(mockBalance);

    const result = await getBalance(lnClient);
    expect(lnClient.getBalance).toHaveBeenCalledWith();
    expect(result).toEqual(mockBalance);
  });
});

describe('getBudget', () => {
  it('should retrieve the current budget information', async () => {
    const mockBudget = {
      used_budget: 50000,
      total_budget: 100000,
      renewal_period: 'monthly',
    };
    lnClient.getBudget.mockResolvedValue(mockBudget);

    const result = await getBudget(lnClient);
    expect(lnClient.getBudget).toHaveBeenCalledWith();
    expect(result).toEqual(mockBudget);
  });
});

describe('getInfo', () => {
  it('should retrieve LN node info', async () => {
    const mockInfo = { alias: 'MyNode', network: 'testnet' };
    lnClient.getInfo.mockResolvedValue(mockInfo);

    const result = await getInfo(lnClient);
    expect(lnClient.getInfo).toHaveBeenCalledWith();
    expect(result).toEqual(mockInfo);
  });
});

describe('listTransactions', () => {
  it('should list LN transactions', async () => {
    const mockTxs = [
      { type: 'incoming', amount: 2000, settled_at: 1234567890 },
      { type: 'outgoing', amount: 3000, settled_at: 1234567891 },
    ];
    lnClient.listTransactions.mockResolvedValue({ transactions: mockTxs });

    const result = await listTransactions(lnClient, {});
    expect(lnClient.listTransactions).toHaveBeenCalledWith({});
    expect(result).toEqual({ transactions: mockTxs });
  });
});

describe('lookupInvoice', () => {
  it('should lookup an invoice by payment_hash', async () => {
    const params = { payment_hash: 'abc123' };
    const mockInvoice = { invoice: 'lnbc...', amount: 5000 };
    lnClient.lookupInvoice.mockResolvedValue(mockInvoice);

    const result = await lookupInvoice(lnClient, params);
    expect(lnClient.lookupInvoice).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockInvoice);
  });
});

describe('makeInvoice', () => {
  it('should create an invoice', async () => {
    const params = { amount: 5000, description: 'Test invoice' };
    const mockInvoice = { invoice: 'lnbc...', amount: 5000 };
    lnClient.makeInvoice.mockResolvedValue(mockInvoice);

    const result = await makeInvoice(lnClient, params);
    expect(lnClient.makeInvoice).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockInvoice);
  });
});

describe('payInvoice', () => {
  it('should pay an invoice', async () => {
    const params = { invoice: 'lnbc...', amount: 5000 };
    const mockResponse = { preimage: 'abc123' };
    lnClient.payInvoice.mockResolvedValue(mockResponse);

    const result = await payInvoice(lnClient, params);
    expect(lnClient.payInvoice).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockResponse);
  });
});

describe('payKeysend', () => {
  it('should send a keysend payment', async () => {
    const params = { amount: 2000, pubkey: '02abcdef...' };
    const mockResponse = { preimage: 'def456' };
    lnClient.payKeysend.mockResolvedValue(mockResponse);

    const result = await payKeysend(lnClient, params);
    expect(lnClient.payKeysend).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockResponse);
  });
});

describe('signMessage', () => {
  it('should sign a message', async () => {
    const params = { message: 'Hello, LN!' };
    const mockSignature = { message: 'Hello, LN!', signature: 'sig123' };
    lnClient.signMessage.mockResolvedValue(mockSignature);

    const result = await signMessage(lnClient, params);
    expect(lnClient.signMessage).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockSignature);
  });
});

describe('multiPayInvoice', () => {
  it('should pay multiple invoices', async () => {
    const params = {
      invoices: [{ invoice: 'lnbc1...', amount: 1000 }, { invoice: 'lnbc2...', amount: 2000 }],
    };
    const mockResponse = {
      invoices: [
        { invoice: { invoice: 'lnbc1...', amount: 1000 }, preimage: 'abc123', dTag: 'someTag' },
        { invoice: { invoice: 'lnbc2...', amount: 2000 }, preimage: 'def456', dTag: 'someTag2' },
      ],
      errors: [],
    };
    lnClient.multiPayInvoice.mockResolvedValue(mockResponse);

    const result = await multiPayInvoice(lnClient, params);
    expect(lnClient.multiPayInvoice).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockResponse);
  });
});

describe('multiPayKeysend', () => {
  it('should send multiple keysend payments', async () => {
    const params = {
      keysends: [
        { amount: 2000, pubkey: '02abcdef...' },
        { amount: 3000, pubkey: '03abcdef...' },
      ],
    };
    const mockResponse = {
      keysends: [
        { keysend: { amount: 2000, pubkey: '02abcdef...' }, preimage: 'abc123', dTag: 'tag1' },
        { keysend: { amount: 3000, pubkey: '03abcdef...' }, preimage: 'def456', dTag: 'tag2' },
      ],
      errors: [],
    };
    lnClient.multiPayKeysend.mockResolvedValue(mockResponse);

    const result = await multiPayKeysend(lnClient, params);
    expect(lnClient.multiPayKeysend).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockResponse);
  });
});
