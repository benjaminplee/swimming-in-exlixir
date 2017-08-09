(function() {
    var isLocal = false;

    var app = new Vue({
        el: '#leaderboard',
        data: {
            scores: [],
            loading: false
        },
        created: function() {
            console.log("Created");

            this.refreshScores();
        },
        methods: {
            refreshScores: function() {
                var _this = this;
                var scoresUrl = "/getScores";
                _this.loading = true;

                if (!isLocal) {
                    $.getJSON(scoresUrl, function(scores) {
                        console.log(scores);
                        _this.scores = scores;
                        _this.loading = false;
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