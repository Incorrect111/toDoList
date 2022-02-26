const tasks = [{
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: '5d2ca9e2e03d40b3232496aa7',
        completed: true,
        body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095564788e0',
        completed: false,
        body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];


(function(arrOftasks) {
    const objOfTasks = arrOftasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});
    console.log(objOfTasks)
        //Themes
    const themes = {
        light: {
            '--header-bg': '#fff',
            '--header-text-color': '#212529',
            '--default-btn-bg': 'rgb(172, 172, 172)',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': 'rgb(196, 196, 196)',
            '--default-btn-border-color': 'rgb(172, 172, 172)',
            '--default-btn-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#dc3545',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#ef808a',
            '--danger-btn-border-color': '#e2818a',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--li-background-color': 'white',
            '--text-color': 'black',
            '--body-color': 'rgb(228, 224, 224)',
            '--card-bg-color': 'white'


        },
        dark: {
            '--base-text-color': '#212529',
            '--header-bg': '#343a40',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#343a40',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#292d31',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#b52d3a',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#88222c',
            '--danger-btn-border-color': '#88222c',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#b3b7bb',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#e0e4e7',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--li-background-color': '#343a40',
            '--text-color': 'white',
            '--body-color': '#495057',
            '--card-bg-color': '#4e545a'
        },

    };
    let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';

    //Elements UI
    const listContainer = document.querySelector('.tasks-list-section .list-group')
    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];
    const themeSelect = document.getElementById('themeSelect')


    //Events

    setTheme(lastSelectedTheme)
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler)
    listContainer.addEventListener('click', onDeleteHandler)
    themeSelect.addEventListener('change', onThemeSelectHandler);

    function setTasks(tasks) {
        console.log(tasks)
        return localStorage.getItem(tasks)
    };

    function renderAllTasks(tasksList) {
        if (!tasksList) {
            console.error("Передайте список задач!")
            return;
        }
        const fragment = document.createDocumentFragment();
        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);
        })
        listContainer.appendChild(fragment)
    };
    // Create Dom Element from task
    function listItemTemplate({ _id, title, body } = {}) {
        //Create li
        const li = document.createElement('li')
        li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');

        li.setAttribute('data-task-id', _id)

        //Create title
        const span = document.createElement('span')
        span.textContent = title;
        span.style.fontWeight = 'bold'

        //Create delete button
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = "Delete task";
        deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn')

        //Create p
        const article = document.createElement('p');
        article.textContent = body;
        article.classList.add('mt-2', 'w-100');

        //Create elements of li Arr
        let ellementsOfLiArr = [];
        ellementsOfLiArr.push(span, deleteBtn, article)

        //Add elements to li
        ellementsOfLiArr.forEach(el => {
            li.appendChild(el)
        })

        return li;
    }

    function onFormSubmitHandler(e) {
        e.preventDefault();
        const tittleValue = inputTitle.value;
        const bodyValue = inputBody.value;
        if (!tittleValue || !bodyValue) {
            alert('Пожалуйста введите title и body!!!')
            return;
        }
        //Create Task
        const task = createNewTask(tittleValue, bodyValue);
        //Add task tot DOM
        const listItem = listItemTemplate(task);
        listContainer.insertAdjacentElement('afterbegin', listItem)
            //Reset form
        form.reset();


    }

    function createNewTask(title, body) {
        const newTask = {
            title,
            body,
            completed: false,
            _id: `task-${Math.random()}`
        }
        objOfTasks[newTask._id] = newTask;
        addTaskToLocalStorage(newTask._id, newTask);
        return {...newTask }
    }
    //Add Task to local storage
    function addTaskToLocalStorage(taskId, newTask) {
        localStorage.setItem(taskId, JSON.stringify(newTask));
    }

    function deleteTaskFromLocalStorage(currentTaskId) {
        console.log(currentTaskId)

        localStorage.removeItem(currentTaskId)
    };

    function deleteTask(id) {
        let currentTaskId = id;
        console.log(currentTaskId)
        const { title } = objOfTasks[id];
        const isConfirm = confirm(`Вы точно хотите удалить задачу ${title}?`)
        if (!isConfirm) return isConfirm;
        delete objOfTasks[id];
        deleteTaskFromLocalStorage(currentTaskId);
        // console.log(objOfTasks[id])
        return isConfirm;
    }

    function deleteTaskFromHtml(el, confirmed) {
        if (!confirmed) return;
        el.remove();
    }

    function onDeleteHandler({ target }) {
        if (target.classList.contains('delete-btn')) {
            const parent = target.closest('[data-task-id]');
            const id = parent.dataset.taskId;
            const confirmed = deleteTask(id);
            deleteTaskFromHtml(parent, confirmed);
        }

    }

    function onThemeSelectHandler(e) {
        const selectedTheme = themeSelect.value;
        setTheme(selectedTheme);
        lastSelectedTheme = selectedTheme;
        localStorage.setItem('app_theme', selectedTheme);
    }

    //Set theme
    function setTheme(name) {
        const selectedThemeObj = themes[name];
        if (selectedThemeObj)
            Object.entries(selectedThemeObj).forEach(([key, value]) => {
                document.documentElement.style.setProperty(key, value);
            });
    }
}(tasks));