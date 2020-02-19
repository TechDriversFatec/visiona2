module.exports = {
  "env": {
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "extends": "airbnb-base",
  "rules": {
    "strict": "off",
    "semi": ["error", "never"],
    "comma-dangle": ["error", "never"],
    "space-before-function-paren": ["error", { "anonymous": "never", "named": "always" }],
    "class-methods-use-this": "off",
    "object-curly-newline": ["error", { "multiline": true }],
    "global-require": "off",
    "arrow-parens": ["error", "as-needed"],
    "no-param-reassign": ["error", { "props": false }]
  },
  "globals": {
    "use": true
  }
}
