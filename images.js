var imgEnemy_Basic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABaUlEQVRoQ+2ZTRLCIAyFy7KrnscZj+HGS3gAD+ABvIQbj+GM5+mqSxypZSpQIJA4No1LoYEv7yX0RzVMfooJRyMg/6akKLIVRTQxqOckKmvp4UGD0u5NXAGBppePtW671oM/PoegLaBZCs0nqxEBKZRHFEkkTrOxVgSUxAXYQU3b1adukUNd+2kMdW3MYDoG4JJ9gNDWxwoEgrCSjOqg7AEjSBEENkwtSBUEJsymQewNIaS4Uwf2rJsV1Q1EkbG1dmNrVX0fbbOpjYe62HA5mL/b890bTsXLAfkCsL4mBHE37YAF97wpkClBq7eWq/Tqiz1Ub3KOzLOCcd+VU+ypzlelCgZE0cGzQFUEgwWBCWLOSshJjwmBDWJgODxYzV0Xe0GHUZeew0mCvpVh8/JBQFLNfmFcrJVIHJ8aKXRI7mXyoSc3U/bZhc2nNyg5cP7PrAXcV/10qvZbvzNgBAEBJox8uihCnmLgAi/Wd5ozikmVGAAAAABJRU5ErkJgggAA";

var imgTurret_Basic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAADDklEQVR4Xu2cTVKDQBCFJ+Up3HgAN17OnWt3Xs6NB3DjKaxYRCZFSMjQ0D+v4bnSykCa9/F1E1JyKPyBSuAAVQ2LKQQCdhIQCIGAJQBWDg0hELAEwMqhIQQClgBYOTSEQMASACuHhhAIWAJg5dAQAgFLAKwcGkIgYAmAlUNDCAQsAbByaAiBgCUAVk5GQ47CDFMdY4ZiLwC8li8Rj4/yPF4PfczIxZ1ASAG0aA0AQR47YlEmIMagUMEgAXEBgQ4GBchRuzW1WtcEmPA8wgsopYTDqHD6NhaaSeSbh7SoljnRsyUKCIwVU4CibIkAAg8jsoURyJ0eFmGJN5A0dkRZ4gkkHYwIKF5A0sLwhkIgrevg/nWveeIBJL0dnpYQyExDumUellgD2YwdXpYQiMAQD0ssgWzODg9L0gJ5eXyaPLc/f76F571sueUsSQfkHohxrFZgCKRPWgKjwrGAkhGI+vxYAsMBiqzXXa++6lBWLUsVyBoYVlDqF1m/b8uYPLyftiOQZfFdb7VbIBp2WFhCIAqntuaAJxACWZWA2lBny1rF4bwxgTRyTHuVRUPADOnK0YCiOdAHd30LP4csPGEIRPiPNa2c11iiDWNoSKvuxutun9S7OtQGez2oJVAMYZjcdjLZaR+gOhDpPLGAMbDDJDuTnVoCmWOLFYj63hlvv5u0rJX9Wm3zrEA2CcUSxs378Wqn0f+OTOaIco2i3WUHsiko1jA8DCEQkX83vkIUbj93efrW5WGHlyGbsGRrQFJD8YLhaUhtbelalyeMCCCpTPGGQSCNS5K9AElhSQSMKEPO86T7JfqhM2NJ9vpojWEOMIM+yophGJa33+d+aIRoYQgwolvWGFjI04GiW9Q4BBRDLlqYx2xBA1EDQARiOvRRQWQAcgGm/iG9KhsASHHMyIZMXRTwQcqSyyWuXZdARkPWHTH41gQCBohACAQsAbByaAiBgCUAVg4NIRCwBMDKoSEEApYAWDk0hEDAEgArh4YQCFgCYOXQEAIBSwCsHBpCIGAJgJVDQwgELAGwcv4AW3X0ZUzHVw0AAAAASUVORK5CYIIA";

var imgBullet_Basic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAeklEQVRYR2NkGGDAOMD2M4w6YDQERkOAohBYLPnlPygbxz7nIdscsjXCLIeVI+Q6YtQBQzMEQPG/97YqSjXirHqbrMRIcghgsxzmEnIcMeqAoRcCoPge0EQIS3CjJeFoCMAS44BVx9RqzpNcDlDLYpg5ow4YDYHREAAAvzpSISuYp5oAAAAASUVORK5CYIIA";

var imgBlackTransparentSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABbUlEQVR4Xu3VQQkAMBDEwK1/BXVbqIp55BSEhOXOtruOMXAKwrT4IAWxehQE61GQgmgGMJ5+SEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhvMAVpE8KbTb+00AAAAASUVORK5CYII=";
var imgPlusButtonSrc = "data:image/false;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAACNklEQVR4Xu2cQWoCURAFZ66Rkwg5f8CT5BrjKmAgIbw3Fumv5bpfd0+VvVF033yNIrCP2sZlNoUMexMoRCHDCAxbxwtZRchxuRzDdn2qdfbr9cdj+PVCFML6VwjLN+6+tJD98yN+4K/A8fZeZ8mgQki6RW+FFNDIiEJIukVvhRTQyIhCSLpFb4UU0MiIQki6RW+FFNDIiEJIukVvhRTQyIhCSLpFb4UU0MiIQki6RW+FFNDIiEJIukVvhRTQyIhCSLpFb4UU0MiIQki6RW+FFNDIiEJIukVvhRTQyIhCSLpFb4UU0MiIQki6RW+FFNDIiEJIukVvhRTQyIhCSLpFb4UU0MiIQki6Re9TQs78PqPY9Wkj979VUcgAzQoZIOF+BYUoZBiBYet4IQoZRmDYOl6IQoYRGLaOF6KQYQSGreOFKGQYgWHreCEKGUZg2DoPu5D/fq4zH//790yAPYVs2zbpL/4UohDgzr+3PPWNIb7dHwO8EC8Efw96ITjibIBCMl54tUJwxNkAhWS88GqF4IizAQrJeOHVCsERZwMUkvHCqxWCI84GKCTjhVcrBEecDVBIxguvVgiOOBugkIwXXq0QHHE2QCEZL7xaITjibIBCMl54tUJwxNkAhWS88GqF4IizAQrJeOHVCsERZwMUkvHCqxWCI84GKCTjhVcrBEecDVBIxguvVgiOOBuwtJDsUdeoVsgwTwpZXciw/V9mnf1lnnSRB1XIMFEKUcgwAsPW8UKGCbkBULZWg+poDsoAAAAASUVORK5CYIIA";
var imgMinButtonSrc = "data:image/false;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAB6ElEQVR4Xu2YwWlCARQE/W2kEiH1B6zENswtBJIcBrMw6ngU3rp/5u/F49RHReBQtanMKSGylyAhCZERkNVpIY8i5HY+32Rdn6rOcbn8OoY/F5KQrf+EbPni9IRgZNuDhGz54vSEYGTbg4Rs+eL0hGBk24OEbPni9IRgZNuDhGz54vSEYGTbg4Rs+eL0hGBk24OEbPni9IRgZNuDhGz54vSEYGTbg4Rs+eL0hGBk24OEbPni9IRgZNuDhGz54vSEYGTbg4Rs+eL0hGBk24OEbPni9IRgZNuDhGz54vSEYGTbg4Rs+eL0hGBk24OEbPni9IRgZNuDhGz54vS7hBzXD/yDHfwkcHt7//oyIYI3JCECCd8rJCQhMgKyOi0kITICsjotJCEyArI6LSQhMgKyOi0kITICsjotJCEyArI6/7YQ2XM9RZ27/n5/CgKyh0hIQmQEZHVaSEJkBGR1WkhCZARkdVpIQmQEZHVaSEJkBGR1WkhCZARkdVpIQmQEZHVaSEJkBGR1WkhCZARkdVpIQmQEZHVaSEJkBGR1WkhCZARkdVpIQmQEZHVaSEJkBGR1WkhCZARkdVpIQmQEZHVaSEJkBGR1WkhCZARkdfBCZP1fps7xMk/6IA+aEJmohCRERkBWp4XIhHwC2fWNdLdCvYoAAAAASUVORK5CYIIA";
//Rotateable images.

