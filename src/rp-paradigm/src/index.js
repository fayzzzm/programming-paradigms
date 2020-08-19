const rxjs = require('rxjs');
const { fromEvent, BehaviorSubject } = rxjs;

const generateTodoList = (todos) =>
    todos.map(({ date, value }, i) => {
        const todo = document.createElement('div');
        todo.className = 'todo-item';

        const todoDate = generateSpanNode(date, 'todo-item__create-date');
        const todoTask = generateSpanNode(value, 'todo-item__task');

        todo.append(todoDate, todoTask);

        return todo;
    });

const rerender = (todos) => {
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = '';

    todoList.append(...generateTodoList(todos));
};

const todosSubject = new BehaviorSubject([]);
let todos = [];

todosSubject.subscribe((_todos) => {
    console.log(_todos);
    todos = _todos;
    rerender(todos);
});

const form = document.querySelector('form');
const taskInput = document.querySelector('#form-group__task');
const submitInForm = fromEvent(form, 'submit');

try {
    submitInForm.subscribe((e) => {
        e.preventDefault();
        const date = new Date().toUTCString();
        const value = taskInput.value;

        if (!value.length) throw new Error('too short!');

        todosSubject.next(
            todos.concat({
                date,
                value,
            }),
        );
    });
} catch (e) {
    console.error(e);
}

const generateSpanNode = (value, className) => {
    const span = document.createElement('span');
    span.className = className || '';
    span.innerHTML = value;

    return span;
};
