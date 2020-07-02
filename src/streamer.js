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
var games = []

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

class Upgrade {
    name
    id
    cost
    staminaBuff
    healthBuff
    oneTimeFollow
    oneTimeSubs
    fameBuff
    moneyBuff
    lore
    messageSuccess
    subsMultiplicator
    ratioAds
    img
    constructor(_name,_id,_cost,_staminaBuff,_healthBuff,_oneTimeFollow,_oneTimeSubs,_fameBuff,_moneyBuff,_lore,_messageSuccess,_subsMultiplicator,_ratioAds,_img) {
        this.name = _name
        this.id = _id
        this.cost = _cost
        this.staminaBuff = _staminaBuff
        this.healthBuff = _healthBuff
        this.oneTimeFollow = _oneTimeFollow
        this.oneTimeSubs = _oneTimeSubs
        this.fameBuff = _fameBuff
        this.moneyBuff = _moneyBuff
        this.lore = _lore;
        this.messageSuccess = _messageSuccess
        this.subsMultiplicator = _subsMultiplicator
        this.ratioAds = _ratioAds
        this.img = _img
    }
    buy() {
        if(game.streamer.money >= this.cost) {
            game.streamer.money -= this.cost;
            if(this.fameBuff != undefined && this.fameBuff != 0) {
                game.streamer.fame = this.fameBuff
            }
            if(this.moneyBuff != undefined && this.moneyBuff != 0) {
                game.streamer.money = this.moneyBuff;
            }
            if(this.staminaBuff != undefined && this.staminaBuff != 0) {
                game.streamer.maxStamina += this.staminaBuff;
            }
            if(this.healthBuff != undefined && this.healthBuff != 0) {
                game.streamer.maxHealth += this.healthBuff;
            }
            if(this.oneTimeFollow != undefined && this.oneTimeFollow != 0) {
                game.streamer.follow += this.oneTimeFollow;
            }
            if(this.oneTimeSubs != undefined && this.oneTimeSubs != 0) {
                game.streamer.subs += this.oneTimeSubs
            }
            if(this.subsMultiplicator != undefined && this.subsMultiplicator != 0) {
                game.streamer.subsMultiplicator += this.subsMultiplicator
            }
            if(this.ratioAds != undefined && this.ratioAds != 0) {
                game.streamer.ratioAds += this.ratioAds
            }
            toastr.success(this.messageSuccess, 'Upgrade Unlocked !!')

            if(this.id == "upgrade_twitch_partner") {
                game.streamer.partner = true;
            }
            if(this.id == "upgrade_designer") {
                game.streamer.designer = true;
            }
            
            // remove the upgrade from available upgrade tab
            game.streamer.upgradeAvailable.splice(game.streamer.upgradeAvailable.findIndex(v => v.id === this.id),1);
        } else {
            toastr.error("You don't have enough money for this !!!", 'Error Money REQUIRED !!')
        }
    }
}
// ads  : after buying community manager (upgrade level X) add X chance for an ads to pop // must be partner
class Ads {
    name
    id
    staminaBuff
    healthBuff
    oneTimeFollow
    oneTimeSubs
    fameBuff
    moneyBuff
    lore
    constructor(_name,_id,_staminaBuff,_healthBuff,_oneTimeFollow,_oneTimeSubs,_fameBuff,_moneyBuff,_lore) {
        this.name = _name
        this.id = _id
        this.staminaBuff = _staminaBuff
        this.healthBuff = _healthBuff
        this.oneTimeFollow = _oneTimeFollow
        this.oneTimeSubs = _oneTimeSubs
        this.fameBuff = _fameBuff
        this.moneyBuff = _moneyBuff
        this.lore = _lore
    }
    accept() {
        if(this.fameBuff != undefined && this.fameBuff != 0) {
            game.streamer.fame += this.fameBuff;
        }
        if(this.moneyBuff != undefined && this.moneyBuff != 0) {
            game.streamer.money += this.moneyBuff;
        }
        if(this.staminaBuff != undefined && this.staminaBuff != 0) {
            game.streamer.maxStamina += this.staminaBuff;
        }
        if(this.healthBuff != undefined && this.healthBuff != 0) {
            game.streamer.maxHealth += this.healthBuff;
        }
        if(this.oneTimeFollow != undefined && this.oneTimeFollow != 0) {
            game.streamer.follow += this.oneTimeFollow;
        }
        if(this.oneTimeSubs != undefined && this.oneTimeSubs != 0) {
            game.streamer.subs += this.oneTimeSubs;
        }
        toastr.success("Congratulation you have accept "+this.name+" ads", 'Ads accepted !!')
        game.streamer.adsAvaiable.splice(game.streamer.adsAvaiable.findIndex(v => v.id === this.id),1);
    }

