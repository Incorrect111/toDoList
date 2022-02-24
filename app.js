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
    //Elements UI
    const listContainer = document.querySelector('.tasks-list-section .list-group')

    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];

    //Events
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler)
    listContainer.addEventListener('click', onDeleteHandler)

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
        span.textContent = 'title'
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

        return {...newTask }
    }

    function onDeleteHandler({ target }) {
        // if (target.classList.contains('delete-btn')) {
        //     const isConfirm = confirm('Вы точно хотите удалить задачу?')
        //     if(isConfirm) {}
        // }
    }

}(tasks));