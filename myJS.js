// JavaScript Document
function firebaseInit()
	{
	  var firebaseConfig = {
		apiKey: "AIzaSyA4-i15XPcyHHxaQBeZJegtvAD9eHUdnX8",
		authDomain: "dispatch-kang.firebaseapp.com",
		databaseURL: "https://dispatch-kang.firebaseio.com",
		projectId: "dispatch-kang",
		storageBucket: "dispatch-kang.appspot.com",
		messagingSenderId: "283112092551",
		appId: "1:283112092551:web:dbca3f3bca6bc9ce405922",
		measurementId: "G-CT4LH4LMDD"
	  };
	  // Initialize Firebase
	  firebase.initializeApp(firebaseConfig);
	
	}
	
function firebaseAuth()
	{
	  firebase.auth().signInWithEmailAndPassword("kjhlr@hotmail.com", "671691")
	   .then(function() {
		//window.alert("auth-ok");
		
		//success
		//  document.getElementById("demo").innerHTML = "ok";
		//  myFunction();
	   })
	  .catch(function() {
		window.alert("auth-wrong");
		// Error Handling
		  //document.getElementById("demo").innerHTML = "Wrong"; 
	  });
	
	}	
	
function checkPassWord()
	{
	  var userName = document.getElementById("un");
	  var passWord = document.getElementById("pw");
	  
		if(!userName.value=="" && !passWord.value==""){
			  var ref = firebase.database().ref('registeredPeople');
			  ref.once('value', function(snapshot) {
				var allPersonInfo=snapshot.val();	
				var mkeys=Object.keys(allPersonInfo);
					if(mkeys.includes(userName.value)){
						ref.child(userName.value).once('value', function(snapshot) {
							var userInfo=snapshot.val();//userInfo is obj
							// console.log(userName.value);
							// console.log(passWord.value);
							// console.log(userInfo);
								if(passWord.value==userInfo.password){
									document.getElementById("demo").innerHTML = "password ok";
									var json = JSON.stringify(userInfo);//调用stringify()将一个JS对象转换为JSON
									window.localStorage.setItem('userInfo', json);
							
									//window.close();
									
									window.open('secondPage.html');
									
								}else{
									document.getElementById("demo").innerHTML = "PassWord is Wrong"; 
								}
						
						   });
					}else{
						document.getElementById("demo").innerHTML = "username is wrong";	
					}


			  });

			  
		}else{
				 document.getElementById("demo").innerHTML = "UserName or PassWord is Empty"; 
		}
	
	}
	
function getPathObj(myPath)
	{
		var ref = firebase.database().ref(myPath);
		console.log(ref);
		ref.once('value', function(snapshot) {
			var pathObj1=snapshot.val();//pathObj is obj
			
			
			if(pathObj1==null){
				window.alert("pathObj==null");
				console.log(pathObj1);
			}else{
				console.log(pathObj1);	
				//return pathObj1;
			}
			
		});	
}


	var pathObj;//pathObj=OrignalData
	
function firebaseSnapShot(path)
	{
		var ref = firebase.database().ref(path);
		console.log(ref);
		ref.once('value', function(snapshot) {
			var pathObj1=snapshot.val();//pathObj is obj
			
			if(pathObj1==null){
				window.alert("pathObj==null");
				console.log(pathObj1);
			}else{
				//pathObj=pathObj1;
				//console.log(pathObj);
				window.sessionStorage.setItem(path, JSON.stringify(pathObj1));
				//---------------------//
				//var allDate1 = new Array();
				
				pathObj=pathObj1;
				
				preExcelData(pathObj);
				// var barcodeArr = Object.values(pathObj);//valuesArr=barcode
				console.log(pathObj);
				
			}
			
		});
	}	

	var dataArr = new Array();
	var columsArr = new Array();
	var allDate = new Array();//Array()	
	var dataMap=new Map();
