class Dashboard {
  constructor() {
    this.pages = document.querySelectorAll('.page')
    this.buttons = document.querySelectorAll('[data-page]')
    this.taskList = document.getElementById('taskList')
    this.taskInput = document.getElementById('taskInput')

    this.loadTasks()
    this.events()
  }

  events() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () =>
        this.changePage(btn.dataset.page)
      )
    })

    document.getElementById('addTask')
      .addEventListener('click', () => this.addTask())
  }

  changePage(pageId) {
    this.pages.forEach(p => p.classList.remove('active'))
    document.getElementById(pageId).classList.add('active')
  }

  addTask() {
    const text = this.taskInput.value.trim()
    if (!text) return

    const tasks = this.getTasks()
    tasks.push(text)
    localStorage.setItem('tasks', JSON.stringify(tasks))

    this.taskInput.value = ''
    this.renderTasks()
  }

  getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || []
  }

  loadTasks() {
    this.renderTasks()
  }

  renderTasks() {
    this.taskList.innerHTML = ''
    this.getTasks().forEach((task, index) => {
      const li = document.createElement('li')
      li.innerHTML = `
        ${task}
        <button onclick="dashboard.removeTask(${index})">❌</button>
      `
      this.taskList.appendChild(li)
    })
  }

  removeTask(index) {
    const tasks = this.getTasks()
    tasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.renderTasks()
  }
}

const dashboard = new Dashboard()
