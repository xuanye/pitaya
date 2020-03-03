export default {
    state: {
        init: 'loading',
        transitions: [
            { name: 'play', from: 'loading', to: 'playing' },
            { name: 'lose', from: 'playing', to: 'over' },
        ],
        methods: {},
    },
};
