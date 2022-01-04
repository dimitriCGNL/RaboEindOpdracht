class point{
    constructor(INFO,Chart){
        this.STATE=false;
        this.IX=INFO.loc[0];
        this.IY=INFO.loc[1];
        this.X=(Chart.x-0.5*Chart.sx)+Chart.sx*(this.IX/10);
        this.Y=(Chart.y+0.5*Chart.sy)-Chart.sy*(this.IY/55);
        this.info=INFO
        this.CHART=Chart;
        this.color=INFO.color;
    }

    show(){
        fill(this.info.color);
        this.D=27.5;
        if (animation){
            this.CS=this.D+10*(Math.sin(0.125*0.5*T+0));
        }else{
            this.CS=20;
        }
        circle(this.X,this.Y,this.CS);
        T+=Math.PI/16;
        this.CHART.Text();
        if(this.mouseOver(this.X,this.Y,this.D,mouseX,mouseY)){
            this.showName(this.info,this.X,this.Y);
        }
    }

    changewindowsize(Chart){
        this.X=Chart.x+(0.5*Chart.sx*(this.IX/100));
        this.Y=Chart.y-(0.5*Chart.sy*(this.IY/100));
        this.show();
    }


    mouseOver(){
        this.distance = dist(this.X,this.Y,mouseX,mouseY);
        if(this.distance<=this.D/2){
            this.info.color=this.color.map(i=>i-50);
            return true;
        }
        else{
            this.info.color=this.color;
            return false;
        }
    }

    showName(){
        textAlign(CENTER, CENTER);
        fill(0);
        textSize(16);
        text(this.info.name,this.X,this.Y-25);
    }

    changeState(){
        if (!this.STATE){
            this.STATE=true;
        } else{
            this.STATE=false;
        }

    }

    showInfo(){
        if (this.STATE){
            textAlign(CENTER, CENTER);
            fill(0);
            textSize(16);
            text(this.info.name,this.X,this.Y-25);
            text(this.info.beschrijving,this.X,this.Y+25);
            }
    }
}