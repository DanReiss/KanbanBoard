const tasks = document.querySelectorAll(".task")
const dropzones = document.querySelectorAll(".dropzone")


tasks.forEach(task =>{
    task.addEventListener('dragstart', dragStart)
    task.addEventListener('drag', drag)
    task.addEventListener('dragend', dragEnd)
})

function dragStart(){
    dropzones.forEach(dropzone => dropzone.classList.add("highlight"))
    this.classList.add('is-dragging')
}

function dragEnd(){
    console.log("dragEnd")
    dropzones.forEach(dropzone => dropzone.classList.remove("highlight"))
    this.classList.remove('is-dragging')
}

dropzones.forEach(dropzone =>{
    dropzone.addEventListener('dragenter', dragEnter)
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