function preExcelData(origObj){
	var columsObj={
		'Choosed':40,
		'A0_When':100,
		'A1_ByWhoAdd':60,
		'B0_JobID':50,
		'B1_ModeID':50,
		'B2_Barcode':140,
		'B3_CarrierRef':170,
		'B4_ScheduledDate':120,
		'B5_BTaCC':90,
		'B6_ServiceType':80,
		'B7_Weight':80,
		'B8_Unit':50,
		'B9_Route':80,
		'C0_Company':170,
		'C1_Address1':170,
		'C2_Address2':80,
		'C3_Address3':80,
		'C4_City':100,
		'C5_ProvState':60,
		'C6_Country':80,
		'C7_PostalCode':80,
		'C8_Phone':100,
		'C9_Email':80,
		'D0_Company':190,
		'D1_Address1':190,
		'D2_Address2':80,
		'D3_Address3':80,
		'D4_City':80,
		'D5_ProvState':90,
		'D6_Country':90,
		'D7_PostalCode':70,
		'D8_Phone':100,
		'D9_Email':180,
		'E0_When':80,
		'E1_ByWhoReceive':80,
		'F0_When':80,
		'F1_ByWhoDispatch':90,
		'F2_ToWho':70,
		'G0_When':80,
		'G1_ByWhoLoad':80,
		'H0_When':90,
		'H1_ByWhoTrouble':90,
		'H2_TroubleReason':80,
		'H3_Comment':70,
		'H4_Photo':80,
		'I0_When':80,
		'I1_ByWhoFinish':70,
		'I2_FinishType':80,
		'I3_Comment':70,
		'I4_Photo':80,
		'I5_Receiver':80,
		'J0_When':80,
		'J1_ByWhoPrice':80,
		'J2_Size':80,
		'J3_HowMuch':80,
		'K0_When':80,
		'K1_ByWhoGroup':80,
		'K2_GroupCode':80,
		'L0_LastStep':180
	}
	let earlyTime= new Date('2011-01-01').valueOf();
	console.log('earlyTime='+earlyTime);
	var whenPo=[1,35,40,45];//AddOrigData,Dispatch,MeetTrouble,Finish
	var lastStep=['UnDispatch','Dispatched','MeetTrouble','Finished'];
	var maxArr = new Array();
	
	var columsKeyArr=Object.keys(columsObj);
	var columsArr1 = new Array();
	for (let myKey in columsObj) {

		 var columsItemObj = new Object();				
		 if(myKey=='Choosed'){
			columsItemObj.type='text';
			columsItemObj.title=myKey;
			columsItemObj.width=columsObj[myKey];
		 }else{
			columsItemObj.type='text';
			columsItemObj.title=myKey;
			columsItemObj.width=columsObj[myKey];
		 }
		 columsArr1.push(columsItemObj);
	}
	columsArr=columsArr1;
	
	var barcoArr = Object.values(origObj);//barcodeArr=barcode's values
	var endDataArr = new Array();
	var dataArr1 = new Array();
	for (var i = 0; i < barcoArr.length; i++) {//i < barcodeArr.length
		//console.log('i='+i);
			var keyArr=Object.values(barcoArr[i]);//keyArr=key's values		
		//	console.log('keyArr='+keyArr);	
		//	console.log(keyArr);	
		 	endDataArr=[];
			maxArr=[];
			for (var n1 = 0; n1 < columsKeyArr.length; n1++) {
					
				if(n1==0){
					endDataArr.push('');
				}else{
					if(whenPo.includes(n1)){
						endDataArr.push(earlyTime+n1);
					}else{
						endDataArr.push('nil');
					}	
					
				}
				
			}		
			
			var specialPo=[0,32,34,37,39,44,50,54];
			for (var j = 0; j < keyArr.length; j++) {
								
				for (var k in keyArr[j]) {
					
					var po=columsKeyArr.indexOf(k);          
					//console.log(po);
					//console.log("position="+po+"  item="+keyArr[j][k])
					if( specialPo.includes((po-1))  ){
						//&& !keyArr[j][k]=="nil"
						//console.log("position="+po+"  item="+keyArr[j][k])
						var d=new Date(parseInt(keyArr[j][k]));
						//var d=new Date(keyArr[j][k]);
						endDataArr[po]=d.toISOString();
						//console.log(d.toISOString().split('T')[0]);
						//console.log(endDataArr[po]);
					}else{//!specialPo.includes(po-1)
						
						endDataArr[po]=keyArr[j][k];
						//console.log(endDataArr[po]);
					}			
				}
				
			}
			
			// for (var k = 0; k < whenPo.length; k++) {
			// 	maxArr.push(endDataArr[whenPo[k]]);
				
			// }
			//console.log('i='+maxArr);
			
			// var re = maxArr[0];
			// for (var h = 1; h < maxArr.length; h++) {
			// 	if(maxArr[h]>re){
			// 		re=maxArr[h];
			// 	}
				
			// }
				
			// var maxpo=maxArr.indexOf(re); 
			// endDataArr[58]=lastStep[maxpo];
			//console.log('j='+re);
			//console.log('k='+maxpo);
			
			dataArr1.push(endDataArr);
			dataMap.set(endDataArr[5],endDataArr);//endDataArr[5]=barcode				
	}
	
	dataArr=dataArr1;
	console.log(dataArr);
	var allDate1 = new Array();
	for (var m = 0; m < dataArr.length; m++) {
		//if(dataArr[m][3]=="AddOrigData"){
			var deliverDate=dataArr[m][7];
			if(!allDate1.includes(deliverDate)){
				allDate1.push(deliverDate);
			}
		//}
	}

	allDate1.sort();
	allDate1.push("Date for all")
	allDate=allDate1;
	console.log(dataMap);
	
	createUl();
}

	var refDataArr = new Array();
	var refColumsArr = new Array();
