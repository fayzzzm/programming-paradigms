import { NodeFactory } from './node-factory';
import { deleteTodoId } from './index';

export class RenderTodos {
    static render(todos) {
        const todosContainer = document.querySelector('.todos-container');

        todosContainer.innerHTML = '';

        todosContainer.append(
            ...todos.map(({ date, task }, i) => {
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

                const button = new NodeFactory()
                    .createNode('button', {
                        value: 'delete task',
                        className: 'todo-container__button',
                    })
                    .render();

                button.onclick = () => {
                    deleteTodoId.next(i);
                };

                const todoContainer = new NodeFactory()
                    .createNode('div', {
                        value: [dateView, taskView, button],
                        className: 'todo-container',
                    })
                    .render();

                return todoContainer;
            }),
        );
    }
}

export class RenderForm {
    static render() {
        document.body.append(
            new NodeFactory()
                .createNode('form', { className: 'form' })
                .render(),
        );
    }
}

export class RenderFormGroup {
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
      
        form.append(button);
    }
}

export class RenderTodoListContainer {
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
