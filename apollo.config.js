
module.exports = {
  client: {
    includes: ['src/**/*.tsx', 'src/**/*.ts'],
    tagName: 'gql',
    localSchemaFile: 'schema.json',
    useReadOnlyTypes: true
  },
};
