var app = app || {};

app.config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 300
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

app.game = new Phaser.Game(app.config);

function preload ()
{
    this.load.image('player', 'assets/images/characters/platformChar_idle.png');

    this.load.image('ground', 'assets/images/tiles/platformPack_tile001.png');
}

function create ()
{
    app.player = this.physics.add.sprite(64, 300, 'player');
    app.player.setCollideWorldBounds(true);
    app.player.body.setGravityY(300);

    app.platforms = this.physics.add.staticGroup();
    app.platforms.create(64, 536, 'ground');

    this.physics.add.collider(app.player, app.platforms);
}

function update ()
{
}