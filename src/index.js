// selecting the elements
const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("item");

// Class names 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_TROUGH = "linetrough";

// show todays date
const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();

document.getElementById("date").innerHTML = today.toLocaleDateString("en-US",options);


// variables
let LIST, id;

//get item from local storage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.lenght; //set the id to the last one in the list 
    loadList(LIST); // load the list to the user interface
} else {
    //if data isn't empty 
    LIST =[]
    id = 0;
}

// load items to users interface 
function loadList (array) {
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear local storage
clear.addEventListener ("click", function(){
    localStorage.clear();
    location.reload();
});

// add to do function 

function addToDo(toDo, id, done, trash) {
    if(trash) { return; };

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_TROUGH : "" ;

    const item = `<li class="item">
                    <i class="fa ${DONE}" job="complete" id="${id}"></i>
                    <div class="list-alignment">
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de fa-lg" job="delete" id="${id}"></i>
                    </div>
                </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item)
}

// add an item to the list using the enter key 
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        //if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            //add item to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});


// complete to do
function completeToDo (element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_TROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.remove();
    LIST[element.id].trash = true;
}

// target the items created dynamically 
list.addEventListener("click",function(event){
    const element = event.target; // return the clicked element inside the last element
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob == "complete"){
        completeToDo(element);
    } else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item to local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
