const path = require('path');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');

module.exports = (config, env) => {
    console.log(config, env);

    if (env === 'production') {
        config.plugins.push(
            new HtmlCriticalWebpackPlugin({
                base: path.resolve(__dirname, 'build'),
                src: 'index.html',
                dest: 'index.html',
                inline: true,
                minify: true,
                extract: true,
                width: 375,
                height: 565,
                penthouse: {
                    blockJSRequests: false,
                },
            }),
        );
    }

    return config;
};
