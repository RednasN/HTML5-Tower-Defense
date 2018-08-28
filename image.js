class TowerDefenseImage
{
    constructor(id,name, src)
    {
        this.name = name;
        this.id = id;
        this.image = null;
        this.images = null;
        this.src = src;        
    }

    static getCanvasImageProvider()
    {
        return document.getElementById("canvasImageProvider");
    }

    static clearImageCanvasAndRotate(image, index = 0, drawheight = 50, drawwidth = 50)
    {
        var imageCanvas = TowerDefenseImage.getCanvasImageProvider();

        if(imageCanvas != null)
        {
            imageCanvas.width = 50;
            imageCanvas.height = 50;
            var imageCtx = imageCanvas.getContext('2d');
        }
    
        imageCtx.clearRect(0, 0, 50, 50);
        imageCtx.save();
        imageCtx.translate(25, 25);
        imageCtx.rotate(index * TO_RADIANS);
        imageCtx.drawImage(image, -(drawheight / 2), -(drawwidth / 2), drawheight, drawheight);
        imageCtx.restore();
    }

    static CalculateWebGL(image)
    {
        var tex = mainCtx.createTexture();
        mainCtx.bindTexture(mainCtx.TEXTURE_2D, tex);
            // Fill the texture with a 1x1 blue pixel.
        mainCtx.texImage2D(mainCtx.TEXTURE_2D, 0, mainCtx.RGBA, 1, 1, 0, mainCtx.RGBA, mainCtx.UNSIGNED_BYTE,
                        new Uint8Array([0, 0, 255, 255]));

            // let's assume all images are not a power of 2
        mainCtx.texParameteri(mainCtx.TEXTURE_2D, mainCtx.TEXTURE_WRAP_S, mainCtx.CLAMP_TO_EDGE);
        mainCtx.texParameteri(mainCtx.TEXTURE_2D, mainCtx.TEXTURE_WRAP_T, mainCtx.CLAMP_TO_EDGE);
        mainCtx.texParameteri(mainCtx.TEXTURE_2D, mainCtx.TEXTURE_MIN_FILTER, mainCtx.LINEAR);

        mainCtx.bindTexture(mainCtx.TEXTURE_2D, tex);
        mainCtx.texImage2D(mainCtx.TEXTURE_2D, 0, mainCtx.RGBA, mainCtx.RGBA, mainCtx.UNSIGNED_BYTE, image);
        return tex;
    }

    calculateImage()
    {         
        var imageCalculate = new Image();
        var imageSrc = this.src;

         return new Promise(function(resolve, reject) {
            
            imageCalculate.onload = () => resolve(
                new Promise(function(resolve1, reject1) {
                    var saveImage = new Image();

                    TowerDefenseImage.clearImageCanvasAndRotate(imageCalculate);
                    saveImage.onload = function()
                    {
                        if(DRAWMODE == "Canvas")
                        {
                            resolve1(saveImage);
                        }

                        if(DRAWMODE == "WebGL")
                        {
                            var tex = mainCtx.createTexture();
                            tex = TowerDefenseImage.CalculateWebGL(saveImage);
                            resolve1(tex);
                        }
                    }
                saveImage.src = TowerDefenseImage.getCanvasImageProvider().toDataURL();

            }
            ));            
            imageCalculate.src = imageSrc
        });    
    }

    calculateRotations() {
        var imageCalculate = new Image();
        var imageSrc = this.src;
    
        return new Promise(function(resolve, reject) {
    
            imageCalculate.onload = () => resolve(
                new Promise(function(resolve1, reject1) {

                    var allImages = [];
    
                    for (var i = 0; i < 360; i++) {
                        allImages.push(new Promise(function(resolve2, reject2) {
                            
                            resolve2(new Promise(function(resolve3, reject3) {
                                var saveImage = new Image();
                                TowerDefenseImage.clearImageCanvasAndRotate(imageCalculate, i);
                                saveImage.onload = function() {
                                    if (DRAWMODE == "Canvas") {
                                        resolve3(saveImage);
                                    }
    
                                    if (DRAWMODE == "WebGL") {
                                        var tex = mainCtx.createTexture();
                                        tex = TowerDefenseImage.CalculateWebGL(saveImage);
                                        resolve3(tex);
                                    }
                                }
                                saveImage.src = TowerDefenseImage.getCanvasImageProvider().toDataURL();
                            }))
                        }));
                    }

                    Promise.all(allImages)
                    .then(data => {
                        resolve1(data);
                    });                   
    
                }));
            imageCalculate.src = imageSrc
        });
    }
}

//     calculateRotations1()
//     {
//         var imageObjs = [];
//         var imageCalculate = new Image();
        
//         imageCalculate.onload = function(e){           
//         	rotate(0);
//         	function rotate(i)
//         	{            
//                 TowerDefenseImage.clearImageCanvasAndRotate(imageCalculate, i);

//                 var saveImage = new Image();         
//                 saveImage.onload = function(){
//                     if(DRAWMODE == "Canvas")
//                     {
//                         imageObjs.push(saveImage);
//                     }

//                     if(DRAWMODE == "WebGL")
//                     {
//                         var tex = mainCtx.createTexture();
//                         tex = TowerDefenseImage.CalculateWebGL(saveImage);
//                         imageObjs.push(tex);
//                     }

//                     if(imageObjs.length != 360)
//                     {	
//                         rotate(++i);
//                     }
//                 };
//                 saveImage.src = TowerDefenseImage.getCanvasImageProvider().toDataURL();
//             }
//         };
        
//         imageCalculate.src = this.src;
//         this.images = imageObjs;
//     }
// }


// calculateImage1(image)
// {
//     //var obj = this;
//     var saveImage = new Image();        
//     var imageCalculate = new Image();

//     imageCalculate.onload = function(){

//         TowerDefenseImage.clearImageCanvasAndRotate(imageCalculate);	        

//         saveImage.onload = function(){

//         	if(DRAWMODE == "Canvas")
//         	{
//                 image.image = saveImage;
// 			}

// 			if(DRAWMODE == "WebGL")
// 			{
// 				var tex = mainCtx.createTexture();
//                 tex = TowerDefenseImage.CalculateWebGL(saveImage);
//                 image.image = tex;

//                 //console.log(twdGame.level);
// 			}
// 		};
//         saveImage.src = TowerDefenseImage.getCanvasImageProvider().toDataURL();
//     };
//     imageCalculate.src = this.src;
// }
