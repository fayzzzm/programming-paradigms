// Looks wierd
const state = {
    formGroups: {
        inputs: ['task'],
    },
};

const renderForm = (formGroups) => {
    const form = document.createElement('form');

    form.className = 'form';
    formGroups.forEach((group) => form.appendChild(group));

    return form;
};

const renderFormGroups = (inputs) => {
    return inputs.map((name) => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';

        const input = generateInput(name, 'task-input');
        const label = generateLabel(name);

        const button = document.createElement('input');
        button.type = 'submit';

        formGroup.appendChild(label);
        formGroup.appendChild(input);
        formGroup.appendChild(button);

        return formGroup;
    });
};

const render = (form) => {
    document.body.appendChild(form);
    return document;
};

const compose = (...functions) => (value = null) =>
    functions.reduceRight((x, f) => f(x), value);

const main = (inputs, submitHandler) => {
    compose(render, renderForm, renderFormGroups)(inputs);

    const form = getNodeBySelector('.form');
    form.addEventListener('submit', submitHandler);
};

const getNodeBySelector = (selector) => document.querySelector(selector);
const getValueFromInput = (selector) => document.querySelector(selector).value;
const deleteTodo = (i) =>
    dispatch({
        type: 'DELETE_TODO',
        id: i,
    });
const toggleTodo = (i) =>
    dispatch({
        type: 'TOGGLE_TODO',
        id: i,
    });

const rerender = (todos) => {
    const todosView = getNodeBySelector('.todos');
    const taskInput = getNodeBySelector('.task-input');

    taskInput.value = '';

    const newTodosList = todos.reduce(
        (nodes, todo, i) =>
            (nodes += `
            <div class="todo">
                <div class="todo__id">${todo.id}</div>
                <div class="todo__task">${todo.task}</div>
                <div class="todo__completed">${todo.completed}</div>
                <button onclick="deleteTodo(${i})")">Delete</button>
                <button onclick="toggleTodo(${i})")">Completed</button>
            </div>
        `),
        '',
    );

    todosView.innerHTML = newTodosList;
};

const submitHandler = (e) => {
    e.preventDefault();
    const task = getValueFromInput('.task-input');

    dispatch({
        type: 'ADD_TODO',
        task,
    });
};

main(state.formGroups.inputs, submitHandler);
