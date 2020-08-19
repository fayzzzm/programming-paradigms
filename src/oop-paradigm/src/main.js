class RenderForm {
    static render() {
        const form = document.createElement('fomr');
        form.className = 'form';

        document.body.append(form);
    }
}

class RenderFormGroup {
    static render(formGroups) {
        const form = document.querySelector('.form');

        form.append(
            ...formGroups.map((name) => {
                const label = document.createElement('label');
                label.innerHTML = name;

                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = name;

                const div = document.createElement('div');
                div.className = 'form-group';
                div.append(label, input);

                return div;
            }),
        );
    }
}

class RenderTodoListContainer {
    render() {
        const div = document.createElement('div');
        div.className = 'todos-container';

        document.body.appendChild(div);
    }
}

class RenderTodos {
    render(todos) {
        const todosContainer = document.querySelector('.todos-container');

        todosContainer.append(
            ...todos.map(({ date, task }) => {
                const dateView = document.createElement('div');
                const taskView = document.createElement('div');

                dateView.innerHTML = date;
                taskView.insertBefore = task;

                const div = document.createElement('div');
                div.className = 'todo-container';
                div.append(dateView, taskView);

                return div;
            }),
        );
    }
}

RenderForm.render();
RenderFormGroup.render(['name']);
