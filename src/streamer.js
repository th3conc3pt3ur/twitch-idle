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
}
var games = [
    LeagueOfLegends = new Game("League of Legends",10,0,""),
    PathOfExile = new Game("Path of Exile",0,0,"")
]


class Upgrade {
    name
    fnc
    id
    price
    staminaBuff
    healthBuff
    oneTimeFollow
    oneTimeSubs
    fameBuff
    moneyBuff
    constructor(_name,_fnc,_id,_price,_staminaBuff,_healthBuff,_oneTimeFollow,_oneTimeSubs,_fameBuff,_moneyBuff) {
        this.name = _name
        this.fnc = _fnc
        this.id = _id
        this.price = _price
        this.staminaBuff = _staminaBuff
        this.healthBuff = _healthBuff
        this.oneTimeFollow = _oneTimeFollow
        this.oneTimeSubs = _oneTimeSubs
        this.fameBuff = _fameBuff
        this.moneyBuff = _moneyBuff
    }
}
PartnerUpgrade = new Upgrade("Become Twitch Partner")

// we can see upgrade like = "Open Youtube Channel","Create a twitter","Create a facebook"

class Stuff {
    constructor(_name) {
        this.name = _name;
        if(_name == null) this.name = this.constructor.name
    }
    
    name
    img
    price
}
class Keyboard extends Stuff {
    
}
class Mouse extends Stuff {

}
class GraphicCard extends Stuff {

}
class Cpu extends Stuff {

}
class Ssd extends Stuff {

}
class Screen extends Stuff {
    
}
class Webcam extends Stuff {
    
}
class Chair extends Stuff {

}
class Micro extends Stuff {
    
}
    //     Razer DeathAdder V2. The best gaming mouse. ...
    // Logitech G502 Lightspeed Wireless. The best premium gaming mouse. ...
    // HyperX Pulsefire Surge. The best gaming mouse for those on a budget. ...
    // Corsair Ironclaw RGB. ...
    // Razer Naga Trinity. ...
    // Corsair Scimitar RGB Elite. ...
    // Razer Viper. ...
    // Roccat Kone Pure Ultra.

class MyNavigation {
    constructor() {
        this.path = "home";
    }
    
}
class Setup {
    keyboard = new Keyboard()
    mouse = new Mouse()
    graphicCard = new GraphicCard("2080 RTX")
    cpu = new Cpu("Intel Core I7");
    ssd = new Ssd("SSD")
    screen = new Screen("Samsung")
    webcam = new Webcam("HD1040")
    chair = new Chair("Gaming Chair")
    micro = new Micro("Blue YETI")
}
class Streamer {
    constructor() {
        this.name = "MrStreamer";
        
        // stats 
        this.maxStamina = 100; // nb hour of stream possible
        this.currentStamina = 100; // nb hour of stream possible

        this.maxHealth = 100;// the more health the more he regen stamina
        this.currentHealth = 100;// the more health the more he regen stamina
        
        //attribut
        this.active = false;
        this.languages = ["FR"];// FR => french,EN => english ,CN = chinese, KR => korean , DE => german, etc ? List somewhere ?
        this.games = [LeagueOfLegends] // list of the game the streamer can stream, unlocking by training, buying game
        this.gameSelected = null; // game currently param for streaming
        this.rest = false;
        this.upgradeAvailable = [] // tab for upgrade that can be purchase
        this.adsAvaiable = [] //tab for ads that can be purchase ads are basically upgrade

        this.partner = false; // gain the partner role => can have subs
        
        // stats channel
        this.subs = 0;
        this.subsMultiplicator = 1; // this multiplicator is multiply by the number of subs 
        this.follow = 140;
        this.fame = 11;// index for follow / subs increased , by default = 11 for random follow between 0 and 10
        this.fameCalc =  null;
        this.stream_hours = 0; // counter for total hours streamed
        this.play_time = 0; // playtime in second

        //
        this.money = 1000; // start with some money TBD

        this.setup = new Setup(); // setup of the streamer : config pc + webcam + chair + micro
    }

