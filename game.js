class TowerDefenseGame
{
    constructor()
    {
        this.level = null;
        this.towers = [];
        this.projectiles = [];
        this.enemies = [];
    }

    selectLevel(level)
    {
        this.level = level;
    }
}