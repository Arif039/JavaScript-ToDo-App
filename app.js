// Selector

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');



// Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener ('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



// Function
function addTodo (event) {
	// prevent form from submitting.
	event.preventDefault ();

	// console.log('hello');

	// TOdo Div.
	const todoDiv = document.createElement("div");
	todoDiv.classList.add ("todo");
	// create li.
	const newTodo = document.createElement("li");
	newTodo.classList.add ('todo-item'); 
	newTodo.innerText = todoInput.value;

	todoDiv.appendChild(newTodo);

	// ADD todo to local storage
	saveLocalTodos(todoInput.value);
	// Check Mark Button.
	const completedButton = document.createElement("button");
	completedButton.classList.add ("complete-btn");
	completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
	todoDiv.appendChild(completedButton);

	 // Check Trash button.
	 const trashButton = document.createElement("button");
	 trashButton.classList.add ("trash-btn");
	 trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
	 todoDiv.appendChild(trashButton);

	 // Append to list.
	 todoList.appendChild(todoDiv);

	 // Clear Todo Input field.
	 todoInput.value = "";


}

 

function deleteCheck (event) {

	// console.log(event.target);
	const item = event.target;

	 // Delete Item.
	 if(item.classList[0] === "trash-btn" ) {
	 	const element = item.parentElement;
	 	// Animation.
		 element.classList.add("fall");
		 deleteLocalStore(element);
	 	// element.remove ();
	 	element.addEventListener("transitionend", function() {


	 		element.remove();
	 	});


	 }

	 // Check Mark.
	 if(item.classList[0] === "complete-btn") {

	 	const element = item.parentElement;
	 	element.classList.toggle("completed");


	 }

}	

function filterTodo (event) {

	const todos = todoList.childNodes;
	console.log(todos);
	todos.forEach (function(todo) {

		switch(event.target.value) {
			case "all":
			todo.style.display = "flex";
			break;

			case "completed":
			if(todo.classList.contains("completed")) {

				todo.style.display = "flex";
			}

			else {

				todo.style.display = "none";
			}
			break;

			case "uncompleted":
			if(!todo.classList.contains("completed")) {

				todo.style.display = "flex";
			} 

			else{

				todo.style.display = "none";
			}

			break;
		}

	});
}

function saveLocalTodos (data) {

	// Check if we already have things there.
	let dataStore;
	if(localStorage.getItem("dataStore") === null) {

		dataStore = [];
	}

	else {

		dataStore = JSON.parse (localStorage.getItem("dataStore"));
	}

	dataStore.push(data);
	localStorage.setItem("dataStore", JSON.stringify(dataStore));
}


function getTodos () {

	// Check if we already have things there.
	let dataStore;
	if (localStorage.getItem("dataStore") === null) {

		dataStore = [];
	}

	else {

		dataStore = JSON.parse(localStorage.getItem("dataStore"));
	}

	dataStore.forEach (el => {

		// TOdo Div.
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		// create li.
		const newTodo = document.createElement("li");
		newTodo.classList.add('todo-item');
		newTodo.innerText = el;

		todoDiv.appendChild(newTodo);

		// ADD todo to local storage
		// saveLocalTodos(todoInput.value);

		// Check Mark Button.
		const completedButton = document.createElement("button");
		completedButton.classList.add("complete-btn");
		completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
		todoDiv.appendChild(completedButton);

		// Check Trash button.
		const trashButton = document.createElement("button");
		trashButton.classList.add("trash-btn");
		trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
		todoDiv.appendChild(trashButton);

		// Append to list.
		todoList.appendChild(todoDiv);
		
	});

}

function deleteLocalStore (data) {

	// Check if we already have things there.
	let dataStore;
	if (localStorage.getItem("dataStore") === null) {

		dataStore = [];
	}

	else {

		dataStore = JSON.parse(localStorage.getItem("dataStore"));
	}

	// console.log(data.children[0].innerText);
	// console.log(dataStore.indexOf('time'));

	const dataText = data.children[0].innerText;
	console.log(dataText);
	dataStore.splice(dataStore.indexOf(dataText), 1);
	localStorage.setItem("dataStore", JSON.stringify(dataStore));

 
}