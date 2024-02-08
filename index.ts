import { createTemplateAction } from "@backstage/plugin-scaffolder-node";

export const createSetLocalVarsAction = () => {
  return createTemplateAction({
    id: "gabtec:var:set",
    description:
      "Allow the definition of template local variables, that can be used in multiple template steps",
    supportsDryRun: true,
    schema: {
      input: {
        type: "object",
        properties: {
          list: {
            type: "object",
            title: "Key-Value pairs",
            description: "A list of key: value pairs, for local variables",
            properties: {
              key: {
                type: "string",
                title: "key",
                description: "The variable name",
              },
              value: {
                type: "string|number",
                title: "value",
                description: "The variable value",
              },
            },
          },
        },
      },
    },
    async handler(ctx) {
      ctx.output("vars", ctx.input);
    },
  });
};