    refuse() {
        game.streamer.adsAvaiable.splice(game.streamer.adsAvaiable.findIndex(v => v.id === this.id),1);        
    }
}

class Stuff {
    buff
    name
    img
    price

    constructor(_name) {
        this.name = _name;
        if(_name == null) this.name = this.constructor.name
    }
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
    // Razer DeathAdder V2. The best gaming mouse. ...
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
        this.games = [] // list of the game the streamer can stream, unlocking by training, buying game
        this.gameSelected = null; // game currently param for streaming
        this.rest = false;
        this.upgradeAvailable = [] // tab for upgrade that can be purchase
        this.adsAvaiable = [] //tab for ads that can be purchase ads are basically upgrade
        this.ratioAds = 90; // 90 = 10% chance to proc an ads
        this.designer = false;
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
    hydrate() {
        if(this.upgradeAvailable.length > 0) {
            for(var i = 0; i< this.upgradeAvailable.length;i++) {
                if (this.upgradeAvailable[i].constructor.name == "Object"){
                    // need to be hydrate
                    var myUpgrade = new Upgrade();
                    Object.assign(myUpgrade,this.upgradeAvailable[i]);
                    this.upgradeAvailable[i] = myUpgrade;
                }
            }
        }
        if(this.adsAvaiable.length > 0) {
            for(var i = 0; i< this.adsAvaiable.length;i++) {
                if (this.adsAvaiable[i].constructor.name == "Object"){
                    // need to be hydrate
                    var myAds = new Ads();
                    Object.assign(myAds,this.adsAvaiable[i]);
                    this.adsAvaiable[i] = myAds;
                }
            }
        }
    }
    addGame($game) {
        this.games.push($game);
    }
    addAds($ads) {
        this.adsAvaiable.push($ads);
    }
    addFame(fame) {
        this.fame += fame;
    }
    removeAds(index) {
        this.adsAvaiable.slice(index,1);
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
        // PARTNER UPGRADE
        var partnerUpgrade = new Upgrade("Twitch Partner","upgrade_twitch_partner",null,null,null,null,null,null,null,"Do you want to be in the twitch family ?","Welcome to the twitch family !");
        if(this.follow >= 150 && !this.partner && !this.upgradeAvailable.some(upgrade => upgrade.id === 'upgrade_twitch_partner')) { // partner unlocked
            this.upgradeAvailable.push(partnerUpgrade);
        }

        // TWITCH MULTIPLIER
        if(this.partner && !this.upgradeAvailable.some(upgrade => upgrade.id === 'upgrade_twitch_multi')) {
            // if partner we need to display the twitch multiplicator upgrade
            // multi base = 1 , augment 0.1
            var twitchMultiUpgrade = new Upgrade("Twitch subs multiplicator","upgrade_twitch_multi",null,null,null,null,null,null,null,"The CM of Twitch likes you <img src='img/lul.png'>","More money for you !",0.1);
            twitchMultiUpgrade.img = "img/happy.png"
            var nbUpgrade = Math.floor((Math.abs(1 - this.subsMultiplicator))/0.1);
            if(nbUpgrade == 0) {
                twitchMultiUpgrade.cost = 1000;
                this.upgradeAvailable.push(twitchMultiUpgrade);
            } else {
                twitchMultiUpgrade.cost = (nbUpgrade+1) * 3000; // TODO : to be balance
                var more = "more";
                for(var i = 0;i< nbUpgrade;i++) {
                    more += ", and more"
                }
                twitchMultiUpgrade.lore = "The Twitch CM likes you "+more+"<img src='img/lul.png'>"
                this.upgradeAvailable.push(twitchMultiUpgrade);
            }
        }

        // COMMUNITY MANAGER
        if(this.follow >= 200 && this.subs >= 50 && !this.upgradeAvailable.some(upgrade => upgrade.id === 'upgrade_cm')) {
            var cmUpgrade = new Upgrade("Hire community manager","upgrade_cm")
            cmUpgrade.img = "img/i_want_you.jpg";
            if(this.ratioAds == 90) {// base value
                cmUpgrade.cost = 1000
                cmUpgrade.ratioAds = -1;
                cmUpgrade.lore = "Hire a community manager for upgrade your chance to receive an offer of ads"
            } else {
                var nbUpgrade = (90 - this.ratioAds);
                cmUpgrade.cost = 6000 * nbUpgrade;
                cmUpgrade.ratioAds = -1;
                cmUpgrade.name = "Upgrade your CM"
                cmUpgrade.lore = "Upgrade community manager for augment your chance to receive an offer of ads"
            }
            
            this.upgradeAvailable.push(cmUpgrade);
        }

        // DESIGNER
        if(!this.upgradeAvailable.some(upgrade => upgrade.id === 'upgrade_designer') && this.designer == false) {
            var designerUpgrade = new Upgrade("Hire designer","upgrade_designer")
            designerUpgrade.img = "img/i_want_you.jpg";
            designerUpgrade.cost = 4000; // TODO : to be balance
            designerUpgrade.fameBuff = 4; // TODO : to be balance
            designerUpgrade.lore = "Want some fancy icon, overlay, and be the more pimp twitcher ?"
            
            this.upgradeAvailable.push(designerUpgrade);
        }

    }
    checkAds() {
        // troll raid shadow ?
        if(this.partner) {
            if(!this.adsAvaiable.some(upgrade => upgrade.id === 'upgrade_raid_shadow')) { // one raid shadow ads at one time
                var oneTimeSubs = Math.floor(this.subs/100); // minimum 100 subs
                if(oneTimeSubs < 100) {
                    oneTimeSubs = 100;
                }
                var fameBuff = Math.floor(Math.random() * this.fameCalc / 3);
                // we don't want 0 debuff for raid shadow
                if(fameBuff == 0) {
                    fameBuff = 1;
                }
                var moneyBuff = Math.floor(this.subs * this.fame);
                var raidShadow = new Ads("Raid Shadow Legends","upgrade_raid_shadow",0,0,0,oneTimeSubs,-fameBuff,moneyBuff,"Want some money for ya ?")
                this.adsAvaiable.push(raidShadow);
                toastr.success('See the ads panel for detail', 'A new ads is avaiable !!')
            }
        }
    }

