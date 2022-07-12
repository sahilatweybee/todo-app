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
const btnSearch = document.querySelector('.search-btn');

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
let input;

const displayTask = function (tasks) {
    task_List.innerHTML = '';

    tasks.forEach(function (task) {
        const html = `
        <div class="task" id="${task}">
            <div class="select">
                <input type="checkbox" class="check-box" id="check-${task}">
                <label class="text" for="check-box" id="text-${task}">${task}</label>
            </div>

            <div class="edit-input">
                <i class="fa fa-edit edit-btn" id="edit-${task}"></i>
                <i class="fa-solid fa-delete-left delete-btn" id="delete-${task}"></i>
            </div>
        </div>`;
        task_List.insertAdjacentHTML('afterbegin', html);
    })
}

const search = function () {
    text_Input.addEventListener('keydown', function(){
        let found = tasks.filter(el => el == text_Input.value);
        if(found !== null){
            displayTask(found);
            return;
            
        }else{
            task_List.innerHTML = "<div class='task'>No Data Found!</div>";
            return;
        }
    });

}
// displayTask(tasks);
if (text_Input) {
    text_Input.addEventListener('keydown', function (e) {
        if (e.key == 'Enter') {
            tasks.push(text_Input.value);
            displayTask(tasks);

            text_Input.value = '';
            // text_Input.blur();
        }
    });
}

btnSearch.addEventListener('click', function () {
    text_Input.focus();
    input = text_Input.value;
    search(input);
});

