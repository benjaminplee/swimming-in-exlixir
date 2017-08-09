(function() {
    var isLocal = false;

    var app = new Vue({
        el: '#app',
        data: {
            username: '',
            message: 'Hello Vue!',
            correctAnswer: '',
            icons: [],
            cumulativeScore: 0
        },
        created: function () {
            this.chooseIcons();
        },
        methods: {
            chooseIcons: function() {
                console.log("Choosing new icons");
                var _this = this;
                if (isLocal) {
                    _this.icons = ["off", "oil", "ok",];
                    _this.correctAnswer = _this.icons[Math.floor(Math.random() * 3)];
                } else {
                    var iconUrl = "/getRandIcons";

                    $.getJSON(iconUrl, function(icons) {
                        _this.icons = icons;
                        _this.correctAnswer = _this.icons[Math.floor(Math.random() * 3)];
                    });
                }
            },
            logChoice: function(choice) {
                console.log("Chose ", choice);

                if (this.correctAnswer === choice) {
                    console.log("You chose correctly!");
                    this.cumulativeScore++;
                    this.chooseIcons();
                }
                else {
                    console.log("You chose poorly!");
                    this.postFinalScore();
                }
            },
            postFinalScore: function() {
                var iconUrl = "/saveScore";
                iconUrl += "?username=" + this.username;
                iconUrl += "&score=" + this.cumulativeScore;

                if (!isLocal) {
                    $.post(iconUrl).done(function() {
                        $("#questionArea").hide();
                        $("#gameOver").show();
                    });
                } else {
                    $("#questionArea").hide();
                    $("#gameOver").show();
                }
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