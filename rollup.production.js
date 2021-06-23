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
        output: [ getOutput(2019), getOutput(2018), getOutput(2017), getOutput(2016), getOutput(2015), getOutput(5) ]
    };

function getOutput(year) {
    const output = {
        entryFileNames: '[name].' + version + '.es' + year + '.js',
        dir: './public/',
        format: 'esm',
        plugins: [ getCompiler(year) ]
    }
    if (year === 5) {
        output.inlineDynamicImports = true, // this has to be last, otherwise we get split chunk errors
        output.format = 'iife';
    }
    return output;
}

function getCompiler(year) {
    let ecma = 'ECMASCRIPT';
    if (year === 5) {
        ecma = ecma + year;
    } else {
        ecma = ecma + '_' + year;
    }
    return compiler({ language_in: 'ECMASCRIPT_NEXT', compilation_level: 'SIMPLE', language_out: ecma })
}