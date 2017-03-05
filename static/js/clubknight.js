/**
 * clubknight.js
 *
 * Client-Side Rendering
 */
"use strict";

var play = (function () {

const ASSET_SERVER = "https://cdn-clubknight-world.s3.amazonaws.com";

var $ =  (q)=>document.querySelector(q),
    $$ = (q)=>document.querySelectorAll(q);

var renderer = null;
var stage = null;

function init() {
    // Start PIXIJS Rendering
    renderer = PIXI.autoDetectRenderer(1024,576);
    $("#pixi-container").appendChild(renderer.view);

    renderer.backgroundColor = 0x00FF00;
    renderer.render( new PIXI.Container() );

    PIXI.loader.add({
        name: "welcome",
        url: ASSET_SERVER+"/images/welcome.png"
    }).load(setup);
}

function setup() {
    stage = new PIXI.Container();
    var welcome = new PIXI.Sprite(
        PIXI.loader.resources["welcome"].texture
    );
    welcome.position.set(0,0);
    stage.addChild(welcome);

    // TODO: Login from overlay
    var button1 = new PIXI.Graphics();
    button1.hitArea = new PIXI.Rectangle(10,300,250,200);
    button1.interactive = true;
    button1.buttonMode = true;
    button1.on("pointerdown", (e)=>{
        document.location.href = "/auth/login";
    });
    stage.addChild(button1);

    var button2 = new PIXI.Graphics();
    button2.hitArea = new PIXI.Rectangle(150,400,350,176);
    button2.interactive = true;
    button2.buttonMode = true;
    button2.on("pointerdown", (e)=>{
        document.location.href = "/auth/register";
    });
    stage.addChild(button2)

    renderer.render(stage);

    $("#progressbar").classList.add("hidden");

    // TODO: Capture mouse events form PIXI without losing overlay
    $("#game-overlay").classList.add("hidden");
}

return {
    init,

    _socket: ()=>socket,
    _renderer: ()=>renderer,
    _stage: ()=>stage,
};

})();

window.addEventListener("load",play.init);
