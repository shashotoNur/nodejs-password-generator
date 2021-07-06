#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');

const createPassword = require('./utils/createPassword');
const savePassword = require('./utils/savePassword');

commander.version('1.0.0').description('Node Password Generator');

commander
  .option('-l, --length <number>', 'length of password', '16')
  .option('-s, --save', 'save password to passwords.txt')
  .option('-nn, --no-numbers', 'remove numbers')
  .option('-ns, --no-symbols', 'remove symbols')
  .parse();

const { length, save, numbers, symbols } = commander.opts();

const generatedPassword = createPassword(length, numbers, symbols);

if (save) savePassword(generatedPassword);
clipboardy.writeSync(generatedPassword); // Copy to clipboard

console.log(chalk.blue('Generated Password: ') + chalk.bold(generatedPassword));
console.log(chalk.yellow('Password copied to clipboard'));