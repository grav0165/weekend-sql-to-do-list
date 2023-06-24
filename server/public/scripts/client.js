console.log('Starting jQuery')

$(document).ready(onReady);

function onReady() {
    // Establish get request for all database information
    getTasks();
    $('#addButton').on('click', addTask);
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
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(function (response) {
        console.log(response);
        getTasks();
    }).catch(function(error) {
        console.log('Error in addTask', error);
        alert('Error in adding task. Please try again later.')
    })
}

function render(listOfTasks) {
    console.log('inside of render function')
    $('#view-tasks').empty();
    for (let task of listOfTasks) {
        let newRow = $(`
            <tr data-id="${task.id}">
                <td>${task.task}</td>
                <td>${task.completed}</td>
                <td><button type="button" id="complete-btn">Complete Task</button></td>
                <td><button type="delete" id="delete-btn">Delete Task</button></td>
            </tr>
        `);
        //Confirming id associated with data is grabbed correctly
        console.log(newRow.data('id'));
        $('#view-tasks').append(newRow)
    }
}