import {z} from 'zod';

export const getBalanceParameters = z
  .object({})
  .describe(
    'Retrieve the current balance in the Lightning wallet. No input required.'
  );

export const getBudgetParameters = z
  .object({})
  .describe(
    'Retrieve the current spending budget and usage in the Lightning wallet. No input required.'
  );

export const getInfoParameters = z
  .object({})
  .describe(
    'Retrieve general information about the Lightning node and its capabilities. No input required.'
  );

export const listTransactionsParameters = z.object({
  from: z
    .number()
    .int()
    .optional()
    .describe(
      'The start timestamp (in seconds) to filter transactions from.'
    ),
  until: z
    .number()
    .int()
    .optional()
    .describe(
      'The end timestamp (in seconds) to filter transactions until.'
    ),
  limit: z
    .number()
    .int()
    .optional()
    .describe(
      'A limit on the number of transactions to be returned. If no limit is set, all transactions are returned.'
    ),
  offset: z
    .number()
    .int()
    .optional()
    .describe(
      'The number of transactions to skip before starting to return results.'
    ),
  unpaid: z
    .boolean()
    .optional()
    .describe(
      'If set to true, only unpaid transactions will be returned.'
    ),
  type: z
    .enum(['incoming', 'outgoing'])
    .optional()
    .describe(
      'Filter transactions by type. Can be "incoming" or "outgoing".'
    ),
})
.describe('Fetch a list of transactions from the Lightning wallet with optional filters.');

export const lookupInvoiceParameters = z.object({
  payment_hash: z
    .string()
    .optional()
    .describe('The payment hash of the invoice to look up.'),
  invoice: z
    .string()
    .optional()
    .describe('The BOLT11 invoice string to look up.'),
})
.describe(
  'Look up information about a specific invoice. Provide either a payment_hash or a BOLT11 invoice.'
);

export const makeInvoiceParameters = z.object({
  amount: z
    .number()
    .int()
    .describe('The amount for the invoice in millisats.'),
  description: z
    .string()
    .optional()
    .describe('A description of the invoice.'),
  description_hash: z
    .string()
    .optional()
    .describe('A description hash for the invoice.'),
  expiry: z
    .number()
    .optional()
    .describe('The expiry time in seconds for the invoice.'),
  metadata: z
    .unknown()
    .optional()
    .describe('Additional metadata to include with the invoice.'),
})
.describe('Create a BOLT11 invoice in the Lightning wallet.');

export const payInvoiceParameters = z.object({
  invoice: z
    .string()
    .describe('The BOLT11 invoice to be paid.'),
  amount: z
    .number()
    .int()
    .optional()
    .describe('The amount to pay in millisats if the invoice does not specify one.'),
  metadata: z
    .unknown()
    .optional()
    .describe('Additional metadata related to the payment.'),
})
.describe('Pay an invoice using the Lightning wallet.');

export const payKeysendParameters = z.object({
  amount: z
    .number()
    .int()
    .describe('The amount to send in millisats.'),
  pubkey: z
    .string()
    .describe("The recipient's public key."),
  preimage: z
    .string()
    .optional()
    .describe('A custom preimage for the payment.'),
  tlv_records: z
    .array(
      z.object({
        type: z.number().describe('The TLV record type.'),
        value: z.string().describe('The TLV record value.'),
      })
    )
    .optional()
    .describe('A list of TLV records to include with the payment.'),
})
.describe('Perform a keysend payment to a specified public key using the Lightning wallet.');

export const signMessageParameters = z
  .object({
    message: z.string().describe('The message to be signed.'),
  })
  .describe('Sign a given message using the Lightning node.');


export const multiPayInvoiceParameters = z
  .object({
    invoices: z
      .array(
        z.object({
          invoice: z
            .string()
            .describe('The invoice to be paid.'),
          amount: z
            .number()
            .int()
            .optional()
            .describe('The amount in millisats if the invoice does not specify one.'),
          metadata: z
            .any()
            .optional()
            .describe('Additional metadata related to this specific payment.'),
          id: z
            .string()
            .optional()
            .describe('An identifier for this invoice payment.'),
        })
      )
      .describe('A list of invoice objects to pay.'),
  })
  .describe(
    'Pay multiple BOLT11 invoices in a single call using the Lightning wallet.'
  );

export const multiPayKeysendParameters = z
  .object({
    keysends: z
      .array(
        z.object({
          amount: z
            .number()
            .int()
            .describe('The amount to send in millisats.'),
          pubkey: z
            .string()
            .describe("The recipient's public key."),
          preimage: z
            .string()
            .optional()
            .describe('A custom preimage for the payment.'),
          tlv_records: z
            .array(
              z.object({
                type: z.number().describe('The TLV record type.'),
                value: z.string().describe('The TLV record value.'),
              })
            )
            .optional()
            .describe('A list of TLV records to include with the payment.'),
          id: z
            .string()
            .optional()
            .describe('An identifier for this keysend payment.'),
        })
      )
      .describe('A list of keysend payment objects to send.'),
  })
  .describe(
    'Perform multiple keysend payments in a single call using the Lightning wallet.'
  );
