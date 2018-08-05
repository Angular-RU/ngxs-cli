#!/usr/bin/env node

const execSync = require('child_process').execSync;
const entryPointPath = require.resolve('./cli.ts');
const tsNodePath = require.resolve('ts-node/dist/bin');
const commandArgs = process.argv.slice(2);
const executionPoint = [tsNodePath, entryPointPath].concat(commandArgs).join(' ');

execSync(`node ${executionPoint}`, {stdio: 'inherit'});