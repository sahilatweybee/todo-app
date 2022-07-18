'use strict';

//-------------------------------------------------------------- Input -----------------//
const text_Input = document.querySelector('.input-text');

//-------------------------------------------------------------- Movements -------------//
const checkBox = document.querySelector('.check-box');
const task_List = document.querySelector('.task-List');
const btnText = document.querySelector('.text');
const btnEdit = document.querySelector('.edit-btn');
const editText = document.querySelector('.edit-textbox');
const btnDelete = document.querySelector('.delete-btn');

//-------------------------------------------------------------- Add and Search --------//
const btnAdd = document.querySelector('.btn-add');
const btnSearch = document.querySelector('.btn-search');

//-------------------------------------------------------------- Action ----------------//
const actions = document.querySelector('.main-action')
const btnSelectAll = document.querySelector('.select-all');
const btnUnselectAll = document.querySelector('.unselect-all');
const btnDeleteAll = document.querySelector('.delete-selected');

//-------------------------------------------------------------- Sorting ---------------//
const sort = document.querySelector('.sorting');
const btnAtoZ = document.querySelector('.a-to-z');
const btnZtoA = document.querySelector('.z-to-a');
const btnOldest = document.querySelector('.oldest');
const btnNewest = document.querySelector('.newest');

//-------------------------------------------------------------- Tab -------------------//
const btnAll = document.querySelector('.all');
const btnActive = document.querySelector('.active');
const btnCompleted = document.querySelector('.completed');

//-------------------------------------------------Golobal Variables--------------------//
let tasks = [];
let activeTasks = [];
let completedTasks = [];
let sortedTaasks = [];
let editFlag = false;
let currentId;
let task = {
    id: -1,
    text: '',
    checked: false,
};

//-----------------------------------------------------------Add------------------------//
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
                    task = { text: text_Input.value, id: task.id + 1, checked: task.checked };
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

//--------------------------------------------------------Display-----------------------//
const displayTask = function (tasks) {
    task_List.innerHTML = '';

    tasks.forEach(function (t) {
        const html = `
        <div class="task">
            <div class="taskName">
                <input type="checkbox" class="check-box" id="${t.id}"${t.checked ? 'checked' : ""} onclick=checkTask(${t.id})>
                <div class="text">${editFlag && currentId == t.id ? `<input type="textbox" class = 'edit-textbox' value="${t.text}" onkeypress = editOnEnter(event)>` : t.text}</div>
            </div>

            <div class="edit-btns">
                <i class="fa fa-edit edit-btn" onclick=editTask(${t.id})></i>
                <i class="fa-solid fa-delete-left delete-btn" onclick=deleteTask(${t.id})></i>
            </div>
        </div>`;
        task_List.insertAdjacentHTML('afterbegin', html);
    })
};

//------------------------------------------------------------Search--------------------//
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

//---------------------------------------------------------CheckTask--------------------//
const checkTask = function (i) {
    let index = tasks.findIndex(el => el.id == i);
    tasks[index].checked = !tasks[index].checked;
    // console.log(index);
};

//---------------------------------------------------------EditTask---------------------//
const editTask = function (i) {
    editFlag = true;
    currentId = i;
    displayTask(tasks);
};

const editOnEnter = function (e) {
    if (e.key === 'Enter') {
        const index = tasks.findIndex(el => el.id === currentId);
        tasks[index].text = document.querySelector('.edit-textbox').value;
        editFlag = false;
        currentId = 0;
        displayTask(tasks);
    }
};

//---------------------------------------------------------deleteTask-------------------//
const deleteTask = function (i) {
    const index = tasks.findIndex(el => el.id === i);
    tasks.splice(i, 1);
    displayTask(tasks);
};

//------------------------------------------------------showActiveTasks-----------------//
const showActiveTasks = function () {
    activeTasks = tasks.filter(task => task.checked == false);
    displayTask(activeTasks);
};

//---------------------------------------------------showCompletedTasks-----------------//
const showCompletedTasks = function () {
    completedTasks = tasks.filter(task => task.checked == true);
    displayTask(completedTasks);
};

//-----------------------------------------------------eventListeners-------------------//
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

btnAll.addEventListener('click', function () {
    this.classList.add('active-li');
    btnActive.classList.remove('active-li');
    btnCompleted.classList.remove('active-li');

    displayTask(tasks);
});

btnActive.addEventListener('click', function () {
    this.classList.add('active-li');
    btnAll.classList.remove('active-li');
    btnCompleted.classList.remove('active-li');
    showActiveTasks();

});

btnCompleted.addEventListener('click', function () {
    this.classList.add('active-li');
    btnActive.classList.remove('active-li');
    btnAll.classList.remove('active-li');
    showCompletedTasks();
});

//------------------------------------------------------Sort-menu-----------------------//
sort.addEventListener('click', function () {
    let type = sort.options[sort.selectedIndex].value;
    // console.log(type);
    switch (type) {
        case "A-Z":
            sort.selectedIndex = 0;
            sortedTaasks = tasks.slice().sort((a, b) => {
                if (a.text > b.text) {
                    return -1;
                } else if (a.text < b.text) {
                    return 1;
                } else {
                    return 0;
                }
            });
            displayTask(sortedTaasks);
            break;

        case "Z-A":
            sort.selectedIndex = 0;
            sortedTaasks = tasks.slice().sort((a, b) => {
                if (a.text < b.text) {
                    return -1;
                } else if (a.text > b.text) {
                    return 1;
                } else {
                    return 0;
                }
            });
            displayTask(sortedTaasks);
            break;

        case "Newest":
            sort.selectedIndex = 0;
            sortedTaasks = tasks.slice().sort((a, b) => {
                if (a.id < b.id) {
                    return -1;
                } else if (a.id > b.id) {
                    return 1;
                } else {
                    return 0;
                }
            });
            displayTask(sortedTaasks);
            break;

        case "Oldest":
            sort.selectedIndex = 0;
            sortedTaasks = tasks.slice().sort((a, b) => {
                if (a.id > b.id) {
                    return -1;
                } else if (a.id < b.id) {
                    return 1;
                } else {
                    return 0;
                }
            });
            displayTask(sortedTaasks);
            break;

        default : 
            sort.selectedIndex = 0;
            displayTask(tasks);
            break;
    }
});

//-----------------------------------------------------Actions-menu---------------------//
actions.addEventListener('click', function () {
    let action = actions.options[actions.selectedIndex].value;
    // console.log(action);

    switch (action){
        case "Delete Selected":
            actions.selectedIndex = 0;
            tasks.forEach(tsk => {
                if(tsk.checked == true){
                    tasks.splice(tasks.indexOf(tsk), 1);
                }
            });
            displayTask(tasks);
            break;

        case "Select All":
            actions.selectedIndex = 0;
            tasks.forEach((tsk) =>{
                if(!tsk.checked){
                    tsk.checked = !tsk.checked;
                }
            });
            displayTask(tasks);
            break;

        case "Unselect All":
            actions.selectedIndex = 0;
            tasks.forEach((tsk) => {
                if (tsk.checked) {
                    tsk.checked = !tsk.checked;
                }
            });
            displayTask(tasks);
            break;

        default:
            sort.selectedIndex = 0;
            displayTask(tasks);
            break;
    }
});
