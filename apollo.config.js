
module.exports = {
  client: {
    includes: ['app/**/*.tsx', 'app/**/*.ts'],
    tagName: 'gql',
    service: {
      name: 'cerberus',
      url: 'http://cerberus:8080/v1/graphql',
      skipSSLValidation: true,
    },
  },
};
