
module.exports = {
  client: {
    includes: ['src/**/*.tsx', 'src/**/*.ts', 'src/queries/*.ts'],
    tagName: 'gql',
    useReadOnlyTypes: true,
    service: {
      name: 'cerberus',
      url: 'http://cerberus:5532/v1/graphql',
      skipSSLValidation: true,
    }
  },
};
