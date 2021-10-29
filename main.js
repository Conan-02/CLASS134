status = "";
object = [];

function setup() {
    canvas = createCanvas(380, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objDetect = ml5.objectDetector('cocossd', loaded);
}

function draw()  {
    image(video, 0, 0, 380, 300);
    
    if (status != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "STATUS: OBJECT DETECTED";

            r = random(255);
            g = random(255);
            b = random(255);

            fill(r, g, b);
            stroke(r, g, b);
            strokeWeight(1);
            percent = floor(object[i].confidence * 100);
            text("NAME = " + object[i].label + ", CONFIDENCE = " + percent, object[i].x, object[i].y - 10);
            noFill();
            strokeWeight(2);
            rect(object[i].x, object[i].y, object[i].width, object[i].height, 10);
        }
    }
}

function loaded() {
    console.log("model loaded");
    status = true;
    objDetect.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        object = results;
    }
}