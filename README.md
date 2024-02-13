# Gabtec's Backstage Custom Template Action

## gabtec:var:set

This action will allow us to set template local variables, re-usable along the template

## Usage

```yaml
# inside a template.yaml file, on steps block:
steps:
  # 1. DECLARE a local variable using my custom action
  - id: setlocals
    action: gabtec:var:set
    input:
      key1: value1
      key2: value2
  # 2. USE it
  - id: log-message
    action: debug:log
    input:
      myLocalVar1: "${{ steps.setlocals.output.vars.key1 }}"
      myLocalVar2: "${{ steps.setlocals.output.vars.key2 }}"
```

## Installation

```sh
# install it as a dependecie
yarn --cwd packages/backend add @gabtec/backstage-action-var-set@1.0.2
yarn --cwd packages/backend add @backstage/integration
```

## Edit "packages/backend/src/plugins/scaffolder.ts"

Register the new custom action

```js
import {
  createRouter,
  createBuiltinActions, // <--------------- add this
} from "@backstage/plugin-scaffolder-backend";
import {
  ScmIntegrations, // <<------------------- add this
} from "@backstage/integration";
import { createSetLocalVarsAction } from "@gabtec/backstage-action-var-set";

// (...)

// we have to fetch all integrations, in order to merge our new action
const integrations = ScmIntegrations.fromConfig(env.config);

// now add it to BS, but it will override existing ones, so we have to include them also
const builtInActions = createBuiltinActions({
  integrations,
  catalogClient,
  config: env.config,
  reader: env.reader,
});

// merge existing ones with our custom one
const actions = [...builtInActions, createSetLocalVarsAction()];

return await createRouter({
  actions, // <<------------------- add them
  logger: env.logger,
  // (...)
});
```
