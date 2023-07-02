const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')
const readFile = fs.readFile(notesPath, { encoding: 'utf-8' })

async function addNote(title) {
	const notes = await getNotes()

	const note = {
		title,
		id: Date.now().toString(),
	}
	notes.push(note)
	await fs.writeFile(notesPath, JSON.stringify(notes))
	console.log(chalk.green('Note was added!'))
}

async function getNotes() {
	const notes = await readFile
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function removeId(_id) {
	const notes = await getNotes()
	const del = notes.filter(not => not.id !== _id)

	await fs.writeFile(notesPath, JSON.stringify(del))
	console.log(chalk.red(`Note with id="${_id}" has been removed.`))
}
async function updateNote(dataId, dataTitle) {
	const notes = await getNotes()

	notes.forEach(note => {
		if (note.id === dataId) {
			note.title = dataTitle
		}
	})
	await fs.writeFile(notesPath, JSON.stringify(notes))
}

module.exports = {
	addNote,
	removeId,
	getNotes,
	updateNote,
}
