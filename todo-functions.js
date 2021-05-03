// Reading localStorage for existing to-dos.
function getSavedTodos() {
    const todoJSON = localStorage.getItem('todo')
    if (todoJSON !== null) {
        return JSON.parse(todoJSON)
    }
    else{
        return []
    }
}

// Saving new to-dos in localStorage.
function saveTodos() {
    localStorage.setItem('todo', JSON.stringify(toDoList))
}

// Rendering To-do List
const renderToDoList = function (toDoList, filter)
{
    const filteredToDoList = toDoList.filter(function (todo)
    {
        return todo.title.toLowerCase().includes(filter.searchText.toLowerCase())
    })

    document.querySelector('#toDoList').innerHTML =  ''

    filteredToDoList.forEach(function (todo)
    {
        const toDoListElement = filteringTodos(todo)
        document.querySelector('#toDoList').appendChild(toDoListElement)
    })

    document.querySelector('#incompleteTodos').innerHTML =  ''

    const remainingTodos = todosRemaining(filteredToDoList)
    remainingTodos()

    hidingCompletedTodos(filteredToDoList, remainingTodos)

}

// Generating DOM structure for a new todo.
function filteringTodos(todo) {
    const toDoListElement = document.createElement('p')
    toDoListElement.textContent = todo.title
    return toDoListElement
}

// Calculating remaning todos.
function todosRemaining(filteredToDoList) {
    return function () {
        let toDosLeft = 0

        filteredToDoList.forEach(function (todo) {
            if (todo.completion == false) {
                toDosLeft = toDosLeft + 1
            }
        })
        const toDosLeftMessage = document.createElement('h4')
        toDosLeftMessage.textContent = `You have ${toDosLeft} to-dos left.`
        document.querySelector('#incompleteTodos').appendChild(toDosLeftMessage)
    }
}

// Hiding completed to-dos.
function hidingCompletedTodos(filteredToDoList, remainingTodos) {
    const hideTodos = function () {
        document.querySelector('#toDoList').innerHTML = ''

        filteredToDoList.forEach(function (todo) {
            if (todo.completion == hideFilter.completion) {
                const hiddenTodos = document.createElement('p')
                hiddenTodos.textContent = todo.title
                document.querySelector('#toDoList').appendChild(hiddenTodos)
            }
        })
        remainingTodos()
    }
    document.querySelector('#hide-todos').addEventListener('change', function (e) {
        if (e.target.checked) {
            document.querySelector('#incompleteTodos').innerHTML = ''
            hideTodos()
        }

        else {
            document.querySelector('#toDoList').innerHTML = ''
            filteredToDoList.forEach(function (todo) {
                const toDoListElement = document.createElement('p')
                toDoListElement.textContent = todo.title
                document.querySelector('#toDoList').appendChild(toDoListElement)
            })
        }
    })
}

