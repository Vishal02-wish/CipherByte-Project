document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const pendingList = document.getElementById('pending-list');
    const completedList = document.getElementById('completed-list');

    addButton.addEventListener('click', function () {
        const todoText = input.value.trim();
        if (todoText !== '') {
            addTask(todoText);
            input.value = '';
        }
    });

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const todoText = input.value.trim();
            if (todoText !== '') {
                addTask(todoText);
                input.value = '';
            }
        }
    });

    function addTask(text) {
        const li = document.createElement('li');
        const spanText = document.createElement('span');
        spanText.textContent = text;

        const spanTimestamp = document.createElement('span');
        spanTimestamp.classList.add('timestamp');
        spanTimestamp.textContent = getCurrentTime();

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete');
        completeButton.addEventListener('click', function () {
            completeTask(li, spanText.textContent);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', function () {
            pendingList.removeChild(li);
        });

        li.appendChild(spanText);
        li.appendChild(spanTimestamp);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        pendingList.appendChild(li);
    }

    function completeTask(taskElement, taskText) {
        pendingList.removeChild(taskElement);

        const li = document.createElement('li');
        const spanText = document.createElement('span');
        spanText.textContent = taskText;

        const spanTimestamp = document.createElement('span');
        spanTimestamp.classList.add('timestamp');
        spanTimestamp.textContent = `Completed at ${getCurrentTime()}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', function () {
            completedList.removeChild(li);
        });

        li.classList.add('completed');
        li.appendChild(spanText);
        li.appendChild(spanTimestamp);
        li.appendChild(deleteButton);
        completedList.appendChild(li);
    }

    function getCurrentTime() {
        const now = new Date();
        return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    }
});
