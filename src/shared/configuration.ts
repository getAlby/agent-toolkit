import type {Tool} from './tools';

// Actions restrict the subset of API calls that can be made. They should
// be used in conjunction with Restricted API Keys. Setting a permission to false
// prevents the related "tool" from being considered.
export type Object =
  | 'wallet'
  | 'node'
  | 'transactions'
  | 'invoices'
  | 'payments'
  | 'signatures';

export type Permission = 'create' | 'update' | 'read';

export type Actions = {
  [K in Object]?: {
    [K in Permission]?: boolean;
  };
} & {
  balance?: {
    read?: boolean;
  };
};

// Configuration provides various settings and options for the integration
// to tune and manage how it behaves.
export type Configuration = {
  actions?: Actions;
};

export const isToolAllowed = (
  tool: Tool,
  configuration: Configuration
): boolean => {
  return Object.keys(tool.actions).every((resource) => {
    // For each resource.permission pair, check the configuration.
    // @ts-ignore
    const permissions = tool.actions[resource];

    return Object.keys(permissions).every((permission) => {
      // @ts-ignore
      return configuration.actions?.[resource]?.[permission] === true;
    });
  });
};