function refreshTable(myDate,myNav){
	refDataArr=[];
	refColumsArr=[];
	 console.log('myDate='+myDate);
	 console.log('myNav='+myNav);
	timePo=[1,34,39,44];//AddOrigData,Dispatch,MeetTrouble,Finish
	var navObj={
		'OrigData':[0,4,5,7,8,12,13,14,17,58],//0,4,5 no change
		'Undidpatch':[0,4,5,8,9,13,14,15,16,17,18,22],
		'Dispatched':[0,4,5,6,8,9,13,14,15,16,17,20,37],//Undidpatch  Dispatched
		'TroubleItem':[0,4,5,7,8,9,13,14,17,40,41,42,43,58],//TroubleItem
		'Finished':[0,4,5,7,8,9,13,14,17,45,46,47,48,50,58]//Finished
	}
	var matchObj={
		'OrigData':'UnDispatch',//all
		'Undidpatch':'UnDispatch',
		'Dispatched':'Dispatched',
		'TroubleItem':'MeetTrouble',
		'Finished':'Finished'
	}
	var dataArr2 = new Array();
	//console.log(dataArr);
	for (var i = 0,ilen=dataArr.length; i < ilen; i++) {
		dataArr2=[];
		for (var j = 0,jlen=dataArr[i].length; j < jlen; j++) {
			if(myNav=='OrigData'){//all laststep
				if(myDate=='Date for all'){//all date
					if(navObj[myNav].includes(j)){
						if(timePo.includes(j)){
							var d=new Date(dataArr[i][j]);
							dataArr2.push(d.toISOString());
						}else{
							dataArr2.push(dataArr[i][j]);							
						}
						
					}
				}else{//all laststep,special date
					if(navObj[myNav].includes(j) &&  dataArr[i][7]==myDate){
						if(timePo.includes(j)){
							var d=new Date(dataArr[i][j]);
							dataArr2.push(d.toISOString());
						}else{
							dataArr2.push(dataArr[i][j]);							
						}
						
					}
				}
			}else{//special last step
				if(myDate=='Date for all'){//all date
					if(navObj[myNav].includes(j) && dataArr[i][58]==matchObj[myNav]){
						if(timePo.includes(j)){
							var d=new Date(dataArr[i][j]);
							dataArr2.push(d.toISOString());
						}else{
							if(j==58 && dataArr[i][58]=="Finished"){
								dataArr2.push("PHOTO");
							}else{
								if(j==58 && dataArr[i][58]=="MeetTrouble"){
									console.log(dataArr[i][42]);
									if(dataArr[i][42]=="short"){
										dataArr2.push(dataArr[i][44]);
									}else{
										dataArr2.push("PHOTO");
									}
								}else{
									dataArr2.push(dataArr[i][j]);
								}
							}
							
						}
						
					}
					
				}else{//special last step,special date
					if(navObj[myNav].includes(j) && dataArr[i][7]==myDate && dataArr[i][58]==matchObj[myNav]){
						if(timePo.includes(j)){
							var d=new Date(dataArr[i][j]);
							dataArr2.push(d.toISOString());
						}else{
							if(j==58 && dataArr[i][58]=="Finished"){
								dataArr2.push("PHOTO");
							}else{
								if(j==58 && dataArr[i][58]=="MeetTrouble"){
									console.log(dataArr[i][42]);
									if(dataArr[i][42]=="short"){
										dataArr2.push(dataArr[i][44]);
									}else{
										dataArr2.push("PHOTO");
									}
									
									
								}else{
									dataArr2.push(dataArr[i][j]);
								}
							}
						}
						
					}
				}
				
			}
		}
		if(dataArr2[5]!=null){
		
			refDataArr.push(dataArr2);
		}
			
		
		
	}
	console.log(refDataArr);
	
	var columsArr2 = new Array();
	for (var k = 0,klen=columsArr.length; k < klen; k++) {
		if(navObj[myNav].includes(k)){
			columsArr2.push(columsArr[k]);
		}
	}
	console.log(columsArr2);
	refColumsArr=columsArr2;
	
	
		showRefTable();
	
	
}

