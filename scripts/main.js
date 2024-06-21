const { createApp } = Vue;


createApp({
    data() {
        return {
            routes: [],
            from: '',
            to: '',
            routeList: [],
            routePlayList: [],
            counter: 0,
            routePlayListName: '',
            button: '',
            showOverlay: false,
            selectedRouteList: {},
            isChecklistVisible: false,
            routenId: 0,
            checked: false,



        };
    },
    mounted() {
        // Lade die gespeicherten Routen aus dem localStorage
        const storedRoutes = localStorage.getItem('routePlayList');
        if (storedRoutes) {
            this.routePlayList = JSON.parse(storedRoutes);
        }
    },
    methods: {
        async searchRoutes() {
            const response = await fetch(`http://transport.opendata.ch/v1/connections?from=${this.from}&to=${this.to}`);
            // const response = await fetch(`http://transport.opendata.ch/v1/connections?from=sargans&to=chur`);
            const data = await response.json();
            this.routeList = data.connections;
        },

        formatTime(dateTime) {
            const date = new Date(dateTime);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },
        calculateDuration(departure, arrival) {
            const dep = new Date(departure);
            const arr = new Date(arrival);
            const diff = (arr - dep) / 60000; // difference in minutes
            return `${diff} min`;
        },



        createList() {

            //mit find
            let nameExists = false;
            for (let i = 0; i < this.routePlayList.length; i++) {
                if (this.routePlayListName === this.routePlayList[i].name) {
                    nameExists = true;
                    break;
                }
            }

            if (nameExists) {
                alert("Diese routelist existiert bereits");
            } else {
                this.routePlayList.push({
                    name: this.routePlayListName,
                    id: this.counter,
                    routen: [],
                    checked: this.checked,
                });





            }

            console.log(this.routePlayList[id = this.counter]);
            this.counter++;


        },

        deleteRouteList(index) {
            this.routePlayList.splice(index, 1);

            this.saveList();
        },
        saveList() {
            // Speichere die aktuelle routePlayList im localStorage
            localStorage.setItem('routePlayList', JSON.stringify(this.routePlayList));
        },
        setName(event) {
            this.routePlayListName = event.target.value;
        },



        viewRouteList(idxList) {

            const selectedRouteList = this.routePlayList[idxList];
            localStorage.setItem('selectedRouteList', JSON.stringify(selectedRouteList));
            window.location.href = 'routePlayListView.html';

        },

        showChecklist(routenId) {
            this.isChecklistVisible = true;
            this.routenId = routenId;
        },
        hideChecklist() {
            this.isChecklistVisible = false;
        },
        addToFavorites(index) {
            // Überprüfe, ob eine Checkbox gecheckt ist und finde den Index
            const checkedItems = this.routePlayList.filter(item => item.checked);
            console.log(index)
            if (checkedItems.length > 0) {
                this.routePlayList[index].routen.push(this.routeList[this.routenId])
                
                this.routePlayList[index].checked = false;

                this.hideChecklist();
            } else {
                alert('Bitte wählen Sie ein Element aus.');
            }
        }

    },
    watch: {
        // Überwache das routePlayList Array und speichere es bei Änderungen
        routePlayList: {
            handler() {
                this.saveList();
            },
            deep: true
        }
    }
}).mount('#app');