    addGame($game) {
        this.games.push($game);
    }
    resting(){
        let staminaRegen = (this.maxStamina / 2) / 10;
        this.currentStamina += staminaRegen;
        if(this.currentStamina >= this.maxStamina) {
            this.currentStamina = this.maxStamina;
            this.rest = false;
        }
    }
    streaming(){
        if(this.gameSelected == null) {
            this.fameCalc = this.fame;
        } else {
            this.fameCalc = this.fame + this.gameSelected.fameModificator;
        }
        
        let staminaLoose = (this.maxHealth / 2) / 10;
        this.currentStamina -= staminaLoose;
        if(this.currentStamina <= 0) { 
            // no more stamina, need to rest
            this.currentStamina = 0;
            this.rest = true;
        } else {
            this.generateSubs();
            this.generateFollow();
        }
        
        this.stream_hours += (0.5/10);
        
    }
    checkUpgrade() {
        // check avaiable upgrade
        var partnerUpgrade = new Upgrade("Twitch Partner",this.becomePartner,"upgrade_twitch_partner");
        if(this.follow >= 150 && !this.partner && !this.upgradeAvailable.some(upgrade => upgrade.id === 'upgrade_twitch_partner')) { // partner unlocked
            this.upgradeAvailable.push(partnerUpgrade);
        }
        if(this.partner && !this.upgradeAvailable.some(upgrade => upgrade.id === 'upgrade_twitch_multi')) {
            // if partner we need to display the twitch multiplicator upgrade
            // multi base = 1 , augment 0.1
            var twitchMultiUpgrade = new Upgrade("Twitch subs multiplicator",this.upgradeTwitchModificator,"upgrade_twitch_multi");
            var nbUpgrade = Math.floor((Math.abs(1 - this.subsMultiplicator))/0.1);
            if(nbUpgrade == 0) {
                twitchMultiUpgrade.cost = 1000;
                this.upgradeAvailable.push(twitchMultiUpgrade);
            } else {
                twitchMultiUpgrade.cost = (nbUpgrade+1) * 3000; // TODO : to be balance
                this.upgradeAvailable.push(twitchMultiUpgrade);
            }
        }
    }
    checkAds() {
        // troll raid shadow ?
        if(this.partner) {
            if(!this.adsAvaiable.some(upgrade => upgrade.id === 'upgrade_raid_shadow')) {
                var oneTimeSubs = Math.floor(this.subs/100); // minimum 100 subs
                if(oneTimeSubs < 100) {
                    oneTimeSubs = 100;
                }
                var fameBuff = Math.floor(Math.random() * this.fameCalc / 3);
                console.log("Fame buff : "+fameBuff);
                var moneyBuff = Math.floor(this.subs * this.fame);
                console.log("Money buff : "+moneyBuff)
                var raidShadow = new Upgrade("Raid Shadow Legends Ads","upgradeRaidShadowAds","upgrade_raid_shadow",0,0,0,0,oneTimeSubs,fameBuff,moneyBuff)

                toastr.success('See the ads panel for detail', 'A new ads is avaiable !!')
            }
        }
    }

    becomePartner() {
        toastr.success('You become a Twitch Partner ! Congratulation !!!', 'MileStones Achieve !!')
        game.streamer.partner = true;
        // remove the upgrade from available upgrade tab
        game.streamer.upgradeAvailable.splice(game.streamer.upgradeAvailable.findIndex(v => v.id === "upgrade_twitch_partner"),1);
    }

    upgradeTwitchModificator()
    {
        var upgrade = game.streamer.upgradeAvailable.filter(upgrade => upgrade.id === 'upgrade_twitch_multi')[0]
        if(game.streamer.money >= upgrade.cost) {
            game.streamer.money -= upgrade.cost;
            game.streamer.subsMultiplicator += 0.1; 
            
            game.streamer.upgradeAvailable.splice(game.streamer.upgradeAvailable.findIndex(v => v.id === "upgrade_twitch_multi"),1);
            toastr.success("You've upgrade your twitch multiplier successfully !!", 'MileStones Achieve !!')
        } else {
            toastr.error("You don't have enough money for this !!!", 'Error Money REQUIRED !!')
        }
    }

