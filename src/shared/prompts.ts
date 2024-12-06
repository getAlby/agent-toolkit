export const getBalancePrompt = `
This tool will retrieve the current balance of the Lightning wallet.

It takes no input.
`;

export const getBudgetPrompt = `
This tool will fetch the current budget of the Lightning wallet.

It takes no input.
`;

export const getInfoPrompt = `
This tool will retrieve general information about the Lightning node and its capabilities.

It takes no input.
`;

export const listTransactionsPrompt = `
This tool will fetch a list of transactions from the Lightning wallet.

It takes the following optional arguments:
- from (number, optional): The start timestamp (in seconds) to filter transactions from.
- until (number, optional): The end timestamp (in seconds) to filter transactions until.
- limit (number, optional): The maximum number of transactions to return.
- offset (number, optional): The number of transactions to skip before starting to return results.
- unpaid (boolean, optional): Whether to list only unpaid transactions.
- type ("incoming" | "outgoing", optional): The type of transactions to list.
`;

export const lookupInvoicePrompt = `
This tool will look up information about a specific invoice in the Lightning wallet.

It takes one of two arguments:
- payment_hash (str, optional): The payment hash of the invoice to look up.
- invoice (str, optional): The invoice string itself to look up.
Only one of the above is required.
`;

export const makeInvoicePrompt = `
This tool will create an invoice in the Lightning wallet.

It takes the following arguments:
- amount (number): The amount for the invoice in millisats.
- description (str, optional): A description of the invoice.
- description_hash (str, optional): A description hash for the invoice.
- expiry (number, optional): The expiry time in seconds for the invoice.
- metadata (object, optional): Additional metadata to include with the invoice.
`;

export const payInvoicePrompt = `
This tool will pay an invoice using the Lightning wallet.

It takes the following arguments:
- invoice (str): The invoice to be paid.
- amount (number, optional): The amount to pay in millisats if the invoice does not specify one.
- metadata (object, optional): Additional metadata related to the payment.
`;

export const payKeysendPrompt = `
This tool will perform a keysend payment to a specified public key using the Lightning wallet.

It takes the following arguments:
- amount (number): The amount to send in millisats.
- pubkey (str): The recipient's public key.
- preimage (str, optional): A custom preimage for the payment.
- tlv_records (array, optional): A list of TLV records, each containing:
  - type (number)
  - value (string)
`;

export const signMessagePrompt = `
This tool will sign a given message using the Lightning node's signing capabilities.

It takes one argument:
- message (str): The message to be signed.
`;

export const multiPayInvoicePrompt = `
This tool will pay multiple invoices in a single call using the Lightning wallet.

It takes one argument:
- invoices (array): A list of objects, each representing an invoice to be paid.
  Each invoice object should include:
  - invoice (str): The invoice to be paid.
  - metadata (object, optional): Additional metadata related to that specific payment.
  - amount (number, optional): The amount to pay in millisats if the invoice does not specify one.
  - id (str, optional): An identifier for the invoice (if desired).
`;

export const multiPayKeysendPrompt = `
This tool will perform multiple keysend payments in a single call using the Lightning wallet.

It takes one argument:
- keysends (array): A list of objects, each representing a keysend payment.
  Each keysend object should include:
  - amount (number): The amount to send in millisats.
  - pubkey (str): The recipient's public key.
  - preimage (str, optional): A custom preimage for the payment.
  - tlv_records (array, optional): A list of TLV records (type and value).
  - id (str, optional): An identifier for the keysend (if desired).
`;