var barcodeArr = new Array();
function showRefTable(){
	 	barcodeArr=[];
		Array.prototype.indexOf = function(val) { 

		for (var i = 0; i < this.length; i++) { 
		
		if (this[i] == val) return i; 
		
		} 
		
		return -1; 
		
		};
		
		Array.prototype.remove = function(val) { 

			var index = this.indexOf(val); 
			
			if (index > -1) { 
			
			this.splice(index, 1); 
			
			} 
			
		};
		
		var selectionActive = function(instance, x1, y1, x2, y2, origin) {
			
				if(x2>10 && x1==x2 && y1==y2){
					var cellName1 = jexcel.getColumnNameFromId([x2, y2]);
					if(table3.getValue(cellName1)=="PHOTO"){
						var cellName4 = jexcel.getColumnNameFromId([2, y2]);
						var barcode =table3.getValue(cellName4);
						showPhoto(barcode,navpo[1]);
					}
	
						
				}else{
					var selectedRows=table3.getSelectedRows(true);
					console.log(selectedRows);
					var cellName2 = jexcel.getColumnNameFromId([0, y2]);
					var cellName3 = jexcel.getColumnNameFromId([2, y2]);
					console.log('The selection from ' + cellName2 + ' to ' + cellName3 + '');
					if(table3.getValue(cellName2)=="OK"){
						table3.setValue(cellName2,"" );
						barcodeArr.remove(table3.getValue(cellName3));
						console.log("remove:"+table3.getValue(cellName3));
					}else{
						table3.setValue(cellName2, "OK");
						barcodeArr.push(table3.getValue(cellName3));
						console.log("add:"+table3.getValue(cellName3));
					}
				}
			
			
		
		}
				
	document.getElementById('spreadsheet').innerHTML = '';
	if(refDataArr.length>0){
		var table3=jspreadsheet(document.getElementById('spreadsheet'), {
			data:refDataArr,
			search:true,
			columns:refColumsArr,
			onselection:selectionActive
		});
	
	}else{
		var table3=jspreadsheet(document.getElementById('spreadsheet'), {
			
			search:true,
			columns:refColumsArr,
			
		});
	}
		
	

table=table3;
}

	var userInfoObj = new Object();
function saveUserInfo()
	{
		var userIn = window.localStorage.getItem('userInfo');
		window.sessionStorage.setItem('userInfo', userIn);
		var userInfoObj1=JSON.parse(userIn);
		userInfoObj=userInfoObj1;
		//console.log(userInfoObj);
		window.localStorage.clear();
		saveCompanyInfo();
		getDriverArr();
	}	

	var companyInfoObj = new Object();
function saveCompanyInfo()
	{
		//var companyName = userInfoObj.company;
		var ref = firebase.database().ref(userInfoObj.company+"/CompanyInfo");
		//console.log(userInfoObj.company);
		ref.once('value', function(snapshot) {
			var pathObj1=snapshot.val();//pathObj is obj
			
			
			if(pathObj1==null){
				window.alert("pathObj==null");
				console.log(pathObj1);
			}else{
				
				companyInfoObj=pathObj1;
				console.log(companyInfoObj);	
			}
			
		});	
	}	

	var driverArr = new Array();
function getDriverArr()
	{
		//var companyName = userInfoObj.company;
		var ref = firebase.database().ref('registeredPeople');
		//console.log(userInfoObj.company);
		ref.once('value', function(snapshot) {
			var pathObj1=snapshot.val();//pathObj is obj			
			if(pathObj1==null){
				window.alert("driverObj==null");
				//console.log(pathObj1);
			}else{
				var driverArr1=Object.values(pathObj1)
				//console.log(driverArr1);
				for(i = 0,len=driverArr1.length; i < len; i++){
					
					//console.log(driverArr1[i]);
					if(driverArr1[i].company == userInfoObj.company){
						
						driverArr.push(driverArr1[i].username);
					}
					
				}
				console.log(driverArr);
			}
			
		});	
	}	
	
