class Setup {
    keyboard
    mouse
    graphicCard
    cpu
    ssd
    screen
    webcam
    chair
    micro
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
        this.languages = ["FR"];// FR => french,EN => english ,CN = chinese, KR => korean , DE => german, etc ? List somewhere ?
        this.games = ["Path of Exile"] // list of the game the streamer can stream, unlocking by training, buying game
        this.rest = false;
        this.partner = false; // gain the partner role => can have subs
        
        // stats channel
        this.subs = 0;
        this.follow = 0;
        this.fame = 11;// index for follow / subs increased , by default = 11 for random follow between 0 and 10
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
        let staminaRegen = this.maxStamina / 2;
        this.currentStamina += staminaRegen;
        if(this.currentStamina >= this.maxStamina) {
            this.currentStamina = this.maxStamina;
            this.rest = false;
        }
    }
    streaming(){
        let staminaLoose = this.maxHealth / 2 
        // loose stamina by tick = 1 game tick = 30 min
        // 1 stream = 1h
        // 1 stream = 2 game tick; 
        // 100 stamina = 2 game tick
        // 50 stamina = 1 game tick
        
        this.currentStamina -= staminaLoose;
        if(this.currentStamina <= 0) { 
            // no more stamina, need to rest
            this.currentStamina = 0;
            this.rest = true;
        } else {
            this.generateSubs();
            this.generateFollow();
        }
    }
    generateSubs(){
        if(this.partner) {
            let nbSubs = Math.floor(Math.random() * this.fame / 3); // like 1/3 follow are subs => so nb subs are divided by 3 
            this.subs+= nbSubs;
        }
    }
    generateFollow(){
        let nbFollow = Math.floor(Math.random() * this.fame); // default between 0 and 10 follow
        this.follow+= nbFollow;
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
