// Local stub for @onecli-sh/sdk on the Railway fork.
// The Railway deploy bypasses the OneCLI credential gateway (IS_RAILWAY in
// container-runner.ts short-circuits to runRailwayAgent before OneCLI is
// invoked; ensureOneCLIAgent in index.ts tolerates rejection). This stub
// keeps the type surface so TypeScript compiles without depending on the
// external package, which isn't reachable from Railway anyway.

export interface OneCLIOptions {
  url?: string;
}

export interface ApplyContainerConfigOptions {
  addHostMapping?: boolean;
  agent?: string;
}

export interface EnsureAgentOptions {
  name: string;
  identifier: string;
}

export class OneCLI {
  constructor(_options: OneCLIOptions = {}) {}

  async applyContainerConfig(
    _args: string[],
    _options: ApplyContainerConfigOptions = {},
  ): Promise<boolean> {
    return false;
  }

  async ensureAgent(
    _options: EnsureAgentOptions,
  ): Promise<{ created: boolean }> {
    throw new Error('OneCLI stub: not available on Railway');
  }
}
