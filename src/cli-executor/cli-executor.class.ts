import * as nodePlop from 'node-plop';
import { DefaultUsageSpec, GeneratorResults, LocalPlopFile, PlopGenerator } from './cli-executor.config';
import { ArgvTable } from '../command-line-parser/command-line.impl';
import { green, red } from 'colors/safe';
import { resolve } from 'path';
import { CommandLine } from '../command-line-parser/command-line.class';

export class NgxsCliExecutor {

    public static run(argv: ArgvTable) {
        const { name, plopfile } = argv;
        if (plopfile) {
            this.execPlop([plopfile]);
        } else {
            if (name) {
                this.execNodePlop(argv).then((result) => this.showOutput(result));
            } else {
                this.execPlop([__dirname, LocalPlopFile]);
            }
        }
    }

    public static execPlop(pathToPlopfile: string[]) {
        this.setPlopfilePath(pathToPlopfile);
        require('plop');
    }

    public static execNodePlop(argv: ArgvTable): Promise<GeneratorResults> {
        const { spec } = argv;
        const plopPath = resolve(...[__dirname, LocalPlopFile]);
        const plop = nodePlop(plopPath);
        const generator = plop.getGenerator(PlopGenerator);

        const cliArgv = { directory: '.', ...argv, spec: (spec ? JSON.parse(spec) : DefaultUsageSpec) };
        return generator.runActions(cliArgv);
    }

    private static showOutput({ changes, failures }: GeneratorResults) {
        changes.forEach((item) => console.log(green('[SUCCESS]'), item.type, item.path));
        failures.forEach((item) => console.log(red('[FAILED]'), item.type, item.error));
    }

    private static setPlopfilePath(paths: string[]) {
        CommandLine.setArgument('--plopfile', resolve(...paths));
    }

}