var imgRocketLauncher_Basic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAB3UlEQVRoQ+2ZwWrDMAyG3UMCoWynwWAvsvc/7kUGg51WSiA5dLibgytLlivLWxLUU2kSWZ/+X4mVHtxOPoedcDgDWZuSpginyHh0F+yc4dzGzs0U8SBfn7coj0/OGQhjAVOkpEfMWlyVkOOtrIXesaL11dfVDLgk37/P2ZpOL118XCUHlSDOuQuXPEX2C1WdR3WAGogApwFTCyJWAipUC1MDkoUAfbDknbNgDYwUhIQIAP38gLbF1J2uv1NAUhgJSBaCAkis1J1UYdRAfCVLIZYmJ2AkqqiAUBDBRiFxDNSfA232FyCorSBIAJj7txtHddPrT39E/YOB+HPuhUkUoQYiH3w4p02KqeGTgxCByMNAZShVxiO9QYBzDQoCd60h3PPAg+QgKBgK5GPEQbABzUDi7QX0PGUrUwQ4rNhaVIttqtmZ4Ww7t9+CKTOB2eID0XMWqVJQEKf1MPRrqWxRqDtYDoaCkDzVpSCkKlES5AZyTdv4UOhdDFZFMCV9EttSaPVrCEmPwPyq5/Z7d7pYgTRAsj3DqaIBoaXIYrPwhXvHteYXdIndGCW0nLAsox4wRLY/erimIo6bIlzhzFpchf7DWtiam/tXV1hY8WXNml2ckfBCAxEWrtllu1HkG/qEXkKeej0IAAAAAElFTkSuQmCC";
var imgRocket_Basic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABDklEQVRoQ+2UsQqCUBiFf6FaJGwLnFrcoqClF+g5erVeoTmCtvZaWxxCaIkWESQo7nAlyJYjB+JyWgTlHDzfdy2yQH5RIDtMQ/7NpIzICImAjhYJLFwrIzA6UlBGSGDhWhmB0ZGCMkICC9fKCIyOFJQREli4VkY8umo6fCW7u6X73IrVBLrm66wz0E4FbsRgNLfl5mrl+Gnxrfd1PceXZtyszJrnn/c9hDrtw+8DB/2I+nGyxTFpHfFrnLtfbQ+tBtEx8BB3tIIwEtQ3Av9XEoKdjhbhfeBKDYHRkYIyQgIL18oIjI4UlBESWLhWRmB0pKCMkMDCtTICoyMFZYQEFq6VERgdKSgjJLBwbTBG3veimTPnXcJeAAAAAElFTkSuQmCC";

//Explosion sheet
var default_explosion_sheet = "data:image/png;base64,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"
var nuclear_explision_sheet ="data:image/png;base64,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";
var nuclear_explision_sheet = "data:image/png;base64,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";

var nuclear_bullet = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAA50lEQVRoQ+2WQQ6DMAwEk1vVh/KoPrTqLRUHqgqKsoq8Fo2GK47D7ARDLZNcdRKOAsjVTGIEI6YEOFqmYIfbYmQ4OtNCjJiCHW6LkeHoTAsxYgp2uC1GetG18mr7mlputuAsjVeIujwPrO1xLy6YcJAziI3KBRMK0oNwwoSBqBAuGED2bzJGenNcvM/R+hWUerwcIzjMyGcanXwMXdNq6xsOsjae4sv+bebv/7XEQRNaZjlaoU8oNgNEDCqtDCNpUYsbYUQMKq0MI2lRixthRAwqrQwjaVGLG2FEDCqtDCNpUYsbTWPkDbf5SDM7/rw/AAAAAElFTkSuQmCC";

var image_selected_square = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAuklEQVRoQ+2asQqFMBAE9xD0/z9XQfKwjd3CoucbG6vdmJkLNqkhjeOU1kXq/K791Oi+iev7CyMvG8ebkW1RqcEzT9LtjJR6bGQ+2xh5evow8rSBeX2MYCREgP9ICKxdixEbXSiIkRBYuxYjNrpQECMhsHYtRmx0oSBGQmDtWozY6EJBjITA2rUYsdGFghgJgbVrMWKjCwUxEgJr12LERhcKYiQE1q7FiI0uFPwfI10v2HA76G3mPmPkB9AlaRv/NA93AAAAAElFTkSuQmCC";

var nuclear_turret = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABqElEQVRoQ+2ZS4rDMAyG1U0hq4EeovfoZQZ6ooG5TO/RQxS6CsymxRkr2CJOZUuiE4+6q+OHPv+KJDs76OS364QDHOSvKemKuCJGO+Cu9WpjR4DHUp8BbCKliSIlCASzgDEBAYDHWJBs+G1XX1dzwtmV9nCerL3DV4bzEdt/8nYVG1QmCQqg8VQIhEEI+jxCie2QTjCpUIJ4FRDweaJQsz3NA9dU4AJoqtMKUnSlVgiiTrVd1QPigl2AmEFIVKlVxByiFeZfgqiEWm4wqM0vbEVC/VRKaqUMvmQ0py/J/Gvss/0sECwCl0CCYcPnLVts/D6ApG8AOV7WTbueJgfhg6SVLDVuCQKJKExNX3UQWo47SKyEqQuW1FNXJCzUhWvNOxaPrZIXGM8nnMBgokgKs/nwi4Wixtnj7QnRuuqVnk1YCTFZpJuiMTCZw9TWWVmK5/qutYu1QDiIlSqtakgUQU9UOaO8+zoofa02f0GXweCfLV+Z0qC36UvsGaanzwpZ+Z/KZfFtRCNqVeZRu+61tZadJcKZHUS4gerDXRH1LRVO6IoIN1B9+BNabMYzakKC0QAAAABJRU5ErkJgggAA";

var multilauncher = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACSUlEQVRoQ92ZOVLDMBSG5aSl4CzM+BAcKhThUBzCMzkLBW0wY2MLbW/Viy2cKoVk/Z/eKqlzB/l1B+FwJZAxgWsFFtWVikwHr0x7w5C6QoHQ4L1hWLokIBOQmWVG51CB3e9aFITXJAUxgaEghIvMDBoQ4Tpx6uBACBfIQKb5HFOqYyaFOH/Fy92f/vaV6cN+GCf9+i0dLyd92Xn/zuZWgkTaIfDMMlUQE4ItSKYbs6CHqYawBSlqplxxNIEAQDA/BYSBelGQ8XKSBD8aP8/XOEY+kZWlEGSW2wNEA9EciBaiKZAaiE1BSuk3DKoCCJWIopjcLNiFICKIaov0Hy9+V4bXG171CwWR2yYsnTA6XGWRFWAYBv/xvu/n/yBQBUhKUALbHATrr7gWCrpWtGkMm8SsIEbuVLAIaJXFIs2AuOs9c6dZfADl3s755hIgKeD6gbC1x1xM7lo7gaygyZlF71qHschxYsQ5V5N+2wn2ShBpii2NN6sj68f/fWVX7SpR2Zf0I+6xguIIy7I8WAmaRhWMvI6ozOEcddRNhIhhWgUhO/NCld/GtSiLAMrZlmnGIkjQsmDIQWYBLziPaI69JMh0sW1ySScA0bgZBWJ3bWpz96u6abS9yLYBAbMZRCi5KqWsOsdx6YGn4lkhW7MkwhxizUjGDz2R9hTkYRAQDFTFWGYOng7D8Q+HkMAwQXzMaEAEayBdA/08ze3qZj1SEBMIrkLm46wYZGuIwBNR9AxkyZLFSXtBUDBeFyf97g0BwaDpV+C+bQ39AQIUIEKu91lwAAAAAElFTkSuQmCC";

var imgSurrounderSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAA2klEQVRoQ+2aywrCMBBFbygogj/kzk935w8JolAiXQRKfUAwY2/kdJNdyeSeOVlMUpbyfZQ2g9Tzmm6jcu9FTPtPJGKG41Mix6t02knu67IdXvaIexFlf/NiSMQBv6pEtoOSDL7DRXl+eNU9ct57FDLdd8veJZE1CSOR0lj0SGMOsVZRHfdIY7SwFtZqjFT5HdbCWkFoYS2sFYQW1sJaQWhhLawVhBbWwlpBaGEtrBWEFtbCWkFofW0t18Fo9cTKYVb47jCrJlYk8oNHBx8T6fWBDa+D3JL7m0Qe7HvOOT05TSIAAAAASUVORK5CYII=";

//var images = [];
//images[] = 






function TowerDefenseImages()
{
	this.enemies = [];
	this.towers = [];
	this.bullets = [];
	this.gridImages = [];
	this.explosions = [];

	this.onetimeimage = [];

	//Game assets
	this.imgBlackTransparent = null;
	this.imgMinButton = null;
	this.imgPlusButton = null;
	this.imgSurrounder = null;

	var imageCanvas = document.getElementById("canvasImageProvider");

	if(imageCanvas != null)
	{
		imageCanvas.width = 50;
    	imageCanvas.height = 50;
    	var imageCtx = imageCanvas.getContext('2d');
	}   


	function calculateImage(imagesrc, set)
	{
		var images = [];	

        var image = new Image();

        image.onload = function(){
        	//image.src = imagesrc;
	        imageCtx.clearRect(0, 0, 50, 50);
	        imageCtx.save();
	        imageCtx.drawImage(image, 0, 0, 50, 50);
	        imageCtx.restore();

	        var saveImage = new Image();

	        saveImage.onload = function(){

	        	if(DRAWMODE == "Canvas")
	        	{
				 	set(saveImage);
				}

				if(DRAWMODE == "WebGL")
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
	      			mainCtx.texImage2D(mainCtx.TEXTURE_2D, 0, mainCtx.RGBA, mainCtx.RGBA, mainCtx.UNSIGNED_BYTE, saveImage);

					set(tex);
				}
			};
	        saveImage.src = imageCanvas.toDataURL();
        };
        image.src = imagesrc;
	}

	function calculate()
	{

	}

	function setImageValue(gridImage)
	{
		var images = [];	

        var image = new Image();

        image.onload = function(){
        	//image.src = imagesrc;
	        imageCtx.clearRect(0, 0, 50, 50);
	        imageCtx.save();
	        imageCtx.drawImage(image, 0, 0, 50, 50);
	        imageCtx.restore();

	        var saveImage = new Image();

	        saveImage.onload = function(){

	        	if(typeof variable === 'undefined'  || DRAWMODE == "Canvas")
	        	{
				 	gridImage.image = saveImage;
				}

				if(typeof variable !== 'undefined' && DRAWMODE == "WebGL")
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
	      			mainCtx.texImage2D(mainCtx.TEXTURE_2D, 0, mainCtx.RGBA, mainCtx.RGBA, mainCtx.UNSIGNED_BYTE, saveImage);

					gridImage.image = tex;
				}

				 
				 //console.log("Load!");
			};
	        saveImage.src = imageCanvas.toDataURL();
        };
        image.src = gridImage.imageb64;
	}

	function calculateSpriteAnimations(name, imagesrc, destination, drawheight = 50, drawwidth = 50)
	{
		var images = [];
		var source_sheet = new Image();

		source_sheet.onload = function(){
			//console.log("Load");

			//Sheet is vertical.
			//var clipped = 0;
			clipImage(0);
			function clipImage(clipped)
			{
				if(clipped != (source_sheet.width / drawwidth))
				{
					clipped++;

					imageCtx.clearRect(0, 0, 50, 50);
			        imageCtx.save();
			        imageCtx.drawImage(source_sheet, drawwidth * clipped ,0, 50,50,0, 0, drawwidth, drawheight);
			        imageCtx.restore();

			        var saveImage = new Image();
			        saveImage.onload = function(){

			        	if(DRAWMODE == "Canvas")
			        	{
						 	images.push(saveImage);
						}

						if(DRAWMODE == "WebGL")
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
			      			mainCtx.texImage2D(mainCtx.TEXTURE_2D, 0, mainCtx.RGBA, mainCtx.RGBA, mainCtx.UNSIGNED_BYTE, saveImage);

							images.push(tex);
			        	}
			        	clipImage(clipped);


					};
			        saveImage.src = imageCanvas.toDataURL();
				}
			}					
		};


		source_sheet.src = imagesrc;

       	var item = {
	                    name : name,
	                    images : images, 
	               };
	    destination.push(item);  
	}


	function calculateRotateImages(name, imagesrc, destination, drawheight = 50, drawwidth = 50)
	{
		var images = [];

		var image = new Image();

        image.onload = function(){           
            
        	rotate(0);
        	function rotate(i)
        	{
        		imageCtx.clearRect(0, 0, 50, 50);
	            imageCtx.save();
	            imageCtx.translate(25, 25);
	            imageCtx.rotate(i * TO_RADIANS);
	            imageCtx.drawImage(image, -(drawheight / 2), -(drawwidth / 2), drawheight, drawheight);
	            imageCtx.restore();

	            var saveImage = new Image();         
	            saveImage.onload = function(){
				 	
				 	if(DRAWMODE == "Canvas")
		        	{
					 	images.push(saveImage);
					}

					if(DRAWMODE == "WebGL")
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
		      			mainCtx.texImage2D(mainCtx.TEXTURE_2D, 0, mainCtx.RGBA, mainCtx.RGBA, mainCtx.UNSIGNED_BYTE, saveImage);

						images.push(tex);
		        	}

				 	if(images.length != 360)
				 	{	
				 		i +=1
				 		rotate(i);
				 	}
				};
				saveImage.src = imageCanvas.toDataURL();
        	}
        }

        image.src = imagesrc;

        var item = {
	                    name : name,
	                    images : images	                    
	               };
	    destination.push(item);
	}



	this.setupAssets = function() {

		function set1(value)	{
			twdImages.imgBlackTransparent = value;
		}

		function set2(value)	{
			twdImages.imgBlackTransparent = value;
		}

		function set3(value)	{
			twdImages.imgBlackTransparent = value;
		}

		function set4(value)	{
			twdImages.imgSurrounder = value;
		}

		calculateImage(imgBlackTransparentSrc, set1);
		calculateImage(imgSurrounderSrc, set4);


	};

	this.setupBullets = function() {
		calculateRotateImages("BasicBullet", imgBullet_Basic, this.bullets, 50 , 50);
		calculateRotateImages("Rocket", imgRocket_Basic, this.bullets, 50 , 50);
		calculateRotateImages("NuclearGrenade", nuclear_bullet, this.bullets, 50 , 50);

	};

	this.setupExplosions = function () {
		calculateSpriteAnimations("Explosion1", default_explosion_sheet, this.explosions, 50, 50);
		calculateSpriteAnimations("Explosion2", nuclear_explision_sheet, this.explosions, 50, 50);		
	}


	this.setupTowers = function() {

		calculateRotateImages("BasicTower", imgTurret_Basic, this.towers);
		this.addTower(imgTurret_Basic, 0, 25);

		calculateRotateImages("RocketLauncher", imgRocketLauncher_Basic, this.towers);
		this.addTower(imgRocketLauncher_Basic, 1, 100);

		calculateRotateImages("NuclearLauncher", nuclear_turret, this.towers);
		this.addTower(nuclear_turret, 2, 100);

		calculateRotateImages("MultiRocketLauncher", multilauncher, this.towers);
		this.addTower(multilauncher, 3, 100);
	};

	this.addTower = function (src, index, moneys){
		var div = document.getElementById('turrets');
		var towerTemplate = '<div style="width:50px;float:left;margin:5px;" onclick="twdEventHandlers.selectImage(this)" cost="'+ moneys + '" index="'+ index + '"><img src="' + src + '" style="backgrond:red;" width="50" height="50"><div width="50"><div style="display: table;margin: 0 auto;">'+moneys+'<img src ="./images/money.png" style="vertical-align: middle;margin-left:3px;" width="15" height="15"></div></div></div>';
		div.innerHTML +=  towerTemplate;
	};

	

	this.appendTurretToMenu = function ()	{

	};

	this.setupEnemies = function() {		
		calculateRotateImages("BasicEnemy", imgEnemy_Basic, this.enemies);
	};

	this.setupGridImages = function ()	{
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADD0lEQVRoQ+VaO04DMRDNikgghYoDID4i14CengKJkiIVFSfgEBQpkSjpaKgoOAWIjygoqUiBFBTk3Xgznh37jXeD2DhUsOu1/ebz5nlM1jlbm3Qa/JyOjht8Pft02LtuNE+WPJCst55baDL6ClqKe6S/t5uPf3x6Fr/rdlfy5+Pxj/O+jkfMHu3+/B453CwWun2HQHybs893treC4MxLCQg1JjLsEgCR/CB4SZPsPo/RJaJCS9hHVLKX7j3YKENOA0SyiQFHQy4GiLSP5QQiWZZ6hFvZ54l5sRadP8ojCIihXkq7mtywc8aElrSPxIEYVrD1g/4umGLwfVIpblqtQT0meoSyE6hrskeSAUJMSmUAyhHkCeMBLk20OVK/stsVuHeYbKlbRzhomOwgzHCyLyQQpVCk1jQeoUlLhSJXwDy0qFKueASQDPeo4xEUhx2F1grJeFpneM3hQIK5ibRWMkAQ6/wna6G94ToCZuBaS6JXjVSBrAX2kR4Q5/xLzsK5IQJsRj3CE9gaEZ3jfUfd0gkKBpt5JEKWcPqlf2tZCxVEpCj89LvwQO76RYOOdEtirBGSKJok92otRTi5B6tkgEgtU581FJUd8b26QRftEQFI3dDysRYCJ7FWI4liF0wGSF43QKvUgg5VdkvFL69v+XDTx/L1hP+ksrfBI6gQB2V8m0KrERCpFemE2RxYi1pS6qLADrwn7F3RON1odv85u3egdxDCnUkTrSWeECNaQG5BpPSbCpCmoeVr92ikyvDooTAwk0rmEbo1M2PkMzu5NojJkdYAQawlnem5aNRYX6r0sGVKPwo2HzQyXsFamkOUFghshpCJ4g5WiwDEd9Tlz3nyhUKL3+oaqWKbEzyfkERB9QU3H9rSMlXnCB8o3Y8oQksj2bU54p0LdRoRa6FNos58VDhFKPBKHSk3CiapqOOphQY3+04OhP7jwbDb+cdFsaSwXowCTxNIbgFT0ZlMoHLaiEnOWj7LSWFmQuty9QpFaPlelEyer/FFj3pZd6C5JJVCy9KsY4DIfJC2lAyQX6WyKWyx8Tl1AAAAAElFTkSuQmCC", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADCklEQVRoQ+1ZO04DQQydCCSQoKKkQHwEp6Cgp6NEoqSg4gScgANQUCJR0NPDNUB8xAFSkQIJFOQhs3Fm7LE9myjZDak2m+zsPPv5+TMdd77cd3U+hxvO3X/4FTorq67f+/TXp73jatW93R1//fr27q6Wbuq8jX22Mz9ADjdc56HrLRGsrTHp2deJ+/7+Sf56vXKb3MOeDD/6ewdrf18HHq8eBBYAAx661Z5MHoHFE0CIWpfrF+7p+SXZKKZWALe4uOCujh6TjZLvwCui9+Hb8wnEDVyauHpgGhzgYHGKWtiKFM0k2lI09DQbCXZho9RL8OalTeR+T0BhCnHXaMF2AsGBJgadQCeg1vbWZpU/4AKoBvfDdY5mmEKqa00eyYGyUisoWKxuWWpxqoWTcTuBcMGeEQGrR0qoNZIvUBnE55HWAGH0kc3oUBze7bOqylkfHojzjEV+qZJJl9ljT6EgA2pxAczdByDwGw74GEhWqYgarOVAosIsplbcd+QopM3206EW2p1VtcKjErU4A+hqLe7pMcrvdIFk+MF5BCwOrS18QqmCg1tUrZxR40bLWv1SMjyb1BLK+OYAkSSGABp7pFTBiopGth8ZAxBqCQ04bbeYqFYYRGiq32pzCo80AoglRuI8gWUXrsV+RKNa1n4krNlsIMwcKYDLyW+dotGvT1CZLSZNMUK4OwekVhmvoVaxas0jEM2ADttFK79sMWkZ0EnBjpWqtmplYpPah2lA1xwghZmdUieKWrgijod1JmpRasZSSzkHLq1+Y5upO0TG2Dy1Gg0E6zJ1qGOQ33GqFtfe4u2wU5SSITZeeGaAjJQHQs+uKdNzOuKP4XKnvebzEUm1DNSKvQPf8QlW6RRFlxD/gQwtINGMOuGFp015hDD4MNgLz9Px7BfGP9IBKOf0Cghxhq4hSguBMI2MZI3SfsSU2aVNJAM6JiGWniHieIhVC77jeBJjRJq5cR2i9oRX0+qG0WkcPxMBoikDKA9bB3TqU93oZVKloTvoyXB0YtWvIi5UtZZ2nVkB8guyozw+rwRwFwAAAABJRU5ErkJgggAA", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAC1klEQVRoQ+VaS07DMBB1RCWQyooDVHwE52DfG7BnzXFYsETiBuw5B4iPOAAruisqGlPTiTPfOIUmzSqkie03nvfmY6pwtbcIBdfl7KLg69WnN+O7onGq7QEynYTq4SNaazH7bFgN78hotBOOjw7jO49Pz7/vwnO44LeX17d4P59/hfQc7vMdqcb7YXF+8DPG/Xt93ukk/g3rSmty7QgMngPCQM5OT2oA0uzwHC4AAYuGKwedgFBz1FAAiBwYgPK41mCAhOWWYotwZAeLJ+tbWGwle3Q5wsXrO0IsVFvE2lQLuxB3jxY3TCCYAyrpltbIVYsiM6dUeLdJ1Vq6EHYn9p4iO+eHlJt5XSspGJZnGLfBEUadIk+TaqF7UrUGA0QjOP7duyM4CFpdC79nUy0PAoIjls97CYRbdIrsOM6IHMl4QaVMemTnSId2hCMw9xw+zdMZl2oROdgWAVEcH8guuZCFN6r8duJaBiDWxeL3NNfixtwY1cKpPQ6K3SaNLUzLxRGweEpNuGJLVC1uLa56RFGqkoD4tzvSeyBELZynB/A3Lmxy12qrYK2SRrYe0TjiqBDxUBZwrcmejO+p2T2l7kYD0ZoPUpzAJId7tR6xqJZWj0jBSOMIp0r/D8SQNHLAS5LGOCbBSVepq3HeGkeK0niLa7VWLWJwqUIcBJB1NehY/tbkt7BBhzNarQ+sqpbATUo9O23QbQwQriknNeuAI5Q6Ua6FM2LtWEEUHErNTJFdcDlvO4hboLn5wAyg1+yMnqfxegVEcy3KSF2qlqXzadqR3gJpWEDhiCVNl8gL31/v3vKvuM9H0lAdV4gU0LZdFFtAHBwQR9boLXWpE16YzlohmnbEekqVZ7/c4hz2WAFR+gbbBcRjQUtA9KiZuYvijezWg1EpsmOXg/nzc3fpXzga61UyczYg9haIJQ2gdrWtaqn1SDaZJkSmFEXiztqSRidhBwPkG1f2ED4EyV/SAAAAAElFTkSuQmCC", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACNUlEQVRoQ+1aS1bDMAx0drwHqx6gZ+m+h+F07DkLB2BF1+HFrw1ynpQZyQ6kLl02iavRjL7pkF6fxtTBZ/gHsjMWZ0aG55c0Xr7qzDsf0/D+mc8YT4eU3j7qznM83R+QdD4WHpwYyp6tZUl6dfEb8yXr+5aMSMnN4E6HQkKsnBj5QgcaoKG07g6Ig0X+1sl7KcUTwPV5mTQsVvdbR2QGJOK0TyBqoHkziiIHXovxOwtGugGSa8n0ERVZDa4VlmSKhpU9yJ7m8DgjQSNkEZzrDxHMheg0h8vu1yWtPQOJSsslp6trmSovWUAVH6dfkLUYg5ARVK4CCngcIGZLUNkde89FrMYZQVSjQW2tpV+UAEZ6jwOECWbVY8EkgSSUu2lF1j+MbDi9MdIopkUkrdWC2AuQsIQW7o4UR0/hW+4Wbs/CUdclC6nf4DoIxgia2SmDrZTr6LsgY8xZqGnUei0X7ZQ3Km+iGCGK3GRG012XFxcDhNInSo1rhnnHZtkpTzG38ttqZff2QaxT87mKQS0yZt9ArFyNkoHFDCPZ8Nh7kx960eNaPlhLtWBKZSWb+6/ugawVLjo4jfXSFincZKQbIJo+YXthNZByb8XES6AW6Qs6q+ETrwmK6g6+hxtHy3B287kMdujxewGC0h0FtOGbXM/mE6ZfBK7J9WAPVnTmqI40MRQd8ttAoLSQwRte16VV46E/mmk6ByIkIGcI5o8BsNMNygudu4+spYCzhjBzVNhF1moA5BuGpDZdvUudkAAAAABJRU5ErkJgggAA", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACVUlEQVRoQ+1aoVIDMRDNmQ4zVNWAqqpvPwGF6cfwRwj+AYPiBxB1iGJQ1DCIA4EpkzST2esl2bdp5uhse6rlNsm+fW93k5TG3F1sjYKnOQMBWGwux85qezPZWT++A6PiJnSu5vlzN+93G4whRsIkZGBsOWtX5PRyaoJzHrT9Th3lIqAUyHIal0Dq79aaRpNhjIvqIe8hRvYXcBL6J6dTa+sDIoqyVE5emi6BaTInPodKR6ocV3Ca2cPP8TbE+U7U63tfvjNJdAaSCs749te9ajcjY1ZYHbJjnL19ImPWLxMzuLSOF8jcmPGVj/KTjxoW6GpWlhHbr3LbnGa28skOyqCad4KJMGlpAbL4+HLlty2UTTZRffkM0tyM4jK1dhlFYNI61j5CwGHSUg2EoVqQp1VMe9KKVDCss3utBx1XBoo0RBqRWHNUCKRWlPfZqyAuJy36lEjL0S4ozXSLUmtHsL5esBcXrLTUADGM5KRAqUICewzjb69T9mjNMqIHSCxZwcLQ2dInzhpILbA50rn3ilz0dRhJnSVQCSBOldj0qlZkEp1AXD5IJQDKLASxYI1yRpC+UeCQRFa0Gp4uEC5iJRcLvTlTTGYY7jBitydc1YoCQS4fyElQsp1Bm6NYWqqBHLIF4aSKvq9y1FUDxEateKuRK9GC/lMnR1D+hXYSpqucR4T+weZqgMCI7e8j+0ddbtMomXxI2xMFQqsI0s09JT2t0y7vf7xh734Zet1Rl/nviXAeQZIPOWAhNjm/Y+NF0lIDZJDkFTRB6o+IkUGAFC5yUkD+ABxmHF0pGTBXAAAAAElFTkSuQmCC", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACkUlEQVRoQ+1aq1YDMRCdNT2cQxUGVBUePgGF6cfwRwj+AVPFDyBwiGJwGBQgMOUkpGWSTHYem27bHKqgO0nm3tx5JNvu/O5rBTv+TK+/4eNt8uvFU+7M8vGE9bBrEohjxn08OwQzLC2cwQXNODfs5XkGq8+PXrMqO4IJmJ4GMhZBKpyXgueRtOYzgPvXbFTjQIwS8DS5sYWgjWhUrGEOdp9FKkpDoJ5ek38gHINc3t+MDzJTJQBCmuYdKQHZZKfFBPDf2L70fQqulN6p8WnW6h7e/XQ4Jauy1sEAsbA5RmJQS6sZIFyQk89L9aDve0mdQYstzy6BigvsjypGikClRdDEFMBovZa4mo8NxBzAiZzYmAvAuPW22zTWlBPTd2Eg3fGUbOntMdIKEKlsjGERDUvriNuV3sq+rROiZV4cN1lBdIcr90EHrEhalgUljFvmHQRk7RSXRSTOZ4coZRH0KT3cG6hblKhDpS4fFAGOyWDjSZG1omqOMhidtSq0F3sBpIq0FGdybj3Xa1E3J4BuVMgd4SYWxcjOgOCFFU6IQHFGzHrmplG1IxUI4NYrSgsRNFxa+wwkVUJU0LT1gJOV4LlZWoK5RSZs/RDNAmCWlnB+1qwZIBRSEhyRtXACyKTFNY0sxcjA0gj64dI2B/daSUFk2/hmgNTStIYQia1aWs0AkbAjDmDJZMJ4SdNv1RiR+DnYJgBd3h7I6+kiYA0QuDnKfjCQ3R0ReZtlez77u6+9CowSb2PZeYQGHQUEH1ioeUqXZKVjKOlLAnRzSR1Au//XL3KKl3L4qNs2EOF2erPCC3xuVzVLOFsqU0VHXXJHtKtI7dO4GRgzWHJ0jEgd09o1A0QLXGE/7o4oHNOaNgPkByraUV1nyKcLAAAAAElFTkSuQmCC", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACaUlEQVRoQ+1ZMVbDMAxVlj7eoxMLWxY6sHXgAkwsuQUX4HQsTBwBrsBEl05lYSlPrhPU1o6+HDcUt5kCkWV/fdn+Uit6uliT8szulprJn3+vzkA0DuZE9K4Z5fuexMj04ZtWL5OkVfBYfrTxyBzS5gSANLWLXPW6pJvbDzj6XcQXE5pe++gvNuzx3yv/LtMOjb5jkse3KSvSN4kRGNWIhmcgIwYbmkpnpKlp9vkGOUNyHXKUYHRCQIgIliixS5D/z4/lgpxvTjnkznGna1aJcoxAqsupi8b6a4UzkpDbyBBk7yUzgkqN2ELd4gKXo7SXl6uWloUDYXny/CtLgps9toFTNrakwY93csYgTE2MDE2n3v1gCEBoHacJBDlhyBDZzp+1CAvMYWIEApLRKJjKkYuycCBN7QoqdyHeX8GicY8McQKhUiMpNRGJwje8ViEOPc3UmxvYQ2pqFQOEDPVInxxp622Lom39qYwhqfU/gfjOiZQnHBW4HkGO3pR7JuY31kWR0l2O7dNaVk2kYpVADaC3NnsxQHg/uIeVr3jPmloqJYpB5CiOHr/BCtFA9dD1WseXDwROrR2q+3q/e+VqYhEVKodtjFj5HsPeB6N8IHBqHTDqebooR3D8ZgGiNuhSNqqxDWohW5XxTms9+p+nLb1byyoy2JYPJKi7xO+KXALzwyWx9r6rpkMEdPN5v+gY7k27dYS68ey0NcjAuslFTLhqTsoGoqHP9X0rnUSvufMfKfS2VLo3hjZ761hOLNtFSD7vLs7tLZ/fscBY0qxMIMGIK1HrTTNxyrGdxsCQlDUxMmSiQ48tBsgPuYHEBSsT+RMAAAAASUVORK5CYIIA", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACT0lEQVRoQ+1ZO1bDMBBcNzzew1UaOje4oEvBBVLR+BZcgNPRUHEEuAIVNFShoXGeHGPWQvuTHJPIpExkWbMzO7vaFHB/3kIGn+IfyJGxODBSXJTQfm7TjtdUUDx9dHu0mxXAw2vafoan8wMCTTWKoGOoi2wqSziq3juGn6jvp2QES24At1mNJKSVk0a+YgAJ0KK0Tg6IgUX9Uhc9gHgD6J/HpkGxqqoj9d3eieBFj2HulXkCCSZaU0H99swHeN3/bGSsvP3qHtw+niUTOGIkGyBdLXEfVJEduKvr+Sq0hpoQkzZGNBLSrPFPuwYoL9NklicQSVrB5HQMoCSfMoE1MvteI9uvxrWEN84BbjlA/sy1jAaQzIiTTVRBw7nl5RmnVOp9ywEiSssQTYsLkWsJJn8YYW5vXK9lktYEoGVp5QKEu4bWN/19JMQ3E2W/fkzCHvE+8arrzn5SQLhEHIBYG0LreoUbyDniNgm08ZgRU6thLGgKDPslxL7jOpILEGqmxOaIOpT8QhPbga2Cld13sNhkN2FMzKe8gfhzYI4RTW3QXMi07OlcK6S9Qw4fEuWEjyt2v2LTqA0l1RW4743zsNBWJBA8eRcHdHhnLspUOzNBM5k/EBzkQ9eRYAIbmlF31vBcy/v/zwfCOpWQwFThS+qUswVCGdAvaSmTc4jyez9t59ypZzJ2dCrar3gfSbHfiGejC+IygWgkl1rNpavuiGVvEDGl/eK8ic0HfWXPBgiCHN1raWQWkey6qy6xcVBayC6jZr8xIJhn4u33yIDsAOFH4VsPYGAqAAAAAElFTkSuQmCC", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADGUlEQVRoQ+VavW4TQRDeIxICkiJyUERliUgoKSjyAAilQghX8CL0vAyPQEUSUVnp8gZBSEGiQkg5uUhCRRzNRnOeW8/Ozv4YOetrfLZ35+ab+eZnb7dpPj2dGmPM9GBgmnELt2Z6dWk/7TUamvbhy9l3Y8yPn3/Mi+fbvd/wC/wH1+6zS/P994a958ZKMlzBW99OOp2a9Y05/WB8Uw0Q8/GR9YhFejC4M8bXXz2jtO/fsdYv+SP1JMi9ebzTiR98ObT6zbGFKNAgEATD0SwEBJUACtF7fM6Dv+f2lioXYwRKLaS71XfczihXJRC0kkuzkEdirJsyNo5ao2Eva1FOckBy6QKAJBnwH1IRgISuWYxUA0SArKWWrzZwCSBkYeqxzbVrM/n3xE7ZPD7rMtjFm9cGvdW04w82/fou6mLNw1PH5FJ1dYBQF0sth1QzNG2LRD9NOxP0yL0DEhMLGguFYsWVoU3FPrmdR3KU45SIledSi87XgK4PCLhME5Q47n+uR0I0tQ1kqI5ohJQYI7XxoXamLiCnn1/Zyu6jisbai16PaLqOpaGWxmDuGJrNVgeIr1DmNnmhAJaei+sUOqZIHUGXL6qN9631WWrFVmKO00sBJCXYSs6JoSrXKS9NsBcFgsJg3UHrCv09VHN8DSTMk16jpi6HkRVJHllEPMV4hKN0PUAmR/u2RaEpLtbii16PuB7gnpfkkZLZSlrra56DsbVaQHIDkVo99Y281AH31iOgLL7uCe02+fqkEjKowpoV6xy1SihRQkY2ENfKUmGTFmF0XqoM0AUsDcxwM6qPDb1gL6FECRnZQDTpLjdd0meUSiI22EMFUVMcQwUxt4/SGLgeIOxmKDkwoN3k0VhN02pwcujW2+TtHrsl19ue7lpi53SBC0ZDN04h6UW5RD8LZDS8E+mcAeh0ph6pAwgg9qB1PRL7hiOFdnSOtKuLu88stawQ4kptnIQol0otUAdOP8AFB3644xwVAomgFlZe+NS8M6Zrfl/bIdEP5sO2dHcxgd95xHcOCuJGSy2qDO2VYrrqUPr1Aa4GyC1jmYjdHA3qDQAAAABJRU5ErkJgggAA", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADc0lEQVRoQ+VavY7UQAyeUPFzBVoQolqJk/h5CnQVQmwFL0LPQx0VCF114ilASCBRISRWVxyigkWei2e/OPZ4Jps9kZDmsonHk8/+7PF4rmle3d6EEMLmaBGa0zXdhs3P8/g3XqtlCG++bu9DiHIkT1e8l/KKjKY3zZebW8zR3DjQ55sNkPDyavRIRNpaOXlg65feHcmzJy35jgwJs2eFtpK5ky70PuhpGAiD0WiWU4If0aNZOxECUunbGjIZppROQOt5AmFP9VxNAe9Qw6NZKX0typZTa7XsZC0cqCppwSGdzIwC2dDSJSnX05WJ12ikFCOzAeIgzr0+e/oovv5z7TBc+fVZvaeHi9dvVTU0nsbSxeNvvvuwlV0tw9nv6/E3PWev/njyOOnsBHtnFoiL9fNnO8Dcfhx/7E7KjMH/ARBAvqtH0IifvnyPPx/ePU900oxMcvfv3Ymv8N7ypu2RqQFJtZZVKIYQch6h4MRA9eIAkwFal59//HZR+rA3OAF4evWVHUBhRvGCtIQCng6PZpjZENw8gVjW0qjFQYsU4MDkYNZownOM7b3kEau8oNJ7zKxlGQuzGcnImLBii/XND0hvVYdNkPSIzFRIIY1ynjWHJACZzZpw8iDuEOXuDavUHLXG5noNKJx7RkDaPTtZwtq87CvYc5RD+sqFU1uA3RKFwFG5LOslrQ6yaGalao9GXmx1qQUe0RRPDwg24gSiXNbKWXVxdNzQ+/Xpi4uEkrk860tG0G9cjDtbXavvNC0ghrW0ojGXcjXL4qptlS1D46i3sl921pLGqKGWGstqp1G0JfeRfscHYqzsiFoDkuuW0NjaFV9Sq5a+5jqCLRcv44zxfii12ADzA2K1KClr5TZINd6wyo4aHVKWPemWKFagW+U6g6Z2j2cAj041aXveQCTNatJvSTaT5YVGLfIGeZWukm2v6pFpA6koGncJTrm30Cw+RL/bxKZ2vmz5l7ha9m5L6DQEgFprdRS1xwqTBKJtdWsCvdaiXvplfXhAhNU4Ph8U7LV1FH9QbkHMlfHxg70DWax+E9/Ev0lIr/zbQCqyVm2Ho5ZyUt46e8Q9lJu1anq/nqeGUos++NbJ+4iP/oFHi+UZAqmgFm+cStcGPI2yyo4c/Wi8PK6O8tCf3ls3HmulmopYA5SLkd6COPb5yGUD+Qt1btTdLNGXAgAAAABJRU5ErkJgggAA", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADN0lEQVRoQ+VaO08cMRD2pkpECnJBERVSkCCUdGkorkShgj+SPn8mPyEVD1GhpEKioEiRCCmREAWiOFGAkCg4NL7zZtY3r/X5Ds7ZarXr1zfzzcNjV+7zy77L9WwtObd7Lo8GbeBh2lVzr/3v/u2NaVWhfVUMkOrLgtdIv9v5JyVOsoQ0QSKs9HJKn5sb1u2cUzUiLpRQvkQNaSyNUvh//d7tuOqo958ASZWsyUKhUQv64jG9Vod0wg6jcoerA68FXoTjdEauNwSkjIvXQ9EJ22ZBQJg40tv+5BX14u6Pmz/4NcKY6801/+3h1bJvE7+/+XFRezPNkGGsMEcYl5qTpO1Qq1XvaCdfQGQMBAM125Bz7uzvlW/+8fTEqdQqHkiQxsr7dyNChH/U97ghpQlpXE5bnW97vCI1as0sEEnKGscD6A+LN+735SDpw+/jaFVyOD41GSaZUzF2C52oNliAnfufA3qhrBkHx/KBaHSirA/6QFyxPtY5oB3EJXggmpNJI3a/FgrAYJw9WbyZdY5YGMFzsblWMUCu99d9ZJcoIVFAolOq9Kl4VFML7UEaSePx1w0PxBLgKO5b3HZwyfEcGKgGmg2KISAWA0SjlsWArV4qtZ2UokwsIFIpfRuXTIH1QLTiQ+7sd6aA5PJUEwuIVg4/ayB4cZZUIzeFJPeLjd0U2a0aidtxi9BiAx5HohkAmcpWd+aAcFKzGm2qxqGfGtlT3K/FhrRFa4EWzzGxgPgsgeBcq41xpkpcm4OiqSmyc7lWbvcagHMlIin7Nu0QiwGipfGcPWgeDPYgqXscNnEcln/IY4VigKS43zgi4x1gm12f5DBi95s1smuBD0BAhZGrAUB/qhIJfaQ9y1i1X65uJRUqnhRI8FpwsIIPWfB7OPTBLpQrKGjxhStgSJr05dKoVBoX6xrH09z5XgwkZbGhjxYQJY8F//ARd+Md33woBggljbba0KrqnDa1/QjXb/QuytZSfYsAV/DAViiPonkwPDE+PwljxYFWotzbw+/NayJURaWmVjFABAuW6IVjA05JqNTGUl7ltI+Pq6njbvJSTXz5pa2djOPVsHcLgjEFROq+1iwCeQQxq65kuNKZ2wAAAABJRU5ErkJgggAA", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADYUlEQVRoQ+1au4pUQRDt1kRxAxlFjBYUfIR+gMhGIm6kP2Luz/gJRrvKRoOZf6AICkYiOGzgI3OkeqYu5/at6qrum8w03mjgVj9O1elTVbcnhheX1sF4Vs+eWibV7z99+R7u3fyZxn38dhDu3LqhzrF4fRrC8eHm/cnXwS5eOQjrX5s5Yp9ABNSEthQR8mzJm5qbL/z5HP5evu2KZIqI9NB+txEaRYRCRQ+Fi3//ePzItVhuRBslytBjAZWcgUA1auGa/QCJL6+nw86HRnK/RC3yGD1Ij1aaWSGvptZoQjgvOZASvwmMh07W5vE9AkGlUqnVDRD2PHn86tsPAy5vHrFyA0bSUi2kaU4tFCXeZFwtn5sJsUSDms3V0GlCLSU1/AeSexUpYKnWHJEQlQsT4lxq7QyQ8zcP0hnJywXOE5SdubizSgrrAEvZn9eW8hLbu+T3/auHCUipjODc4AGkJUpeoyXPqAkRPBO7ATL3jLRKas04LSKjfqQFiKVO3k3W0Oza2bs0rVYTNiXEnQRiqZZHqbjvIDFge0nBPA6QopSXTFJNqB52b9hr8ghtQJvXUsZcgnOa9QMEqVVKSpo3a5OgVwjQrkitreHosHvp1LIZGjMHdFWt1Q0Qi1qtkeBxmmpZakY5pPRNgeYfUasbIJbHpYoYq+OaStlaa9IhYoEI39+GDlFLiDULWbZapNEx1rdfqU9P625b4NgNEKuMr5VMqx+xoqe9H+QX2lu0NYvGktLQRFhflZImvSvVbSWhSQnx4u/NvrVrBauM32sgtXTKywnL+y30stpd8bBbCaplI3PGuL40Sqq1l0As1ZI8WQtUa5akiyDp0I8ikqkW5xfXV5QczE4C8agW3r4SKMrCNV6ecz5orHXQJ0UjLzhHtTQqcs7R7hVLra7rDlGKyF4CwXv28yf3k0MpA+Ohs0KLF0ScvaUxZIfz1qxh0dP1h4GhVBaur9dHi0nZQPZ4xZ1sSuUF/YNBsZnMBVfnuHb/QMT6n2v/5UpvPT025ObjwxCXqxQotY3F6zZj3iEi6YOwgwJp4aOFuonBAQWbJJewHgGSwEj/xNDW7g9Irgpqa8mGHgqBjUUhk2a4QWHtGM7ubq6ntYbFUhSkkKZgW8omCmn0BRum77Anpb5CmnUD5B8Qb9YHdxZnuwAAAABJRU5ErkJgggAA", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADB0lEQVRoQ91azUoDQQyeVRB/eihFxFNBwZ+DzyA9idiTT+Ldl/KkiCcfQxEUPIlg6aHqSSsZN2t2Jtn52V1pZy+2NTOTL/mSSWY2U2fLU+V4RqcnWuLh6VX/3ducqPuXDvv5e2XbNV3w/3sXV0oN+7/jLp+L8dlaR03fJ/p7liYQBjWgRY9wpgQv7WxteFl54fMxypPaI9wD+uYeKnkEXAUPuAs/vx0deinZphAYoLv4YVGLrpkOkOx8XQc7Bo1p2fHxvmojgCUPgvXhoWsGU6s0eR4vo6UDdk2awSSgVMZUTgKCY2jcUSA0U4nUShNIjkqiFkeB2ICn2UzKgKZXMBxAv/I+QlKZqVBV+o1Vvulxf1krGSCmicjm6OsRn82RC+YmvCOXKPMMhO7s1Eq+HmnCsqFzoIedRWObG2ITNMPsmT4QSrMYaoGlqkobn8Tgs/tb1JK2fpgsBkgdRUPixKJWMkBEKwz7SiocQywXIxuSDNhgN70TQ60YxeuMSQeIq7GSgt2nH6lj4dCxzhJl/LVau0OkXHfx3qc94GTSARJLLZfrzaOfOq2uay3dWCUDhDtp/K/064oXH0+gTBEj4s7ObIhSHeWqr6hiAALOkH0pZ46F77S/Tw+IRhxx9mtailqpKpWGeM+kGJ3X7keMw4e6ZXwIvznZqgNveqWBrYJ4ijK/QAQThrS6Pj1IW6VNI0Ujd5Ple2dSl4JW+qUThu4jsweEyVpNnv3WyVQuz5WplQwQAXZTHaKUDOguj6kVYiykhEnwEDul03j27LcCIDIRqWfe9Um/4zi8pOle31mkhv9xv9PWu3T54/PCQJGrmevr6aBnvY0A8vSKW8vAI721AG8wCDLWXOTqnK7tPPs19xdWSUPBmQIi0gzaytuReJ2NFXSlTF5pgwyCZhMm3Q7yz9K85X7EgwJ64UFPg+GUKAxQIQPjdPWQrycqJ1CZWzs9IKZrpdurQs7hai1HZFwUctKMKsisnamb3d/3tWIzCqWQlMEohST6Ehmkb6GT1PSRtZMB8gMpviCX8ubblQAAAABJRU5ErkJgggAA", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADC0lEQVRoQ+1avUokQRDu0cTjLhCVw0jw4NTQBxAxEtHIexFzX8ZHMNKTjcTMN1AEBSMRXAw8L3OlerfGmp6qrpqeOc9tnGiYrq6u+uqve6oLtzc1cB/0Kb5+85IN/jyJEiJNkY0ixf6ct8hgY8a5o9uh5jsLb+8UC/gOD9LhmPR9NF4i2/EawBetpVqEElOdJLOr7kCVlt4ZR9LWy18RFVkBtUpgKi6nWpiZL3qI6y0Nsxb4fUoMSPHknAvB8EJAnHBxFgIT8KW8OJCLfBQR6sjj1orH6OXLDzdzeCzmcaADGnhidDDe3912E3+vS774Pn1yUeNv5jvyoqJ/+uvDFkStTl/d3Lufi9892aciGlrSOHUtjQcgDg+ijvT4fXn+qXTrd7fIWChCfVZDWxuP8eLAMFmkCYpUQMk1NCVSxvNR5PxgzadfGlBgAawNXQStxIML2hRr+PT7+HvVK6IJblnAAoCFT4wG1ri8Gx64KPj5KIKV3YKmFvRSpkkJepgDdULzFpSpDHYqRJdptI0rWQBAmnwU4bJWGxS1udq2I8yeZtfSspbFzTjhpJjT4iy1oKpZa2wUoa6VimwTlLXiGO50OXp2r5WNIjRGukBWC/a241LsFf8qa0kFTctaliJID1jlUTcbRbT02yQ4LducVNeilmSPumgRev7Vtu6w+9SyiyVt4zocAOF8jF9Ym7pfudfKRhHc/TZBsI17aJaMWYlbt7ZpDImk4gh0kmtJ7tD20Gb5ESGe2bNRpI37hMdQC6+UYkyThOkvikUQWqT+qyKWGpCCWiyVcz8RmoBGaTu3SKogbeflowjts0MjBh5o2NB3RIs2f9iGzeRzpXVN6ZGv2N4bLYJttYfN9UpTiDaRKN/Z3pmfWenqVnpzXD+xQXPSc7f23yM3G0KXq/TWpT57Noq0DThv4sj9Eam1rM2LyVW/i7Kz4IrTvp8Tu8SCi2o0KigNronUAOBcvAz2bBSJQdhh0KpxSOUQ1uUvDDB99pgvqy5D0mh5c8dw78rKt0aHfXbuvtY4KvIKckwVTaEtlvAAAAAASUVORK5CYIIA", image: null});
		this.gridImages.push({imageb64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADKklEQVRoQ91aO0skQRDuURAfG8gqYiQo+AguNxOjQ87ofsnl/ikjRQyNDQwMFEHhIhEUA/VA8Faqd3usqa3q6ocTTE80O9PbXV/XV8+eyvyZHhjlevr9yzvi5u7Bvt9cfjHX9z32Hh7Cu/XVpXquiX+39p4+p4v1D4+N2V8ZPj76W7+u5npm8Ppif1dlAmFQA1qnEbeD/2fW6l0BbYAm4MLPJRVi7YWMh3msRrgL5B1pqKERUBVcoC53//hzR2Me+x5AO5phOqVMJlELz1UOkOpg0Rq7MxpuxzRjj9llRy1q9D6aRVOrIdDIXp6mfrBycgLFAIoZCzSdP7kaeifkqURqlQkEoUqlFo4TMF2O0WN6YafkxPwyduTKqNpTgcTSR3LhcV6rGCB0+0bG/vwxWwc6HBCl+1AtwP9bC4icsXcSCGdEkn1g99u2KxbjCNp5NWl83tsKpgAA4rJbjUIazSgQv9cSyN15ILlJY6jRh4yzkX3ybTgU1SNsZJdCf4xGqFBtBcR6HS6NLwaIqOL9FcMljilZLF5DKsi4eWl6wmXqrNei2qEumHqnEJ7njEn2Wp0E8h2FlRYcuVo/RkN5AZHJtfDiknCpQvuyAwBSB8HdPuuC5cjeNSAatdqqRWIchkStRoOuGCBcp1HzWjQe5JSwoUa/cHpmhzZiSExkh56r1EnhhJACJYzVerzUmbiseSzX4vrATiNSitI5IHY3Enq/odTIHccaPNv7Jc0HXLw4z9VWJah5MNygkzZcbAd1F4hH91osSY3mbsnYUpcTNSn79S3sy7s0Ckl7OZbGQ5pCqsVCgQjndDGHPbk047QSf6xQDBBmO0IMPeWITbIXKTMI7qLYYMi0WnK6KG5fpONrX+OOAq3pJcQ79Vihe0BGx1o0wwzp/eamH9r/80pdNHuIncRmt5rw+H2j1EVH5wNU9qpNbJiw00C4XEvaxdRmXWjMiWrQ2XqECf0hxi59HKMJGlqEUWp5c61igFCUvmMFKWn8zu9P8FzbF+csq5ufOZ1uDL/Xkr6DmusZLtfCdAr9OggLB//RTrKc9P33yzH5XJhwG16ZQoB8AkDYWczDQZIpAAAAAElFTkSuQmCC", image: null});
		//this.gridImages.push({imageb64: "", image: null});

		for(var i = 0; i < this.gridImages.length; i++)
		{	
			//console.log("Hoera");
			setImageValue(this.gridImages[i]);
		}


	};
}

