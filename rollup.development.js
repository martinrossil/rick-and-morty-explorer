import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default [{
        input: ['./src/RickAndMortyExplorer.ts',
                './src/views/desktop/lists/character/CharacterList.ts',
                './src/views/desktop/TopBar.ts',
                './src/views/mobile/lists/MobileCharacterList.ts',
                './src/views/mobile/MobileTopBar.ts',
                './src/views/mobile/MobilePageNavigator.ts'],
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
            entryFileNames: '[name].esnext.js',
            dir: './development',
            format: 'esm',
            sourcemap: 'inline'
        }
    }
]
