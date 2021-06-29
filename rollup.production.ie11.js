import typescript from 'rollup-plugin-typescript2';
import strip from '@rollup/plugin-strip';
import filesize from 'rollup-plugin-filesize';
import { version } from './package.json';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: './src/RickAndMortyExplorer.ts',
    // eslint-disable-next-line
    onwarn: function(warning, warn) {},
    plugins: [
        resolve(),
        typescript(),
        strip({ include: '**/*.ts' }),
        filesize({ showBrotliSize: true })
    ],
    output: {
        entryFileNames: '[name].' + version + '.es5.js',
        dir: './public/',
        inlineDynamicImports: true,
        format: 'iife',
        plugins: [
            compiler({
                language_in: 'ECMASCRIPT_NEXT',
                compilation_level: 'SIMPLE',
                language_out: 'ECMASCRIPT5'
            })
        ]
    }
}
