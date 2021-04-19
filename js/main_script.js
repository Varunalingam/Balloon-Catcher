
    var canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    var balloonslist = [];

    var maxballRadius = 50;
    var vmax = 4;
    var firstgen = 5;
    var minballradius = 30;
    var genRate = 1;
    var genAcc = 1;

    var Score = 0;
    var AddScore = 0;
    var Highscore = parseInt(localStorage.getItem("highscore"))||0;

    console.log(Highscore)

    var Snap = []

    var Rock = new Image();
    Rock.src = "Images/Rock.png";

    for (i = 0; i < 5;)
    {
        snap0 = new Image(maxballRadius,maxballRadius);
        snap0.src = "Images/g" + i + ".png";
        Snap.push(snap0);
        i++;
    }

    ((document).getElementById("Bg")).play();
    ((document).getElementById("Bg")).volume = 0.2;
    var Tick = ((document).getElementById("tick"));
    var Tock = ((document).getElementById("tock"));
    var Pop = ((document).getElementById("pop"));
    var Rocks = ((document).getElementById("rock"));
    var Snaps = ((document).getElementById("snaps"));
    var Felix = ((document).getElementById("felixs"));
    

    interval = null;
    listener();
   initialize();

   var colorslist = ["#1797ff","#17f3ff","#ff17c1","#ff7c17","#17ff45","#9e17ff","#c917ff","#ff178f"];

   function initialize() {
       // Register an event listener to call the resizeCanvas() function 
       // each time the window is resized.
       window.addEventListener('resize', resizeCanvas, false);
       // Draw canvas border for the first time.
       resizeCanvas();

   }


   function canvasdraw()
   {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (i = 0; i < balloonslist.length; i++)
        {
            if (balloonslist[i].type == "RB")
            {
                ctx.drawImage(Rock,balloonslist[i].posx - balloonslist[i].radius, balloonslist[i].posy - balloonslist[i].radius,balloonslist[i].radius * 2,balloonslist[i].radius* 2);
                ctx = canvas.getContext("2d");
                ctx.font = "30px Comic Sans MS";
                ctx.fillStyle = "#000000";
                ctx.textAlign = "center";
                ctx.fillText("" + balloonslist[i].clicks, balloonslist[i].posx, balloonslist[i].posy + 15);
            }
            else if (balloonslist[i].type == "GT")
            {
                ctx.drawImage(Snap[0],balloonslist[i].posx - minballradius - (minballradius/2), balloonslist[i].posy - minballradius - (minballradius/2),minballradius*3,minballradius*3);
            }
            else
            {
                ctx.beginPath();
                ctx.arc(balloonslist[i].posx, balloonslist[i].posy, balloonslist[i].radius, 0, Math.PI*2);
                ctx.fillStyle = balloonslist[i].color;
                ctx.fill();
                ctx.closePath();
            }
        }
   }

    function draw() {
        
        canvasdraw();
        for (i = 0; i < balloonslist.length; i++)
        {
            for (j = i + 1; j < balloonslist.length; j++)
            {
                if (Math.pow(balloonslist[i].posx + balloonslist[i].dx - balloonslist[j].posx - balloonslist[j].dx, 2) + Math.pow(balloonslist[i].posy + balloonslist[i].dy - balloonslist[j].posy - balloonslist[j].dy, 2) <= Math.pow(balloonslist[i].radius + balloonslist[j].radius,2))
                {

                    speedi = Math.sqrt(Math.pow(balloonslist[i].dx,2) + Math.pow(balloonslist[i].dy,2));
                    speedj = Math.sqrt(Math.pow(balloonslist[j].dx,2) + Math.pow(balloonslist[j].dy,2));

                    radiansi = Math.atan(balloonslist[i].dy/balloonslist[i].dx);
                    radiansj = Math.atan(balloonslist[j].dy/balloonslist[j].dx);

                    if (balloonslist[i].dx < 0)
                    {
                        radiansi += Math.PI;
                    }

                    if (balloonslist[j].dx < 0)
                    {
                        radiansj += Math.PI;
                    }

                   //radiansx = Math.atan((balloonslist[i].posy - balloonslist[j].posy)/(balloonslist[i].posx - balloonslist[j].posx));
                    radians = Math.atan((balloonslist[i].posy + balloonslist[i].dy - balloonslist[j].posy - balloonslist[j].dy)/(balloonslist[i].posx + balloonslist[i].dx - balloonslist[j].posx - balloonslist[j].dx));

                    if (balloonslist[i].posx + balloonslist[i].dx - balloonslist[j].posx - balloonslist[j].dx > 0)
                    {
                        radians += Math.PI
                    }

                    U = speedi * Math.cos(radiansi - radians);
                    U1 = speedj * Math.cos(radiansj - radians);

                    cos = Math.cos(radians);
                    sin = Math.sin(radians);

                    Vt = speedi * Math.sin(radiansi - radians);
                    Vt1 = speedj * Math.sin(radiansj - radians);

                    R = Math.pow((balloonslist[i].radius),3);
                    R1 = Math.pow((balloonslist[j].radius),3);

                    Vr = ((2 * R1 * U1) + ((R - R1)*U))/(R + R1);
                    Vr1 = ((2 * R * U) + ((R1 - R)*U1))/(R + R1);
    
                    balloonslist[i].dx = (Vr * cos) - (Vt * sin);
                    balloonslist[j].dx = (Vr1 * cos) - (Vt1 * sin);
                    balloonslist[i].dy = (Vr * sin) + (Vt * cos);
                    balloonslist[j].dy = (Vr1 * sin) + (Vt1 * cos);
                }
            }

            if(balloonslist[i].posx + balloonslist[i].dx > canvas.width-balloonslist[i].radius || balloonslist[i].posx + balloonslist[i].dx < balloonslist[i].radius) {
                balloonslist[i].dx = -balloonslist[i].dx;
            }
            if(balloonslist[i].posy + balloonslist[i].dy  > canvas.height-balloonslist[i].radius || balloonslist[i].posy + balloonslist[i].dy < balloonslist[i].radius) {
                balloonslist[i].dy  = -balloonslist[i].dy ;
            }
            
            balloonslist[i].posx += balloonslist[i].dx;
            balloonslist[i].posy += balloonslist[i].dy;
        }
    }

    time = 10000;
    AddScoretimer = -1;

    paused = false;

    endtimer = 0;

    gameover = false;

    felix = false;
    felixtimer = -1;
    felixused = 0;

    function checker()
    {
        areacovered = 0;
        for (i = 0; i < balloonslist.length;i++)
        {
            areacovered += Math.pow(balloonslist[i].radius * 2,2);
        }
        
        percent =  Math.PI * areacovered / (canvas.width * canvas.height);

        (document.getElementById("Pt")).innerHTML = "Area Covered : " + (Math.round(percent*10000)/100) + "%";

        if (percent > 0.75)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    snap = 0;
    snaptime = -1;
    snaptrue = false;

    function create()
    {
        if (snaptrue)
        {
            ((document).getElementById("snap")).src = Snap[snap].src;
            ((document).getElementById("snaped")).innerHTML = "Snap!";
            if (snaptime < 400)
            {
                snap = 0;
            }
            else if (snaptime < 800)
            {
                snap = 1;
            }
            else if (snaptime < 1100)
            {
                snap = 2;
            }
            else if(snaptime < 1350)
            {
                snap = 3;
            }
            else 
            {
                snap = 4;
            }
            snaptime += 10;
            if (snaptime > 1600)
            {
                snaptime = -1;
                snap = 0;
                ((document).getElementById("snaped")).innerHTML = "";
                ((document).getElementById("snap")).src = "";
                snaptrue = false;
            }
        }
        else
        {
            ((document).getElementById("snap")).src = "";
        }
        if (AddScoretimer > 0)
        {
            AddScoretimer += 10;

            if (AddScoretimer > 1000)
            {
                Score += AddScore;
                AddScore = 0;
                (document.getElementById("Score")).innerHTML = "Score : " + Score;
                AddScoretimer = -1;
                ((document).getElementById("snap")).src = "";
            }
        }

        if (felix)
        {
            felixtimer += 10;
            canvasdraw();
            if (felixtimer > 5000)
            {
                felix = false;
            }
        }

        if (!paused && !felix)
        {
            time += 10;

            if (time > (10000/genRate) && endtimer < 10000)
            {

                if(10000/genRate > 1000)
                    genRate += genAcc;
                
        
                if (!( (canvas.width/(firstgen)) - maxballRadius >= maxballRadius * 2))
                {
                    firstgen = Math.floor(2 * maxballRadius);
                }
                
                
                for (i = 0; i < firstgen; i++)
                {
                    vy = (Math.random() * (vmax - 1) * -1) + -1;
                    randx = Math.random();
                    randc = Math.floor(Math.random()*colorslist.length);
                    if (randx > 0.5)
                    {
                        randx = -1;
                    }
                    else
                    {
                        randx = +1;
                    }

                    randr = (Math.random() *(maxballRadius - minballradius)) + minballradius;
                    randxx = (canvas.width/(firstgen + 1)) * (i + 1);
                    randyy = canvas.height - (maxballRadius*2);
                    console.log(i);
                    if (drawchecker(randxx,randyy,randr))
                        balloonslist.push(new balloons(randxx,randyy,randx * Math.sqrt(Math.pow(vmax,2) - Math.pow(vy,2)),vy,randr,colorslist[randc],1,"NB"));
                }

                if (Score > 500)
                {
                    vy = (Math.random() * (vmax - 1)) + 1;
                    randx = Math.random();
                    randc = Math.floor(Math.random()*colorslist.length);
                    if (randx > 0.5)
                    {
                        randx = -1;
                    }
                    else
                    {
                        randx = +1;
                    }
                    randr = (Math.random() *(maxballRadius - minballradius)) + minballradius;
                    randxx = ((canvas.width/(firstgen + 1) * (Math.floor(Math.random() * (firstgen - 1)) + 1)));
                    randyy = (maxballRadius*2);
                    if (drawchecker(randxx,randyy,randr))
                    balloonslist.push(new balloons(randxx,randyy,randx * Math.sqrt(Math.pow(vmax,2) - Math.pow(vy,2)),vy,randr,colorslist[randc],5,"RB"));
                }

                if (checker())
                {
                    vy = (Math.random() * (vmax - 1)) + 1;
                    randx = Math.random();
                    randc = Math.floor(Math.random()*colorslist.length);
                    if (randx > 0.5)
                    {
                        randx = -1;
                    }
                    else
                    {
                        randx = +1;
                    }
                    randr = maxballRadius;
                    randxx = (maxballRadius*2);
                    randyy = ((canvas.height/(firstgen + 1) * (Math.floor(Math.random() * (firstgen - 1)) + 1)));
                    if (drawchecker(randxx,randyy,randr))
                    balloonslist.push(new balloons(randxx,randyy,randx * Math.sqrt(Math.pow(vmax,2) - Math.pow(vy,2)),vy,randr,colorslist[randc],1,"GT"));
                }

                time = 0;
            }

            if (checker())
            {
                (document.getElementById("Pt")).innerHTML = "Time Remaining : " + Math.round(10 - (endtimer/1000)) + " s";
                endtimer += 10;

                if (endtimer%1000 == 0)
                {
                    if (Math.floor(10 - (endtimer/1000)) > 3)
                    {
                        Tick.play();
                        (document.getElementById("Pt")).style.color = "#8c00ff";
                    }
                    else
                    {
                        Tock.play();
                        (document.getElementById("Pt")).style.color = "#FF0000";
                    }
                }

                if (endtimer > 10000)
                {
                    gameover = true;
                    pause();
                    if (Highscore < Score + AddScore)
                    {
                        localStorage.setItem("highscore","" + (Score + AddScore));
                    }
                    interval.clearInterval();
                }
                else
                {
                    draw();
                }
            }
            else
            {
                (document.getElementById("Pt")).style.color = "#8c00ff";
                endtimer = 0;
                draw();
            }
        }
    }


    function resizeCanvas() {
        canvas.style.width ='100%';
        canvas.style.height='100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        if (interval != null)
            interval.clearInterval();
        Score += AddScore;
        AddScore = 0;
        for (i = 0; i < balloonslist.length;i++)
        {
            if (balloonslist[i].posx > canvas.width)
            {
                AddScore -= 10*(maxballRadius/balloonslist[i].radius);
                AddScore = Math.round(AddScore);
                (document.getElementById("Score")).innerHTML = "Score : " + Score + " - " + AddScore;
                balloonslist.splice(i,1);
                AddScoretimer = 10;
                if (genRate + (genAcc/maxballRadius) > 1)
                {
                    genRate += genAcc/maxballRadius;
                }
            }
            else if (balloonslist[i].posy > canvas.height)
            {
                AddScore -= 10*(maxballRadius/balloonslist[i].radius);
                AddScore = Math.round(AddScore);
                (document.getElementById("Score")).innerHTML = "Score : " + Score + " - " + AddScore;
                balloonslist.splice(i,1);
                AddScoretimer = 10;
                if (genRate + (genAcc/maxballRadius) > 1)
                {
                    genRate += genAcc/maxballRadius;
                }
            }
        }

        

        interval = setInterval(create,10);
    }


    function drawchecker(x,y,radius)
    {
        console.log(x);
        bool = true;
        for (j = 0; j < balloonslist.length; j++)
        {
            if (!(Math.pow(balloonslist[j].posx - x,2) + Math.pow(balloonslist[j].posy - y,2) > Math.pow(radius + balloonslist[j].radius,2)))
            {
                bool = false;
            }
        }
        console.log(x + " Success");
        return bool;
    }

    function listener ()
    {
        canvas.addEventListener('mousedown', function(e) {
            if (e.button == 0 && !paused)
            {
                const rect = canvas.getBoundingClientRect()
                mousex = event.clientX - rect.left + 18;
                mousey = event.clientY - rect.top + 18;

                for (i = 0; i < balloonslist.length;i++)
                {
                    if (Math.pow((mousex - balloonslist[i].posx),2) + Math.pow((mousey - balloonslist[i].posy),2) <= Math.pow(balloonslist[i].radius + 18,2))
                    {
                        if (balloonslist[i].type == "GT")
                        {
                            Snaps.play();
                            if (AddScore != 0)
                            {
                                Score += AddScore;
                            }
                            AddScore = 0;
                            for(i = 0; i < balloonslist.length/2; i++)
                            {
                                AddScore += 10*(maxballRadius/balloonslist[i].radius);
                                if (genRate - (genAcc/maxballRadius) > 1)
                                {
                                    genRate -= genAcc/maxballRadius;
                                }
                            }
                            AddScore = Math.round(AddScore);
                            (document.getElementById("Score")).innerHTML = "Score : " + Score + " + " + AddScore;
                            balloonslist.splice(0,i);
                            AddScoretimer = 10;
                            for (i = 0; i <balloonslist.length; i++)
                            {
                                if (balloonslist[i].type == "GT")
                                {
                                    balloonslist.splice(i,1);
                                }
                            }
                            mousex = -1;
                            mousey = -1;
                            snaptrue = true;
                            checker();
                            break;
                        }
                        if (balloonslist[i].clicks == 1)
                        {
                            if (AddScore != 0)
                            {
                                Score += AddScore;
                            }
                            AddScore = 10*(maxballRadius/balloonslist[i].radius);
                            if (balloonslist[i].type == "RB")
                            {
                                Rocks.play();
                                AddScore += 90*(maxballRadius/balloonslist[i].radius);
                            }
                            else
                            {
                                Pop.play();
                            }
                            
                            AddScore = Math.round(AddScore);
                            (document.getElementById("Score")).innerHTML = "Score : " + Score + " + " + AddScore;
                            balloonslist.splice(i,1);
                            AddScoretimer = 10;
                            if (genRate - (genAcc/maxballRadius) > 1)
                            {
                                genRate -= genAcc/maxballRadius;
                            }
                            mousex = -1;
                            mousey = -1;
                            break;
                        }
                        else
                        {
                            balloonslist[i].clicks -= 1;
                            Rocks.play();
                        }
                    }
                }
            }
            else if(e.button == 0)
            {
                const rect = canvas.getBoundingClientRect()
                mousex = event.clientX - rect.left;
                mousey = event.clientY - rect.top;

                if (gameover)
                {
                    if (mousex > canvas.width/2 -125 && mousex < canvas.width/2 + 125 && mousey > canvas.height/2 && mousey < canvas.height/2 + 50)
                    {
                        location.reload();
                    }
                }
                else
                {
                    if (mousex > canvas.width/2 -125 && mousex < canvas.width/2 + 125 && mousey > canvas.height/2 && mousey < canvas.height/2 + 50)
                    {
                        pause();
                    }
                }
            }
        });

        canvas.addEventListener('mousemove', function(e) {
            if(paused)
            {
                const rect = canvas.getBoundingClientRect()
                mousex = event.clientX - rect.left;
                mousey = event.clientY - rect.top;

                ctx.beginPath();

                    if (mousex > canvas.width/2 -125 && mousex < canvas.width/2 + 125 && mousey > canvas.height/2 && mousey < canvas.height/2 + 50)
                    {
                        ctx.fillStyle = "#4b00a0";
                    }
                    else
                    {
                        ctx.fillStyle = "#8c00ff";
                    }
                    ctx.rect(canvas.width/2 - 125,canvas.height/2,250,50);
                        ctx.fill();
                        ctx.closePath();

                        ctx.font = "30px Comic Sans MS";
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                
                if (gameover)
                {
                    ctx.fillText("Restart Game", canvas.width/2, canvas.height/2+ 35);
                }
                else
                {
                    ctx.fillText("Resume Game", canvas.width/2, canvas.height/2+ 35);
                }
            }
        });

        (document.getElementById("Pb")).addEventListener('mousedown', function(e) {
            if (e.button == 0 && !gameover)
            {
                pause();
            }
            else if (e.button == 0)
            {
                window.location.href = "index.html";
            }

        });

        (document.getElementById("Fx")).addEventListener('mousedown', function(e) {
            if (e.button == 0 && !gameover && !paused && !felix && felixused < 2)
            {
                Felix.play();
                felix = true;
                felixtimer = 10;
                felixused += 1;

                if (felixused == 1)
                {
                    (document.getElementById("Fx")).src = "Images/felix1.png";
                }
                else
                {
                    (document.getElementById("Fx")).src = "Images/felix0.png";
                }
            }
        });

        window.addEventListener('keydown', function(e){
            if (e.key == "Escape" && !gameover)
            {
                pause();
            }
        },true);
    }

    function balloons (posx,posy,dx,dy,radius,color,clicks,type)
        {
            this.posx = posx;
            this.posy = posy;
            this.radius = radius;
            this.dx = dx;
            this.dy = dy;
            this.color = color;
            this.clicks = clicks; 
            this.type = type;
        }

    function pause()
    {
        if (paused)
                {
                    (document.getElementById("Pb")).src = "Images/pause.png";
                    (document.getElementById("Pt")).innerHTML = "";
                    paused = false;
                }
                else
                {
                    (document.getElementById("Pb")).src = "Images/play.png";
                    if (gameover)
                        (document.getElementById("Pb")).src = "Images/home.png";
                    if (gameover)
                        (document.getElementById("Pt")).innerHTML = "Game Over";
                    ctx = canvas.getContext("2d");
                    oldfilter = ctx.filter;
                    ctx.filter = "blur(10px)";
                    canvasdraw();
                    ctx.filter = oldfilter;
                    ctx.beginPath();
                    ctx.fillStyle = "#000000";
                    ctx.rect(canvas.width/4,canvas.height/4,canvas.width/2,canvas.height/2);
                    ctx.fill();
                    ctx.closePath();
                    ctx.filter = "blur(5px)";
                    ctx.lineWidth = "5";
                    ctx.strokeStyle = "#FFFFFF";
                    ctx.strokeRect(canvas.width/4,canvas.height/4,canvas.width/2,canvas.height/2);
                    ctx.filter = oldfilter;


                    ctx.font = "60px Comic Sans MS";
                    ctx.fillStyle = "teal";
                    if (gameover)
                        ctx.fillStyle = "#FF0000";
                    ctx.textAlign = "center";
                    if(gameover)
                        ctx.fillText("Game Over", canvas.width/2, 3 * canvas.height/8);
                    else
                        ctx.fillText("Game Paused", canvas.width/2, 3 * canvas.height/8);
                    ctx.beginPath();
                    ctx.fillStyle = "#8c00ff";
                    ctx.rect(canvas.width/2 - 125,canvas.height/2,250,50);
                    ctx.fill();
                    ctx.closePath();

                    ctx.font = "30px Comic Sans MS";
                    ctx.fillStyle = "#FFFFFF";
                    ctx.textAlign = "center";


                    if (gameover)
                        ctx.fillText("Restart Game", canvas.width/2, canvas.height/2+ 35);
                    else
                        ctx.fillText("Resume Game", canvas.width/2, canvas.height/2 + 35);
                    
                    ctx.font = "30px Comic Sans MS";
                    ctx.fillStyle = "#00FF00";
                    ctx.textAlign = "center";

                    if (Highscore < (Score + AddScore))
                    {
                        ctx.fillText("New High Score : " + (Score + AddScore) , canvas.width/2, 5* canvas.height/8 + 35);
                    }
                    else
                    {
                        ctx.fillText("Score : " + (Score + AddScore) + "\n High Score : " + Highscore, canvas.width/2, 5* canvas.height/8 + 35);
                    }
                    
                    

                    paused = true;
                }
    }