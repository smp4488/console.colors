let instances = [];

const isServer = typeof window === 'undefined' ? true : false;
let chalk = false;
let typeColors = {};

if (isServer) {
    chalk = require('chalk');
    typeColors = {
        log: chalk,
        error: chalk.bold.red,
        warn: chalk.keyword('orange'),
        info: chalk.keyword('blue')
    };
}

export default class Debug {
    constructor (name) {
        this.name = name;
        instances[name] = this;

        // Generate component color
        this.color = {
            r: this.randomColor(),
            g: this.randomColor(),
            b: this.randomColor()
        }
    }

    _call (method, args) {
        let a = Array.prototype.slice.call(args);
        let newArgs = isServer ? this.serverLog(method, a) : this.browserLog(method, a);

        // via @paulirish console wrapper
        if (console && console[method]) {
            if (console[method].apply) { console[method].apply(console, newArgs); } else { console[method](newArgs); } // nicer display in some browsers
        }

    }

    serverLog (method, args) {
        // Change text color for method type
        for (var i = 0, l = args.length; i < l; i++) {
            args[i] = typeof (args[i]) === 'string' ? typeColors[method](args[i]) : args[i];
        }

        // Prefix a colored label to all console text output
        args.unshift(chalk.bgRgb(this.color.r, this.color.g, this.color.b)(`${this.name}`));

        return args;
    }

    browserLog (method, args) {
        // Prefix a colored label to all console text output
        const textOutputMethods = ['error', 'info', 'log', 'trace', 'warn'];
        if (textOutputMethods.includes(method) > -1) {
            args.unshift(`%c ${this.name}`, `color:#fff;border-radius:3px;background-color: rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 1);`);
        }

        return args;
    }

    log () {
        this._call('log', arguments)
    }

    warn () {
        this._call('warn', arguments)
    }

    error () {
        this._call('error', arguments)
    }

    info () {
        this._call('info', arguments)
    }

    randomColor () {
        return Math.round(Math.random() * 255);
    }
}