var navpo=['Date for all','OrigData'];//0-vertical po, 5-level po	
function createUl()
	{
		var menu=document.getElementById("menu");
		// 动态创建ul 内存中创建对象
		var ul = document.createElement('ul');
		// 把ul放到页面上 把ul放到DOM树上 并且会重新绘制
		ul.className="menuList";
		ul.style.padding="0px";
		ul.style.listStyle="none";
		//ul.style.alignSelf="right";
		menu.appendChild(ul);

		// var allDate1 = JSON.parse(window.sessionStorage.getItem('allDate'));
		// allDate = allDate1;
		for (var i=allDate.length; i>0; i--) {
			var data = allDate[i-1];
			// 在内存中动态创建li
			var li = document.createElement('li');
			// 把li添加到DOM树 并且重新绘制
			li.className="menuLi";
			li.style.margin="15px";
			li.style.backgroundColor="pink";
			li.style.borderRadius="15px";
			li.style.padding="5px";
			ul.appendChild(li);
			// 设置li中显示的内容 处理兼容性
			li.setAttribute("id", i);
			li.setAttribute("onclick", "getId(this)");
			setInnerText(li, data);
			
			// 给li注册事件
			li.onmouseover = liMouseOver;
			li.onmouseout = liMouseOut;
			
		}
		document.getElementsByClassName('menuLi')[0].style.backgroundColor='blue';
		document.getElementsByClassName('navList')[4].style.backgroundColor='blueviolet';
		//preTableData(pathObj);
		refreshTable(navpo[0],navpo[1]);
		//showTable();
	}
		
// 设置标签之间的内容
function setInnerText(ele, content) {
	// 判断当前浏览器是否支持InnerText
	if (typeof ele.innerText) {
		ele.innerText = content;
	} else {
		ele.innerHTML = content;
	}
}
// 当鼠标经过的时候执行
function liMouseOver() {
	// 高亮显示
	this.style.color = 'red';
}
function liMouseOut() {
	// 鼠标离开时取消高亮
	
		this.style.color = "";
	
}


function getId(obj) {
	//获得点击li元素的id，垂直列表
	d=document.getElementsByClassName('menuLi');
	var objId = obj.id;
	for (var i=0; i < allDate.length; i++) {
		if(d[i].id!=objId){
			    d[i].style.backgroundColor='pink'/*其他*/
		    }else{
				d[i].style.backgroundColor='blue'/*点击的*/
				
				var abc=d[i].innerText;
				
				//table.search(abc);
				navpo[0]=abc;
				//document.getElementById('spreadsheet').innerHTML = '';
				refreshTable(navpo[0],navpo[1]);
			} 
	}

}

function getNavId(number) {//水平列表
	navpo[1]=number.innerText;
	console.log(navpo);
	
	doc=document.getElementsByClassName('navList');
	console.log(doc);
	for (var i=0; i < doc.length; i++) {
		if(doc[i].innerText==navpo[1]){/*点击的*/
			doc[i].style.backgroundColor='blueviolet';
		    refreshTable(navpo[0],navpo[1]);
		}else{
			doc[i].style.backgroundColor='#FFA500';
		} 
	}
	
	
}
	
var table;

function refresh(){
	var json1 = JSON.stringify(userInfoObj);//调用stringify()将一个JS对象转换为JSON
	window.localStorage.setItem('userInfo', json1);
	//window.close();					
	window.location.reload();
	
}

function dispatchTo(){
	var json2 = JSON.stringify(driverArr);//调用stringify()将一个JS对象转换为JSON
	window.sessionStorage.setItem('driverList', json2);
	window.open ("popup.html","_blank","width=300,height=200,menubar=no,toolbar=no,status=no,scrollbars=yes");   			
	//,"newwindow","height=100, width=400,top=100,left=200"
	//createUl2();toolbar=no, menubar=no, "newwindow", "height=100, width=400,top=100,left=200, scrollbars=no, resizable=no, location=no, status=no"
}

function datePicker(){
	
	window.open ("datePick.html","_blank","width=800,height=500,scrollbars=yes");   			
}

function unDispatch(){
	  let myTime= new Date().valueOf(); 
	  var offset=new Date().getTimezoneOffset()*-60*1000; // offset mm
	  var obj = new Object();
	  obj['A0_When'] = myTime + offset; //获取时间戳
	  obj['A1_ByWhoAdd'] = userInfoObj.username;
	  obj['L0_LastStep'] = 'UnDispatch';
	
	  var ref = firebase.database().ref(userInfoObj.company+'/OriginalData');
	
	  for (var k = 0; k < barcodeArr.length; k++){
		var value=dataMap.get(barcodeArr[k]);
		if(value[46]=='nil'){
			var newPostRef = ref.child(barcodeArr[k]).push();
			newPostRef.set(obj);
		}else{
		window.alert(barcodeArr[k]+" was finished,con't dispatch it!")
		}
		
	  }
	  refresh();
}

