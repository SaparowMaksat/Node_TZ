const express = require('express')
const path = require('path')
const chalk = require('chalk')
const {
	addNote,
	getNotes,
	removeId,
	updateNote,
} = require('./notes.controller')

const PORT = 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.json())

app.use(
	express.urlencoded({
		extended: true,
	})
)
app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	})
})

app.post('/', async (req, res) => {
	await addNote(req.body.title)
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: true,
	})
})

app.put('/:id', async (req, res) => {
	await updateNote(req.params.id, req.body.title)
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	})
})

app.delete('/:id', async (req, res) => {
	await removeId(req.params.id)
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	})
})

app.listen(PORT, () => {
	console.log(chalk.green(`Server has been started on port ${PORT}...`))
})
