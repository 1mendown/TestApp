module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    'sourceMaps': true,
  	'plugins': [
    '@babel/transform-flow-strip-types',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/transform-runtime'
  ],
  };
};
