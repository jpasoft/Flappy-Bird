ig.module('game.main').requires(
    // 'impact.debug.debug',
    'impact.game',
    'impact.font',
    'impact.background-map',
    'plugins.impact-splash-loader',
    'plugins.screen-fader',
    'plugins.impact-infinite',
    'plugins.joncom.font-sugar.font',
    'plugins.button',
    'game.entities.aibird',
    'game.entities.flag',
    'game.entities.button',
    'game.levels.lev1',
    'game.levels.lev2',
    'game.levels.lev3',
    'game.levels.lev4',
    'game.levels.lev5',
    'game.levels.lev6',
    'game.levels.lev7',
    'game.levels.lev8',
    'game.levels.lev9',
    'game.levels.lev10',
    'game.levels.lev11',
    'game.levels.Start'
).defines(function() {
    window.myGameMode = 0;
    var bestScore = 0;
    var changeOrient = 0;
    var igmOrient = new ig.Image('media/plsrotate.png');
    var userLang = navigator.language || navigator.userLanguage;
    var gameLangs = ['en'];
    var iFound = 0;
    for (var i = 0; i < gameLangs.length; i++) {
        if (userLang == gameLangs[i]) {
            iFound = 1;
            break;
        }
    }
    if (iFound == 0) {
        userLang = 'en';
    }
    var gameScreenResized = function() {
        var scale = {
            x: 1,
            y: 1
        };
        scale.x = (window.innerWidth) / canvas.width;
        scale.y = (window.innerHeight) / canvas.height;
        curScale = (window.innerHeight) / canvas.height;
        if (scale.x < 1 || scale.y < 1) {
            scale = '1, 1';
            curScale = 1;
        } else if (scale.x < scale.y) {
            scale = scale.x + ', ' + scale.x;
        } else {
            scale = scale.y + ', ' + scale.y;
        }
        canvas.setAttribute('style', 'transform: scale(' + scale + '); -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1); -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); ');
    };
    var gameOrientationFunction = function() {
        var orientation = window.orientation;
        switch (orientation) {
            case 0:
                changeOrient = 1;
                break;
            case 90:
                changeOrient = 0;
                break;
            case -90:
                changeOrient = 0;
                break;
        }
    };
    window.addEventListener('orientationchange', gameOrientationFunction);
    window.addEventListener('resize', gameScreenResized);
    var medalLogo = new ig.Image('media/medals.png');
    var font = new ig.Font('media/04b03.font.png', {
        borderColor: '#000',
        borderSize: 2
    });
    var sysfont = new ig.Font('media/sm_font.png', {
        borderColor: '#FFF',
        borderSize: 1
    });
    var gameBG = new ig.Image('media/bg480_320.png');


    var grayOverlay = new ig.Image('media/gray_stripe.png');
    var buttonStart = null;
    var buttonMenu = null;
    var firstPlay = true;


    var addButtonMenu = function() {
        buttonMenu = ig.game.spawnEntity(Button, 280, 80, {
            size: {
                x: 60,
                y: 40
            },
            animSheet: new ig.AnimationSheet('media/button_menu.png', 60, 40),
            pressedDown: function() {},
            pressed: function() {},
            pressedUp: function() {
                myGameMode = 0;
                firstPlay = true;
                ig.system.setGame(Intro);
            }
        });
    };
    MyGame = ig.Game.extend({
        clearColor: null,
        gameOverPanel: new ig.Image('media/titles/' + userLang + '/gameOver.png'),
        tutorTitle: new ig.Image('media/titles/' + userLang + '/tutor_title.png'),
        newBestTitle: new ig.Image('media/titles/' + userLang + '/new_best.png'),
        gravity: 900,
        score: 0,
        gameOver: 0,
        activated: 0,
        distance: 0,
        startTimer: null,
        showTutor: true,
        onetime: true,
        medalNumber: 0,
        isSlidePanel: true,
        startCountAnim: false,
        panelY: 490,
        framePause: 0,
        startScore: 0,
        scoreShowEnd: false,
        nextBirdTimer: null,
        bestScore: 0,
        bestDistance: 0,
        bestScoreLocal: 0,
        serverNumber: 0,
        playersOnline: 0,
        quantityUsers: 0,
        currentLeader: null,
        curScale: 0,
        init: function() {
            ig.input.initMouse();
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            ig.input.bind(ig.KEY.UP_ARROW, 'click');
            ig.input.bind(ig.KEY.SPACE, 'click');
            if (myGameMode == 1) {
                this.activated = 0;
                buttonStart = null;
                if (firstPlay == true) this.infiniteLevel = new ig.InfiniteLevel([LevelLev1, LevelLev2, LevelLev3, LevelLev4, LevelLev5, LevelLev6, LevelLev7, LevelLev8, LevelLev9, LevelLev10, LevelLev11], LevelStart);
                firstPlay = false;
                this.startTimer = new ig.Timer(1.5);
                if (this.showTutor == true) {}
                this.bestScoreLocal = localStorage.getItem('score');
                ig.game.spawnEntity(EntityFlag, -300, 385);
            }
            this.serverNumber = Math.floor(Math.random() * (99 - 1 + 1) + 1);
            this.bestScore = Math.floor(Math.random() * (40 - 1 + 1) + 1);
            this.bestDistance = 600 + (this.bestScore * 250);
            this.quantityUsers = Math.floor(Math.random() * (40 - 10 + 1) + 10);
        },
        reloadLevel: function() {
            this.loadLevelDeferred(this.currentLevel);
        },
        addScore: function(stepScore) {
            ig.game.score += stepScore;
        },
        askBrain: function(curEntity, reaction) {
            var rnd = Math.floor(Math.random() * (100 - 0 + 1)) + reaction;
            if (rnd < 5) {
                return true;
            } else return false;
        },
        askBrainDigit: function() {
            var rnd = Math.floor(Math.random() * (10000 - 0 + 1) + 1);
            return rnd;
        },
        addAI: function() {
            ig.game.spawnEntity(EntityAibird, Math.floor(Math.random() * (600 + (this.bestScore * 250) - 1 + 1) + 1), Math.floor(Math.random() * (230 - 1 + 1) + 1));
        },
        checkPlayers: function() {
            if (this.score > this.bestScore) {
                var player = this.getEntitiesByType(EntityBird)[0];
                this.currentLeader = player;
                this.bestScore = this.score;
            }
            if (this.bestDistance <= ig.game.distance) this.bestDistance = ig.game.distance;
            var player = this.getEntitiesByType(EntityAibird);
            for (var i = 0; i < player.length; i++) {
                if (this.bestScore < player[i].score) {
                    this.currentLeader = player[i];
                    this.bestScore = Math.floor(player[i].score);
                }
                if (this.bestDistance < player[i].bestDistance) {
                    this.bestDistance = Math.floor(player[i].bestDistance);
                }
            }
            var liderFlag = this.getEntitiesByType(EntityFlag)[0];
            liderFlag.pos.x = this.bestDistance;
            this.playersOnline = player.length + 1;
            var someSolution = this.askBrainDigit();
            if (someSolution == 75) {
                console.log('User connected');
                this.quantityUsers++;
            }
            if (someSolution == 737) {
                if (player.length > 1) {
                    try {
                        var someOne = Math.floor(Math.random() * (player.length - 0 + 1)) + 1;
                        this.quantityUsers--;
                        console.log('User' + player[someOne].id + 'disconnected');
                        player[someOne].kill();
                    } catch (e) {}
                }
            }
        },
        leaderController: function() {
            try {
                var player = this.getEntitiesByType(EntityAIBird);
                if (this.currentLeader == null && player.length > 0) {
                    var somePlayer = Math.floor(Math.random() * (player.length - 1) + 1);
                    this.currentLeader = player[somePlayer];
                    player[somePlayer].leader = 1;
                }
                var player = this.getEntitiesByType(EntityBird)[0];
                var playerAI = this.getEntitiesByType(EntityAIBird);
                if (this.currentLeader == player) {
                    player.leader = 1;
                } else {
                    player.leader = null;
                }
                for (var i = 0; i < playerAI.length; i++) {
                    if (this.currentLeader == playerAI[i]) {
                        playerAI[i].leader = 1;
                    } else {
                        playerAI[i].leader = null;
                    }
                }
            } catch (e) {}
        },
        update: function() {
            if (this.score >= this.bestScoreLocal) {
                localStorage.setItem("score", this.bestScoreLocal);
            }
            this.curScale = curScale;
            if (this.quantityUsers > this.playersOnline) {
                this.addAI();
            }
            this.leaderController();
            if (changeOrient == 0) {
                this.checkPlayers();
                ig.game.sortEntitiesDeferred();
                if (ig.input.pressed('click')) {
                    this.showTutor = false;
                    this.onetime = true;
                }
                if (this.startTimer != null && this.startTimer.delta() >= 0) {
                    this.showTutor = false;
                }
                this.parent();
                this.infiniteLevel.update();
                var player = this.getEntitiesByType(EntityBird)[0];
                if (player) {
                    this.screen.x += ((player.pos.x - ig.system.width / 20) - this.screen.x) / 10;
                }
                if (bestScore <= this.score) {
                    bestScore = this.score;
                }
                if (this.score >= this.bestScoreLocal) {
                    this.bestScoreLocal = this.score;
                }
                if (buttonMenu == null) {
                    addButtonMenu();
                }
                buttonMenu.pos.x = 260 + ig.game.screen.x;
                buttonMenu.update();
            }
        },
        pad: function(number, length) {
            var str = '' + number;
            while (str.length < length) {
                str = '0' + str;
            }
            return str;
        },
        draw: function() {
            if (changeOrient == 1) {
                igmOrient.draw(0, 0);
            } else {
                gameBG.draw(0, 0);
                this.parent();
                grayOverlay.draw(0, 450);
                font.draw(this.pad(ig.game.score, 3), 130, 15, ig.Font.ALIGN.LEFT);

                sysfont.draw("Server #" + this.serverNumber, 10, 5, ig.Font.ALIGN.LEFT);
                sysfont.draw('Players ' + this.playersOnline, 10, 25, ig.Font.ALIGN.LEFT);

                sysfont.draw("Best: " + this.bestScore, 215, 5, ig.Font.ALIGN.LEFT);
                sysfont.draw("Your: " + this.bestScoreLocal, 215, 25, ig.Font.ALIGN.LEFT);

                if (this.gameOver == 0) {
                    if (this.showTutor == true) {
                        this.tutorTitle.draw(0, 150);
                    }
                } else {
                    if (this.onetime == true) {
                        this.onetime = false;
                    }
                }
                if (buttonMenu != null) {
                    buttonMenu.draw();
                }
            }
        },
        run: function() {
            if (myGameMode > 0) {
                this.update();
                this.draw();
            } else {
                ig.system.setGame(Intro);
            }
        }
    });
    Intro = ig.Game.extend({
        clearColor: null,
        font: new ig.Font('media/04b03.font.png'),
        title: new ig.Image('media/titles/' + userLang + '/title_name.png'),
        tapToPlay: new ig.Image('media/titles/' + userLang + '/tap_to_play.png'),
        curTitle: 1,
        maxTitle: 1,
        activated: 0,
        verticalLevitation: 70,
        levitationStep: 0,
        goUp: true,
        infiniteLevel: null,
        showTapToPlay: true,
        frameCount: 0,
        curScale: 0,
        init: function() {
            ig.input.initMouse();
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            ig.input.bind(ig.KEY.UP_ARROW, 'click');
            ig.input.bind(ig.KEY.SPACE, 'click');
            gameScreenResized();

            this.ButtonStart = this.spawnEntity(EntityButtonStart, (window.innerWidth - 120) / 2, 200);
        },
        update: function() {
            this.curScale = curScale;
            this.parent();
            // addButtonStart();

            // buttonStart.update();

            if (this.goUp == false) {
                this.verticalLevitation += (90 - this.verticalLevitation) / 15;
            } else {
                this.verticalLevitation += (70 - this.verticalLevitation) / 15;
            }
            if (this.verticalLevitation < 71) {
                this.goUp = false;
            } else if (this.verticalLevitation > 89) {
                this.goUp = true;
            }
        },
        draw: function() {
            this.parent();
            if (changeOrient == 1) {
                igmOrient.draw(0, 0);
            } else {
                gameBG.draw(0, 0);
                this.title.draw(0, this.verticalLevitation);
                // buttonStart.draw();
                this.ButtonStart.draw();
            }
        },
        run: function() {
            if (myGameMode < 1) {
                this.update();
                this.draw();
            } else {
                ig.system.setGame(MyGame);
            }
        }
    });
    if (ig.ua.iPad || ig.ua.iPhone4) {
        ig.Sound.enabled = false;
        if (window.orientation == 90 || window.orientation == -90) changeOrient = 1;
        ig.main('#canvas', MyGame, 60, 320, 480, 1, ig.loader);
    } else if (ig.ua.mobile) {
        ig.Sound.enabled = false;
        var width = window.innerWidth / 2;
        var height = window.innerHeight / 2;
        if (window.orientation == 90 || window.orientation == -90) changeOrient = 1;
        ig.main('#canvas', MyGame, 60, 320, 480, 1, ig.loader);
    } else {
        ig.main('#canvas', MyGame, 60, 320, 480, 1, ig.loader);
    }
});