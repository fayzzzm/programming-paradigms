import { fromEvent, Subscription, BehaviorSubject } from 'rxjs';
import {
    debounceTime,
    map,
    distinctUntilChanged,
    tap,
    filter,
} from 'rxjs/operators';
import {
    RenderForm,
    RenderFormGroup,
    RenderTodoListContainer,
    RenderTodos,
} from './render-items';

class TodoList {
    constructor() {
        this.todos = [];
    }
}

export const todoList = new TodoList();
const subs = new Subscription();

const exists$ = new BehaviorSubject(false);
export const deleteTodoId = new BehaviorSubject(-1);

let exist = false;

RenderForm.render();
RenderFormGroup.render(['name']);
RenderTodoListContainer.render();

const updateTodos = (e) => {
    e.preventDefault();
    if (!exist) {
        const date = new Date().toUTCString();
        const task = document.querySelector('#task').value;

        todoList.todos = todoList.todos.concat({
            date,
            task,
        });

        RenderTodos.render(todoList.todos);
        document.getElementById('task').value = '';
        document.getElementById('task').focus();
        exists$.next(false);
    }
};

subs.add(
    fromEvent(document.getElementById('task'), 'keydown')
        .pipe(
            debounceTime(100),
            map((e) => e.target.value),
            distinctUntilChanged(),
            tap((value) => {
                if (
                    todoList.todos.map(({ task }) => task).indexOf(value) > -1
                ) {
                    exists$.next(true);
                } else {
                    exists$.next(false);
                }
            }),
        )
        .subscribe(),
);
subs.add(exists$.subscribe((value) => (exist = value)));
subs.add(
    fromEvent(document.querySelector('form'), 'submit').subscribe(updateTodos),
);
subs.add(
    deleteTodoId.pipe(filter((id) => id > -1)).subscribe((id) => {
        todoList.todos.splice(id, 1);
        RenderTodos.render(todoList.todos);
        alert('Element with id: ' + id + ' has been removed');
    }),
);
