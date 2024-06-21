const { createApp } = Vue;

createApp({
    data() {
        return {
            selectedRouteList: {},
        };
    },
    mounted() {
        const storedSelectedRouteList = localStorage.getItem('selectedRouteList');
        if (storedSelectedRouteList) {
            this.selectedRouteList = JSON.parse(storedSelectedRouteList);
        }
    },
    methods: {
        formatTime(dateTime) {
            const date = new Date(dateTime);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },
        calculateDuration(departure, arrival) {
            const dep = new Date(departure);
            const arr = new Date(arrival);
            const diff = (arr - dep) / 60000;
            return `${diff} min`;
        },
        goBack() {
            window.location.href = 'index.html';
        }
    }
}).mount('#app');
    