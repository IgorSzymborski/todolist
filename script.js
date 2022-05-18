const addBtn = document.querySelector('.addBtn')
const endBtn = document.querySelector('.endBtn')
const deleteBtn = document.querySelector('.deleteBtn')
const ul = document.querySelector('.container--tasksList')
const taskCount = document.querySelector('.taskCount')

const modal = document.querySelector('.modal')
const textArea = document.querySelector('.textarea')
const modalAddBtn = document.querySelector('.modalAddBtn')
const modalCancelBtn = document.querySelector('.modalCancelBtn')

const tasks = [
  // {
  //    id: 1,
  //    content: 'Wypij piwo',
  //    isFinished: true,
  // }
]

const openModal = () => {
  modal.classList.add('modal-opened')
}

const closeModal = () => {
  modal.classList.remove('modal-opened')
}

const handleAddTask = () => {
  const taskContent = textArea.value
  const newTask = {
    id: Math.random(),
    content: taskContent,
    isFinished: false,
  }
  textArea.value = ''
  tasks.push(newTask)
  closeModal()
  renderTasks()
}

const handleRemoveTask = (id) => {
  const foundIndex = tasks.findIndex(function (task) {
    return task.id === id
  })
  tasks.splice(foundIndex, 1)
  renderTasks()
}

const handleEndTask = (id) => {
  const taskIndex = tasks.findIndex(function (task) {
    return task.id === id
  })
  if (tasks[taskIndex].isFinished === true) {
    tasks[taskIndex].isFinished = false
  } else {
    tasks[taskIndex].isFinished = true
  }
  renderTasks()
}

const renderTasks = () => {
  taskCount.innerHTML = tasks.length
  ul.innerHTML = ''
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement('li')
    const p = document.createElement('p')
    const div = document.createElement('div')
    const endBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')

    li.classList.add('container--taskList__task')
    if (tasks[i].isFinished === true) {
      li.classList.add('taskDone', )
    }
    p.classList.add('taskList--task__taskName')
    p.innerText = tasks[i].content
    if (tasks[i].isFinished === true) {
      p.classList.add('pDone')
    }

    div.classList.add('taskList--task__btnWrapper')

    endBtn.classList.add('button', 'endBtn')
    endBtn.innerText = 'Zakończ'

    if (tasks[i].isFinished === true) {
      endBtn.innerText = 'Wznów'
      endBtn.classList.add('endBtnDone')
    }

    deleteBtn.classList.add('button', 'deleteBtn')
    deleteBtn.innerText = 'Usuń'

    li.appendChild(p)
    div.appendChild(endBtn)
    div.appendChild(deleteBtn)
    li.appendChild(div)
    ul.appendChild(li)

    deleteBtn.addEventListener('click', function () {
      handleRemoveTask(tasks[i].id)
    })

    endBtn.addEventListener('click', function () {
      handleEndTask(tasks[i].id)
    })
  }
}

addBtn.addEventListener('click', openModal)
modalCancelBtn.addEventListener('click', closeModal)
modalAddBtn.addEventListener('click', handleAddTask)
renderTasks()