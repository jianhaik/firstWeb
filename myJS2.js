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
	  // Firebase
	  firebase.initializeApp(firebaseConfig);
	
	}
	
function firebaseAuth()
	{
	  firebase.auth().signInWithEmailAndPassword("kjhlr@hotmail.com", "671691")
	   .then(function() {
		
	   })
	  .catch(function() {
		window.alert("auth-wrong");
		
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
				console.log(allPersonInfo);
				var mkeys=Object.keys(allPersonInfo);
					if(mkeys.includes(userName.value)){
						ref.child(userName.value).once('value', function(snapshot) {
							var userInfo=snapshot.val();//userInfo is obj
							
								if(passWord.value==userInfo.password){
									document.getElementById("demo").innerHTML = "password ok";
									var json = JSON.stringify(userInfo);//调用stringify()将一个JS对象转换为JSON
									window.localStorage.setItem('userInfo', json);
									
									// top.location.href = "secondPage.html";
									 top.location.replace("secondPage.html");
									//window.open('secondPage.html','_blank');
									
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
				window.alert("pathObj==null1");
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
				//window.alert("no data at database");
				console.log(pathObj1);
				jexcel.destroy(document.getElementById('spreadsheet'));
			}else{
				
				window.sessionStorage.setItem(path, JSON.stringify(pathObj1));
				
				pathObj=pathObj1;
				
				preExcelData(pathObj);
				
				console.log(pathObj);
				
			}
			
		});
	}	

	var dataArr = new Array();
	var dataMap=new Map();
	var columsArr = new Array();
	var allDate = new Array();//Array()		
function preExcelData(origObj){
	dataArr=[];
	allDate=[];
	dataMap.clear();
	columsArr=[
		{ type: 'text', title:'Choosed', width:40 },
		{ type: 'text', title:'A0_When', width:100 },
		{ type: 'text', title:'A1_ByWhoAdd', width:60 },
		{ type: 'text', title:'B0_JobID', width:50 },
		{ type: 'text', title:'B1_ModeID', width:50 },
		{ type: 'text', title:'B2_Barcode', width:140 },
		{ type: 'text', title:'B3_CarrierRef', width:170 },
		{ type: 'text', title:'B4_ScheduledDate', width:120 },
		{ type: 'text', title:'B5_BTaCC', width:90 },
		{ type: 'text', title:'B6_ServiceType', width:80 },
		{ type: 'text', title:'B7_Weight', width:80 },
		{ type: 'text', title:'B8_Unit', width:50 },
		{ type: 'text', title:'B9_Route', width:80 },
		{ type: 'text', title:'C0_Company', width:180 },
		{ type: 'text', title:'C1_Address1', width:170 },
		{ type: 'text', title:'C2_Address2', width:80 },
		{ type: 'text', title:'C3_Address3', width:80 },
		{ type: 'text', title:'C4_Receiver', width:100 },
		{ type: 'text', title:'C5_City', width:60 },
		{ type: 'text', title:'C6_ProvState', width:80 },
		{ type: 'text', title:'C7_PostalCode', width:80 },
		{ type: 'text', title:'C8_Phone', width:100 },
		{ type: 'text', title:'C9_Email', width:80 },
		{ type: 'text', title:'D0_Courier', width:190 },
		{ type: 'text', title:'D1_CountNo', width:190 },
		{ type: 'text', title:'D2_PhotoT', width:80 },
		{ type: 'text', title:'D3_PhotoF', width:80 },
		{ type: 'text', title:'D4_When', width:100 },
		{ type: 'text', title:'D5_ByWhoPrice', width:80 },	
		{ type: 'text', title:'D6_Size', width:90 },
		{ type: 'text', title:'D7_HowMany', width:70 },
		{ type: 'text', title:'D8_StartTime', width:100 },
		{ type: 'text', title:'D9_EndTime', width:80 },
		{ type: 'text', title:'E0_When', width:80 },
		{ type: 'text', title:'E1_ByWhoReceived', width:80 },
		{ type: 'text', title:'F0_When', width:80 },
		{ type: 'text', title:'F1_ByWhoDispatch', width:90 },
		{ type: 'text', title:'F2_ToWho', width:70 },
		{ type: 'text', title:'G0_When', width:80 },
		{ type: 'text', title:'G1_ByWhoLoad', width:80 },
		{ type: 'text', title:'H0_When', width:120 },
		{ type: 'text', title:'H1_ByWhoTrouble', width:90 },
		{ type: 'text', title:'H2_TroubleReason', width:90 },
		{ type: 'text', title:'H3_Comment', width:70 },
		{ type: 'text', title:'H4_Photo', width:80 },
		{ type: 'text', title:'I0_When', width:180 },
		{ type: 'text', title:'I1_ByWhoFinish', width:70 },
		{ type: 'text', title:'I2_FinishType', width:80 },
		{ type: 'text', title:'I3_Comment', width:70 },
		{ type: 'text', title:'I4_Photo', width:80 },
		{ type: 'text', title:'I5_Receiver', width:80 },
		{ type: 'text', title:'J0_When', width:80 },
		{ type: 'text', title:'J1_ByWhoPrice', width:80 },
		{ type: 'text', title:'J2_Size', width:80 },
		{ type: 'text', title:'J3_HowMuch', width:80 },
		{ type: 'text', title:'K0_When', width:80 },
		{ type: 'text', title:'K1_ByWhoGroup', width:80 },
		{ type: 'text', title:'K2_GroupCode', width:80 },
		{ type: 'text', title:'L0_LastStep', width:100 },
	
	]
	var typeArr = new Array();
	var titleArr = new Array();
	var widthArr = new Array();
	for (let i = 0; i < columsArr.length; i++) {
		typeArr.push(columsArr[i].type);
		titleArr.push(columsArr[i].title);
		widthArr.push(columsArr[i].width);
	}


	let earlyTime= new Date('2011-01-01').valueOf();
	console.log('earlyTime='+earlyTime);
	var whenPo=[1,35,40,45];//AddOrigData,Dispatch,MeetTrouble,Finish
	var barcoArr = Object.values(origObj);//barcodeArr=barcode's values
	var endDataArr = new Array();
	for (var i = 0; i < barcoArr.length; i++) {//i < barcodeArr.length
		//console.log('i='+i);
			var keyArr=Object.values(barcoArr[i]);//keyArr=key's values		
		//	console.log('keyArr='+keyArr);	
		//	console.log(keyArr);	
		 	endDataArr=[];
			maxArr=[];
			for (var n1 = 0; n1 < titleArr.length; n1++) {
					
				if(n1==0){
					endDataArr.push('');
				}else{
					if(whenPo.includes(n1)){
						var da=new Date(parseInt(earlyTime+n1*1000));
						endDataArr.push(da.toISOString());
					}else{
						endDataArr.push('nil');
					}	
					
				}
				
			}		
			
			var specialPo=[0,32,34,37,39,44,50,54];
			for (var j = 0; j < keyArr.length; j++) {
								
				for (var k in keyArr[j]) {
					
					var po=titleArr.indexOf(k);          
					
					if( specialPo.includes((po-1))  ){
						
						//var d=new Date(parseInt(keyArr[j][k]));
						//endDataArr[po]=d.toISOString();
						endDataArr[po]=keyArr[j][k];
						
					}else{//!specialPo.includes(po-1)
						
						endDataArr[po]=keyArr[j][k];
	
					}			
				}
				
			}
			//endDataArr[3]="1";
			dataArr.push(endDataArr);
			//dataMap.set(endDataArr[5],endDataArr);//endDataArr[5]=barcode	
				
	}
	console.log(dataArr);
	for (var p = 0; p < dataArr.length; p++) {
			if(dataArr[p][44]=="nil"){
				
			}else{
				if(dataArr[p][44]=="noPhotos"){
					dataArr[p][25]="noPhotos";
				}else{
					//console.log(dataArr[p]);
					dataArr[p][25]="Photos";
				}
			}
			if(dataArr[p][49]=='nil'){
				
			}else{
				if(dataArr[p][49]=='noPhotos'){
					dataArr[p][26]="noPhotos";
				}else{
					//console.log(dataArr[p]);
					dataArr[p][26]="Photos";
				}
			}
			dataMap.set(dataArr[p][5],dataArr[p]);//endDataArr[5]=barcode	
	}
	
	console.log(dataMap.values());
	console.log(dataArr);
	
	for (var m = 0; m < dataArr.length; m++) {
			var deliverDate=dataArr[m][7];
			if(!allDate.includes(deliverDate)){				
				allDate.push(deliverDate);
			}
	}

	allDate.sort();
	allDate.push("Date for all");
	//groupOrderBy(dataMap,  6,  20)
	createUl();
}

function groupBy(dataArr, m){
	var refList=new Array();//all keys
	var localMap = new Map();//Map<String,List<String[]>>
	console.log(dataArr);
	console.log(m);
	for(let item of dataArr){
		console.log(item);
		if(!refList.includes(item[m])){
			refList.push(item[m]) ;
		}
	};
	
	console.log(refList);
	var aLists = new Array();
	
	refList.forEach(eachItem => {
	
		var bList=new Array();
		for(let eachRow of dataArr){
			if(eachItem==eachRow[m]){
				bList.push(eachRow);
			}
		};
		
		aLists.push(bList);
	});
	
	for (let i = 0; i < refList.length; i++) {
		localMap.set(refList[i], aLists[i]);
	}
	console.log(localMap);
	return localMap;
}

function filterBy(dataArr,po,str){
		var filterArr=new Array();//all keys
	
	for(let item of dataArr){
		if(item[po]==str){
			filterArr.push(item);
		}
	};

	return filterArr;
}


// function groupOrderBy(dataMap,  m,  n){
// 	console.log(dataMap);
// 	var refList=new Array();//all keys
// 	var localMap = new Map();//Map<String,List<String[]>>
// 	for(let item of dataMap.values()){
// 		if(!refList.includes(item[m])){
// 			refList.push(item[m]) ;
// 		}
// 	};
	
// 	console.log(refList);
// 	var aLists = new Array();
	
// 	refList.forEach(eachItem => {
	
// 		var bList=new Array();
// 		for(let eachRow of dataMap.values()){
// 			if(eachItem==eachRow[m]){
// 				bList.push(eachRow);
// 			}
// 		};
		
// 		aLists.push(bList);
// 	});
	
// 	for (let i = 0; i < refList.length; i++) {
// 		localMap.set(refList[i], aLists[i]);
// 	}
// 	console.log(localMap);
	
// 	var piXuMap = new Map();
// 	var postCodeList=new Array();
        
//     for(let eachList of localMap.values()){
// 			var ref=eachList[0][m];

// 			for (let k = 100; k < 999; k++) {
// 				var postCode=eachList[0][n]+k;
// 				if(!postCodeList.includes(postCode)){
// 					postCodeList.push(postCode);
// 					piXuMap.set(postCode,ref);
// 					break;//创建，跳出
// 				}
// 			}
// 	};
	
// 	let postCodeKey = Array.from( piXuMap.keys() );
// 	postCodeKey.sort();  
// 	var localRefMap = new Map();//Map<String,List<String[]>>
// 	for(let k = 0; k < postCodeKey.length; k++){
// 		localRefMap.set(piXuMap.get(postCodeKey[k]),localMap.get(piXuMap.get(postCodeKey[k])));
// 	}
// 	groupCount(localRefMap);
	  
// }

// //var refMap = new Map();
// function groupCount(localRefMap){
// 	var rowArr = new Array();
// 	for(let eachList of localRefMap.values()){
// 		rowArr=[];
// 		var aa=eachList.length
// 		for(let eachItem of eachList[0]){
// 			rowArr.push(eachItem);
// 		}
// 		rowArr[3]=aa.toString();
// 		refMap.set(rowArr[6],rowArr);	
// 	};
// 	console.log(refMap.values());
// 	createUl();
// }
	
function groupOrderCount(dataArr,  m, c,  n){//c=长度
	var refList=new Array();//all keys
	var localMap = new Map();//Map<String,List<String[]>>

	for(let item of dataArr){
		if(c==0){
			var refItem=item[m].substring(0)
		}else{
			var refItem=item[m].substring(0,c)
		}
		
		if(!refList.includes(refItem)){
			refList.push(refItem) ;
		}
	};

	var aLists = new Array();
	
	refList.forEach(eachItem => {
		
		var bList=new Array();
		for(let eachRow of dataArr){
			if(c==0){
				var refItem2=eachRow[m].substring(0)
			}else{
				var refItem2=eachRow[m].substring(0,c)
			}
			
			if(eachItem==refItem2){
				bList.push(eachRow);
			}
		};
		
		aLists.push(bList);
	});

	for (let i = 0; i < refList.length; i++) {
		localMap.set(refList[i], aLists[i]);
	}

	var piXuMap = new Map();
	var postCodeList=new Array();
        
    for(let eachList of aLists){//localMap.values()=aLists
			//var ref=eachList[0][m];
			if(c==0){
				var ref=eachList[0][m].substring(0)
			}else{
				var ref=eachList[0][m].substring(0,c)
			}
			for (let k = 100; k < 999; k++) {
				var postCode=eachList[0][n]+k;
				if(!postCodeList.includes(postCode)){
					postCodeList.push(postCode);
					piXuMap.set(postCode,ref);
					break;//创建，跳出
				}
			}
	};
	
	let postCodeKey = Array.from( piXuMap.keys() );
	postCodeKey.sort();  
	var localRefMap = new Map();//Map<String,List<String[]>>
	for(let k = 0; k < postCodeKey.length; k++){
		localRefMap.set(piXuMap.get(postCodeKey[k]),localMap.get(piXuMap.get(postCodeKey[k])));
	}

	var rowArr = new Array();
	var refMap2 = new Map();
	for(let eachList of localRefMap.values()){
		rowArr=[];
		var aa=eachList.length
		for(let eachItem of eachList[0]){
			rowArr.push(eachItem);
		}
		rowArr[24]=aa.toString();
		if(c==0){
			var ref2=rowArr[m].substring(0)
		}else{
			var ref2=rowArr[m].substring(0,c)
		}
		
		refMap2.set(ref2,rowArr);	
	};
	console.log(refMap2.values());
	return refMap2;
}	

	var refColumsArr = new Array();
	var orderArr = new Array();
	var refDataArr = new Array();
	var showArr = new Array();
function refreshTable(myDate,myNav){
	console.log('myDate='+myDate);
	console.log('myNav='+myNav);
	barcodeArr=[];
	refArr=[];
	orderArr=[];
	refDataArr=[];
	refColumsArr=[];
	
	var doc=document.getElementsByClassName('navList');
	for (var i=0; i < doc.length; i++) {
		if(doc[i].innerText==myNav){/*点击的*/
			doc[i].style.backgroundColor='blueviolet';
		}else{
			doc[i].style.backgroundColor='#FFA500';
		} 
	}
	
	var doc2=document.getElementsByClassName('menuLi');
	for (var i=0; i < allDate.length; i++) {
		if(doc2[i].innerText==myDate){
			doc2[i].style.backgroundColor='blue'/*点击的*/
		}else{
			doc2[i].style.backgroundColor='pink'/*其他*/
		}
	}
	var radio=document.getElementById("rad01");
	radio.checked=false;
	radioStatus="unchecked";
	
	var showFilterArr1 = new Array();
	console.log(dataMap.values());
	//console.log(refMap.values());
	switch (myNav) {
		case 'OrigData':
			for(let item of dataArr){
				showFilterArr1.push(item);
			};
			break;
		case 'TroubleItem':
			for(let item of dataArr){
				if(item[58]=="MeetTrouble"){
					showFilterArr1.push(item);
				}
			};
			break;
		case 'Finished':
			for(let item of dataArr){
				if(item[58]=="Finished"){
					showFilterArr1.push(item);
				}
			};
			break;
		case 'UnDispatch':
			for(let item of dataArr){
				if(item[58]=="UnDispatch"){
					showFilterArr1.push(item);
				}
			};
			break;
		case 'Dispatched':
			for(let item of dataArr){
				if(item[58]=="Dispatched"){
					showFilterArr1.push(item);
				}
			};
			break;
		default:
			break;
	}

	//var showFilterMap2 = new Map();
	var showFilterArr2 = new Array();
	console.log("ite2="+myNav);
	if(myDate=="Date for all"){
		//showFilterMap2=showFilterMap1;
		for(let item of showFilterArr1){
			showFilterArr2.push(item);		
		};
	}else{
		for(let item of showFilterArr1){
			if(item[7]==myDate){
				showFilterArr2.push(item);				
			}
		};
	}
	console.log(showFilterArr2);
	
	//orderArr
	switch (myNav) {
		case 'OrigData':
			orderArr=[58,0,4,5,7,8,12,13,14,17,29,30,31,32,43,44,49,50];
			break;
		case 'TroubleItem':
			orderArr=[58,0,4,5,7,8,9,13,14,17,40,41,42,43,44,25];
			break;
		case 'Finished':
			orderArr=[58,0,4,5,7,8,13,17,45,46,31,32,47,48,50,26];
			break;
		case 'UnDispatch':
			orderArr=[58,0,24,4,6,8,9,13,14,15,16,17,18,22];
			break;
		case 'Dispatched':
			orderArr=[58,0,24,4,6,8,9,13,14,15,16,17,20,37];
			break;
		default:
			break;
	}
		//refPreDataArr=[];

		refColumsArr=[];
	for(let item of orderArr){
		
		refColumsArr.push(columsArr[item]);
		
	}
	console.log(orderArr);
	console.log(refColumsArr);
	
	var refMap = new Map();
	switch (myNav) {
		case 'OrigData':
			refMap = groupOrderCount(showFilterArr2,  5, 0, 20);//5=barcode,0=all,20=postcode
			break;
		case 'TroubleItem':
			refMap = groupOrderCount(showFilterArr2,  5, 0, 20);//5=barcode,0=all,20=postcode
			break;
		case 'Finished':
			refMap = groupOrderCount(showFilterArr2,  5, 0, 20);//5=barcode,0=all,20=postcode
			break;
		case 'UnDispatch':
			refMap = groupOrderCount(showFilterArr2,  6, 0, 20);//6=ref,
			break;
		case 'Dispatched':
			refMap = groupOrderCount(showFilterArr2,  6, 0, 20);//6=ref,
			break;
		default:
			break;
	}

	var tempArr = new Array();
	showArr=[];
	for(let item1 of refMap.values()){
		tempArr=[];
		showArr.push(item1);
		for(let item2 of orderArr){
			tempArr.push(item1[item2]);
		}
		refDataArr.push(tempArr);
	}
	console.log(refDataArr);
	jexcel.destroy(document.getElementById('spreadsheet'));
	showRefTable();	
}

function sortByDriver(arr)	{
	console.log(arr);
	var newArr=new Array();
	var valueArr=new Array();
	var oldValueArr=new Array();
	var newMap=new Map();
	for (var k = 0; k < arr.length; k++)
	{
		var newStr=arr[k][11]+arr[k][12];
		//console.log(arr[k][11]);
		//console.log(arr[k][12]);
		if(newArr.includes(newStr)){
			oldValueArr=[];
			oldValueArr=newMap.get(newStr);
			var num=oldValueArr[3];
			num=num+1;
			valueArr=[];
			valueArr.push(newStr);
			valueArr.push(arr[k][11]);
			valueArr.push(arr[k][12]);
			valueArr.push(num);
			newMap.set(newStr,valueArr);
		}else{
			newArr.push(newStr);
			valueArr=[];
			valueArr.push(newStr);
			valueArr.push(arr[k][11]);
			valueArr.push(arr[k][12]);
			valueArr.push(1);
			newMap.set(newStr,valueArr);
		}
	}
	console.log(newMap.values());

	var driverArr=new Array();
	var resultMap=new Map();
	var valArr=new Array();
	for(let item of newMap.values()){
		if(driverArr.includes(item[2])){
			valArr=[];
			valArr=resultMap.get(item[2])
			valArr[1]=valArr[1]+1;
			valArr[2]=valArr[2]+item[3];
			resultMap.set(item[2],valArr)
		}else{
			driverArr.push(item[2]);
			valArr=[];
			valArr.push(item[2]);
			valArr.push(1);
			valArr.push(item[3]);
			resultMap.set(item[2],valArr)
		}
	}	
	console.log(resultMap.values());
	return resultMap.values();
}

var barcodeArr = new Array();
var refArr = new Array();
var fieldArr=[0,0,0,0];
function showRefTable(){
	 	barcodeArr=[];
		refArr=[];
		var fo=0;
		
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
				if(orderArr[x1]==25 || orderArr[x1]==26){
					var cellName1 = jexcel.getColumnNameFromId([x2, y2]);
					if(table3.getValue(cellName1)=="Photos"){
						var cellName4 = jexcel.getColumnNameFromId([2, y2]);
						
						var barcode =showArr[y2][5];
						showPhoto(barcode,navpo[1]);
					}
				}
				
				console.log('x1='+x1);
				console.log('x1po='+orderArr[x1]);	
			}

			if(x1 ==0 && x2==0 && y1==0 && y2==0){

			}else{
				if(orderArr[x1] != 25 && orderArr[x1] != 26){
					document.getElementById('spreadsheet').onmouseup=function(event){
						if(refDataArr.length>0){
							var poChoosed=orderArr.indexOf("0");
							for(j = y1; j < y2+1; j++) {
								var cellName2 = jexcel.getColumnNameFromId([poChoosed, j]);
								console.log("poChoosed="+poChoosed);
								console.log("selectedRows[j]="+j);
								console.log("cellName2="+table3.getValue(cellName2));
								console.log(navpo[1]);
								switch (navpo[1]) {
									
									case 'OrigData':
									case 'TroubleItem':
									case 'Finished':
										var cellName3 = jexcel.getColumnNameFromId([2, j]);
										console.log('The selection from ' + cellName2 + ' to ' + cellName3 + '');
										if(table3.getValue(cellName2)=='OK'){
											table3.setValue(cellName2,'' );
											barcodeArr.remove(showArr[j][5]);									
										}else{
											console.log("cellName2 value="+table3.getValue(cellName2));									
											table3.setValue(cellName2, 'OK');									
											console.log("cellName2 setvalue=ok");
											barcodeArr.push(showArr[j][5]);
											
										}
										console.log(j);
									console.log(showArr[j][5]);
									console.log(barcodeArr);
									var po=5;//barcode
										break;
									case 'UnDispatch':
									case 'Dispatched':
										if(table3.getValue(cellName2)=='OK'){
											table3.setValue(cellName2,'' );
											refArr.remove(showArr[j][6]);
											
										}else{
											
											table3.setValue(cellName2, 'OK');
											refArr.push(showArr[j][6]);
											
										}
										console.log(j);
										console.log(showArr[j][6]);
									console.log(refArr);
									var po=6;//ref
										break;
									default:
										break;
								}
		
							} 
						}	
					}
				}
				
				//console.log(x1+"/"+y1+";"+x2+"/"+y2+';'+'selectionActive');
			}
		}

	document.getElementById('spreadsheet').innerHTML = '';	
	if(refDataArr.length>0){
		var table3 =jexcel(document.getElementById('spreadsheet'), {
			data:refDataArr,
			search:true,
			columns:refColumsArr,
		   
			onselection:selectionActive
			
		});
	
	}else{
		console.log('data is 0');
		//  var table3=jspreadsheet(document.getElementById('spreadsheet'), {
		// 	data:[[]],
		// 	search:true,
		// 	columns:refColumsArr,
			
		// });
		jexcel.destroy(document.getElementById('spreadsheet'));
	}

}

	var userInfoObj = new Object();
function saveUserInfo()
	{
		var userIn = window.localStorage.getItem('userInfo');
		window.sessionStorage.setItem('userInfo', userIn);
		var userInfoObj1=JSON.parse(userIn);
		userInfoObj=userInfoObj1;
		console.log(userInfoObj);
		var companyName=document.getElementById("companyName");
		companyName.innerHTML=userInfoObj.company;
		//window.localStorage.clear();
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
				window.alert("pathObj==null3");
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
	
	var navpo=new Array();
//var navpo=['Date for all','OrigData'];//0-vertical po, 5-level po	
function createUl()	{
		var menu=document.getElementById("menu");
		menu.innerHTML="";
		// 动态创建ul 内存中创建对象
		var ul = document.createElement('ul');
		// 把ul放到页面上 把ul放到DOM树上 并且会重新绘制
		ul.className="menuList";
		ul.style.padding="0px";
		ul.style.listStyle="none";
		
		menu.appendChild(ul);

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
		
		if(navpo[0]==null){
			navpo[0]="Date for all";
		}
		if(navpo[1]==null){
			navpo[1]="OrigData";		
		}
		refreshTable(navpo[0],navpo[1]);
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
function dropDownDisappear() {
	var menuButton=document.getElementById('menuButton');
	var drop=document.getElementById('listClick');
	drop.style.display = 'none';// 隐藏选择的元素
	menuButton.onmouseout=function(){
	drop.style.display="none";
	}	
	menuButton.onmouseover=function(){
	drop.style.display="block";
	}
}

function getId(obj) {
	//获得点击li元素的id，垂直列表
	var doc=document.getElementsByClassName('menuLi');
	//var objId = obj.id;
	for (var i=0; i < allDate.length; i++) {
		if(doc[i].id==obj.id){
			navpo[0]=doc[i].innerText;
			
			refreshTable(navpo[0],navpo[1]);
		}
	}

}

function getNavId(nav) {//水平列表
	navpo[1]=nav.innerText;
	refreshTable(navpo[0],navpo[1]);	
	
}
	
//var table;

function refresh(){
	if(userInfoObj==null){
		window.alert("did not find user!");
	}else{
		var json1 = JSON.stringify(userInfoObj);//调用stringify()将一个JS对象转换为JSON
		window.localStorage.setItem('userInfo', json1);
							
		//window.location.reload();
		var pathName = userInfoObj.company+"/OriginalData";
		firebaseSnapShot(pathName);
		dropDownDisappear();
		alertTimeout("data was refreshed!",2000);
		//window.setTimeout(this.close(), 2000);
		//window.alert("data was refreshed!");
	}
	
}

function alertTimeout(mymsg,mymsecs)
{
 var myelement = document.createElement("div");
 myelement.setAttribute("style","background-color: yellow;color:blue; width: 450px;height: 50px;position: absolute;top:0;bottom:0;left:0;right:0;margin:auto;border: 4px solid black;font-family:arial;font-size:25px;font-weight:bold;display: flex; align-items: center; justify-content: center; text-align: center;");
 myelement.innerHTML = mymsg;
 setTimeout(function(){
  myelement.parentNode.removeChild(myelement);
 },mymsecs);
 document.body.appendChild(myelement);
}

function dispatchTo(){
	dropDownDisappear();
	var barcodeChoosedArr = new Array();
	switch (navpo[1]) {
		case 'OrigData':
		case 'TroubleItem':
		case 'Finished':
			for(let item of barcodeArr){
				barcodeChoosedArr.push(item);			
			}
			break;
		case 'UnDispatch':
		case 'Dispatched':
			for(let item of dataArr){
			  if(item[58]=='UnDispatch' || item[58]=='Dispatched'){
				  if(refArr.includes(item[6])){//item[6]=ref
					  barcodeChoosedArr.push(item[5]);//item[5]=barcode
				  }	
			  }  
				
			}
			break;
		default:
			break;
	} 
	if(barcodeChoosedArr.length>0){
		var json2 = JSON.stringify(driverArr);//调用stringify()将一个JS对象转换为JSON
		window.sessionStorage.setItem('driverList', json2);
		window.open ("popup.html","_blank","width=300,height=200,menubar=no,toolbar=no,status=no,scrollbars=yes");   			
		
	}else{
		window.alert("Please choose items first!");
	}

	//newwindow","height=100, width=400,top=100,left=200"
	//createUl2();toolbar=no, menubar=no, "newwindow", "height=100, width=400,top=100,left=200, scrollbars=no, resizable=no, location=no, status=no"
}

function dailyJob(){
	var json2 = JSON.stringify(driverArr);//调用stringify()将一个JS对象转换为JSON
	window.sessionStorage.setItem('driverList', json2);
	//window.open ("driverDate.html","width=600,height=300,scrollbars=yes"); 
	window.open ("driverDate.html","_blank","width=600,height=300,scrollbars=yes"); 
	troubleFinishArr()  ;			
}

var troubleArr = new Array();
var finishArr = new Array();
var columnShowArr = new Array();
function troubleFinishArr(){
	var barcoArr = Object.values(pathObj);//barcodeArr=barcode's values
	troubleArr=[];
	finishArr=[];
	var columnArr=[
		'A0_When',
		'A1_ByWhoAdd',
		'B0_JobID',
		'B1_ModeID',
		'B2_Barcode',
		'B3_CarrierRef',
		'B4_ScheduledDate',
		'B5_BTaCC',
		'B6_ServiceType',
		'B7_Weight',
		'B8_Unit',
		'B9_Route',
		'C0_Company',
		'C1_Address1',
		'C2_Address2',
		'C3_Address3',
		'C4_Receiver',
		'C5_City',
		'C6_ProvState',
		'C7_PostalCode',
		'C8_Phone',
		'C9_Email',
		'D0_Courier',
		'D1_CountNo',
		'D2_PhotoT',
		'D3_PhotoF',
		'D4_When',
		'D5_ByWhoPrice',
		'D6_Size',
		'D7_HowMany',
		'D8_StartTime',
		'D9_EndTime',
		'E0_When',
		'E1_ByWhoReceive',
		'F0_When',
		'F1_ByWhoDispatch',
		'F2_ToWho',
		'G0_When',
		'G1_ByWhoLoad',
		'H0_When',
		'H1_ByWhoTrouble',
		'H2_TroubleReason',
		'H3_Comment',
		'H4_Photo',
		'I0_When',
		'I1_ByWhoFinish',
		'I2_FinishType',
		'I3_Comment',
		'I4_Photo',
		'I5_Receiver',
		'J0_When',
		'J1_ByWhoPrice',
		'J2_Size',
		'J3_HowMuch',
		'K0_When',
		'K1_ByWhoGroup',
		'K2_GroupCode',
		'L0_LastStep'
	];
	columnShowArr=[
		'AddTime',
		'ByWhoAdd',
		'JobID',
		'ModeID',
		'Barcode',
		'CarrierRef',
		'ScheduledDate',
		'CompanyFrom',
		'ServiceType',
		'Weight',
		'Unit',
		'Route',
		'CompanyTo',
		'Address1',
		'Address2',
		'Address3',
		'Receiver',
		'City',
		'ProvState',
		'PostalCode',
		'Phone',
		'Email',
		'Courier',
		'CountNo',
		'PhotoT',
		'PhotoF',
		'PriceTime',
		'PriceByWho',
		'Size',
		'HowMany',
		'StartTime',
		'EndTime',
		'ReceiveTime',
		'ReceivePerson',
		'DispatchTime',
		'ByWhoDispatch',
		'ToWho',
		'LoadTime',
		'ByWhoLoad',
		'TroubleTime',
		'ByWhoTrouble',
		'TroubleReason',
		'TroubleComment',
		'TroublePhoto',
		'FinishTime',
		'ByWhoFinish',
		'FinishType',
		'FinishComment',
		'FinishPhoto',
		'CustomReceiver',
		'ExtraFee',
		'TimePrice',
		'LocationPrice',
		'DeliveryPrice',
		'HighServiceFee',
		'ByWhoGroup',
		'GroupCode',
		'LastStep'
	];
	
	for (var i = 0; i < barcoArr.length; i++) {//i < barcodeArr.length
		//console.log('i='+i);
		var keyArr=Object.keys(barcoArr[i]);//key=pushcode 		
		var valueArr=Object.values(barcoArr[i]);//keyArr=key's values		
		
			var endDataArr = new Array();
			
			for (var n1 = 0; n1 < columnArr.length; n1++) {
				endDataArr.push('nil');
			}		
			
			
			for (var j = 0; j < valueArr.length; j++) {
				var m=0	;			
				for (var key in valueArr[j]) {
					
					var po=columnArr.indexOf(key); 
					endDataArr[po]=valueArr[j][key];      
					m=po;							
				}
				

				var tempArr = new Array();
				if(endDataArr[m]=='MeetTrouble' ){
					
					for(var item1 of endDataArr){
						tempArr.push(item1);
						
					}
					tempArr[56]=keyArr[j];
					if(tempArr[41] != 'short'){
						troubleArr.push(tempArr);
					}
					
				}else{
					if(endDataArr[m]=='Finished' ){
					
						for(var item2 of endDataArr){
							tempArr.push(item2);
							
						}
						tempArr[56]=keyArr[j];
						if(tempArr[46] == 'normal'){
							finishArr.push(tempArr);
						}
						
					}else{

					}
				}
				
			}
			console.log(endDataArr[4]);
			console.log(endDataArr);
			for(var itemT of troubleArr){
				if(itemT[4]==endDataArr[4]){
					for (var jk = 2; jk < 22; jk++){
						itemT[jk]=endDataArr[jk];
					}
					itemT[28]=endDataArr[28];
					itemT[29]=endDataArr[29];
					itemT[50]=endDataArr[50];
				}
				
			}	
			for(var item of finishArr){
				if(item[4]==endDataArr[4]){
					for (var jh = 2; jh < 22; jh++){
						item[jh]=endDataArr[jh];
					}
					
					item[28]=endDataArr[28];
					item[29]=endDataArr[29];
					item[30]=endDataArr[30];
					item[31]=endDataArr[31];
					item[50]=endDataArr[50];
				}
			}		
	} 
	getBillForm();
	 console.log(troubleArr);
	 console.log(finishArr);
}

function oneRowEdit(){
	var barcodeChoosedArr = new Array();
	switch (navpo[1]) {
		case 'OrigData':
		case 'TroubleItem':
		case 'Finished':
			for(let item of barcodeArr){
				barcodeChoosedArr.push(item);			
			}
			break;
		case 'UnDispatch':
		case 'Dispatched':
			for(let item of dataArr){
			  if(item[58]=='UnDispatch' || item[58]=='Dispatched'){
				  if(refArr.includes(item[6])){//item[6]=ref
					  barcodeChoosedArr.push(item[5]);//item[5]=barcode
				  }	
			  }  
				
			}
			break;
		default:
			break;
	} 
	if(barcodeChoosedArr.length==1){
		var barcodeNo=barcodeChoosedArr[0];
		var oneRowArr=dataMap.get(barcodeNo);
		var outPutArr=new Array();
		outPutArr.push("rowEdit");
		for (var k = 0; k < oneRowArr.length; k++){
			outPutArr.push(oneRowArr[k]);
		}
		var json = JSON.stringify(outPutArr);//调用stringify()将一个JS对象转换为JSON
		window.localStorage.setItem('outPut', json);
		
		window.open ("oneRowEdit.html");
	}else{
		window.alert("Please choose one item!");
	}
	   			
}

function unDispatch(){
	var barcodeChoosedArr = new Array();
	switch (navpo[1]) {
		case 'OrigData':
		case 'TroubleItem':
		case 'Finished':
			for(let item of barcodeArr){
				barcodeChoosedArr.push(item);			
			}
			break;
		case 'UnDispatch':
		case 'Dispatched':
			for(let item of dataArr){
				if(item[58]=='UnDispatch' || item[58]=='Dispatched'){
					if(refArr.includes(item[6])){//item[6]=ref
						barcodeChoosedArr.push(item[5]);//item[5]=barcode
					}
				}
				
			}
			break;
		default:
			break;
	} 
	
	  let myTime= new Date().valueOf(); 
	  var offset=new Date().getTimezoneOffset()*-60*1000; // offset mm
	  var obj = new Object();
	  obj['A0_When'] = (new Date(myTime + offset)).toISOString(); //获取时间戳
	  obj['A1_ByWhoAdd'] = userInfoObj.username;
	  obj['L0_LastStep'] = 'UnDispatch';
	
	  var ref = firebase.database().ref(userInfoObj.company+'/OriginalData');
	if(barcodeChoosedArr.length>0){
		for (var k = 0; k < barcodeChoosedArr.length; k++){
			var value=dataMap.get(barcodeChoosedArr[k]);
			if(value[46]=='nil'){
				var newPostRef = ref.child(barcodeChoosedArr[k]).push();
				newPostRef.set(obj);
			}else{
			window.alert(barcodeChoosedArr[k]+" was finished,con't dispatch it!")
			}
			
		  }
		  refresh();		
		
	}else{
		window.alert("Please choose items first!");
	}
	  
}

function exterminate(){
	var barcodeChoosedArr = new Array();
	switch (navpo[1]) {
		case 'OrigData':
		case 'TroubleItem':
		case 'Finished':
			for(let item of barcodeArr){
				barcodeChoosedArr.push(item);			
			}
			break;
		case 'UnDispatch':
		case 'Dispatched':
			for(let item of dataArr){
			  if(item[58]=='UnDispatch' || item[58]=='Dispatched'){
				  if(refArr.includes(item[6])){//item[6]=ref
					  barcodeChoosedArr.push(item[5]);//item[5]=barcode
				  }	
			  }  
				
			}
			break;
		default:
			break;
	} 
	if(navpo[1]=="TroubleItem"){
		if(barcodeChoosedArr.length>0){
			window.open ("exterminate.html","_blank","width=300,height=200,scrollbars=yes");		
			
		}else{
			window.alert("Please choose items first!");
		}
		
	}else{
		window.alert("only trouble item can be exterminated");
	}
	  			
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
					obj['F0_When'] = (new Date(myTime + offset)).toISOString(); //获取时间戳
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
			obj['A0_When'] = (new Date(myTime + offset)).toISOString(); //获取时间戳
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

var radioStatus="unchecked";
function radioClick(){
	// document.body.onmousedown = function (event) {

	// 	event = event || window.event;
	
	// 	var target = event.target ;
	
	// 	if (target.type === 'radio') {
	
	// 		target.previousValue = target.checked;
	
	// 	}
	
	// }
	
	document.body.onclick = function (event) {
	
		event = event || window.event;
	
		var target = event.target ;
	
		if (target.type === 'radio') {
			var radio=document.getElementById("rad01");
			console.log(radio.checked);
			//target.previousValue
			if (radioStatus=="unchecked" || radioStatus==null) {
				target.checked = true;
				radioStatus="checked";
				navpo[0]="Date for all";
				navpo[1]="Dispatched";
				radioTable();
				
				d=document.getElementsByClassName('menuLi');
				for (var i=0; i < allDate.length; i++) {
					if(d[i].innerHTML!=navpo[0]){
							d[i].style.backgroundColor='pink'/*其他*/
						}else{
							d[i].style.backgroundColor='blue'/*点击的*/
							
						} 
				}

				doc=document.getElementsByClassName('navList');
				for (var i=0; i < doc.length; i++) {
						if(doc[i].innerText==navpo[1]){/*点击的*/
							doc[i].style.backgroundColor='blueviolet';
							
						}else{
							doc[i].style.backgroundColor='#FFA500';
						} 
				}
				
				
			}else{
				target.checked = false;
				radioStatus="unchecked";
				navpo[0]="Date for all";
				navpo[1]="Dispatched";
				refreshTable(navpo[0],navpo[1]);

			}
	
		}
	
	}
	
	
}

function radioTable(){
	var dispatchedArr = new Array();
	dispatchedArr=filterBy(dataArr,58,'Dispatched');
	var localMap = new Map();//Map<String,List<String[]>>
	console.log(dispatchedArr);
	localMap=groupBy(dispatchedArr,37);//37=driver name
	localMap.keys;//drivers
	localMap.values.length;//each driver pcs
	var tempArr = new Array();
	var tableArr = new Array();
	var oneLineArr = new Array();
	console.log(localMap);
	for(let item of localMap.values()){
		
			for(let item2 of item){
				tempArr.push(item2);
			}
			
		console.log(tempArr);
		var localMap2 = new Map();//Map<String,List<String[]>>
		localMap2=groupBy(tempArr,20);//20=postcode;6=ref
		console.log(localMap2);
		//Object.getOwnPropertyNames(localMap2).length;
		var stops=localMap2.size;//stops
		var driverNameArr=new Array();//drivername
		for(let item3 of localMap2.values()){
			for(let item4 of item3){
				driverNameArr.push(item4);
				break;
			}
			break;
		}
		var driverName=driverNameArr[0][37];
		var pcs=localMap.get(driverName).length;//pcs
		oneLineArr=[];
		oneLineArr.push(driverName);
		oneLineArr.push(stops);
		oneLineArr.push(pcs);
		tableArr.push(oneLineArr);
		tempArr=[];
	}
	var tableColumsArr=[
		{ type: 'text', title:'Driver', width:140 },
		{ type: 'text', title:'Stops', width:100 },
		{ type: 'text', title:'Pcs', width:100 }
	]
	
	if(tableArr.length>0){
		document.getElementById('spreadsheet').innerHTML = '';	
		jexcel(document.getElementById('spreadsheet'), {
			data:tableArr,
			
			columns:tableColumsArr
			
		});
	
	}else{
		console.log('data is 0');
		jexcel.destroy(document.getElementById('spreadsheet'));
	}

}

function deleteItems(){
	var barcodeChoosedArr = new Array();
	switch (navpo[1]) {
		case 'OrigData':
		case 'TroubleItem':
		case 'Finished':
			for(let item of barcodeArr){
				barcodeChoosedArr.push(item);			
			}
			break;
		case 'UnDispatch':
		case 'Dispatched':
			for(let item of dataArr){
				if(refArr.includes(item[6])){//item[6]=ref
					barcodeChoosedArr.push(item[5]);//item[5]=barcode
				}	
			}
			break;
		default:
			break;
	} 

	var refOrig = firebase.database().ref(userInfoObj.company+'/OriginalData');
	var refBackup = firebase.database().ref(userInfoObj.company+'/BackupData');
	
	let map = new Map();
	var tempArr = new Array();
	for (var k = 0; k < barcodeChoosedArr.length; k++){
		tempArr=[];
		tempArr=dataMap.get(barcodeChoosedArr[k]);
		map.set(barcodeChoosedArr[k],tempArr);
	}
	console.log(map);
	var backupArr=[
		'A0_When',
		'A1_ByWhoAdd',
		'B0_JobID',
		'B1_ModeID',
		'B2_Barcode',
		'B3_CarrierRef',
		'B4_ScheduledDate',
		'B5_BTaCC',
		'B6_ServiceType',
		'B7_Weight',
		'B8_Unit',
		'B9_Route',
		'C0_Company',
		'C1_Address1',
		'C2_Address2',
		'C3_Address3',
		'C4_Receiver',
		'C5_City',
		'C6_ProvState',
		'C7_PostalCode',
		'C8_Phone',
		'C9_Email',
		'D0_Courier',
		'D1_CountNo',
		'D2_PhotoT',
		'D3_PhotoF',
		'D4_When',
		'D5_ByWhoPrice',
		'D6_Size',
		'D7_HowMany',
		'D8_StartTime',
		'D9_EndTime',
		'E0_When',
		'E1_ByWhoReceive',
		'F0_When',
		'F1_ByWhoDispatch',
		'F2_ToWho',
		'G0_When',
		'G1_ByWhoLoad',
		'H0_When',
		'H1_ByWhoTrouble',
		'H2_TroubleReason',
		'H3_Comment',
		'H4_Photo',
		'I0_When',
		'I1_ByWhoFinish',
		'I2_FinishType',
		'I3_Comment',
		'I4_Photo',
		'I5_Receiver',
		'J0_When',
		'J1_ByWhoPrice',
		'J2_Size',
		'J3_HowMuch',
		'K0_When',
		'K1_ByWhoGroup',
		'K2_GroupCode',
		'L0_LastStep'
	];
	for (let item of map.values()){
		var obj = new Object();
		console.log(item);
		for (var k = 0; k < backupArr.length; k++){
			console.log(item[k+1]);
			obj[backupArr[k]]=item[k+1];
		}		
		 var newPostRef = refBackup.child(item[5]).push();
		 newPostRef.set(obj);
	}
	for (let item2 of map.keys()){
		var newPostRef2 = refOrig.child(item2);
		newPostRef2.remove();
	}
	barcodeChoosedArr=[];
	refresh();
}

function getFileName(){
	var myFileName=document.getElementById("browseFile").value;
	//window.alert("fileName="+myFileName+"@"+userInfoObj.company+"#");

	if(myFileName.includes(userInfoObj.company)){
	// (B1) GET SELECTED CSV FILE
	let selected = document.getElementById("browseFile").files[0];
	
	// (B2) READ CSV INTO ARRAY
	let reader = new FileReader();
		reader.addEventListener("loadend", () => {
		// ===(B2-1) SPLIT ROWS & COLUMNS
		let data = reader.result.split("\r\n");
		//console.log(data);
		for (var i = 0; i < data.length; i++) {
			var strk=data[i];
			var complex=false;
			var newStr='';
			for (var k = 0; k < strk.length; k++){
				let c=strk[k];
					if(c=='"'){
						//===newStr += c;
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
	
		//===var data1=data.slice(0,-1)
		// console.log(data);
		 writeToFirebase(data);
		});
	reader.readAsText(selected);
	}else{
		window.alert("this data is not for you!");
	}
	myFileName="1234";
}


function writeToFirebase(inputData){
	let myTime= new Date().valueOf();
	var offset=new Date().getTimezoneOffset()*-60*1000; // offset mm
	console.log(inputData);
	var byWho=userInfoObj.username;
	var selectedName=['B0_JobID',
						'B1_ModeID',
						'B2_Barcode',
						'B3_CarrierRef',
						'B4_ScheduledDate',
						'B5_BTaCC',
						'B6_ServiceType',
						'B7_Weight',
						'B8_Unit',
						'B9_Route',
						'C0_Company',
						'C1_Address1',
						'C2_Address2',
						'C3_Address3',
						'C4_Receiver',
						'C5_City',
						'C6_ProvState',
						'C7_PostalCode',
						'C8_Phone',
						'C9_Email',
						'D0_Courier'
					];
	for (var k = 1; k < inputData.length; k++){
		var obj = new Object();
			obj['A0_When'] = (new Date(myTime + offset)).toISOString(); //获取时间戳
			obj['A1_ByWhoAdd'] = byWho;
			obj['L0_LastStep'] = 'UnDispatch';
		for (var h = 0; h < 21; h++){
			obj[selectedName[h]]=inputData[k][h];
		}
		console.log(obj);
		var ref = firebase.database().ref(userInfoObj.company+'/OriginalData');
			var newPostRef = ref.child(obj['B2_Barcode']).push();
			newPostRef.set(obj);
			obj=null;
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
	  obj['F0_When'] = (new Date(myTime + offset)).toISOString(); //获取时间戳
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

//var po1,po2,po3,po5,po6,po4;
function targetHandle(){
	console.log(navpo[1]);
	console.log(barcodeArr);
	var valueStr=localStorage.getItem('targetValue');
	var json=localStorage.getItem('editObj');
  	var editObj=JSON.parse(json);

	var barcodeChoosedArr = new Array();
	  switch (navpo[1]) {
		  case 'OrigData':
		  case 'TroubleItem':
		  case 'Finished':
			  for(let item of barcodeArr){
				  barcodeChoosedArr.push(item);			
			  }
			  break;
		  case 'UnDispatch':
		  case 'Dispatched':
			  for(let item of dataArr){
				if(item[58]=='UnDispatch' || item[58]=='Dispatched'){
					if(refArr.includes(item[6])){//item[6]=ref
						barcodeChoosedArr.push(item[5]);//item[5]=barcode
					}	
				}  
				  
			  }
			  break;
		  default:
			  break;
	  } 
	
	var ref = firebase.database().ref(userInfoObj.company+'/OriginalData');
	
	  switch (valueStr) {
		case 'dailyJob':
			var dstart = new Date(editObj.dateFrom);
			var dend = new Date(editObj.dateTo);
			console.log(dstart);
			console.log(dend);
			var dmin,dmax,doc;
			if(dstart<dend){
				dmin=dstart;
				dmax=dend;
				//dmax=new Date(dend.setDate(dend.getDate()+1));
				doc=editObj.dateFrom+"="+editObj.dateTo;
			}else{
				dmin=dend;
				dmax=dstart;
				//dmax=new Date(dstart.setDate(dstart.getDate()+1));
				doc=editObj.dateTo+"="+editObj.dateFrom;
				
			}
			console.log(doc);
			console.log(doc.replace(/\//g, '-'));
			var trouArr = new Array();
			var finiArr = new Array();
			var tTitleArr = new Array();
			var fTitleArr = new Array();
			var potArr1=[4,50,51,52,53,54,7,12,39,40,41];//trouble
			var pofArr3=[4,50,51,52,53,54,7,12,44,45,49];//finish
			// po2=potArr1.indexOf("53");
			// po4=pofArr3.indexOf("53");
			// po1=potArr1.indexOf("52");
			// po3=pofArr3.indexOf("52");
			// po5=potArr1.indexOf("51");
			// po6=pofArr3.indexOf("51");
			
			for(let item1 of potArr1){
				tTitleArr.push(columnShowArr[Number(item1)]);
			}
			for(let item3 of pofArr3){
				fTitleArr.push(columnShowArr[Number(item3)]);
			}
			for (var i = 0; i < troubleArr.length; i++){
				const strTime=troubleArr[i][39].substring(0,10);
				const mDate = new Date(strTime.replace(/-/g,"/"));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				console.log(troubleArr[i][39].substring(0,10));
				console.log(mDate);
				// po1=potArr1.indexOf("39");			
				if(editObj.driver=='all drivers'){
					if(dmin<=mDate && mDate<=dmax){					
						var tTempArr1 = new Array();
						for(let item of potArr1){
							tTempArr1.push(troubleArr[i][Number(item)]);
						}					
						//tTempArr1[po1]=mDate.toISOString();
						trouArr.push(tTempArr1);
					}
				}else{
					if(dmin<=mDate && mDate<=dmax && editObj.driver==troubleArr[i][40]){					
						var tTempArr2 = new Array();
						for(let item of potArr1){
							tTempArr2.push(troubleArr[i][Number(item)]);
						}					
						//tTempArr2[po1]=mDate.toISOString();					
						trouArr.push(tTempArr2);
					}
				}
				
			}
	
			for (var j = 0; j < finishArr.length; j++){			
				const strTime=finishArr[j][44].substring(0,10);
				const mDate2 = new Date(strTime.replace(/-/g,"/"));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				// po3=pofArr3.indexOf("44");
				if(editObj.driver=='all drivers'){
					if(dmin<=mDate2 && mDate2<=dmax){					
						var fTempArr3 = new Array();
						for(let item of pofArr3){
							fTempArr3.push(finishArr[j][Number(item)]);
						}
						//fTempArr3[po3]=finishArr[j][44];
						finiArr.push(fTempArr3);					
					}
				}else{
					if(dmin<=mDate2 && mDate2<=dmax && editObj.driver==finishArr[j][45]){					
						var fTempArr4 = new Array();
						for(let item of pofArr3){
							fTempArr4.push(finishArr[j][Number(item)]);
						}					
						//fTempArr4[po3]=finishArr[j][44];
						finiArr.push(fTempArr4);					
					}
				}
				
			}
			console.log(trouArr);
			console.log(finiArr);
	
			var fileName="dailyJob-"+doc+"-"+editObj.driver+".csv";
			console.log(fileName);
			
			download(tTitleArr,trouArr,fTitleArr,finiArr, fileName, "text/csv;charset=utf-8")
			trouArr=[];
			finiArr=[];
			fileName='';
			break;
		case 'dispatchTo':			
			for (var k = 0; k < barcodeChoosedArr.length; k++){
				var value=dataMap.get(barcodeChoosedArr[k]);
				var newPostRef1 = ref.child(barcodeChoosedArr[k]).push();
				if(value[46]=='nil'){//not finished						
					newPostRef1.set(editObj);
				}else{//finished
					window.alert(barcodeChoosedArr[k]+" was finished,can't change it!");
				}			
			}
			barcodeChoosedArr=[];
			refresh();			
			break;
		case 'exterminate':
			var obj2 = new Object();
			for (var k = 0; k < barcodeChoosedArr.length; k++){
				var value=dataMap.get(barcodeChoosedArr[k]);
				var newPostRef2 = ref.child(barcodeChoosedArr[k]).push();
				if(value[46]=='nil'){//not finished											
					obj2['I0_When'] = editObj['I0_When'];
					obj2['I1_ByWhoFinish'] = editObj['I1_ByWhoFinish'];
					obj2['I2_FinishType'] = editObj['I2_FinishType'];
					obj2['I3_Comment'] = value[43];
					obj2['I4_Photo'] = value[44];
					obj2['L0_LastStep'] = 'Finished';
					newPostRef2.set(obj2);
				}else{//finished
					window.alert(barcodeChoosedArr[k]+" was finished,can't change it!");
				}
			
			}
			barcodeChoosedArr=[];
			refresh();			
			break;
		case 'oneRowEdit':			
			for (var k = 0; k < barcodeChoosedArr.length; k++){				
				//var value=dataMap.get(barcodeChoosedArr[k]);
				var newPostRef3 = ref.child(barcodeChoosedArr[k]).push();
				newPostRef3.set(editObj);			
			}
			barcodeChoosedArr=[];
			refresh();	
			break;
		case 'newRowEdit':
			var newPostRef4 = ref.child(editObj['B2_Barcode']).push();
			newPostRef4.set(editObj);
			barcodeChoosedArr=[];
			refresh();	
			break;
		default:
			break;
	} 
	
}

function getBillForm()
	{
		var ref = firebase.database().ref(userInfoObj.company+'/Bill');
		var billArr = new Array();
		var billMap=new Map();
		ref.once('value', function(snapshot) {
			if(snapshot==null){
				window.alert("Bill==null");				
			}else{					
				snapshot.forEach(function(childSnapshot) {					
					var key = childSnapshot.key;					
					if(!billArr.includes(key)){
						billArr.push(key);
					}					
					childSnapshot.forEach(function(greatSnapshot) {						//var item = greatSnapshot.val();
						var key = greatSnapshot.key;						
						if(!billArr.includes(key)){
							billArr.push(key);
						}
						greatSnapshot.forEach(function(ggSnapshot) {							
							var key = ggSnapshot.key;							
							if(!billArr.includes(key)){
								billArr.push(key);
							}
							ggSnapshot.forEach(function(gggSnapshot) {
								var lastitem = gggSnapshot.val();
								var lastkey = gggSnapshot.key;								
								billArr.push(lastkey);
								var abc=billArr[0]+billArr[1]+billArr[2]+billArr[3];								
								billMap.set(abc,lastitem.toString());
								billArr.remove(billArr[3]);	
							});
							billArr.remove(billArr[2]);	
						});
						billArr.remove(billArr[1]);	
					});
					billArr.remove(billArr[0]);	
				});
				console.log(billMap);
				adjustTFarr(troubleArr,finishArr,billMap);
			}			
		});
}

function adjustTFarr(troubleArr2,finishArr2,billMap) {
	var whenTArr = new Array();
	for(let item of troubleArr2){
		if(item[28]=='Skid'){
			var bc='S';
		}else{
			item[28]='Parcel';
			var bc='P';
		}
		if(item[29]=='nil'){
			item[29]='1';
		}
		var abc=item[57]+item[28]+item[7]+item[29]+bc;		
		var price = billMap.get(abc);
		var abcd=item[57]+'Location'+item[7]+item[19].substring(0,3);		
		var locationPrice;
		if(billMap.has(abcd)){
			 locationPrice = billMap.get(abcd);
		}else{
			 locationPrice =0.00;
		}
		
		//console.log("locationPrice="+locationPrice);
		item[53]=Number(price);
		
		if(item[30] != 'nil' && item[28]=='Skid'){
			item[52]=Number(locationPrice);
		}else{
			item[52]=Number(0.00);
		}
		item[51]=Number(0.00);

		if(item[50]=='nil'){
			item[50]=Number(0.00);
		}

		if(item[8]=='HighService' && !whenTArr.includes(item[39])){
			whenTArr.push(item[39]);
			var abdT=item[57]+'HighService'+item[7]+'ServiceFee';		
			var HighServiceFeeT ;
			if(billMap.has(abdT)){
				HighServiceFeeT = billMap.get(abdT);
			}else{
				HighServiceFeeT =0.00;
			}		

			item[54]=Number(HighServiceFeeT);
		}
	}

	var whenFArr = new Array();
	for(let item of finishArr2){
		if(item[28]=='Skid'){
			var bc='S';
		}else{
			item[28]='Parcel';
			var bc='P';
		}
		if(item[29]=='nil'){
			item[29]='1';
		}
		var abc1=item[57]+item[28]+item[7]+item[29]+bc;		
		var price1 = billMap.get(abc1);
		var abcd1=item[57]+'Location'+item[7]+item[19].substring(0,3);		
		var locationPrice1 ;
		if(billMap.has(abcd1)){
			locationPrice1 = billMap.get(abcd1);
	    }else{
			locationPrice1 =0.00;
	    }		
		
		item[53]=Number(price1);
		
		if(item[30] != 'nil' && item[28]=='Skid'){
			item[52]=Number(locationPrice1);
		}else{
			item[52]=Number(0.00);
		}
		if(item[30] != 'nil' && item[28]=='Skid'){
			var def=item[57]+'Time'+item[7]+'oneHour';
			var timePrice=Number(billMap.get(def))/4;
			//item[30],start,item[31],end
			var startH=item[30].substring(0,item[30].indexOf(':'));		
			var startM=item[30].substring(item[30].indexOf(':')+1);
			var endH=item[31].substring(0,item[31].indexOf(':'));
			var endM=item[31].substring(item[31].indexOf(':')+1);
			console.log("startH="+startH+";"+"startM="+startM);
			console.log("endH="+endH+";"+"endM="+endM);
			var mins=(Number(endH)-Number(startH))*60+(Number(endM)-Number(startM))
			console.log("mins="+mins);
			if(mins>0 ){
				item[51]=parseInt(mins/15)*timePrice;
			}else{
				item[51]=Number(0.00);
			}
			
		}else{
			item[51]=Number(0.00);
		}
		if(item[50]=='nil'){
			item[50]=Number(0.00);
		}
		if(item[8]=='HighService' && !whenFArr.includes(item[44])){
			whenFArr.push(item[44]);
			var abd=item[57]+'HighService'+item[7]+'ServiceFee';		
			var HighServiceFee ;
			if(billMap.has(abd)){
				HighServiceFee = billMap.get(abd);
			}else{
				HighServiceFee =0.00;
			}		

			item[54]=Number(HighServiceFee);
		}

	}
console.log(troubleArr2);
console.log(finishArr2);
troubleArr=troubleArr2;
finishArr=finishArr2;
}

function download(tTitleArr,tData,fTitleArr,fData, filename, type) {
    var tPrice=0;
	var fPrice=0;
	
	var csvStr="MeetTroubleItems="+tData.length+'\r\n';
	for (var i = 0; i < tTitleArr.length; i++) {
		csvStr += tTitleArr[i]+","
	}
	csvStr = csvStr.slice(0,-1)+'\r\n';
	for (var j = 0; j < tData.length; j++) {
		for (var k = 0; k < tData[j].length; k++) {
			csvStr += tData[j][k]+"\t,"
			
		}
		tPrice=tPrice+tData[j][1]+tData[j][2]+tData[j][3]+tData[j][4]+tData[j][5];
		csvStr = csvStr.slice(0,-1)+'\r\n';
	}
	csvStr = csvStr+"Bill for T="+Number(tPrice).toFixed(2)+'\r\n';
	csvStr = csvStr.slice(0,-1)+'\r\n';
	
	csvStr = csvStr+"FinishedItems="+fData.length+'\r\n';
	for (var m = 0; m < fTitleArr.length; m++) {
		csvStr += fTitleArr[m]+","
	}
	csvStr = csvStr.slice(0,-1)+'\r\n';
	for (var n = 0; n < fData.length; n++) {
		for (var p = 0; p < fData[n].length; p++) {
			csvStr += fData[n][p]+"\t,"
			
		}
		fPrice=fPrice+fData[n][1]+fData[n][2]+fData[n][3]+fData[n][4]+fData[n][5];
		csvStr = csvStr.slice(0,-1)+'\r\n';
	}
	//csvStr = csvStr+"Bill for F="+fPrice.toFixed(2)+'\r\n';
	csvStr = csvStr+"Bill for F="+Number(fPrice).toFixed(2)+'\r\n';
	console.log(csvStr);
	
	var file = new Blob([csvStr], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
	csvStr="";
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
window.open ('showPhoto.html','newwindow','width='+(window.screen.availWidth)+',height='+(window.screen.availHeight)+ ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')

//window.open('showPhoto.html','toolbar=no,location=no');
}

