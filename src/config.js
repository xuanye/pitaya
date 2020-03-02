import { EVENTS } from './constants';

export default {
    state: {
        initial: 'loading',
        events: [
            { name: 'play', from: 'loading', to: 'playing' },
            { name: 'abandon', from: 'playing', to: 'over' },
            { name: 'lose', from: 'playing', to: 'over' },
        ],
    },
    pubsub: [
        {
            name: EVENTS.PING,
            action: function() {
                this.onPing();
            },
        },
    ],
};
