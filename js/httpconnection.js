var WEBAPP= window.location.pathname.split("/")[1];
var http={
	requestParam:null,	
	postRequest:{ "send":function(action, data, callBackFunc){ 
							http.loader(true);
							var postRequest = new AjaxPostRequest();
							postRequest.url = "/"+WEBAPP+action ; 
							postRequest.data = data;
							
							postRequest.callBack = function(response){
								callBackFunc(response);	
							};
							postRequest.call();   //this method is used to call the ajax request 
						 }
	},
	getRequest:{ "send":function(action,  callBackFunc){ 
					http.loader(true);
					var  getRequest = new AjaxGetRequest();
					getRequest.url = "/"+WEBAPP+action;
					
					getRequest.callBack = function(response){
						callBackFunc(response);	
					};
					 
					getRequest.call();   //this method is used to call the ajax request 
				}
 	},
	fileRequest: { "send":function(action, formData, callBackFunc){ 
							http.loader(true);
							var postRequest = new AjaxFileRequest();
							postRequest.url = "/"+WEBAPP+action;
							postRequest.data = formData;
							
							postRequest.callBack = function(response){
								callBackFunc(response);	
							};
							postRequest.call();   //this method is used to call the ajax request 
				 }
	},

	loadHTMLPage:{ "send":function(action,  callBackFunc){ 
					if (typeof keydownFunction === 'function') {
				 		window.removeEventListener("keydown", keydownFunction);
				 	}
					var  getRequest = new AjaxGetRequest();
					getRequest.url = "/"+WEBAPP+"/"+action;
					http.requestParam = null;
					if(action.indexOf("?")>0){
						http.requestParam = action.split("?")[1];
					}
					getRequest.callBack = function(response){
						callBackFunc(response);	
					};
					 
					getRequest.call();   //this method is used to call the ajax request 
		 	}

	} ,
	loader:function(state){
		if(state){

			$(".lean-overlay").css("display","block");
			$("#loader").css("display","block");
			$("#uav-lean-overlay").show();
			$("#loader").show();
 
		}else{
			$(".lean-overlay").css("display","none");
			$("#loader").css("display","none");
		}
	}
};	


function AjaxGetRequest(){
	this.url= "";
	this.data =  "";
	this.callBack = "";
	this.paramForCallBack=""; 
	
	this.call= function(){
		$.ajax( {url: this.url,  
			type:'GET', 
			beforeSend: function (xhr) {
				             xhr.setRequestHeader("X-Ajax-call", "true");
			},
	  		data:'',
			accept:'application/json',	
			callBack : this.callBack ,	
		  	success:function(response) { 
				$("#loader").hide();
				$("#uav-lean-overlay").hide();

				try
				{
					var res =JSON.parse(response);
					if(res.status == 'sessionexpired'){
						alert('Session has been expired');
						window.location.href =WEBAPP;
					}
				}catch (e) {}
				this.callBack( response);
			},
			error:function(errorMsg){  
				$("#loader").hide();
				$("#uav-lean-overlay").hide();

				    console.log(errorMsg);
				 if(errorMsg.status==401){
					window.location.href = "/"+WEBAPP+"/pages/jsp/sessionexpired.html";
				 }
			} 
		});
	};
}
						 

function AjaxPostRequest(){
	this.url= "";
	this.data =  "";
	this.callBack = "";
	this.paramForCallBack=""; 
 	this.call= function(){
		 
		$.ajax( {url: this.url,  
			dataType:'json' ,   
			type:'POST', 
			beforeSend: function (xhr) {
				       xhr.setRequestHeader("Content-Type","application/json");
       					xhr.setRequestHeader("Accept","application/json");
       					xhr.setRequestHeader("X-Ajax-call", "true");
					 

			},
	  		data:this.data,
			accept:'application/json',	
			callBack : this.callBack ,
		  	success:function(response) { 
				$("#loader").hide();
				$("#uav-lean-overlay").hide();
				try{
					var res =JSON.parse(response);
				}catch(e){
						var res = response;
				}
				if(res.status == 'sessionexpired'){
					alert('Session has been expired');
					window.location.href =WEBAPP;
				}
				this.callBack( response);
			},
			error:function(errorMsg){  
					$("#loader").hide();
					$("#uav-lean-overlay").hide();

				  //  UIEle.alert.withTitle("Please try again.");
				    console.log(errorMsg);
			 
			}, complete:function(){
					//$("#loader").hide();
					//$("#uav-lean-overlay").hide();
			} 
		});
	};
}				



function AjaxFileRequest(){
	this.url= "";
	this.data =  "";
	this.callBack = "";
	this.paramForCallBack=""; 
	
	this.call= function(){
		$.ajax( {url: this.url,  
			type:'POST', 
	  		data:this.data,
			processData:false,
	       contentType:false,
			callBack : this.callBack ,
		  	success:function(response) { 
					$("#loader").hide();
					$("#uav-lean-overlay").hide();
				try{
					var res =JSON.parse(response);
				}catch(e){
						var res = response;
				}
				if(res.status == 'sessionexpired'){
					alert('Session has been expired');
					window.location.href =WEBAPP;
				}
				this.callBack( response);
			},
 			error:function(errorMsg){  
				$("#loader").hide();
				$("#uav-lean-overlay").hide();
			    console.log(errorMsg);
			} ,
			complete:function(){
					
			}
		});
	};
}