    checkEvent() {
        var random = Math.random() * 100;
        console.log("random event : "+random);
        if(random > 50) {
            // 50%
            var event = new Event();
            event.type ="raid";
            event.execute();
        }
        // % of event proc ?
        // check for EVENT ? random event can pop :
        // bad or good
        // Internet box burn... Impossible to stream for x days sad.png
        // Keyboard broke, to mutch salty ? sad.png
        // Mouse broke, to mutch salty ? sad.png
        // You have been raid by *Insert random twitch streamer* , you've gain X follow,subs
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
            toastr.success('You reach the 1000 follow milestones ! Congratulation !!', '<img src="img/pog.png" /> MileStones Achieve !!')
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
    //positionClass: 'toast-bottom-center',
    positionClass :'toast-bottom-full-width',
    closeButton: true,
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

        // ads check
        if(game.streamer.partner) {
            var time = new Date().getTime() / 1000;
            var lenghtBetweenAds = 24  // TODO : to be balance
            if(LastAds == null || (time - lenghtBetweenAds) >= LastAds) {
                // 10% chance to "gain" an ads // TODO : to be balance
                var max = 100;
                var randomAds = Math.floor(Math.random() * Math.floor(max))+1; // generate 1 ... 100 number
                if(randomAds >= game.streamer.ratioAds) {
                    game.streamer.checkAds()
                } else {
                    console.log("'loose' ads");
                }
                LastAds = time;
                game.streamer.checkEvent()
            }
        }
        // check for EVENT ? random event can pop :
        // bad or good
        // Internet box burn... Impossible to stream for x days sad.png
        // Keyboard broke, to mutch salty ? sad.png
        // Mouse broke, to mutch salty ? sad.png
        // You have been raid by *Insert random twitch streamer* , you've gain X follow,subs
        

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


    // we need to loose follow / subs by inactive day ?

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
$.getJSON("data/mouse.json", function(json) {
    mouses = []; 
    
    for(var i = 0 ; i< json.length;i++) {
        var myMouse = new Mouse(json[i].name);
        myMouse.img = json[i].src;
        myMouse.price = json[i].price;
        mouses.push(myMouse);        
    }
});
$.getJSON("data/keyboard.json", function(json) {
    keyboards = []; 
    
    for(var i = 0 ; i< json.length;i++) {
        var myKb = new Keyboard(json[i].name);
        myKb.img = json[i].src;
        myKb.price = json[i].price;
        keyboards.push(myKb);        
    }
});
$.getJSON("data/graphic_card.json", function(json) {
    graphicCards = []; 
    
    for(var i = 0 ; i< json.length;i++) {
        var myKb = new GraphicCard(json[i].name);
        myKb.img = json[i].src;
        myKb.price = json[i].price;
        graphicCards.push(myKb);        
    }
});
$.getJSON("data/cpu.json", function(json) {
    cpus = []; 
    
    for(var i = 0 ; i< json.length;i++) {
        var myKb = new Cpu(json[i].name);
        myKb.img = json[i].src;
        myKb.price = json[i].price;
        cpus.push(myKb);        
    }
});