function exterminate(){
	// var json2 = JSON.stringify(driverArr);//调用stringify()将一个JS对象转换为JSON
	// window.sessionStorage.setItem('driverList', json2);
	window.open ("exterminate.html");   			
	//,"newwindow","height=100, width=400,top=100,left=200"
	//createUl2();toolbar=no, menubar=no, "newwindow", "height=100, width=400,top=100,left=200, scrollbars=no, resizable=no, location=no, status=no"
}

function dispatchAll(){
	
	var path = userInfoObj.company+"/DispatchRule/Dispatch/DispatchAll";
	var ref = firebase.database().ref(path);
	ref.once('value', function(snapshot) {
		var pathObj2=snapshot.val();//pathObj is obj
		console.log(pathObj2);	
		if(pathObj2==null){
			window.alert("driverObj2==null");
			
		}else{
			var postalArr1=Object.values(pathObj2)
			console.log(postalArr1);
			var dispatchMap=new Map();
			for(i = 0,len=postalArr1.length; i < len; i++){
				var endObj=postalArr1[i];
				//console.log(endObj.PostCode+"/"+endObj.DriverName);	
				dispatchMap.set(endObj.PostCode,endObj.DriverName);
			}
			
			//var values=dataMap.values;
			var ref2 = firebase.database().ref(userInfoObj.company+"/OriginalData");
			for(let item of dataMap.values()){
				var postCode=item[20].substring(0,3);
				var driverName=dispatchMap.get(postCode);
				
				if(driverName != null){
					var barcode=item[5];

					let myTime= new Date().valueOf(); 
					var offset=new Date().getTimezoneOffset()*-60*1000; // offset mm
					var obj = new Object();
					obj['F0_When'] = myTime + offset; //获取时间戳
					obj['F1_ByWhoDispatch'] = userInfoObj.username;
					obj['F2_ToWho'] = driverName;
					obj['L0_LastStep'] = 'Dispatched';
					
					if (item[46]=='nil'){
						var newPostRef = ref2.child(barcode).push();
						newPostRef.set(obj);
					}
				}
				
			}
			refresh();
		}
		
	});	

}

function unDispatchSpecial(){
	var path = userInfoObj.company+"/DispatchRule/UnDispatch/UnDispatchSpecial";
	var ref = firebase.database().ref(path);
	ref.once('value', function(snapshot) {
		var pathObj2=snapshot.val();//pathObj is obj
		console.log(pathObj2);	
		if(pathObj2==null){
			window.alert("driverObj2==null");
			
		}else{
			var postalArr1=Object.keys(pathObj2)
			console.log(postalArr1);
			var barcodes = new Array();
			//var mkeys=dataMap.keys;
			console.log(dataMap);
			for(let item of dataMap.values()){
				if(postalArr1.includes(item[20])){
					barcodes.push(item[5]);
				}
			}

		
			console.log(barcodes);	
			let myTime= new Date().valueOf(); 
	 		var offset=new Date().getTimezoneOffset()*-60*1000; // offset mm
			var obj = new Object();
			obj['A0_When'] = myTime + offset; //获取时间戳
			obj['A1_ByWhoAdd'] = userInfoObj.username;
			obj['L0_LastStep'] = 'UnDispatch';
			var ref2 = firebase.database().ref(userInfoObj.company+"/OriginalData");
			for(j = 0; j < barcodes.length; j++){
				var oneLine=dataMap.get(barcodes[j]);
					if(oneLine[46]=='nil'){
						var newPostRef = ref2.child(barcodes[j]).push();
						newPostRef.set(obj);
					}
				
			}
			refresh();
		}
		
	});	
}

function deleteItems(){
	var ref = firebase.database().ref(userInfoObj.company+'/OriginalData');
	
	  for (var k = 0; k < barcodeArr.length; k++){
		var newPostRef = ref.child(barcodeArr[k]);
		newPostRef.remove();
	  }
	  barcodeArr.clear;
	  refresh();
}

