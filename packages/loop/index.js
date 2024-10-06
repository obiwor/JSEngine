import jsEngine from "@js-engine/global";
import { getLogger } from "loglevel";

jsEngine.registerModule({
    name: "js-engine/loop",
    deps: [],
    init: async () => {
        const {createLoop} = await import("./components/loop.js");
        const gl = jsEngine.gl.getContext()
        jsEngine.gameLoop= createLoop(()=>{

            gl.clear(gl.COLOR_BUFFER_BIT)
        })
        
        jsEngine.gameLoop.start()
 
    },
});
