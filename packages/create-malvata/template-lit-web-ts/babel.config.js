const assumptions = {
    "setPublicClassFields": true
};

const plugins = [
    ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }], //lit 不支持兼容模式，需脱糖
    ["@babel/plugin-transform-runtime"],
];
const presets = [
    ['@babel/preset-env', {
        "bugfixes": true,
        corejs: {
            version: "3",
            proposals: true
        },
        useBuiltIns: 'usage',
        targets: {
            browsers: [
                "edge >= 16",
                "safari >= 9",
                "firefox >= 57",
                "ie >= 11",
                "ios >= 9",
                "chrome >= 49"
            ]
        }
    }],
    "@babel/preset-typescript"
]
module.exports = { assumptions, presets, plugins };