function getFileName(){
//var myFileName=document.getElementById("browse").value;
//window.alert("fileName="+myFileName);

// (B1) GET SELECTED CSV FILE
let selected = document.getElementById("browse").files[0];

// (B2) READ CSV INTO ARRAY
let reader = new FileReader();
reader.addEventListener("loadend", () => {
  // (B2-1) SPLIT ROWS & COLUMNS
  let data = reader.result.split("\r\n");
  console.log(data.length);
  for (var i = 0; i < data.length; i++) {
	var strk=data[i];
	var complex=false;
	var newStr='';
	for (var k = 0; k < strk.length; k++){
		let c=strk[k];
			if(c=='"'){
				//newStr += c;
				if(complex){
					complex = false;
				}else{
					complex = true;
				}
			}else{
				if(complex && c==',' ){
					newStr += ';';
				}else{					
					newStr += c;
				}
			}

	}
		data[i] = newStr;
		data[i] = data[i].split(",");
		
  }

  var data1=data.slice(0,-1)
  console.log(data1);
  writeToFirebase(data1);
});
reader.readAsText(selected);
}


function writeToFirebase(inputData){
	let myTime= new Date().valueOf();
	var offset=new Date().getTimezoneOffset()*-60*1000; // offset mm
	console.log(inputData);
	var byWho=userInfoObj.username;
	var heading = [];
	var selectedIndex=[];
	var selectedName=[];
	for (let i in inputData) {
		if(i==0){
			heading=inputData[i]
			
			var str=heading[0]+heading[4]+heading[11];
			
			switch (str) {
				case 'JobIDHubIDDriver':
					selectedIndex=[0,1,23,2,3,14,26,28,12,13,15,16,17,18,19,21,20,22];//choose item
					selectedName=[
						'B0_JobID',
						'B1_ModeID',
						'B2_Barcode',
						'B3_CarrierRef',
						'B4_ScheduledDate',
						'B5_BTaCC',
						'B7_Weight',
						'B8_Unit',
						'B9_Route',
						'C0_Company',
						'C1_Address1',
						'C2_Address2',
						'C3_Address3',
						'C4_City',
						'C5_ProvState',
						'C6_Country',
						'C7_PostalCode',
						'C8_Phone'
					];//item name
					//console.log(selectedName);
					// break;
				case 'Undidpatch':
					navpo[1]=4;
					break;
				
				// default:
				// 	break;
				}

		}else{
			var obj = new Object();
			obj['A0_When'] = myTime + offset; //获取时间戳
			obj['A1_ByWhoAdd'] = byWho;
			obj['L0_LastStep'] = 'UnDispatch';

			for (let j in inputData[i]) {					
					let index = selectedIndex.indexOf(Number(j) );
					var key1=selectedName[index];
				if(index>-1 && index!=4 && index!=8 && index!=9){
					
					obj[key1] = inputData[i][j];					
				}
				if(index==4){//j=3
						//var key1=selectedName[index];
						var value0=inputData[i][j];
					//	console.log(value0);
						var myDay=value0.substring(value0.indexOf("/")+1,value0.indexOf("/20"));
						
						if (myDay < 10) {
							myDay = "0" + myDay;
						}
						var myMonth=value0.substring(0,value0.indexOf("/"));
						// if (myMonth < 10) {
						// 	myMonth = "0" + myMonth;
						// }
						switch(parseInt(myMonth)) {
							case 1:
								myMonth="01";
							   break;
							case 2:
								myMonth="02";
							   break;
							case 3:
								myMonth="03";
								break;
							case 4:
								myMonth="04";
								break;   
							case 5:
								myMonth="05";
								break;
							case 6:
								myMonth="06";
								break;
							case 7:
								myMonth="07";
							    break;
							case 8:
								myMonth="08";
								break;
							case 9:
								myMonth="09";
								break;
							case 10:
								myMonth="10";
								break;
							case 11:
								myMonth="11";
							 	break;
							case 12:
								myMonth="12";
							    break;
							case 0:
									
						    break;
							default:

							break;
					   } 
					   
						var myYear=value0.substring(value0.indexOf("/20")+1,value0.indexOf(" "));
						//inputData[i][j]=myMonth+"/"+myDay+"/"+myYear;
						//obj[key1] = myMonth+"/"+myDay+"/"+myYear;
						obj[key1] = myYear+"-"+myMonth+"-"+myDay;
				}
				
				if(index==8){//j=12
					// console.log(inputData[i][1]);
					// console.log(inputData[i][14]);|| inputData[i][14] == "NOVEXCO"
					if(inputData[i][1] == "PK"  ){
                        obj[key1] = "nil";
                    }else{
                        var ab=inputData[i][13].substring(inputData[i][13].indexOf("-")+2);
                        obj[key1]=ab.substring(0,ab.indexOf("-")-1);
                    }
					
				}
				
				if(index==9){//j=13
					// console.log(inputData[i][1]);
					// console.log(inputData[i][14]);|| inputData[i][14] == "NOVEXCO"
					if(inputData[i][1] == "PK"  ){
                        obj[key1] = inputData[i][j];
                    }else{
                        var abc=inputData[i][j].substring(inputData[i][j].indexOf("-")+2);
                       // company=abc.substring(0,abc.indexOf("-")-1);
                        obj[key1]=abc.substring(abc.indexOf("-")+2);
                    }
					
				}

			}

			
			for (let key in companyInfoObj) {
				//console.log(key, companyInfoObj[key]);
				obj[key] = companyInfoObj[key];
			}
			console.log(obj.B2_Barcode);

			var ref = firebase.database().ref(userInfoObj.company+'/OriginalData');
			if(!!obj.B2_Barcode){
				var newPostRef = ref.child(obj.B2_Barcode).push();
				newPostRef.set(obj);
			}
			

		}
		
		
	}

	refresh();
}

