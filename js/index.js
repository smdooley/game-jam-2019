var app = app || {};

window.onload = function() {
    app.config = {
        type: Phaser.CANVAS,
        width: 640,
        height: 320,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: {
                    y: 300
                }
            }
        },
        scene: Game
    };

    app.game = new Phaser.Game(app.config);

    window.focus();
}

class Game extends Phaser.Scene{
    constructor(){
        super('Game');
    }

    preload ()
    {
        this.load.image('player', 'assets/images/characters/platformChar_idle.png');

        this.load.image('ground', 'assets/images/tiles/platformPack_tile001.png');
        this.load.image('board', 'assets/images/tiles/platformPack_tile066.png');
        this.load.image('boardwalk', 'assets/images/tiles/platformPack_tile038.png');
    }

    create ()
    {
        app.platforms = this.physics.add.staticGroup();
        app.platforms.create(32 * 1, app.config.height - 32, 'ground');
        app.platforms.create(32 * 3, app.config.height - 32, 'ground');

        app.boardwalks = this.physics.add.staticGroup();
        app.boardwalks.create(32 * 5.5, app.config.height - 32, 'boardwalk');
        app.boardwalks.create(32 * 7.5, app.config.height - 32, 'boardwalk');

        app.board = this.physics.add.sprite(0, 100, 'board');
        app.board.setOrigin(0.5);
        app.board.setCollideWorldBounds(true);
        app.board.body.setGravityY(300);

        // app.player = this.physics.add.sprite(64, 50, 'player');
        // app.player.setCollideWorldBounds(true);
        // app.player.body.setGravityY(300);

        // this.physics.add.collider(app.player, app.board);
        // this.physics.add.collider(app.player, app.platforms);
        this.physics.add.collider(app.board, app.platforms);
        this.physics.add.collider(app.board, app.boardwalks);

        this.input.on('pointerdown', this.launch, this);
    }

    update ()
    {
    }

    launch() {
        app.board.body.setVelocity(250,0);
    }
}
