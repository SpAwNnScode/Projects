let toDoItems = [];

        function renderToDoItems() {
            let list_item = document.getElementById("list_item");
            list_item.innerHTML = '';
            toDoItems.forEach((item, index) => {
                let make_li = document.createElement("li");
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = item.completed;
                checkbox.addEventListener("change", function() {
                    toggleCompletion(index);
                });
                make_li.appendChild(checkbox);
                let label = document.createElement("label");
                label.htmlFor = "item" + index;
                label.innerText = item.text;
                label.className = item.completed ? "completed" : "";
                make_li.appendChild(label);
                //Deadlines 
                if (item.deadline) {
                    let deadlineSpan = document.createElement("span");
                    deadlineSpan.innerText = " Deadline: " + item.deadline;
                    make_li.appendChild(deadlineSpan);
                }
                list_item.appendChild(make_li);
            });
            updateLocalStorage(); // Update local storage after rendering
        }

        function addItem() {
            let item = document.getElementById("box");
            let deadline = document.getElementById("deadline").value; // Get deadline value
            if (item.value.trim() !== "") {
                toDoItems.push({ text: item.value, completed: false, deadline: deadline });
                renderToDoItems();
                item.value = "";
                document.getElementById("deadline").value = ""; 
            } else {
                alert("Please add a value to the item");
            }
        }

        function toggleCompletion(index) {

             toDoItems[index].completed = !toDoItems[index].completed;
             if (toDoItems[index].completed) {
        // If the checkbox is checked after the change event, remove the item
            toDoItems.splice(index, 1);
    }
    renderToDoItems();
}

        function updateLocalStorage() {
            localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
        }

        // Retrieve stored to-do items from local storage
        let storedItems = localStorage.getItem('toDoItems');
        toDoItems = storedItems ? JSON.parse(storedItems) : [];

        renderToDoItems();