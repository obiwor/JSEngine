import {DOMUtils} from "@js-engine/library-dom-utils";

const canvasManagerPrototype = {
    init(parentSelector, width, height, context = "2d") {
        const {createElement, appendTo} = DOMUtils();
        this.setCanvas(createElement("canvas", {width, height}));
        this.setContext(this.getCanvas().getContext(context));
        appendTo(parentSelector, this.getCanvas());
        return this;
    },

    resize(width, height) {
        const canvas = this.getCanvas();
        if (canvas) {
            canvas.width = width;
            canvas.height = height;
        }
        return this;
    },
    clear(handler) {
        const ctx = this.getContext();
        const canvas = this.getCanvas();
        if (ctx && canvas) {
            handler();
          
        }
        return this;
    },
    getCanvas() {},
    setCanvas() {},
    getContext() {},
    setContext() {}
};


export const createCanvasManager = () => {
    let _canvas, _ctx;

    const manager = Object.create(canvasManagerPrototype);

    Object.defineProperties(manager, {
        getCanvas: {
            value: () => _canvas,
            enumerable: false,
            writable: false,
            configurable: false
        },
        setCanvas: {
            value: (canvas) => { _canvas = canvas; },
            enumerable: false,
            writable: false,
            configurable: false
        },
        getContext: {
            value: () => _ctx,
            enumerable: false,
            writable: false,
            configurable: false
        },
        setContext: {
            value: (ctx) => { _ctx = ctx; },
            enumerable: false,
            writable: false,
            configurable: false
        }
    });

    return manager;
};
