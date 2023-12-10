def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
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
        """),
        Alex,
        100,
        0)
    music.play(music.create_sound_effect(WaveShape.SQUARE,
            1600,
            1,
            255,
            0,
            300,
            SoundExpressionEffect.NONE,
            InterpolationCurve.CURVE),
        music.PlaybackMode.UNTIL_DONE)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_countdown_end():
    if info.score() == 10:
        game.game_over(True)
        game.set_game_over_effect(True, effects.smiles)
    else:
        game.game_over(False)
info.on_countdown_end(on_countdown_end)

def on_on_overlap(sprite, otherSprite):
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    info.change_life_by(-1)
    sprites.destroy(otherSprite2, effects.disintegrate, 500)
    scene.camera_shake(4, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

EnemyShip: Sprite = None
projectile: Sprite = None
Alex: Sprite = None
info.start_countdown(60)
effects.star_field.start_screen_effect()
Alex = sprites.create(img("""
        . . . . . . . . . . . . . . . . 
            . . . . . 8 . . . . . . . . . . 
            . . . . 8 . 8 . . . . . . . . . 
            . . . 8 . . . 8 . . . . . 8 8 8 
            . . 8 . . . . . 8 . . . . 8 8 8 
            . 8 . . . . . . . 8 8 8 8 8 8 8 
            8 . . . . . . . . . . . 8 . . . 
            8 8 8 8 8 8 8 8 8 8 8 8 8 . . . 
            8 . . . . . . . . . . . 8 . . . 
            . 8 . . . . . . . 8 8 8 8 8 8 8 
            . . 8 . . . . . 8 . . . . 8 8 8 
            . . . 8 . . . 8 . . . . . 8 8 8 
            . . . . 8 . 8 . . . . . . . . . 
            . . . . . 8 . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . .
    """),
    SpriteKind.player)
controller.move_sprite(Alex)
Alex.set_stay_in_screen(True)
info.set_life(5)

def on_update_interval():
    global EnemyShip
    EnemyShip = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    EnemyShip.x = scene.screen_width()
    EnemyShip.vx = -20
    EnemyShip.y = randint(10, scene.screen_height() - -10)
game.on_update_interval(2000, on_update_interval)
