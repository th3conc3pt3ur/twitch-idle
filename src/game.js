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
      shop: "mouse"
    },
    mounted() {
      if (localStorage.streamer) {
        var myStreamer = new Streamer();
        Object.assign(myStreamer,JSON.parse(localStorage.streamer));
        myStreamer.hydrate();
        this.streamer = myStreamer;
        lastPaidTick = localStorage.lastPaidTick;
        LastAds = localStorage.LastAds;
      }
    },
    
    methods: {
      haveThisGame: function (_game) {
        var index = this.streamer.games.findIndex(v => v.name === _game.name)
        if(index >= 0) {
          return true;
        }
      },
      persist() {
        localStorage.streamer = JSON.stringify(this.streamer)
        localStorage.lastPaidTick = lastPaidTick;
        localStorage.LastAds = LastAds;
      }
    }
})
window.addEventListener("beforeunload", function(e){
  game.persist();
}, false);

toastr.options = {
  //positionClass: 'toast-bottom-center',
  positionClass :'toast-bottom-full-width',
  closeButton: true,
  escapeHtml : false
};