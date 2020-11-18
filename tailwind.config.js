module.exports = {
    purge: {
        mode: 'all',
        content: ['./src/**/*.html', './src/**/*.svelte'],

        options: {
            whitelistPatterns: [/svelte-/],
            defaultExtractor: (content) =>
                [...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
        },
    },

    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
    future: {
        // purgeLayersByDefault: true,
        // removeDeprecatedGapUtilities: true,
    },
};
