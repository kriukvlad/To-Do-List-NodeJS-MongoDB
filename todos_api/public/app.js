$(function(){
    getJSON = $.getJSON('/api/todos');
    var todoInput = $('#todoInput');
    var list = $('.list');
    
    getJSON
    .then(addTodos)
    .catch(function(err){
        console.log(err);
    });

    todoInput.keypress(function(event){
        if(event.which == 13){
            createTodo();
        };
    });

    list.on('click', 'span', onListSpanClicked)
        .on('click', 'li', onListLiClicked);

    function addTodos(todos){
        console.log(todos);
        todos.forEach(function(todo){
            addTodo(todo);
        });
    };

    function addTodo(todo){
        var newTodo = $('<li class="task">' + todo.name + ' <span>X</span></li>');
        newTodo.data('id', todo._id);
        newTodo.data('completed', todo.completed);
            if(todo.completed){
                newTodo.addClass('done');
            }
            $('.list').append(newTodo);
    };

        //send request to create new todo        
    function createTodo(){
        $.post('/api/todos', {name: todoInput.val()})
        .then(function(newTodo){
            todoInput.val(' ');
            addTodo(newTodo);
        })
        .catch(function(err){
            console.log(err);
        });
    };

    function onListSpanClicked(event){
        event.stopPropagation();
        removeTodo($(this).parent());
    };

    function onListLiClicked(){
        updateTodo($(this));
    };

    function removeTodo(todo){
        var clickedId = todo.data('id');
        var deleteUrl = '/api/todos/' + clickedId;
        $.ajax({
            method: 'DELETE',
            url: deleteUrl
        })
        .then(function(data){
            todo.remove();
        })
        .catch(function(err){
            console.log(err);
        })
    };

    function updateTodo(todo){
        var updateUrl = '/api/todos/' + todo.data('id');
        var isDone = !todo.data('completed');
        var updateData = {completed: isDone};
        $.ajax({
            method: 'PUT',
            url: updateUrl,
            data: updateData
        })
        .then(function(updatedTodo){
            todo.toggleClass('done');
            todo.data('completed', isDone);
        })
        .catch(function(err){
            console.log(err);
        })
    };
    










});