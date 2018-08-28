class TowerDefenseContent
{
    
    constructor()
    {
        this.images = [];
        this.towers = [];
        this.projectiles = [];
        this.levels = [];
        this.paths = [];
        this.enemies = [];
    }

    //Load content and images from server.
    loadContent(url, callback)
    {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
        };
        xhr.send();
    }
}