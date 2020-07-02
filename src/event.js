class Event {
    name
    type

    constructor(_name,_type) {
        this.name = _name;
        this.type = _type;
    }

    execute(){
        //proc the event
        // Internet box burn... Impossible to stream for x days sad.png
        // Keyboard broke, to mutch salty ? sad.png
        // Mouse broke, to mutch salty ? sad.png
        // You have been raid by *Insert random twitch streamer* , you've gain X follow,subs
        if(this.type == "internet_box_down") {

        }

        if(this.type == "keyboard_broken"){
            game.streamer.setup.keyboard = null;
            toastr.error('Gonna have to buy a new one...', 'You broke your keyboard !! Too salty dude !')
        }

        if(this.type == "mouse_broken"){
            game.streamer.setup.mouse = null;
            toastr.error('Gonna have to buy a new one...', 'You broke your mouse !! Too salty dude !')
        }

        if(this.type == "raid") {
            var raider = "Lirik";
            var nbFollow = 100;
            var nbSubs = 100;
            var message = "You gain " + nbFollow+ " follows";
            if(nbSubs > 0){
                message += " and "+nbSubs+" subs ! GG dude !";
            }
            game.streamer.addFollow(nbFollow);
            game.streamer.addSubs(nbSubs);
            toastr.success(message, "<img src='img/pog.png'/> You've been raid by "+raider+" !")
        }
        if(this.type == "bad_buzz") {
            var nbFollow = -100;
            var nbSubs = -100;

            var message = "Why be so salty on Twitter ? :( You loose "+nbFollow+" follow";
            message += " and "+nbSubs+" subs, sad day";
            game.streamer.addFollow(nbFollow);
            game.streamer.addSubs(nbSubs);
            toastr.error(message, "<img src='img/sad.png'/> Oh no ! You've got a bad buzz !")
        }
    }
}