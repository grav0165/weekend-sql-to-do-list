

console.log('Starting jQuery')

$(document).ready(onReady);

function onReady() {
    // Establish get request for all database information
    getTasks();
    $('#addButton').on('click', addTask);
    $('#view-tasks').on('click', '.delete-btn', deleteTask);
    $('#view-tasks').on('click', '.complete-btn', completeTask);
    $('#view-tasks').on('click', '.uncomplete-btn', completeTask)
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
    $('#to-do-input').val('')
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
    const completedTime = $(this).data('time');
    console.log('in complete task toggle: ', taskId, completedStatus);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
        data: {
            newCompleted: !completedStatus,
            completedTime: completedTime
        }
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


// Render function to draw all database entries on page
function render(listOfTasks) {
    console.log('inside of render function')
    $('#view-tasks').empty();
    for (let task of listOfTasks) {
        // Setting empty variables to use for hiding other button, and giving status
        let taskStatus;
        let hiddenButton;
        if(task.completed) {
            // Formatting the date received from the server
            timeCompleted = new Date(task.completed_time);
            let timeText = timeCompleted.toLocaleTimeString();
            // Using completed along with date time
            taskStatus = `✅ Complete! ${timeText}`;
            hiddenButton = `<button class="uncomplete-btn btn btn-warning" data-comp="${task.completed}" data-time="CURRENT_TIMESTAMP" data-id="${task.id}">Uncomplete Task</button>`;
            rowClass = "completed-task"
            
        } else {
            hiddenButton = `<button class="complete-btn btn btn-outline-success" data-comp="${task.completed}" data-time="NULL" data-id="${task.id}">Complete Task</button>`;
            taskStatus = "🔲 To do still";
            rowClass = "basic-row"
        }
        let newRow = $(`
            <tr data-id="${task.id}" class="${rowClass} active-row">
                <td class="task-column-complete">${task.task}</td>
                <td class="status-column">${taskStatus}</td>
                <td data-pend="${taskStatus}">${hiddenButton}</td>
                <td><button type="button" class="delete-btn  btn btn-outline-danger">Delete Task</button></td>
            </tr>
        `);
        completeStatus(taskStatus)
        //Confirming id associated with data is grabbed correctly
        console.log(newRow.data('id'));
        
        $('#view-tasks').append(newRow)
        
    }
}
    


function completeStatus(taskStatus) {
    if(taskStatus == "✅ Complete!") {
        $('#view-tasks').children().addClass('Completed-Task')
    } else {
        $('#view-tasks').children().removeClass('Completed-Task')
    }
}