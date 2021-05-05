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

// Deleting a to-do.
const deleteTodo = function (id)
{
    const todoIndex = toDoList.findIndex(function (todo)
    {
        return todo.id === id
    })
    if (todoIndex> -1)
    {
        toDoList.splice(todoIndex,1)
    }
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
    const toDoListElement = document.createElement('div')
    const textElement = document.createElement('span')

    // Creating a checkbox to mark to-dos completed.
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type','checkbox')
    if(todo.completion == true)
    {
        checkbox.checked = true
    }
    checkbox.addEventListener('change', function (e)
    {
        if(e.target.checked == true)
        {
            todo.completion = true
            saveTodos()
            renderToDoList(toDoList, filter)
        }
        else if (e.target.checked == false)
        {
            todo.completion = false
            saveTodos()
            renderToDoList(toDoList, filter)
        }
    })
    
    // Creating a button to delete to-dos.
    const button = document.createElement('button')
    button.textContent = 'Delete'
    button.addEventListener('click', function (event)
    {
        deleteTodo(todo.id)
        saveTodos()
        renderToDoList(toDoList, filter)
    })

    
    textElement.textContent = todo.title

    // Setting the display order for the checkbox, to-do title, and button.
    toDoListElement.appendChild(textElement)
    toDoListElement.appendChild(checkbox)
    toDoListElement.appendChild(button)

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
function hidingCompletedTodos(filteredToDoList, remainingTodos) 
{
    const hideTodos = function () 
    {
        document.querySelector('#toDoList').innerHTML = ''

        filteredToDoList.forEach(function (todo) 
        {
            if (todo.completion == hideFilter.completion)
            {
                const hiddenTodoElement = document.createElement('p')
                hiddenTodoElement.textContent = todo.title
                document.querySelector('#toDoList').appendChild(hiddenTodoElement)

                const checkbox = document.createElement('input')
                checkbox.setAttribute('type','checkbox')
                hiddenTodoElement.appendChild(checkbox)
                checkbox.addEventListener('change', function (e)
                {
                    if(e.target.checked)
                    {
                        todo.completion = true
                        saveTodos()
                        hiddenTodoElement.textContent = null
                        document.querySelector('#incompleteTodos').innerHTML =  ''
                        remainingTodos()
                    }
                })
                
                const button = document.createElement('button')
                button.textContent = 'Delete'
                button.addEventListener('click', function (event)
                {
                    deleteTodo(todo.id)
                    saveTodos()
                    renderToDoList(toDoList, filter)
                })
                
                hiddenTodoElement.appendChild(button)
            }
        })
        remainingTodos()
    }
    document.querySelector('#hide-todos').addEventListener('change', function (e) 
    {
        if (e.target.checked) 
        {
            document.querySelector('#incompleteTodos').innerHTML = ''
            hideTodos()
        }
        else
        {
           renderToDoList(toDoList, filter)
        }
    })
}
