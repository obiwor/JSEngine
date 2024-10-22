import {createCanvasManager} from "./canvas.js";

export const createGL = (width = window.innerWidth, height = window.innerHeight) => {
    const canvasManager = createCanvasManager().init("#app", width, height, "webgl");
    const _gl = {
        initGL() {
            const ctx = this.getContext();
            this.clear(() => {
                ctx.clearColor(0, 0, 0, 1);
            });
            return this;
        },
    };
    return Object.create(canvasManager, Object.getOwnPropertyDescriptors(_gl));
};
