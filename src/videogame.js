class Game {
    name
    fameModificator
    cost
    img
    constructor(_name,_fameModificator,_cost,_img){
        this.name = _name;
        this.fameModificator = _fameModificator;
        this.cost = _cost
        this.img = _img;
    }
    buy() {
        if(game.streamer.money >= this.cost) {
            game.streamer.money -= this.cost;
            game.streamer.addGame(this);
            toastr.success('You can now stream '+this.name+' ! Congratulation !!', 'Game '+this.name+' bought !!')
        }
    }
}
var games = []