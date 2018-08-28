class TowerDefenseLevel
{    
    constructor(id, name, description)
    {
        //General properties.
        this.id = id;
        this.name = name;
        this.description = description;

        //Global properties.
        this.cells = null;
        this.paths = null;
    }
}