const dom = {
  new: document.getElementById("new"),
  add: document.getElementById("add"),
  tasks: document.getElementById("tasks"),
  count: document.getElementById("count"),
};
const tasks = [];

dom.add.onclick = () => {
  const newTask = dom.new.value;
  if (newTask && isExistTask(newTask, tasks)) {
    addTask(newTask, tasks);
    dom.new.value = "";
    tasksRender(tasks);
  }
};

function addTask(text, list) {
  const timeStamp = Date.now();
  const task = {
    id: timeStamp,
    text,
    isChecked: false,
  };
  list.push(task);
  console.log(tasks);
}

function isExistTask(text, list) {
  let isNonExist = true;
  list.forEach((element) => {
    if (element.text === text) {
      alert("The task already exists!");
      isNonExist = false;
    }
  });
  return isNonExist;
}

function tasksRender(list) {
  let htmlList = "";
  list.forEach((task) => {
    const cls = task.isChecked ? 'todo_task todo_task_complete'
                               : 'todo_task';
    const checked =  task.isChecked ? 'checked' :'';
    const taskHtml = `<div id="${task.id}" class="${cls}">
                    <label class="todo_checkbox"> 
                    <input type="checkbox" ${checked}>
                    <div class="todo_checkbox-div"></div>
                    </label>
                    <div class="todo_task-title">${task.text}</div>
                    <div class="todo_task-del">-</div>
                    </div>`;

    htmlList = htmlList + taskHtml;
  });
  dom.tasks.innerHTML = htmlList;
  RenderCount(list);
}

dom.tasks.onclick = (event) => {
  const target = event.target;
  const isCheckboxEl = target.classList.contains('todo_checkbox-div');
  const isDeleteEl = target.classList.contains('todo_task-del');
  if( isCheckboxEl ){
    const task = target.parentElement.parentElement;
    const taskId = task.getAttribute('id');
    changeTaskStatus(taskId, tasks);
  }

  if( isDeleteEl ){
    const task = target.parentElement;
    const taskId = task.getAttribute('id');
    deleteTask(taskId, tasks);
  }

  tasksRender(tasks);
}

function changeTaskStatus(id, list){
  list.forEach((task)=>{
    if( task.id == id ){
      task.isChecked = !task.isChecked;
    }
  })
}

function deleteTask(id, list){
    list.forEach((task, idx)=>{
      if(task.id == id){
         list.splice(idx, 1);
      }
    })
}

function RenderCount(list){
  dom.count.innerHTML = list.length;
}