window.addEventListener("load", () => {
	todos = JSON.parse(localStorage.getItem("todos")) || [];
	const newTodoForm = document.querySelector("#new-todo-form");

	newTodoForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const todo = {
			content: e.target.elements.content.value,
		};
		todos.push(todo);
		localStorage.setItem("todos", JSON.stringify(todos));
		e.target.reset();
		DisplayTodos();
	});
	DisplayTodos();
});

function validateform() {
	var content = document.todoCheck.content.value;
	if (content == null || content == "") {
		swal({
			title: "Your Empty Task Added Successfully",
			text: "You Can Edit It",
		});
	} else {
		swal({
			text: "Item Stored In List Successfully",
		});
	}
}

function DisplayTodos() {
	const todoList = document.querySelector("#todo-list");
	todoList.innerHTML = "";

	todos.forEach((todo) => {
		const todoItem = document.createElement("div");
		todoItem.classList.add("todo-item");

		const label = document.createElement("label");
		const input = document.createElement("input");
		const span = document.createElement("span");
		const content = document.createElement("div");
		const actions = document.createElement("div");
		const edit = document.createElement("button");
		const deleteButton = document.createElement("button");

		input.type = "checkbox";
		content.classList.add("todo-content");
		actions.classList.add("actions");
		edit.classList.add("edit");
		deleteButton.classList.add("delete");
		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = "Edit";
		deleteButton.innerHTML = "Delete";

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		todoList.appendChild(todoItem);

		input.addEventListener("change", (e) => {
			localStorage.setItem("todos", JSON.stringify(todos));
			DisplayTodos();
		});

		edit.addEventListener("click", (e) => {
			const input = content.querySelector("input");
			input.removeAttribute("readonly");
			input.focus();
			input.addEventListener("blur", (e) => {
				input.setAttribute("readonly", true);
				todo.content = e.target.value;
				localStorage.setItem("todos", JSON.stringify(todos));
				DisplayTodos();
			});
		});

		deleteButton.addEventListener("click", (e) => {
			todos = todos.filter((t) => t != todo);
			localStorage.setItem("todos", JSON.stringify(todos));
			DisplayTodos();
		});
	});
}
