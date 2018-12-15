#!/usr/bin/env node

import { SauceParser } from 'sauce.js'
import yargs, { Arguments } from 'yargs'
import OutputFormatter from './output-formatter'

yargs
    .command('$0 <files...>', 'show SAUCE record', () => {
        return yargs.positional('<files...>', { describe: 'files to read SAUCE from' })
    })
    .version().alias('version', 'v')
    .help().alias('help', 'h')
    .strict()
    .parse(process.argv.slice(2), yargsCallback)

// Workaround to remove options' types from help output
// https://github.com/yargs/yargs/issues/319
function yargsCallback(_: Error, args: Arguments<string>, output: string): void {
    if (output) {
        // Remove types (e.g. [string], [boolean]) from the output
        output = output.replace(/\[\w+\]/g, '')
        // Show the modified output
        console.log(output)
    } else {
        for (const filename of args.files as Array<string>) {
            try {
                const sauce = new SauceParser().parse(filename)
                const text = new OutputFormatter().format(sauce, filename)
                console.log(text)
            } catch (e) {
                console.log(e.message)
            }
        }
    }
}
