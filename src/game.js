Vue.filter('round', function (value) {
    if (!value) return ''
    value = Math.floor(value)
    return value
});
Vue.filter('toFixed',function(value) {
  if(!value) return ''
  value = value.toFixed(1);
  return value;
})
game = new Vue({
    el: '#wrapper',
    data: {
      streamer: new Streamer(),
      navigation: "home",
    },
    methods: {
      haveThisGame: function (_game) {
        var index = this.streamer.games.findIndex(v => v.name === _game.name)
        if(index >= 0) {
          return true;
        }
      }
    }
})
