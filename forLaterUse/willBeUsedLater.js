let userList ={};

function getUserList(){

  let req1 = new XMLHttpRequest();
  req1.open('GET','/userList',false);
  
  req1.onreadystatechange = function(){
    if(this.readyState==4 && this.status==200){
      userList = JSON.parse(req1.responseText);
    }
    else{
      console.error('Error retrieving list of users for loginPage', req1.status, req1.statusText);
    }
  };
  req1.send();

};

getUserList();

function updateLikes(){
  
  getUserList();

    req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
         location.reload();
		}
	}

  if(userList[username].Liked.hasOwnProperty(title)){
    req.open("DELETE", `/account/${username}/art/${id}/likes`);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(userList[username]));
  }
  else{
    req.open("POST", `/account/${username}/art/${id}/likes`);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(userList[username]));
  }
}

function toggleReview(){
  
    getUserList();
  
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
    if(this.readyState==4 && this.status==200){
        location.reload();
        }
    }
    
    // user has reviewed the artwork
    if(userList[username].Reviewed.hasOwnProperty(title)){
      alert("Please delete your current review for this piece in the 'Reviews' tab before trying to write another.")
    }
    
    // user hasn't reviewed the artwork
    else{
        let review = document.getElementById("reviewText").value;
        let postObject = {postName:username,postReview:review,postArt:title}
      req.open("POST", `/account/${username}/art/${id}/reviewed`);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify(postObject));
    }
  }
