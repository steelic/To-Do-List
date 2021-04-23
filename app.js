const toDoList = 
[
    {
        title: 'Respond to email messages',
        completion: true
    },

    {
        title: 'Go to the laundromat',
        completion: true
    },

    {
        title: 'Go to the gym',
        completion: false
    },

    {
        title: 'Go grocery shopping',
        completion: false
    },

    {
        title: 'Go to the post office',
        completion: false
    }

]

//Here, a constant variable named filter is declared, and its value is a string object called searchText.
//The searchText object's purpose is to store the results of the user inputed string, which is being entered in the filter-toDoList input in the HTML doc.
const filter = 
{
    searchText: ''
}

const hideFilter =
{
    completion: false
}

const renderToDoList = function (toDoList, filter)
{
    const filteredToDoList = toDoList.filter(function (todo)
    {
        return todo.title.toLowerCase().includes(filter.searchText.toLowerCase())
    })

    document.querySelector('#toDoList').innerHTML =  ''

    filteredToDoList.forEach(function (todo)
    {
        const toDoListElement = document.createElement('p')
        toDoListElement.textContent = todo.title
        document.querySelector('#toDoList').appendChild(toDoListElement)
    })

    document.querySelector('#incompleteTodos').innerHTML =  ''

    const remainingTodos = function ()
    {
        let toDosLeft = 0
    
        filteredToDoList.forEach(function(todo)
        {
            if(todo.completion == false)
            {
                toDosLeft = toDosLeft + 1
            }
        })
        const toDosLeftMessage = document.createElement('h4')
        toDosLeftMessage.textContent = `You have ${toDosLeft} to-dos left.`
        document.querySelector('#incompleteTodos').appendChild(toDosLeftMessage)
    }
    remainingTodos()

    const hideTodos = function ()
    {
        document.querySelector('#toDoList').innerHTML =  ''
        
        filteredToDoList.forEach(function(todo)
        {
            if(todo.completion == hideFilter.completion)
            {
                const hiddenTodos = document.createElement('p')
                hiddenTodos.textContent = todo.title
                document.querySelector('#toDoList').appendChild(hiddenTodos)
            }
        })
        remainingTodos()
    }
    document.querySelector('#hide-todos').addEventListener('change',function(e)
    {
        if(e.target.checked)
        {
            document.querySelector('#incompleteTodos').innerHTML =  ''
            hideTodos()
        }
        else
        {
            document.querySelector('#toDoList').innerHTML =  ''
            filteredToDoList.forEach(function (todo)
            {
                const toDoListElement = document.createElement('p')
                toDoListElement.textContent = todo.title
                document.querySelector('#toDoList').appendChild(toDoListElement)
            })
        }
    })

}
renderToDoList(toDoList,filter)

document.querySelector('#search-text').addEventListener('input', function (e)
{
    filter.searchText = e.target.value
    renderToDoList(toDoList, filter)
})

document.querySelector("#todo-form").addEventListener('submit', function (e)
{
    e.preventDefault()
    toDoList.push(
        {
            title: e.target.elements.createToDo.value,
            completion: false
        }
    )
    renderToDoList(toDoList, filter)
    e.target.elements.createToDo.value = ''
})

