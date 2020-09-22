const { demandOption, string } = require("yargs")
const yargs = require("yargs")
const notes = require("./notes")
yargs.command({
    command: 'add',
    description: 'To add note.',
    builder:{
        title: {
            description: "Specify title",
            demandOption: true,
            type: 'string'
        },
        body:{
            description: "Specify body",
            demandOption: false,
            type: 'string'
        }
    },
    handler: (argv)=>{
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command: 'remove',
    description: 'To remove note.',
    builder: {
        title: {
            description: "Specify title to be deleted.",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=>{
        console.log("Removing.....",argv.title)
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    description: 'To read note.',
    builder: {
        title: {
            description: "Specify Title to read.",
            demandOption: true,
            type: "string",
        }
    },
    handler: (argv)=>{
        notes.readNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    description: 'List all Notes.',
    handler: ()=>{
        notes.listNotes()
    }
})

yargs.parse()