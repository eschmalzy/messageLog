var sendButton = document.getElementById("send-button");
var message = document.getElementById('message');
var refreshButton = document.getElementById("refresh-button");

//possibly try an on submit event?
document.getElementById("message")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("send-button").click();
    }
});

sendButton.onclick = function (){
  postMessage(function(){
    console.log("Sent message")
  }, function(){
    console.error("Unable to send message")
  })
}

var postMessage = function (success, failure){
  document.getElementsByName('message').value = "";
  var post = new XMLHttpRequest();
  post.onreadystatechange = function (){
    if (post.readyState == XMLHttpRequest.DONE){
      if (post.status >= 200 && post.status < 400) {
        success();
      } else {
        failure();
      }
    }
  };

post.open("POST", "http://localhost:8080/messages");
post.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
console.log(message.value);
post.send("message=" + message.value);
};

refreshButton.onclick = function (){
  getMessages(function(){
    console.log("Success")
  },function(){
    console.error("Had a problem")
  })
};


var getMessages = function (success, failure){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function (){
    if (request.readyState == XMLHttpRequest.DONE){
      if (request.status >= 200 && request.status < 400) {
        //messages = JSON.parse(request.responseText);
        //console.log(messages);
        success();
      } else {
        failure();
      }
    }
  };
  request.open("GET", "http://localhost:8080/messages");
  request.send();
};
