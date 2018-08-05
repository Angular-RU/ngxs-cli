export const PlopGenerator = 'ngxs-cli';
export const LocalPlopFile = '../plop-helpers/plopfile.js';
export const DefaultUsageSpec = true;

export interface Changes {
    type: string;
    path: string;
}

export interface Failures {
    type: string;
    error: string;
}

export interface GeneratorResults {
    changes: Changes[];
    failures: Failures[];
}
