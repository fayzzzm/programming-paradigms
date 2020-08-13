const generateInput = (value) => {
    const input = document.createElement('input');
    input.placeholder = value;

    return input;
};

const generateLabel = (value) => {
    const label = document.createElement('label');
    label.innerHTML = value;

    return label;
};
