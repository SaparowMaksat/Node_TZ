document.addEventListener('click', event => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id
		remove(id).then(() => {
			event.target.closest('li').remove()
		})
	}

	if (event.target.dataset.type === 'edit') {
		const id = event.target.dataset.id
		const label = event.target.dataset.title
		const title = prompt('Введите новое название', label)
		const data = { id, title }
		edit(data).then(() => {
			if (data.title === null) {
				data.title = event.target.dataset.title
			}
			return data.id, { title: data.title }
		})
	}
})

async function edit({ id, title }) {
	await fetch(`/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},

		body: JSON.stringify({ title }),
	})
}

async function remove(id) {
	await fetch(`/${id}`, {
		method: 'DELETE',
	})
}
