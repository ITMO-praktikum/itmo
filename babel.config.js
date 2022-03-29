const presets = [
  ['@babel/preset-env', {
    targets: {
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    },
    useBuiltIns: "usage",
    corejs: { version: 3, proposals: true }
  }]
];
module.exports = { presets }; 