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

// LOAD STUFF/ SHOP
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
    