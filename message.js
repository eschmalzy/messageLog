var sendButton = document.getElementById("send-button");
var message = document.getElementById('message');
var refreshButton = document.getElementById("refresh-button");

sendButton.onclick = function(){
  document.getElementsByName('message').value = "";
  var post = new XMLHttpRequest();
  post.onreadystatechange = function (){
    if (post.readyState == XMLHttpRequest.DONE){
      if (post.status >= 200 && post.status < 400) {
        messages = JSON.parse(post.responseText);
        console.log(messages);
      } else {
        alert("Something went wrong.");
      }
    }
  };

  post.open("POST", "http://localhost:8080");
  post.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  console.log(message.value);
  post.send("message=" + message.value);
}

document.getElementById("message")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("send-button").click();
    }
});

refreshButton.onclick = function (){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function (){
    if (request.readyState == XMLHttpRequest.DONE){
      if (request.status >= 200 && request.status < 400) {
        messages = JSON.parse(request.responseText);
        console.log(messages);
      } else {
        alert("Something went wrong.");
      }
    }
  };

  request.open("GET", "http://localhost:8080/canihasjson");
  request.send();
}
