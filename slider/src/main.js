var Vue = require('vue/dist/vue');
var App = require('./app');

new Vue({
    el:'#root',
    components: {
        app: App
    }
});
