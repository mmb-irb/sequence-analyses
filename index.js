#!/usr/bin/env node
const process = require('process');

const yargs = require('yargs');
const updateNotifier = require('update-notifier');

const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

const main = require('./src');

const argv = yargs
  .option('i', {
    alias: 'input',
    default: 'stdin',
    description: 'input file or string',
    type: 'string',
    coerce: value => (value === 'stdin' ? process.stdin : value),
  })
  .option('t', {
    alias: 'type',
    default: 'pdb',
    description: 'type of input',
    choices: ['pdb'],
  })
  .option('email', {
    description: 'email address (required by InterProScan)',
    type: 'string',
  })
  .option('o', {
    alias: 'output',
    default: 'stdout',
    description: 'output file',
    type: 'string',
    coerce: value => (value === 'stdout' ? process.stdout : value),
  })
  .demandOption(
    'email',
    'Please provide a contact email, it is required by InterProScan',
  )
  .help().argv;

main(argv).catch(console.error);
