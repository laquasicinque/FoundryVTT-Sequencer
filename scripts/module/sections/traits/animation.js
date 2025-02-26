export default {

    /**
     * Base properties
     */
    _animations: false,

    /**
     * Animates a property on the target of the animation.
     *
     * @param {string} inTarget
     * @param {string} inPropertyName
     * @param {object} inOptions
     *      @param {Number} inOptions.from      - a single number from which to animate
     *      @param {Number} inOptions.to        - a single number to which to animate
     *      @param {Number} inOptions.duration  - how long in ms the animation should take
     *      @param {Number} inOptions.delay     - inserts a delay in ms before the animation starts
     *      @param {String} inOptions.ease      - what type of easing the animation should use
     *
     * @returns this
     */
    animateProperty(inTarget, inPropertyName, inOptions = {}) {
        if (!this._animations) this._animations = [];

        if (typeof inPropertyName !== "string") throw this.sequence._throwError(this, "animateProperty", `inPropertyName must be of type string`);
        if (typeof inTarget !== "string") throw this.sequence._throwError(this, "animateProperty", `inTarget must be of type string`);
        if (typeof inOptions.from !== "number") throw this.sequence._throwError(this, "animateProperty", `inOptions.from must be of type number`);
        if (typeof inOptions.to !== "number") throw this.sequence._throwError(this, "animateProperty", `inOptions.to must be of type number`);
        if (typeof inOptions.duration !== "number") throw this.sequence._throwError(this, "animateProperty", `inOptions.duration must be of type number`);
        if (inOptions?.delay && typeof inOptions.delay !== "number") throw this.sequence._throwError(this, "animateProperty", `inOptions.delay must be of type number`);
        if (inOptions?.ease && typeof inOptions.ease !== "string") throw this.sequence._throwError(this, "animateProperty", `inOptions.ease must be of type string`);

        this._animations.push({
            target: inTarget,
            propertyName: inPropertyName,
            from: inOptions?.from,
            to: inOptions?.to,
            duration: inOptions?.duration ?? 0,
            delay: inOptions?.delay ?? 0,
            ease: inOptions?.ease ?? "linear",
            looping: false,
        });

        return this;

    },

    /**
     * Loops a property between a set of values on the target
     *
     * @param {string} inTarget
     * @param {string} inPropertyName
     * @param {object} inOptions
     *      @param {Number} inOptions.from      - a single number from which to loop
     *      @param {Number} inOptions.to        - a single number to which to loop
     *      @param {Number} inOptions.values    - an array of values to loop between
     *      @param {Number} inOptions.duration  - how long in ms the loop should take
     *      @param {Number} inOptions.loops     - how many loops in total this animation should go through - if none are specified, the loop is indefinite
     *      @param {Number} inOptions.delay     - inserts a delay in ms before the animation starts
     *      @param {String} inOptions.ease      - what type of easing the animation should use
     *      @param {Boolean} inOptions.pingPong - sets whether loop should interpolate to the first value after it reaches the first value, or simply set it to the first value
     *
     * @returns this
     */
    loopProperty(inTarget, inPropertyName, inOptions = {}) {
        if (!this._animations) this._animations = [];

        if (typeof inPropertyName !== "string") throw this.sequence._throwError(this, "animateLoop", `inPropertyName must be of type string`);
        if (typeof inTarget !== "string") throw this.sequence._throwError(this, "animateLoop", `inTarget must be of type string`);

        if (!inOptions?.values) {
            if (!inOptions?.from === undefined || !inOptions?.to === undefined) throw this.sequence._throwError(this, "animateLoop", `if inOptions.values is not set, you must provide inOptions.from and inOptions.to`);
            if (typeof inOptions.from !== "number") throw this.sequence._throwError(this, "animateLoop", `inOptions.from must be of type number`);
            if (typeof inOptions.to !== "number") throw this.sequence._throwError(this, "animateLoop", `inOptions.to must be of type number`);
            inOptions.values = [inOptions?.from, inOptions?.to];
            delete inOptions.from;
            delete inOptions.to;
        } else {
            if (!Array.isArray(inOptions.values)) throw this.sequence._throwError(this, "animateLoop", `inOptions.values must be of type array`);
            inOptions.values.forEach(value => {
                if (typeof value !== "number") throw this.sequence._throwError(this, "animateLoop", `values in inOptions.keys must be of type number`);
            });
        }

        if (typeof inOptions.duration !== "number") throw this.sequence._throwError(this, "animateLoop", `inOptions.duration must be of type number`);

        if (inOptions?.delay !== undefined && typeof inOptions.delay !== "number") throw this.sequence._throwError(this, "animateLoop", `inOptions.delay must be of type number`);
        if (inOptions?.ease !== undefined && typeof inOptions.ease !== "string") throw this.sequence._throwError(this, "animateLoop", `inOptions.ease must be of type string`);
        if (inOptions?.loops !== undefined && typeof inOptions.loops !== "number") throw this.sequence._throwError(this, "animateLoop", `inOptions.loops must be of type number`);
        if (inOptions?.pingPong !== undefined && typeof inOptions.pingPong !== "boolean") throw this.sequence._throwError(this, "animateLoop", `inOptions.loops must be of type boolean`);

        this._animations.push({
            target: inTarget,
            propertyName: inPropertyName,
            values: inOptions?.values,
            duration: inOptions?.duration ?? 0,
            delay: inOptions?.delay ?? 0,
            ease: inOptions?.ease ?? "linear",
            looping: true,
            loops: inOptions?.loops,
            indefinite: inOptions?.loops === undefined,
            pingPong: inOptions?.pingPong ?? false
        });

        return this;

    }

}