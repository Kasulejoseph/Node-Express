const validator = require('validator')
const yargs = require('yargs')
const chalk = require('chalk')
const notesUtils = require('./notes')

// create a note
yargs.command({
    command: 'add',
    description: 'Adds a new note',
    builder: {
        title: {
            demandOption: true,
            type: 'string',
            default: 'Default title'
        },
        body: {
            type: 'string',
            default: 'Node js is awesome'
        }
    },
    handler(argv) {notesUtils.addNotes(argv.title, argv.body)}
})

// Remove a note
yargs.command({
    command: 'remove',
    description: 'Remove a note',
    builder: {
        title: {
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {notesUtils.removeNotes(argv.title)}
})

// List all notes 
yargs.command({
    command: 'list',
    description: 'List all notes',
    handler: () => {
        notesUtils.listNotes()
    }
})

// read a note
yargs.command({
    command: 'read',
    description: 'Read a note',
    builder: {
        title: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: (yargs) => notesUtils.readNotes(yargs.title)
})

// console.log(process.argv[process.argv.length-1])
yargs.parse()