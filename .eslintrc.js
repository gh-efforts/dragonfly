module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  //  0 | 1 | 2  取消 | 警告 | 报错
  rules: {
    "@typescript-eslint/camelcase": 0
    // 'no-console': 0, // 禁止使用console
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // curly: [2, 'all'], // 必须使用 if(){} 中的{}
    // 'space-before-function-paren': 0, // 函数名后面的括号可以不需要空格
    // semi: ['error', 'always'],
    // 'no-path-concat': 0, // node中不能使用__dirname或__filename做路径拼接
    // 'no-shadow': 2, // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    // 'no-trailing-spaces': 2, // 每行结束后不同拥有空格
    // 'no-undef': 0, // 不能有未定义的变量
    // 'no-with': 2, // 禁用with
    // 'no-eval': 1, // 禁止使用eval
    // 'no-floating-decimal': 2, // 禁止省略浮点数中的0 .5 3.
    // 'no-inline-comments': 0, // 禁止行内备注
    // 'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 在生产环境中 没有消除定义为使用的变量产生报错
    // '@typescript-eslint/no-explicit-any': 0, // TODO
    // '@typescript-eslint/ban-ts-ignore': 'off'
  }
};
