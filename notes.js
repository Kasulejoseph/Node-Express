const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
    if (loadNotes().length === 0) {
        console.log(chalk.red.inverse('No notes found!'))
    } else {
        console.log(chalk.blue('Your notes: '))
        loadNotes().forEach(note => {
         console.log(note.title)
        })
    }
   
}

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added successfully'))
    } else {
        console.log(chalk.red.inverse('Note already exist'))
    }

}

const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes))

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const readNotes = (title) => {
    const notes = loadNotes()
    try {
        const noteToread = notes.find((note) => note.title === title)
        console.log(chalk.yellow(noteToread.title) + ' ' + noteToread.body)
    } catch {
        console.log(chalk.red.inverse('No notes found!'))
    }
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

module.exports = {
    listNotes,
    addNotes,
    removeNotes,
    readNotes
}