function getChoosedLines(){
	var ab=localStorage.getItem('toDriver')
      console.log(ab);
	  console.log(barcodeArr);
	  let myTime= new Date().valueOf(); 
	  var offset=new Date().getTimezoneOffset()*-60*1000; // offset mm
	  var obj = new Object();
	  obj['F0_When'] = myTime + offset; //获取时间戳
	  obj['F1_ByWhoDispatch'] = userInfoObj.username;
	  obj['F2_ToWho'] = ab;
	  obj['L0_LastStep'] = 'Dispatched';

	  var ref = firebase.database().ref(userInfoObj.company+'/OriginalData');
	
	  for (var k = 0; k < barcodeArr.length; k++){
		var value=dataMap.get(barcodeArr[k]);
		if(value[46]=='nil'){
			var newPostRef = ref.child(barcodeArr[k]).push();
			newPostRef.set(obj);
		}else{
		window.alert(barcodeArr[k]+" was finished,con't dispatch it!")
		}
		
	  }
	  refresh();
}

function unNormalFinish(){
	var ab=localStorage.getItem('exterminate')
      console.log(ab);
	  let myTime= new Date().valueOf(); 

	  let myTime1= new Date(); 
	  console.log(myTime);
	  console.log(myTime1);
	  var offset=new Date().getTimezoneOffset()*-60*1000; // offset mm
	  var obj = new Object();
	  obj['I0_When'] = myTime+offset; //获取时间戳
	  obj['I1_ByWhoFinish'] = userInfoObj.username;
	  obj['I2_FinishType'] = ab;
	  obj['L0_LastStep'] = 'Finished';

	  var ref = firebase.database().ref(userInfoObj.company+'/OriginalData');
	
	  for (var k = 0; k < barcodeArr.length; k++){
		var newPostRef = ref.child(barcodeArr[k]).push();
		var valueArr=dataMap.get(barcodeArr[k]);
		console.log(barcodeArr[k]);
		console.log(valueArr);
		obj['I3_Comment'] = valueArr[43];
	  	obj['I4_Photo'] = valueArr[44];
		newPostRef.set(obj);
	  }
	  barcodeArr.clear;
	  window.localStorage.setItem('exterminate', "nothing");
	  refresh();
}

function showPhoto(barcode,NavPo){
	console.log(barcode);
	console.log(NavPo);
	var value=dataMap.get(barcode);
	console.log(value);
	if(NavPo=="Finished"){
		var finishType=value[47];
		if(finishType=="Destroy it" || finishType=="Return it"){
			var myDate=value[40];
			var who=value[41];
			var photoNo=value[44];
		}else{//normal
			var myDate=value[45];
			var who=value[46];
			var photoNo=value[49];
		}
		//var d=new Date(value[45])
		console.log(value[45]);
		//console.log(d);
		
	}else{//TroubleItem
		//var d=new Date(value[40])
		console.log(value[40]);
		//console.log(d);
		var myDate=value[40];
		var who=value[41];
		var photoNo=value[44];
	}

var myPhotoJsonString = JSON.stringify(photoNo.split("&"));
window.sessionStorage.setItem('myDate', myDate.substring(0,10));
window.sessionStorage.setItem('deliver', who);
window.sessionStorage.setItem('photoArr', myPhotoJsonString);

window.open('showPhoto.html','toolbar=no,location=no');
}

