import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  rectW: number;
  rectH: number;
  context: CanvasRenderingContext2D;

  peoples: any[] = this.shuffle([
    { name: 'Christine' },
    { name: 'Clément' },
    { name: 'Clément' },
    { name: 'Diamantine' },
    { name: 'Edouard' },
    { name: 'Emmanuel' },
    { name: 'Fabien' },
    { name: 'Florian' },
    { name: 'Guillaume' },
    { name: 'Mickael' },
    { name: 'Milio' },
    { name: 'Olivier F.' },
    { name: 'Philippe' },
    { name: 'Quentin' },
    { name: 'Régis' },
    { name: 'Shahnaz' },
    { name: 'Sylvain' },
    { name: 'Thomas' },
    { name: 'Ubald' },
    { name: 'Frédéric' },
    { name: 'Olivier T.' },
    { name: 'Stéphane' },
    { name: 'Thomas' },
    { name: 'Adrien' },
    { name: 'Charlotte' },
    { name: 'Fabrice' },
  ])

  @ViewChild("myCanvas") myCanvas;

  shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }

    return a;
  }

  ngOnInit() {
    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    this.rectW = W;
    this.rectH = H;
  }

  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");

    this.tick();
  }

  tick() {
    var W = this.rectW;
    var H = this.rectH;
    var ctx = this.context;

    //snowflake particles
    var mp = 250; //max particles
    var particles = [];
    for (var i = 0; i < mp; i++) {
      particles.push({
        x: Math.random() * W, //x-coordinate
        y: Math.random() * H, //y-coordinate
        r: Math.random() * 4 + 1, //radius
        d: Math.random() * mp //density
      })
    }

    //Lets draw the flakes
    function draw() {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      for (var i = 0; i < mp; i++) {
        var p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;

    function update() {
      angle += 0.01;
      for (var i = 0; i < mp; i++) {
        var p = particles[i];
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          if (i % 3 > 0) //66.67% of the flakes
          {
            particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
          }
          else {
            //If the flake is exitting from the right
            if (Math.sin(angle) > 0) {
              //Enter from the left
              particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
            }
            else {
              //Enter from the right
              particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
            }
          }
        }
      }
    }

    //animation loop
    setInterval(draw, 33);
  }
}


