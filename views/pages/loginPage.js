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

function verifyLogin(){
  
  getUserList();

  let username = document.getElementById("Username").value;
  let password = document.getElementById("Password").value;
  
  let req = new XMLHttpRequest();

  if(userList.hasOwnProperty(username)){
    if(userList[username].Password == password){
      req.open("GET",`account/${username}`);
      req.send();
      window.location = (`http://localhost:3000/account/${username}`);
    }
    else{
      alert("Invalid password for this user")
    }
    
  }
  else{
    alert("Invalid Login Credentials");
    return;
  }  

}