    generateSubs(){
        if(this.partner) {
            let nbSubs = Math.floor(Math.random() * this.fameCalc / 3); // like 1/3 follow are subs => so nb subs are divided by 3 
            var plusOrMinus = getPlusOrMinus();
            this.addSubs(Math.ceil((nbSubs * plusOrMinus)/10));
        }
    }
    generateFollow(){
        var tempFollow = this.follow;
        let nbFollow = Math.floor(Math.random() * this.fameCalc); // default between 0 and 10 follow
        var plusOrMinus = getPlusOrMinus();
        this.addFollow(Math.ceil((nbFollow * plusOrMinus)/10));
        
        if(tempFollow < 1000 && this.follow >= 1000) {
            // we reach the 1000 follow milestones => add fame
            this.fameCalc+= 1;
            toastr.success('You reach the 1000 follow milestones ! Congratulation !!', 'MileStones Achieve !!')
        }

    }    
    addFollow(nb){
        this.follow+= nb
        if(this.follow <= 0) {
            this.follow = 0;
        }
    }
    addSubs(nb) {
        this.subs += nb;
        if(this.subs <= 0) {
            this.subs = 0;
        }
    }
}
toastr.options = {
    positionClass: 'toast-bottom-center',
    closeButton: true
};
//gameTick;
var lastPaidTick = null;
var LastAds = null;
setInterval (function gameTick() {
    if(game.streamer.active) {
        if(game.streamer.rest) {
            // streamer resting => gain stamina
            game.streamer.resting()
            
        } else {
            // streamer stream => loose stamina
            game.streamer.streaming()
        }
        game.streamer.checkUpgrade()

        var time = new Date().getTime() / 1000;
        var lenghtBetweenAds = 24  // TODO : to be balance
        if(LastAds == null || (time - lenghtBetweenAds) >= LastAds) {
            // 10% chance to "gain" an ads // TODO : to be balance
            var max = 100;
            var randomAds = Math.floor(Math.random() * Math.floor(max))+1; // generate 1 ... 100 number
            if(randomAds >= 90) {
                game.streamer.checkAds()
            } else {
                console.log("'loose' ads");
            }
            LastAds = time;
        }
    }
    
    // we need to actually increase money every X by subs
    if(game.streamer.subs > 0){
        // payed all lenghtGamePaid second
        var lenghtGamePaid = 24 // TODO : to be balance
        var time = new Date().getTime() / 1000;
        if(lastPaidTick == null || (time - lenghtGamePaid) >= lastPaidTick) {
            game.streamer.money += Math.floor(game.streamer.subs * game.streamer.subsMultiplicator)
            lastPaidTick = time;
        }
    }

    // we need to loose follow / subs by inactive day

    game.streamer.play_time+=(1/10);
    
}, 100); // every 0.1 second

function getPlusOrMinus()
{
    var rand  = Math.random(); // between 0 and 1
    // fame influance on sub/follow
    var influanceCoef = game.streamer.fame / 100
    return (rand+influanceCoef < 0.5 ? -1 : 1);
}
function buyGame(_game)
{
    if(game.streamer.money >= _game.cost) {
        game.streamer.money -= _game.cost;
        game.streamer.addGame(_game);
        toastr.success('You can now stream '+_game.name+' ! Congratulation !!', 'Game '+_game.name+' bought !!')
    }
}



// ads pop in dashboard after buying community manager upgrade level X
class Ads{
    // ads the streamer accept
    moneyGiven = 100;
    game = "Raid Shadow";
    leaveChannelPercent = 2; // % of people who dislike and unfollow / unsubs
    nbHourReq = 2; // Nb hours req for the ads
}
