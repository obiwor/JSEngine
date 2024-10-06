import {createCanvasManager} from "./canvas.js";

export const createGL = () => {
    const canvasManager = createCanvasManager().init("#app", 800, 800, "webgl");
    const _gl = {
        init(){
           const ctx =  this.getContext()
            this.clear(()=>{
                ctx.clearColor(0,0,0,1)
            })
            return this
        }
    }
    return Object.create(canvasManager, Object.getOwnPropertyDescriptors(_gl))

};
