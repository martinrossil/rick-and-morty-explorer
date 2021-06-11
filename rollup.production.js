import { version } from './package.json';
import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript2';
import strip from '@rollup/plugin-strip';
export default {
        input: './src/RickAndMortyExplorer.ts',
        onwarn: function(warning, warn) {
            return;
        },
        plugins: [
            clear({ targets: ['public'] }),
            resolve(),
            copy({
                targets: [
                    { src: 'assets/fonts/**.*', dest: 'public' },
                    { src: 'assets/icons/**.*', dest: 'public' },
                    { src: 'assets/production/**.*', dest: 'public', },
                    {
                        src: 'assets/index.html',
                        dest: 'public',
                        transform: (contents) => contents.toString().replace('{{version}}', version).replace('{{version}}', version)
                    }
                ]
            }),
            typescript(),
            strip({ include: '**/*.ts' }),
            filesize({ showBrotliSize: true })
        ],
        output: [
            {
                entryFileNames: '[name].' + version + '.es2019.js',
                dir: './public/',
                format: 'esm',
                plugins: [
                    compiler({
                        language_in: 'ECMASCRIPT_NEXT',
                        compilation_level: 'SIMPLE',
                        language_out: 'ECMASCRIPT_2019'
                    })
                ]
            },
            {
                entryFileNames: '[name].' + version + '.es2018.js',
                dir: './public/',
                format: 'esm',
                plugins: [
                    compiler({
                        language_in: 'ECMASCRIPT_NEXT',
                        compilation_level: 'SIMPLE',
                        language_out: 'ECMASCRIPT_2018'
                    })
                ]
            },
            {
                entryFileNames: '[name].' + version + '.es2017.js',
                dir: './public/',
                format: 'esm',
                plugins: [
                    compiler({
                        language_in: 'ECMASCRIPT_NEXT',
                        compilation_level: 'SIMPLE',
                        language_out: 'ECMASCRIPT_2017'
                    })
                ]
            },
            {
                entryFileNames: '[name].' + version + '.es2016.js',
                dir: './public/',
                format: 'esm',
                plugins: [
                    compiler({
                        language_in: 'ECMASCRIPT_NEXT',
                        compilation_level: 'SIMPLE',
                        language_out: 'ECMASCRIPT_2016'
                    })
                ]
            },
            {
                entryFileNames: '[name].' + version + '.es2015.js',
                dir: './public/',
                format: 'esm',
                plugins: [
                    compiler({
                        language_in: 'ECMASCRIPT_NEXT',
                        compilation_level: 'SIMPLE',
                        language_out: 'ECMASCRIPT_2015'
                    })
                ]
            },
            {
                entryFileNames: '[name].' + version + '.es5.js',
                dir: './public/',
                inlineDynamicImports: true, // this has to be last, otherwise we get split chunk errors
                format: 'iife',
                plugins: [
                    compiler({
                        language_in: 'ECMASCRIPT_NEXT',
                        compilation_level: 'SIMPLE',
                        language_out: 'ECMASCRIPT5'
                    })
                ]
            }
        ]
    };
