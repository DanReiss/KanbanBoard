let tasks = document.querySelectorAll(".task");
const dropzones = document.querySelectorAll(".dropzone");
const input = document.querySelector(".task-name");
let deletes = document.querySelectorAll(".delete");


window.addEventListener("load", reload);
window.addEventListener("load", addSavedTasks);

function createKanban(localTask, board){
    if(input.value.length !== 0 || localTask){
        let newKanban = document.createElement("div");
        newKanban.classList.add("task", "bg-info", "rounded", "p-1", "my-2");
        newKanban.setAttribute("draggable", true);
        let newStatus = document.createElement("div");
        newStatus.classList.add("status");
        newKanban.appendChild(newStatus);
        let newBox = document.createElement("h5");
        newBox.innerText = input.value || localTask; // add tasks salvas || taskLocal
        newKanban.appendChild(newBox);
        let newDelete = document.createElement("img");
        newDelete.setAttribute("src", "./assets/x-svgrepo-com.svg");
        newDelete.classList.add("delete");
        newKanban.appendChild(newDelete);
        if(localTask){
            dropzones[board].appendChild(newKanban);
        }else{
            dropzones[0].appendChild(newKanban);
        }
    reload();
    save();
    }else{
        alert("Preencha o campo!");
    };
};


function save(){ 
    localStorage.clear(); 
    
    const titlesTodo = [];
    const tasksTodo = document.querySelectorAll(".todo .task h5")
    tasksTodo.forEach((item)=>{
       titlesTodo.push(item.innerText);
       localStorage.setItem("todo", JSON.stringify(titlesTodo))
   });

    const titlesInProgress = [];
    const tasksInProgress = document.querySelectorAll(".in-progress .task h5")
    tasksInProgress.forEach((item)=>{
       titlesInProgress.push(item.innerText);
       localStorage.setItem("progress", JSON.stringify(titlesInProgress))
   });

    const titlesDone = [];
    const tasksDone = document.querySelectorAll(".done .task h5");
    tasksDone.forEach((item)=>{
       titlesDone.push(item.innerText) ;
       localStorage.setItem("done", JSON.stringify(titlesDone));
   });
}

function addSavedTasks(){
    const tasksTodo = JSON.parse(localStorage.getItem("todo"));
    const tasksInProgress = JSON.parse(localStorage.getItem("progress"));
    const tasksDone = JSON.parse(localStorage.getItem("done"));
    tasksTodo ? tasksTodo.forEach(item => createKanban(item, 0)) : false;
    tasksInProgress ? tasksInProgress.forEach(item => createKanban(item, 1)) : false;
    tasksDone ? tasksDone.forEach(item => createKanban(item, 2)) : false;
}


function reload(){
    tasks = document.querySelectorAll(".task");
    deletes = document.querySelectorAll(".delete");

    tasks.forEach(task =>{
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);
    });
    deletes.forEach(deleteItem =>{
        deleteItem.addEventListener('click', addDelete);
    });  
};


function addDelete(){
    let parentDelete = this.parentElement;
    parentDelete.parentElement.removeChild(parentDelete);
    save();
};


function dragStart(){
    dropzones.forEach(dropzone => dropzone.classList.add("highlight"));
    this.classList.add('is-dragging');
};

function dragEnd(){
    dropzones.forEach(dropzone => dropzone.classList.remove("highlight"));
    this.classList.remove('is-dragging');
    save();
};

dropzones.forEach(dropzone =>{
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', drop);
});

function dragOver(){
   this.classList.add("in-over");

   const cardDrag = document.querySelector('.is-dragging');
   
   this.appendChild(cardDrag);
};

function dragLeave(){this.classList.remove("in-over")}; 

function drop(){his.classList.remove("in-over")};
