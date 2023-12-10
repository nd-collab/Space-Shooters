controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        . . f . . f 2 2 f f f . . . . . 
        . . f f f f f f f f f . . . . . 
        . f f f 2 f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Alex, 100, 0)
    music.play(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
})
info.onCountdownEnd(function () {
    if (info.score() == 10) {
        game.gameOver(true)
        game.setGameOverEffect(true, effects.smiles)
    } else {
        game.gameOver(false)
        music.play(music.createSong(hex`0078000408020604001c00100500640000041e000004000000000000000000000000000a0400040b001c00200006191e2225292c05001c000f0a006400f4010a00000400000000000000000000000000000000020b000c00100006191e2225292c06001c00010a006400f4016400000400000000000000000000000000000000020b000400080006191e2225292c07001c00020a006400f4016400000400000000000000000000000000000000030b001400180006191e2225292c08001c000e050046006603320000040a002d00000064001400013200020100020c0030003400071b1e202425292c09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8003b00200021000601040507080b240025000600030507090b2800290008020304050608090b2c002d000600010306080b3000310008000102040607090b`), music.PlaybackMode.InBackground)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    scene.cameraShake(4, 500)
})
let EnemySpawn = 0
let EnemyShip: Sprite = null
let ENEMYSPEED = 0
let projectile: Sprite = null
let Alex: Sprite = null
info.startCountdown(60)
effects.starField.startScreenEffect()
Alex = sprites.create(img`
    . . 5 . . . . . . . . . . . . . 
    . 5 4 5 . . . . . . . . . . . . 
    . 4 5 4 f f f f f . . . . . . . 
    . 5 4 5 f 2 2 f 2 f . . . . . . 
    . . 5 . f 2 2 f 2 2 f f f f . . 
    . . . . f 2 2 f 2 2 2 2 f 2 f . 
    . . . . f f f f f f f f f f 2 f 
    . . . . f f 6 f f f f f f f 6 f 
    . . . . f 6 6 f 6 6 6 6 f 6 f . 
    . . 5 . f 6 6 f 6 6 f f f f . . 
    . 5 4 5 f 6 6 f 6 f . . . . . . 
    . 4 5 4 f f f f f . . . . . . . 
    . 5 4 5 . . . . . . . . . . . . 
    . . 5 . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(Alex)
Alex.setStayInScreen(true)
info.setLife(5)
game.onUpdateInterval(5000, function () {
    ENEMYSPEED += 10
    ENEMYSPEED = Math.min(ENEMYSPEED, 200)
})
game.onUpdateInterval(2000, function () {
    EnemyShip = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . f f f f f f f f . . . . 
        . . . f f f f f f f f f f . . . 
        . . f 2 f f f f f f f f 2 f . . 
        . . . f f f f f f f f f f . . . 
        . . . . f 9 9 2 2 9 9 f . . . . 
        . . . . f f f f f f f f . . . . 
        `, SpriteKind.Enemy)
    EnemyShip.x = scene.screenWidth()
    EnemyShip.vx = 0 - ENEMYSPEED
    EnemyShip.y = randint(10, scene.screenHeight() - -10)
    ENEMYSPEED = 20
    EnemySpawn = 2000
})
