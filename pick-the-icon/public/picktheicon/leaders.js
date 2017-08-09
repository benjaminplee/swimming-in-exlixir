(function() {
    var isLocal = false;

    var app = new Vue({
        el: '#leaderboard',
        data: {
            scores: []
        },
        created: function() {
            console.log("Created");

            this.refreshScores();
        },
        methods: {
            refreshScores: function() {
                var _this = this;
                var scoresUrl = "/getScores";
                
                if (!isLocal) {
                    $.getJSON(scoresUrl, function(scores) {
                        console.log(scores);
                        _this.scores = scores;
                    });
                }
                else {
                    this.scores = [
                        { username: 'Test 2', score: 2 },
                        { username: 'Test', score: 1 }
                    ];
                }
            }
        }
    });
})();