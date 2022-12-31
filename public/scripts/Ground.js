class Ground extends Platform{
    static HEIGHT = 30;
    constructor(startX, endX){
        super(startX, height - Ground.HEIGHT, endX - startX, Ground.HEIGHT, "#348C31");
        this.startX = startX;
        this.endX = endX;
    }
}