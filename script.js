let tasks = document.querySelectorAll(".task")
const dropzones = document.querySelectorAll(".dropzone")
const input = document.querySelector(".task-name")
let deletes = document.querySelectorAll(".delete")


function createKanban(){
    if(input.value.length !== 0){
    let newKanban = document.createElement("div")
    newKanban.classList.add("task", "bg-info", "rounded", "p-1", "my-2")
    newKanban.setAttribute("draggable", true)
    let newStatus = document.createElement("div")
    newStatus.classList.add("status")
    newKanban.appendChild(newStatus)
    let newBox = document.createElement("h5")
    newBox.innerText = input.value;
    newKanban.appendChild(newBox)
    let newDelete = document.createElement("img")
    newDelete.setAttribute("src", "./assets/x-svgrepo-com.svg")
    newDelete.classList.add("delete")
    newKanban.appendChild(newDelete)
    dropzones[0].appendChild(newKanban)
    reload();
    }
    else{
        alert("Preencha o campo!")
    }
}


function reload(){
    tasks = document.querySelectorAll(".task")
    deletes = document.querySelectorAll(".delete") 

    tasks.forEach(task =>{
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);
    });
    deletes.forEach(deleteItem =>{
        deleteItem.addEventListener('click', addDelete)
    });

};

function addDelete(){
    let parentDelete = this.parentElement
    parentDelete.parentElement.removeChild(parentDelete)
}


function dragStart(){
    dropzones.forEach(dropzone => dropzone.classList.add("highlight"))
    this.classList.add('is-dragging')
}

function dragEnd(){
    dropzones.forEach(dropzone => dropzone.classList.remove("highlight"))
    this.classList.remove('is-dragging')
}

dropzones.forEach(dropzone =>{
    dropzone.addEventListener('dragover', dragOver)
    dropzone.addEventListener('dragleave', dragLeave)
    dropzone.addEventListener('drop', drop)
})

function dragOver(){
   this.classList.add("in-over")

   const cardDrag = document.querySelector('.is-dragging')
   
   this.appendChild(cardDrag)
}

function dragLeave(){this.classList.remove("in-over")}   

function drop(){his.classList.remove("in-over")}

reload();