class InputNode {
    constructor(options) {
        this.options = options;
    }

    render() {
        const { value, type, id } = this.options;
        const input = document.createElement('input');

        input.placeholder = value;
        input.type = type;
        input.id = id;

        return input;
    }
}

class LabelNode {
    constructor(options) {
        this.options = options;
    }

    render() {
        const { value } = this.options;
        const label = document.createElement('label');

        label.innerHTML = value;

        return label;
    }
}

class ButtonNode {
    constructor(options) {
        this.options = options;
    }

    render() {
        const { value } = this.options;
        const button = document.createElement('button');

        button.innerHTML = value;

        return button;
    }
}

class DivNode {
    constructor(options) {
        this.options = options;
    }

    render() {
        const { value, className } = this.options;
        const div = document.createElement('div');

        div.className = className;

        if (Array.isArray(value)) {
            div.append(...value);
        } else {
            div.innerHTML = value;
        }

        return div;
    }
}

class FormNode {
    constructor(options) {
        this.options = options;
    }

    render() {
        const { className } = this.options;
        const form = document.createElement('form');

        form.className = className;

        return form;
    }
}

export class NodeFactory {
    createNode(type, options) {
        switch (type) {
            case 'input':
                return new InputNode(options);
            case 'label':
                return new LabelNode(options);
            case 'div':
                return new DivNode(options);
            case 'form':
                return new FormNode(options);
            case 'button':
                return new ButtonNode(options);
        }
    }
}
