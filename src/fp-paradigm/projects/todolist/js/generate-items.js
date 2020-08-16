// Pure functions, generates a node.
const generateInput = (value, className) => {
    const input = document.createElement('input');

    input.placeholder = value;
    input.className = className;

    return input;
};

const generateLabel = (value) => {
    const label = document.createElement('label');
    label.innerHTML = value;

    return label;
};
