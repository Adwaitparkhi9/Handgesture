Prediction1 = "";
Prediction2 = "";
Webcam.attach('#camera');
Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});
function take_snapshot(){
    Webcam.snap(function(e){
        document.getElementById("result").innerHTML = '<img id="image1" src="'+e+'"/>';
    });
}
console.log("ml5",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1L7MIXvO3/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model Loaded");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first Prediction is"+Prediction1;
    speak_data2 = "And the second Prediction is"+Prediction2;
    var c = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(c);
}
function check(){
    d = document.getElementById("image1");
    classifier.classify(d,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("emotion1_name").innerHTML = results[0].label;
        document.getElementById("emotion2_name").innerHTML = results[1].label;
        Prediction1 = results[0].label;
        Prediction2 = results[1].label;
        speak();
        if(results[0].label == UpArrowHand){
            document.getElementById("emoji1_pic").innerHTML = "&#128070;";
        }
        if(results[0].label == Amazinghand){
            document.getElementById("emoji1_pic").innerHTML = "&#128076;";
        }
        if(results[0].label == Thumbsup){
            document.getElementById("emoji1_pic").innerHTML = "&#128077;";
        }
        if(results[0].label == Thumbsdown){
            document.getElementById("emoji1_pic").innerHTML = "&#128078;";
        }
        if(results[0].label == Powerhand){
            document.getElementById("emoji1_pic").innerHTML = "&#129304;";
        }
        if(results[1].label == UpArrowHand){
            document.getElementById("emoji2_pic").innerHTML = "&#128070;";
        }
        if(results[1].label == Amazinghand){
            document.getElementById("emoji2_pic").innerHTML = "&#128076;";
        }
        if(results[1].label == Thumbsup){
            document.getElementById("emoji2_pic").innerHTML = "&#128077;";
        }
        if(results[1].label == Thumbsdown){
            document.getElementById("emoji2_pic").innerHTML = "&#128078;";
        }
        if(results[1].label == Powerhand){
            document.getElementById("emoji2_pic").innerHTML = "&#129304;";
        }
    }
}