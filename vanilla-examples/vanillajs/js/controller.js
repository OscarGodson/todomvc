(function( window ) {
  'use strict';

  function Controller (model, view) {
    this.model = model;
    this.view = view;
  }

  Controller.prototype.load = function () {
    var todoList = document.querySelector('#todo-list')
      , self = this;
    self.model.read(function (data) {
      todoList.innerHTML = self.view.show(data);
    });
  }

  Controller.prototype.addItem = function (e) {
    var todoList = document.querySelector('#todo-list')
      , input = document.querySelector('#new-todo')
      , title = title || ''
      , self = this;
    if (e.keyCode == 13) {
      self.model.create(e.srcElement.value, function (data) {
        todoList.innerHTML = todoList.innerHTML + self.view.show(data);
        input.value = '';
      });
    }
  }

  Controller.prototype.removeItem = function (id) {
    var todoList = document.querySelector('#todo-list')
      , self = this;
    self.model.remove(id, function () {
      todoList.removeChild(document.querySelector('[data-id="' + id + '"]'));
    });
  }

  Controller.prototype.toggleComplete = function (id, checkbox) {
   var todoList = document.querySelector('#todo-list')
      , done = checkbox.checked ? 1 : 0
      , self = this;
    self.model.update(id, {complete: done}, function () {
      if (done) {
        document.querySelector('[data-id="' + id + '"]').className = 'complete';
      }
    });
  }

  // Export to window
  window.Controller = Controller;
})( window );
