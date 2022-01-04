class chart{
    constructor(CenterX,CenterY,SizeX,SizeY){
        this.x=CenterX;
        this.y=CenterY;
        this.sx=SizeX;
        this.sy=SizeY;
        
    }

    show(){
        fill(255);
        rectMode(CENTER);
        rect(this.x,this.y,this.sx,this.sy);
        this.Lines();
    }



    Lines(){
        fill(0);
        line(this.x-this.sx/2, this.y, this.x+this.sx/2, this.y);
        line(this.x, this.y-this.sy/2, this.x, this.y+this.sy/2);
    }

    Text(){
        fill(0,0,0,255);
        textAlign(CENTER, CENTER);
        textSize(32);
        text('Lange termijn\n Hoog risico',this.x+this.sx/4,this.y-this.sy/4);
        text('Korte termijn\n Hoog risico',this.x-this.sx/4,this.y-this.sy/4);
        text('Korte termijn\n Laag risico',this.x-this.sx/4,this.y+this.sy/4);
        text('Lange termijn\n Laag risico',this.x+this.sx/4,this.y+this.sy/4);
        textSize(28)
        //text('Doorbraak moment',this.x,this.y+this.sy/2+50)
    }
}