Vue.filter('round', function (value) {
    if (!value) return ''
    value = Math.floor(value)
    return value
})
game = new Vue({
    el: '#wrapper',
    data: {
      streamer: new Streamer(),
      navigation: "home",
    },
    methods: {
      haveThisGame: function (_game) {
        console.log(_game.name);
        var index = this.streamer.games.findIndex(v => v.name === _game.name)
        console.log(index);
        if(index >= 0) {
          return true;
        }
      }
    }
})
