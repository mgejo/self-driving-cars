class Controls{
    constructor(){
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        this.#addKeyboardListeners(); // private method
    }

    #addKeyboardListeners() {
        const definitions = {
            "w": "forward",
            "a": "left",
            "s": "reverse",
            "d": "right",
        };

        document.onkeydown = (event) => {
            const direction = definitions[event.key.toLowerCase()];
            if (!direction) {
                return;
            }
            this[direction] = true;
        }

        document.onkeyup = (event) => {
            const direction = definitions[event.key.toLowerCase()];
            if (!direction) {
                return;
            }
            this[direction] = false;
        }
    }
}
