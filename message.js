var sendButton = document.getElementById("send-button");
var message = document.getElementById('message');

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
    document.getElementById('message').value = "";
    getMessages(function(messages){
      console.log("Success");
      console.log(messages);
        printMessages(messages[messages.length-1]);
    },function(){
      console.error("Had a problem")
    });
  }, function(){
    console.error("Unable to send message")
  })
}

var postMessage = function (success, failure){
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

function printMessages(item){
  var lst = document.getElementById('message-list');
  var listItem = document.createElement("li");
  listItem.innerHTML = item['message'];
  lst.appendChild(listItem);
}

var getMessages = function (success, failure){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function (){
    if (request.readyState == XMLHttpRequest.DONE){
      if (request.status >= 200 && request.status < 400) {
        messages = JSON.parse(request.responseText);
        success(messages);
      } else {
        failure();
      }
    }
  };
  request.open("GET", "http://localhost:8080/messages");
  request.send();
};

  var request = new XMLHttpRequest();
  request.onreadystatechange = function (){
    if (request.readyState == XMLHttpRequest.DONE){
      if (request.status >= 200 && request.status < 400) {
        messages = JSON.parse(request.responseText);
        console.log("Messages Loaded");
        console.log(messages);
        for (var i = 0, len = messages.length; i <len; i++){
          printMessages(messages[i]);
        }
      } else {
        console.error("Couldn't load messages!");
      }
    }
  };
request.open("GET", "http://localhost:8080/messages");
request.send();
