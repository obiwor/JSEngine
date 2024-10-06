import jsEngine from "@js-engine/global";

jsEngine.registerModule({
    name: "js-engine/gl",
    deps: ["js-engine/loop"],
    init: async () => {
        /**
         *
         * @type {WebGLRenderingContext}
         */
        const {createGL} = await import("./components/gl");
        jsEngine.gl = createGL().init()
    },
});