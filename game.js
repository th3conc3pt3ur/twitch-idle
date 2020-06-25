game = new Vue({
    el: '#dashboard',
    data: {
      streamer: new Streamer()
    }
})
//gameTick;
setInterval (function gameTick() {
    
    if(game.streamer.rest) {
        // streamer resting => gain stamina
        game.streamer.resting()
        
    } else {
        // streamer stream => loose stamina
        game.streamer.streaming()
    }
    

    game.streamer.play_time+=1;
    
}, 1000); // every second