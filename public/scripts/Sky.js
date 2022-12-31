class Sky{
    static CLOUD_COUNT = 50;
    constructor(){
        this.clouds = [];
        for(let i = 0; i < Sky.CLOUD_COUNT; i++){
            this.clouds.push(new Cloud());
        }
    }
    update(){
        this.clouds.forEach(cloud=>cloud.update());
    }
    draw(){
        this.clouds.forEach(cloud=>cloud.draw());
    }
}

class Cloud{
    constructor(){
        this.x = random(0, width * 1.2);
        this.y = random(40, 160);
        this.vx = -random(0.3, 0.5);
    }
    update(){
        this.x += this.vx;
        if(this.x <= -60)
            this.x = random(width + 50, width + 150)
    }
    draw(){
        // scale size with speed
        ellipse(this.x, this.y, 70, 50);
        ellipse(this.x + 10, this.y + 10, 70, 50);
        ellipse(this.x - 30, this.y + 10, 90, 50);
    }
}