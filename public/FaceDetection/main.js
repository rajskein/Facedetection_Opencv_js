let width = 0;
let height = 0;

let qvga = {width: {exact: 320}, height: {exact: 240}};

let vga = {width: {exact: 640}, height: {exact: 480}};

let resolution = window.innerWidth < 640 ? qvga : vga;

function oncaseReady(){
let utils = new Utils('errorMessage');
let classifier = 'haarcascade_frontalface_default.xml';

utils.createFileFromUrl(classifier, classifier, () => {
    console.log('cascade ready to load.');
});

}
var video = document.querySelector('video');

function onOpenCvReady() {
console.log("loaded");
oncaseReady();



function onVideoFail(e) {
    console.log('webcam fail!', e);
  };

var type =  'text/html';
window.URL = window.URL || window.webkitURL;
navigator.getUserMedia  = navigator.getUserMedia || 
                         navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia || 
                           navigator.msGetUserMedia;



if (navigator.getUserMedia) {
  navigator.getUserMedia({audio: false, video: resolution}, function(stream) {
  
  var binaryData = [];
          binaryData.push(stream);
    try {
  video.srcObject = stream;
} catch (error) {
  video.src = window.URL.createObjectURL(new Blob(binaryData, {type: type}));;
}
video.play();
   console.log("startes");
	

  }, onVideoFail);
} else {
    alert ('failed');
}
}

  video.addEventListener("canplay", function(ev){
      height = video.videoHeight;
      width = video.videoWidth;
      video.setAttribute("width", width);
      video.setAttribute("height", height);
      streaming = true;
    
    Testclick();
  }, false);


function Testclick(){
let src = new cv.Mat(height, width, cv.CV_8UC4);
let dst = new cv.Mat(height, width, cv.CV_8UC4);
let gray = new cv.Mat();
let cap = new cv.VideoCapture(video);
let faces = new cv.RectVector();


console.log("test");
let classifier = new cv.CascadeClassifier();
classifier.load('haarcascade_frontalface_default.xml');

if(classifier.load('haarcascade_frontalface_default.xml'))
{
}else{
console.log("cascade not loaded");
}
// load pre-trained classifiers

const FPS = 30;
function processVideo() {
console.log("ssd");
    try {
   
        let begin = Date.now();
        // start processing.
        cap.read(src);
        src.copyTo(dst);
        cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
        // detect faces.
        classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
        // draw faces.
        for (let i = 0; i < faces.size(); ++i) {
            let face = faces.get(i);
            let point1 = new cv.Point(face.x, face.y);
            let point2 = new cv.Point(face.x + face.width, face.y + face.height);
            cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
        }
		console.log("canva");
        cv.imshow('canvasOutput', dst);
        // schedule the next one.
        let delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    } catch (err) {
console.log(err);    }
};
processVideo();


	}
