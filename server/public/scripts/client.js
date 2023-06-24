

console.log('Starting jQuery')

$(document).ready(onReady);

function onReady() {
    // Establish get request for all database information
    getTasks();
    $('#addButton').on('click', addTask);
    $('#view-tasks').on('click', '.delete-btn', deleteTask);
    $('#view-tasks').on('click', '.complete-btn', completeTask)
}

function getTasks() {
    console.log('Inside of get tasks');
    // Ajax call to server to get DB of tasks
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        let listOfTasks = response;
        // Console log to confirm receiving correct information
        console.log('Got response of; ', response)

        // Sending to Render function
        render(listOfTasks);
    }).catch((error) => {
        // Logging out errors in getting tasks
        console.log('Error in getting task list: ', error);
        alert('Error in getting task list!');
    })
}

// POST function to send to server
function addTask() {
    console.log('in addTask');
    //Collecting information to send to server
    const newTask = {
        task: $('#to-do-input').val()
    }
    console.log('Saving new task', newTask);
    // Sending request to database to add task
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(function (response) {
        console.log(response);
        // Reloading page with all current tasks
        getTasks();
    }).catch(function(error) {
        // Logging out errors posting task
        console.log('Error in addTask', error);
        alert('Error in adding task. Please try again later.')
    })
}

function deleteTask() {
    // Obtaining id of the task to delete
    const taskId = $(this).parent().parent().data('id');
    console.log('The ID of the selected task is: ', taskId);
        sweetAlert({
        title: 'Are you sure?',
        text: "Click delete to remove this task from your list",
        icon: "warning",
        buttons: true,
        dangerMode: true
        }).then((willDelete) => {
        // Send a delete request to server
        if(willDelete) {
    
            $.ajax({
                method: 'DELETE',
                url: `/tasks/${taskId}`
            })
            .then((response) => {
                console.log('Delete a task');
                // Requesting all current tasks again
                getTasks();
            })
            .catch((error) => {
                // Sending error to console log to diagnose issues. 
                console.log('Error in DELETE request: ', error);
                alert('Error in deleting a task');
            })
        }
    }
)}

//Function to update the task to completed
function completeTask() {
    const taskId = $(this).data('id');
    const completedStatus = $(this).data('comp');
    console.log('in complete task toggle: ', taskId, completedStatus);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
        data: {newCompleted: !completedStatus}
    })
    .then((response) => {
        // Console log to confirm inside of updating task
        console.log('Updating a task');
        // requesting all current tasks again
        getTasks();
    })
    .catch((error) => {
        // sending error to console log to diagnose issues
        console.log('Error in UPDATE request: ', error);
        alert('Error in updating a task');
    })
}
function getItems () {
    $.ajax({
        type: 'GET',
        url: '/items'
    })
    .then(function(response) {
        let el = $('#inventoryOut');
        let.empty();
        for(let i=0; i<response.length; i++) {
            el.append(`
            <li>${response[i].size} ${response[i].color} ${response[i].name}
            <button class="sellButton" data-id="${response[i].id}">Sell</button>
            <button class="togglePendingButton" data-id="${response[i].id}" data-pending="${response[i].pending}">Pending: ${response[i].pending}</button></li>`)
        }
    }).catch((error) => {
        alert('Error in getting inventory: ', error)
    })
}


// Render function to draw all database entries on page
function render(listOfTasks) {
    console.log('inside of render function')
    $('#view-tasks').empty();
    for (let task of listOfTasks) {
        let taskStatus;
        let hiddenButton;
        if(task.completed) {
            taskStatus = "Complete!"
            hiddenButton = `<button class="complete-btn" data-comp="${task.completed}" data-id="${task.id}">Uncomplete Task</button>`
        } else {
            hiddenButton = `<button class="complete-btn" data-comp="${task.completed}" data-id="${task.id}">Complete Task</button>`
            taskStatus = "To do still"
        }
        let newRow = $(`
            <tr data-id="${task.id}">
                <td>${task.task}</td>
                <td>${taskStatus}</td>
                <td>${hiddenButton}</td>
                <td><button type="button" class="delete-btn">Delete Task</button></td>
            </tr>
        `);
        //Confirming id associated with data is grabbed correctly
        console.log(newRow.data('id'));
        $('#view-tasks').append(newRow)
    }
}