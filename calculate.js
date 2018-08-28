class TowerDefenseCalculate
{
    calculateTurrets()
    {
        for(var i = 0; i< twdGame.towers.length; i++)
        {
            twdGame.towers[i][twdGame.towers[i].methodCalculate]();
        }
    }

    calculateEnemies()
    {
        for(var i = 0; i < twdGame.enemies.length; i++)
        {
            twdGame.enemies[i].calculate();
        }
    }

    calculateProjectiles()
    {
        for(var i = 0; i< twdGame.projectiles.length; i++)
        {
            twdGame.projectiles[i].calculate();
        }
    }
}