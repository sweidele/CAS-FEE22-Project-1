module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        quotes: ['off'],
        linebreakstyle: ['off'],
        import-extensions: ['off'],
    },
};


/* eslint-disable import/extensions */