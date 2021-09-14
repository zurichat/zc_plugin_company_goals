const visionSchema = {
  type: 'object',
  properties: {
    companyId: { type: 'String' },
    body: { type: 'String' },
  },
  required: ['companyId', 'body'],
  additionalProperties: false,
};

module.exports = visionSchema;
