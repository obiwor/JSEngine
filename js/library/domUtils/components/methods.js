const doc = document;

export const createElement = (tag, attributes = {}) => {
    const element = doc.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    return element;
};

export const getElement =  (selector) => {
    const element = doc.querySelector(selector);
    if (!element) {
        throw new Error(`Element not found: ${selector}`);
    }
    return element;
};

export const appendTo = (parent, child) => {
    if (typeof parent === "string") {
        parent = getElement(parent);
    }
    parent.appendChild(child);
    return child;
};
