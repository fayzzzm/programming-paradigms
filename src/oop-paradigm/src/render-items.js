class RenderTodos {
    static render(todos) {
        const todosContainer = document.querySelector('.todos-container');
        todosContainer.innerHTML = '';

        todosContainer.append(
            ...todos.map(({ date, task }) => {
                const dateView = new NodeFactory()
                    .createNode('div', {
                        value: date,
                        className: 'todo-container__date',
                    })
                    .render();

                const taskView = new NodeFactory()
                    .createNode('div', {
                        value: task,
                        className: 'todo-container__task',
                    })
                    .render();

                const todoContainer = new NodeFactory()
                    .createNode('div', {
                        value: [dateView, taskView],
                        className: 'todo-container',
                    })
                    .render();

                return todoContainer;
            }),
        );
    }
}

class RenderForm {
    static render() {
        document.body.append(
            new NodeFactory()
                .createNode('form', { className: 'form' })
                .render(),
        );
    }
}

class RenderFormGroup {
    static render(formGroups) {
        const form = document.querySelector('.form');

        form.append(
            ...formGroups.map((name) => {
                const label = new NodeFactory()
                    .createNode('label', { value: 'task' })
                    .render();
                const input = new NodeFactory()
                    .createNode('input', {
                        value: 'task',
                        type: 'text',
                        id: 'task',
                    })
                    .render();

                const div = document.createElement('div');
                div.className = 'form-group';
                div.append(label, input);

                return div;
            }),
        );

        const button = document.createElement('input');
        button.type = 'submit';
        button.onclick = (e) => {
            e.preventDefault();
            const date = new Date().toUTCString();
            const task = document.querySelector('#task').value;

            todoList.todos = todoList.todos.concat({
                date,
                task,
            });

            RenderTodos.render(todoList.todos);
        };

        form.append(button);
    }
}

class RenderTodoListContainer {
    static render() {
        document.body.appendChild(
            new NodeFactory()
                .createNode('div', {
                    className: 'todos-container',
                    value: '',
                })
                .render(),
        );
    }
}
