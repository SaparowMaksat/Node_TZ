document.addEventListener('click', event => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id
		remove(id).then(() => {
			event.target.closest('li').remove()
		})
	}

	if (event.target.dataset.type === 'edit') {
		const id = event.target.dataset.id
		let label = event.target.dataset.title
		let title = prompt('Введите новое название', label)
		let data = { id, title }
		if (title === null) {
			title = label
		} else {
			edit(data).then(() => {
				event.target.closest('li').querySelector('span').textContent = title
				event.target.dataset.title = title
			})
		}
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
