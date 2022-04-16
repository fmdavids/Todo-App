// let todoData = []
let todoData = JSON.parse(localStorage.getItem('allTodoData'));
const dateDisplay = document.getElementById('dateDisplay');
const render = (data) =>{
    let element = document.getElementById("content");
    element.innerHTML = "";
    data.map((val, key)=>{
        element.innerHTML += `
        <div class="card border-0 shadow-sm mb-3">
            <div class="card-body">
            <div>
            <h4 class="text-capitalize d-inline" >${val.todoItem}</h4>
            <span class="float-end">${val.date}</span>
            </div>              
            <div class="float-end btn-btns pt-3">
                <span class="badge  ${

                    val.status == 'Pending' ? "bg-secondary" :
                    val.status == 'In-progress' ? "bg-warning" : "bg-success"

                }">
                    ${val.status}
                </span>
                <button class="btn" onclick="edit(${key})">
                    <i class="fa-solid fa-pen-to-square"></i>
                    Edit
                </button>
                <button class="btn" onclick="trash(${key})">
                    <i class="fa-solid fa-trash-can"></i>
                    Trash
                </button>
            </div>
            </div>
        </div>`

    });

    localStorage.setItem('allTodoData', JSON.stringify(data));
    
}
render(todoData);


var addModal = new bootstrap.Modal(document.getElementById('addModal'))
var editModal = new bootstrap.Modal(document.getElementById('editModal'))


//create todo
document.getElementById("todoForm").addEventListener('submit', (e) =>{
    e.preventDefault();
    
    let todoDate = document.getElementById("todoDate").value;
    let todoItem = document.getElementById("addTask").value;
    todoData.push({todoItem:todoItem, status:"Pending", date:todoDate});
    render(todoData);
    addModal.hide();
    
})


//edit todo

const edit = (id)=>{
    editModal.show();
    document.getElementById("editTask").value = todoData[id].todoItem;
    document.getElementById("editStatus").value = todoData[id].status;
    document.getElementById("todoId").value = id;
}

//Save edit
document.getElementById("editForm").addEventListener('submit', (e) =>{
    e.preventDefault();
    
    let todoItem = document.getElementById("editTask").value;
    let status = document.getElementById("editStatus").value;
    let id = document.getElementById("todoId").value;
    
    todoData[id].todoItem=todoItem;
    todoData[id].status=status;
    render(todoData);
    editModal.hide();
    
})

//trash
const trash = (id) =>{
    if(confirm("Are you sure you want to delete this?"))
    todoData.splice(id, 1);
    render(todoData);
}


