class point {
    constructor(INFO, Chart) {
        this.STATE = false;
        this.IX = INFO.loc[0];
        this.IY = INFO.loc[1];
        if (this.IX <= 3) {
            this.X = (Chart.x - 0.5 * Chart.sx) + 0.5 * Chart.sx * (this.IX / 3);
        } else if (this.IX <= 10) {
            this.X = (Chart.x) + 0.5 * Chart.sx * (this.IX / 10);
        } else {
            this.X = (Chart.x) + 0.5 * Chart.sx;
        }
        this.Y = (Chart.y + 0.5 * Chart.sy) - Chart.sy * (this.IY / 55);
        this.info = INFO
        this.CHART = Chart;
        this.color = INFO.color;
    }

    show() {
        fill(this.info.color);
        this.D = 27.5;
        if (animation) {
            this.CS = this.D + 10 * (Math.sin(0.125 * 0.5 * T + 0));
        } else {
            this.CS = 20;
        }
        circle(this.X, this.Y, this.CS);
        T += Math.PI / 16;
        if (this.mouseOver(this.X, this.Y, this.D, mouseX, mouseY)) {
            this.showName(this.info, this.X, this.Y);
        }
    }

    changewindowsize(Chart) {
        if (this.IX <= 3) {
            this.X = (Chart.x - 0.5 * Chart.sx) + 0.5 * Chart.sx * (this.IX / 3);
        } else if (this.IX <= 10) {
            this.X = (Chart.x) + 0.5 * Chart.sx * (this.IX / 10);
        } else {
            this.X = (Chart.x) + 0.5 * Chart.sx;
        }
        this.Y = (Chart.y + 0.5 * Chart.sy) - Chart.sy * (this.IY / 55);
        this.show();
    }


    mouseOver() {
        this.distance = dist(this.X, this.Y, mouseX, mouseY);
        if (this.distance <= this.D / 2) {
            this.info.color = this.color.map(i => i - 50);
            return true;
        } else {
            this.info.color = this.color;
            return false;
        }
    }

    showName() {
        fill(255)
        textSize(16);
        rect(this.X, this.Y - 25, textWidth(this.info.name) + 5, 20);
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.info.name, this.X, this.Y - 25);
        rectMode(CENTER)

    }

    changeState() {
        if (!this.STATE) {
            this.STATE = true;
        } else {
            this.STATE = false;
        }

    }

    showInfo() {
        if (this.STATE) {
            if (this.returnButton) {
                this.returnButton.remove();
                document.body.removeChild(this.ifrm)
            }
            fill(255);
            rectMode(CENTER);
            rect(width / 2, height / 2, 960, 487.5)
            this.returnButton = createButton('X');
            this.returnButton.position((width / 2)-(960/2), (height / 2)-(487.5/2))
            this.returnButton.mousePressed(function() {
                window.location.href = "/";
            })
            noLoop();
            this.ifrm = document.createElement("iframe");
            this.ifrm.setAttribute("src", "/view?id="+this.info.id);
            this.ifrm.style.position = "absolute";
            this.ifrm.style.top = (height/2)-(437.5/2)+"px";
            //this.ifrm.style.top = "268.75px";
            this.ifrm.style.left = (width/2)-(910/2)+"px"
            //this.ifrm.style.left = "505px"
            //this.ifrm.style.width = (width/2)-50+"px";
            this.ifrm.style.width = "910px";
            //this.ifrm.style.height = (height/2)-50+"px";
            this.ifrm.style.height = "437.5px";
            document.body.appendChild(this.ifrm);
        } else {
            if (this.returnButton) {
                this.returnButton.remove();
                document.body.removeChild(this.ifrm)
            }
        }
    }
}