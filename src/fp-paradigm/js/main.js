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

        const input = generateInput(name);
        const label = generateLabel(name);

        formGroup.appendChild(label);
        formGroup.appendChild(input);

        return formGroup;
    });
};

const render = (form) => {
    document.body.appendChild(form);
    return document;
};

const compose = (...functions) => (value = null) =>
    functions.reduceRight((x, f) => f(x), value);

const main = (inputs) => compose(render, renderForm, renderFormGroups)(inputs);

console.log(main(state.formGroups.inputs));
