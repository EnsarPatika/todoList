
let itemarray = []
var newId = 0
const continueButtonText = "Tamamlanmadı"
const doneButtonText = "Tamamlandı"
var todo = false;
var todoelements = {}; // Create object for localStorage

let addButton = document.querySelector("#liveToastBtn")
var listDOM = document.querySelector("#list")
addButton.addEventListener("click", newElement)

function doneProcess(type){  
    if(type == true){
        $('.success').toast('show')
    }
    else{
        $('.error').toast('show')
    }
}

if (JSON.parse(localStorage.getItem("localTodoItems")) != null){
    todoelements = JSON.parse(localStorage.getItem("localTodoItems"))
    for(let element=0;element<Object.keys(todoelements).length;element++){
        liDOM = document.createElement("li")
        if(Object.values(todoelements)[element] === true){
            liDOM.innerHTML = `<li class="list-group-item list-group-item-secondary" id=li_${newId} ><s> ${Object.keys(todoelements)[element]} </s> <button class="done close" type="button" id=done_${element} > ${doneButtonText}</button></li>`
            listDOM.append(liDOM)
            func(Object.values(todoelements)[element])
            
        }
        else if(Object.values(todoelements)[element] === false){
            liDOM.innerHTML = `<li class="list-group-item list-group-item-secondary" id=li_${newId} > ${Object.keys(todoelements)[element]} <button class="done close" type="button" id=done_${element} >${continueButtonText}</button></li>`
            listDOM.append(liDOM)
            func(Object.values(todoelements)[element])
        }
        
        
        todoelements[Object.keys(todoelements)[element]] = Object.values(todoelements)[element]
        updateLocalS()

    }
}

function newElement() {
    taskDOM = document.querySelector("#task")
    taskValue = taskDOM.value
    if (taskValue) {
        liDOM = document.createElement("li")
        liDOM.innerHTML = `<li class="list-group-item list-group-item-secondary" id=li_${newId} >${taskValue} <button class="done close" type="button" id=done_${newId} >${continueButtonText}</button></li>`
        listDOM.append(liDOM)
        taskDOM.value = null
        todoelements[`${taskValue}`] = todo
        updateLocalS()
        func()
        doneProcess(true)
        newId++
    }
    else {
        doneProcess(false)
        console.log("Boş değer gönderilemez")
    }
}

function func(tempTodo){
let doneButtonsGroup = document.querySelectorAll(".list-group-item")
doneButtonsGroup.forEach( (button,index,array) => {
    array[index].myParam = index;
    if(tempTodo ==null){
        array[index].todo = tempTodo
    }
    else{
    
        array[array.length-1].todo = tempTodo
    }
    
    array[index].addEventListener("click",temp,false);


})
tempTodo=null
}

function temp(evt){
    evt.currentTarget.todo=!(evt.currentTarget.todo)
    if (evt.currentTarget.todo === true){
        splitValue = continueButtonText
        textValue2 = document.querySelectorAll(".list-group-item")[evt.currentTarget.myParam].textContent.split(splitValue)[0].trim()
        console.log(splitValue)
        document.querySelectorAll(".list-group-item")[evt.currentTarget.myParam].innerHTML =
        `<s>${textValue2}</s> <button class="done close" type="button" id="done_${evt.currentTarget.myParam}">${doneButtonText}</button>`
        //document.querySelectorAll(".done")[evt.currentTarget.myParam].style.backgroundColor="green"
        todoelements[textValue2] = evt.currentTarget.todo
        updateLocalS()
    }
    else{
        splitValue = doneButtonText
        textValue = document.querySelectorAll(".list-group-item")[evt.currentTarget.myParam].textContent.split(splitValue)[0].trim()
        document.querySelectorAll(".list-group-item")[evt.currentTarget.myParam].innerHTML =
        `${textValue} <button class="done close" type="button" id="done_${evt.currentTarget.myParam}">${continueButtonText}</button>`
        //document.querySelectorAll(".done")[evt.currentTarget.myParam].style.backgroundColor="red"
        todoelements[textValue] = evt.currentTarget.todo
        updateLocalS()
    }

}

function updateLocalS(){
    JSON.stringify(todoelements)
    localStorage.setItem("localTodoItems",JSON.stringify(todoelements))
}