import { isToolAllowed } from '../../shared/configuration';

describe('isToolAllowed', () => {
  it('should return true if all permissions are allowed', () => {
    const tool = {
      method: 'get_balance',
      name: 'Get Balance',
      description: 'Retrieve the current LN wallet balance',
      parameters: {},
      actions: {
        wallet: {
          read: true,
        },
      },
    };

    const configuration = {
      actions: {
        wallet: {
          read: true,
        },
      },
    };

    expect(isToolAllowed(tool, configuration)).toBe(true);
  });

  it('should return false if any permission is denied', () => {
    const tool = {
      method: 'make_invoice',
      name: 'Make Invoice',
      description: 'Creates a LN invoice',
      parameters: {},
      actions: {
        invoices: {
          create: true,
        },
      },
    };

    const configuration = {
      actions: {
        invoices: {
          create: false, // Denied here
        },
      },
    };

    expect(isToolAllowed(tool, configuration)).toBe(false);
  });

  it('should return false if any required resource is not allowed at all', () => {
    const tool = {
      method: 'multi_pay_invoice',
      name: 'Multi Pay Invoice',
      description: 'Pays multiple LN invoices in a single call',
      parameters: {},
      actions: {
        payments: {
          create: true,
        },
      },
    };

    const configuration = {
      actions: {
        // payments resource is missing here, so it won't be allowed
        invoices: {
          create: true,
        },
      },
    };

    expect(isToolAllowed(tool, configuration)).toBe(false);
  });
});
