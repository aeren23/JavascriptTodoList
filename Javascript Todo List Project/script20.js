const form=document.querySelector("form")
const input=document.getElementById("txtTaskName")
const btnAdd=document.getElementById("btnAddNewTask")
const btnDel=document.getElementById("btnDeleteAll")
const ulTaskList=document.getElementById("task-list")
let todos

loadItems()
EventListeners()
function EventListeners(){
    form.addEventListener("submit",addNewItem)
    ulTaskList.addEventListener("click",deleteItem)
    btnDel.addEventListener("click",deleteAllItems)
}

function loadItems(){
    todos=getItemsFromLS()
    todos.forEach(function(item){
        createItem(item)
    })
}

function getItemsFromLS(){
    if(localStorage.getItem("todos")==null){
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}

//Set Item To Local Storage
function setItemToLS(newTodo){
    todos=getItemsFromLS()
    todos.push(newTodo)
    localStorage.setItem("todos",JSON.stringify(todos))
}

function createItem(newTodo){
     //create li
     const li=document.createElement("li")
     li.className="list-group-item list-group-item-secondary"
     li.appendChild(document.createTextNode(newTodo))
     //create a attribute
     const a=document.createElement("a")
     a.classList="delete-item float-right"
     a.setAttribute("href","#")
     a.innerHTML='<i class="fas fa-times"></i>'
     li.appendChild(a)
     ulTaskList.appendChild(li) 
}

function addNewItem(e){
    if(input.value===""){
        alert("Please, Add an Item ")
    }
    else{
        createItem(input.value)
        setItemToLS(input.value)
        input.value=""
    }
    e.preventDefault()
}

function deleteItem(e){
    if(e.target.className ==="fas fa-times"){
        if(confirm(`[${e.target.parentElement.parentElement.innerText}] Are you sure you want to delete this item?`)){
            e.target.parentElement.parentElement.remove()
            deleteTodoFromLStorage(e.target.parentElement.parentElement.textContent)
        }
    }
}

function deleteTodoFromLStorage(deletetodo){
    let todos =getItemsFromLS()
    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1)
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}

function deleteAllItems(e){
    if(confirm("Are you sure you want to delete all of items?")){
        
        while(ulTaskList.firstChild){
            ulTaskList.removeChild(ulTaskList.firstChild)
        }
        localStorage.clear()
        
        
        // for(let i=ulTaskList.children.length-1;i>=0;i--){
        //     ulTaskList.children[i].remove()
        // }
        // /** ulTaskList.innerHTML=""
        //  * bu yöntem kullanılabilir ama innerHTML özelliği bazı güvenlik açıklıklarına
        //  * neden olabilir.
        //  */
    }
}
