class TwitchApi {
    oauthToken = null;
    urlOauth = "https://id.twitch.tv/oauth2/token";
    urlGameList = "https://api.twitch.tv/helix/games/top";
    getOauthToken() {
        var self = this;
        $.ajax({
            method: "POST",
            url: this.urlOauth,
            data: { client_id: config.TWITCH_ID, client_secret: config.TWITCH_SECRET,grant_type: "client_credentials" },
            success: function(data) {
                console.log(data);
                self.oauthToken = data.access_token;
                self.getGameList();
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        })
    }
    getGameList() {
        $.ajax({
            method: "GET",
            url: this.urlGameList,
            headers: {
                "Authorization":"Bearer "+this.oauthToken,
                "Client-ID":config.TWITCH_ID
            },
            success: function(response){
                for(var i = 0;i < response.data.length;i++) {
                    var gameName = response.data[i].name;
                    var gameImg = response.data[i].box_art_url;
                    gameImg = gameImg.replace("{width}","100").replace("{height}","140")
                    games.push(new Game(gameName,(20-i),"",gameImg));
                }
            }
        })
    }
}
Api = new TwitchApi();
Api.getOauthToken();