interface Dialogable {
    portrait: egret.Bitmap;
    name: string;
    //dialog list
    //cur dialog index
}
type appearance_4 = {
    NORTH: egret.Texture,
    SOUTH: egret.Texture,
    EAST: egret.Texture,
    WEST: egret.Texture
}
interface Displayable {
    appearances: appearance_4;
    orientation: DIRECTION;
}

interface Movable extends Displayable {
    curAnimation: Animation;
    animationList;
    velocity: number;
}

interface Fightable {
    hp: number;
}

interface UIinterface extends egret.DisplayObjectContainer {

}

interface Scene {
    east: Scene;
    west: Scene;
    north: Scene;
    south: Scene;
}