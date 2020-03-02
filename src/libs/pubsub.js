export default {
    enable: function(target, cfg) {
        (target.subscribe = function(event, callback) {
            this.subscribers = this.subscribers || {};
            this.subscribers[event] = this.subscribers[event] || [];
            this.subscribers[event].push(callback);
        }),
            (target.publish = function(event) {
                if (this.subscribers && this.subscribers[event]) {
                    let subs = this.subscribers[event],
                        args = [].slice.call(arguments, 1);

                    for (let n = 0, max = subs.length; n < max; n++) subs[n].apply(on, args);
                }
            });

        if (cfg) {
            for (let n = 0, max = cfg.length; n < max; n++) target.subscribe(cfg[n].event, cfg[n].action);
        }
    },
};
