(function() {
    var app = new Vue({
        el: '#app',
        data: {
            username: '',
            message: 'Hello Vue!',
            correctAnswer: '',
            icons: []
        },
        created: function () {
            this.chooseIcons();
        },
        methods: {
            chooseIcons: function() {
                console.log("Choosing new icons");
                var _this = this;
                var iconUrl = "https://us-central1-swimming-in-elixir.cloudfunctions.net/getRandIcons";
                $.getJSON(iconUrl, function(icons) {
                    _this.icons = icons;
                    _this.correctAnswer = _this.icons[Math.floor(Math.random() * 3)];
                });
                // _this.icons = ["off", "oil", "ok",];
                // _this.correctAnswer = _this.icons[Math.floor(Math.random() * 3)];
            },
            logChoice: function(choice) {
                console.log("Chose ", choice);
            },
            userEntered: function() {
                console.log("User: ", this.username);
                console.log("Icons: ", this.icons);
                $("#nameEntryArea").hide();
                $("#gameArea").show();
            }
        }
    });
})();