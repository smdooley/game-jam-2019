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
                    y: 200
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
    }

    create ()
    {
        // Create platform
        app.platforms = this.physics.add.staticGroup();

        app.platforms.create(32 * 1, app.config.height - 32, 'ground');
        app.platforms.create(32 * 3, app.config.height - 32, 'ground');
        app.platforms.create(32 * 5, app.config.height - 32, 'ground');

        // Create board
        app.boards = this.physics.add.group({
            angularDrag: 5,
            angularVelocity: 0,
            bounceX: 0,
            bounceY: 0,
            collideWorldBounds: true,
            dragX: 60,
            dragY: 60
        });

        app.board = app.boards.create(0, 100, 'board');
        
        // Add collision
        this.physics.add.collider(app.board, app.platforms);
        
        // Attach listeners
        this.input.on('pointerup', this.launch, this);
    }

    update ()
    {
    }

    launch() {
        var pointer = this.input.activePointer;

        app.board.body.setVelocity(pointer.getDuration(), 0);
    }
}
