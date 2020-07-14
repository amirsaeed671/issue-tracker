function makeCard({
  _id = '',
  issue_title = '',
  issue_text = '',
  open = true,
  created_by = '',
  assigned_to = '',
  status_text = '',
}) {
  const border = open ? 'border-red-700' : 'border-green-400'
  return `<div id=${_id} class="max-w-lg mx-auto w-full transition duration-500 ease-in-out in-animation mb-6 rounded border-l-8 ${border} bg-gray-200 overflow-hidden shadow-lg">
            <div class="px-6 py-4">
                <p class="text-md text-red-500">${_id}</p>
                <div class="flex justify-between">
                    <div class="font-bold text-xl mb-2">${issue_title}</div>
                    <p class="text-gray-600 text-lg">${assigned_to}</p>
                </div>
                <p class="text-gray-700 text-base">${issue_text}</p>
                    <p class=" antialiased text-sm">${created_by}</p>
            </div>
            ${
              status_text
                ? `
                    <div class="px-6 pt-1 pb-4">
                        <span class="inline-block bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">${status_text}</span>
                    </div>
                `
                : ``
            }
        </div>`
}

function removeElement(id) {
  const elem = document.getElementById(id)
  elem.parentNode.removeChild(elem)
}

async function getCards() {
  const issuesContainer = document.getElementById('issues')
  const res = await fetch('/api/issues', {
    headers: {
      Accept: 'application/json',
    },
  })
  const resJson = await res.json()

  issuesContainer.innerHTML = ''

  resJson.data.forEach((itemObj) => {
    issuesContainer.innerHTML += makeCard(itemObj)
  })
}

async function deleteCard(id) {
  await fetch('/api/issues', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({id}),
  })

  removeElement(id)
}

async function addCard(event) {
  const issuesContainer = document.getElementById('issues')
  const issuesHtml = issuesContainer.innerHTML
  event.preventDefault()
  const formInputs = event.target.elements

  const data = {
    issue_title: formInputs.issue_title.value,
    issue_text: formInputs.issue_text.value,
    created_by: formInputs.created_by.value,
    assigned_to: formInputs.assigned_to.value,
    status_text: formInputs.status_text.value,
  }

  const res = await fetch('/api/issues', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const jsonResponse = await res.json()

  issuesContainer.innerHTML = makeCard(jsonResponse.data) + issuesHtml
}

function removeAndUpdate(
  element,
  {
    _id = '',
    issue_title = '',
    issue_text = '',
    open = true,
    created_by = '',
    assigned_to = '',
    status_text = '',
  },
) {
  const border = open ? 'border-red-700' : 'border-green-400'
  element.className = `max-w-lg mx-auto w-full transition duration-500 ease-in-out in-animation mb-6 rounded border-l-8 ${border} bg-gray-200 overflow-hidden shadow-lg`
  return `<div class="px-6 py-4">
              <p class="text-md text-red-500">${_id}</p>
              <div class="flex justify-between">
                <div class="font-bold text-xl mb-2">${issue_title}</div>
                <p class="text-gray-600 text-lg">${assigned_to}</p>
              </div>
              <p class="text-gray-700 text-base">${issue_text}</p>
              <p class=" antialiased text-sm">${created_by}</p>
            </div>
            ${
              status_text
                ? `
                <div class="px-6 pt-1 pb-4">
                  <span class="inline-block bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">${status_text}</span>
                </div>
              `
                : ``
            }`
}

async function updateCard(event) {
  event.preventDefault()
  const formInputs = event.target.elements
  const id = formInputs.id.value
  const issue_title = formInputs.issue_title.value
  const issue_text = formInputs.issue_text.value
  const assigned_to = formInputs.assigned_to.value
  const status_text = formInputs.status_text.value
  const open = formInputs.open.checked

  const data = {id, open}

  if (issue_text) data.issue_text = issue_text
  if (issue_title) data.issue_title = issue_title
  if (assigned_to) data.assigned_to = assigned_to
  if (status_text) data.status_text = status_text

  const elementDiv = document.getElementById(id)

  const res = await fetch('/api/issues', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const jsonResponse = await res.json()

  elementDiv.innerHTML = removeAndUpdate(elementDiv, jsonResponse.data)
}

window.addEventListener('load', getCards)

document.getElementById('delete').addEventListener('click', () => {
  const id = document.getElementById('id').value
  deleteCard(id)
})

document.getElementById('add-issue-form').addEventListener('submit', addCard)

document
  .getElementById('update-issue-form')
  .addEventListener('submit', updateCard)
