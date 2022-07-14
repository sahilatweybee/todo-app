'use strict';

// ------------------------------------------------------------- Input -------
const text_Input = document.querySelector('.input-text');

// ------------------------------------------------------------- Movements -------
const btnCheckBox = document.querySelector('.check-box');
const task_List = document.querySelector('.task-List');
const btnText = document.querySelector('.text');
const btnEdit = document.querySelector('.edit-btn');
const btnDelete = document.querySelector('.delete-btn');

// ------------------------------------------------------------- Add and Search -------
const btnAdd = document.querySelector('.btn-add');
const btnSearch = document.querySelector('.btn-search');

// ------------------------------------------------------------- Action -------
const btnSelectAll = document.querySelector('.select-all');
const btnUnselectAll = document.querySelector('.unselect-all');
const btnDeleteAll = document.querySelector('.delete-selected');

// ------------------------------------------------------------- Sorting -------
const btnAtoZ = document.querySelector('.a-to-z');
const btnZtoA = document.querySelector('.z-to-a');
const btnOldest = document.querySelector('.oldest');
const btnNewest = document.querySelector('.newest');

// ------------------------------------------------------------- Tab -------
const btnAll = document.querySelector('.all');
const btnActive = document.querySelector('.active');
const btnCompleted = document.querySelector('.completed');

let tasks = [];

let task = {
    id: 0,
    text: '',
    checked: false
};

const addEntry = function () {
    text_Input.focus();
    if (tasks.length) {
        displayTask(tasks);
    } else {
        task_List.textContent = "No Data Found!";
    }
    if (text_Input) {
        text_Input.addEventListener('keydown', function (e) {
            if (e.key == 'Enter') {
                if (text_Input.value) {
                    task = { text: text_Input.value, id: task.id + 1, checked: task.checked}
                    // task.text = text_Input.value;
                    // task.id += 1;
                    tasks.push(task);
                    displayTask(tasks);
                    text_Input.value = '';
                    // text_Input.blur();
                }
            }
        });
    }
};

const displayTask = function (tasks) {
    task_List.innerHTML = '';

    tasks.forEach(function (t) {
        const html = `
        <div class="task" id="${t.id}">
            <div class="select">
                <input type="checkbox" class="check-box" id="check-${t.id}">
                <label class="text" for="check-box" id="text-${t.id}">${t.text}</label>
            </div>

            <div class="edit-input">
                <i class="fa fa-edit edit-btn" id="edit-${t.id}"></i>
                <i class="fa-solid fa-delete-left delete-btn" id="delete-${t.id}"></i>
            </div>
        </div>`;
        task_List.insertAdjacentHTML('afterbegin', html);
    })
};

const search = function () {
    text_Input.addEventListener('keyup', function () {
        let found = tasks.filter(el => el.text === this.value);
        if (!found.length) {
            displayTask(tasks);
        } else {
            displayTask(found);
        }
    });

};

// displayTask(tasks);
btnAdd.addEventListener('click', function () {
    addEntry();
    task_List.classList.remove('hidden');
    text_Input.classList.remove('hidden');
    this.style.backgroundColor = "white";
    btnSearch.style.backgroundColor = "rgb(12, 127, 234)";
});

btnSearch.addEventListener('click', function () {
    text_Input.focus();
    this.style.backgroundColor = "white";
    btnAdd.style.backgroundColor = "rgb(12, 127, 234)";
    search();
});

btnAll.addEventListener('click', function(){
    this.classList.add('active-li');
    btnActive.classList.remove('active-li');
    btnCompleted.classList.remove('active-li');
});

btnActive.addEventListener('click', function () {
    this.classList.add('active-li');
    btnAll.classList.remove('active-li');
    btnCompleted.classList.remove('active-li');
});

btnCompleted.addEventListener('click', function () {
    this.classList.add('active-li');
    btnActive.classList.remove('active-li');
    btnAll.classList.remove('active-li');
});
