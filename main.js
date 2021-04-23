img = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
}

function draw() {
    image(video, 0, 0, 300, 300);
    if (status != "") {
        r = random(255);
        g = random(190);
        b = random(234);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_objects").innerHTML = "number of objects detected are -" + objects.length;
            fill(rgb);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(rgb);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}

function modelLoaded() {
    console.log("Model Loaded !");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
        console.log(results);
        objects = results;
    }
