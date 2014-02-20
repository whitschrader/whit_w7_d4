$(function(){

  $("#addTodo").on("submit"), function(event){event.preventDault();
  };

console.log("todo was added!", event);

var newTodo = {completed: false};
newTodo.title = $("#todo_title").val();
console.log(newTodo);

$.ajax({
    url: "/todos.json", 
    data: {todo: newTodo},
    type: "POST"
}).done(function(data){
     console.log(data);
});

// LOAD ALL TODOS INTO THE PAGE
$.get("/todos.json").done(function(data){
    $(data).each(function(index, todo){
        var todoHTML = HandlebarsTemplates.todo(todo);
        $("#todos").append(todoHTML);
    });
});
        

// Let's handle updates to a todo.
$("#todos").on("click", ".todo", function(event){
        if(event.target.name === "completed"){
            var checkbox = event.target;
            console.log("clicked checkbox!");
           var updated_todo = {id: this.dataset.id}
           updated_todo.completed = checkbox.checked;
           console.log(updated_todo);
           var _this = this;
           $.ajax({
                url: "/todos/"+updated_todo.id+".json",
                method: "PATCH",
                data: {todo: updated_todo}
           }).done(function(data){
                $(_this).toggleClass("done-true");  
           });
        };
            
            // Something here to delete
            right here?
        
     });

};