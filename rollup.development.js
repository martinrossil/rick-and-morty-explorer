import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default [{
        input: './src/RickAndMortyExplorer.ts',
        plugins: [
            typescript({ tsconfig: 'tsconfig.development.json' }),
            resolve(),
            serve({
                contentBase: 'development',
                open: true,
                port: 10002
            }),
            livereload({
                watch: 'development'
            })
        ],
        output: {
            file: './development/RickAndMortyExplorer.js',
            format: 'esm',
            sourcemap: 'inline'
        }
    }
]
