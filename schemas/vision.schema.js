const visionSchema = {
  type: 'object',
  properties: {
    organization_id: { type: 'String' },
    body: { type: 'String' },
  },
  required: ['organization_id', 'body'],
  additionalProperties: false,
};

module.exports = visionSchema;
