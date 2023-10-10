//create a new game scene
let gameScene= new Phaser.Scene('Gammy');
gameScene.init=function(){
    this.plaspeed=3

this.dn2speed=2
this.dn2speed=3
}
gameScene.preload=function(){

//load our images
this.load.image('background','assets/background.png')
this.load.image('dragon','assets/dragon.png')
this.load.image('dragon','assets/dragon.png')
this.load.image('dragon','assets/dragon.png')
this.load.image('treasure','assets/treasure.png')
this.load.image('nerd 2','assets/player.png')
}

//called once preload is over
gameScene.create=function(){
let bg=this.add.sprite(0,0,'background')

//set origin point
bg.setOrigin(0,0);
this.dn=this.add.sprite(0,0,'dragon')
this.dn2=this.add.sprite(0,0,'dragon')
this.dn3=this.add.sprite(0,0,'dragon')
this.pla=this.add.sprite(0,0,'nerd 2')
this.tr=this.add.sprite(0,0,'treasure')


// dn.setOrigin(0,0);
this.dn.setPosition(640/2,360/2)
this.dn2.setPosition(999/2,600/2)
this.dn3.setPosition(999/2,200/2)
this.pla.setPosition(250/2,360/2)
this.tr.setPosition(1000/2,200)

//size of the assets
this.dn.flipX=true
this.dn.scaleX=1.5
this.dn.scaleY=1.5
this.dn.scaleX=5
this.dn.scaleY=10

this.tr.scaleX=.8

this.dn2.flipX=true
this.dn2.scaleX=.5
this.dn2.scaleY=.5

this.dn3.flipX=true
this.dn3.scaleX=.5
this.dn3.scaleY=.5


this.pla.scaleX=1.5
this.pla.scaleY=.5

cursors = this.input.keyboard.createCursorKeys();
keys=this.input.keyboard.addKeys("W,A,S,D")

}

//this will run up to 60 time per sec
gameScene.update=function(){
this.dn.y+=1
this.dn2.x+=-1
this.dn3.x+=-1
this.pla.angle+=1

let conditionLeft=this.dn2.x<=50&&this.dn2speed<0
let conditionRight=this.dn2.x>=510&&this.dn2speed>0

this.dn2.x+=this.dn2speed

if(conditionLeft||conditionRight){
    this.dn2speed*=-1
    // this.dn2.x+=this.dn2speed
}

if(this.input.activePointer.isDown){
    this.pla.x+=this.plaspeed
}

let conditionLft=this.dn3.x<=50&&this.dn3speed<0
let conditionRght=this.dn3.x>=510&&this.dn3speed>0

this.dn3.x+=this.dn2speed

if(conditionLft||conditionRght){
    this.dn3speed*=-1
    // this.dn2.x+=this.dn2speed
}

if(this.input.activePointer.isDown){
    this.pla.x+=this.plaspeed
}

let plarect=this.pla.getBounds()
let goalrect=this.tr.getBounds()
let dn2rect=this.dn2.getBounds()
let dn3rect=this.dn3.getBounds()

//End Game Conditons

if (Phaser.Geom.Intersects.RectangleToRectangle(plarect, goalrect)){
console.log("Congrats")
return this.gameOver();
return}

if (Phaser.Geom.Intersects.RectangleToRectangle(plarect, dn2rect)){
    console.log("You Died")
    return this.gameOver();
    return}

 if (Phaser.Geom.Intersects.RectangleToRectangle(plarect, dn3rect)){
    console.log("You Died")
    return this.gameOver();
    return}
    
//Key Inputs

if(keys.W.isDown){
    this.pla.y-=3
}
if(keys.S.isDown){
    this.pla.y+=3
}
if(keys.A.isDown){
    this.pla.x-=3
}
if(keys.D.isDown){
    this.pla.x+=3
}
}
gameScene.gameOver=function(){
    this.isTerminating - true
    this.cameras.main.shake(500)
    this.cameras.main.on('camerashakecomplete', function(camera, effect){
    this.scene.restart();
    }, this);}

//set up our configuration
let config={
type:Phaser.AUTO, //phaser will use your webGl if avaible if not it will use the canvas
width: 640,
height: 360,
scene: gameScene
}

let game= new Phaser.Game(config);

