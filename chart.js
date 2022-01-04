class chart {
    constructor(CenterX, CenterY, SizeX, SizeY) {
        this.x = CenterX;
        this.y = CenterY;
        this.sx = SizeX;
        this.sy = SizeY;

    }

    show() {
        fill(255);
        rectMode(CENTER);
        rect(this.x, this.y, this.sx, this.sy);
        this.Lines();
    }



    Lines() {
        fill(0);
        line(this.x - this.sx / 2, this.y, this.x + this.sx / 2, this.y);
        line(this.x, this.y - this.sy / 2, this.x, this.y + this.sy / 2);
    }

    Text() {
        fill(0, 0, 0, 255);
        textAlign(CENTER, CENTER);
        textSize(32);
        text('Lange termijn\n Hoog risico', this.x + this.sx / 4, this.y - this.sy / 4);
        text('Korte termijn\n Hoog risico', this.x - this.sx / 4, this.y - this.sy / 4);
        text('Korte termijn\n Laag risico', this.x - this.sx / 4, this.y + this.sy / 4);
        text('Lange termijn\n Laag risico', this.x + this.sx / 4, this.y + this.sy / 4);
        textSize(28)
        text('Doorbraak moment [jaar]', this.x, this.y + this.sy / 2 + 75)
        text('0', this.x - this.sx / 2 - 10, this.y + this.sy / 2 + 25)
        text('5', this.x, this.y + this.sy / 2 + 25)
        text('10', this.x + this.sx / 2, this.y + this.sy / 2 + 25)
        push()
        translate(this.x - this.sx / 2 - 75, this.y);
        rotate(-1*HALF_PI);
        text("Impact klasse [-]", 0, 0);
        pop()
        text('55',this.x - this.sx / 2 - 25,this.y-this.sy/2)
    }
}