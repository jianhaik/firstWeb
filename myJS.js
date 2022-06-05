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
			  ref.child(userName.value).once('value', function(snapshot) {
				var userInfo=snapshot.val();//userInfo is obj
				console.log(userName.value);
				console.log(passWord.value);
				console.log(userInfo);
					if(passWord.value==userInfo.password){
						document.getElementById("demo").innerHTML = "password ok";
						var json = JSON.stringify(userInfo);//调用stringify()将一个JS对象转换为JSON
						window.localStorage.setItem('userInfo', json);
				
						//window.close();
						
						window.open('secondPage.html');
						
					}else{
						document.getElementById("demo").innerHTML = "UserName or PassWord is Wrong"; 
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
	//var columsComObj=new Object();
function preExcelData(origObj){
	var columsObj={
		'Choosed':40,
		'A0_When':100,
		'A1_ByWho':60,
		'A2_Event':140,
		'B0_JobID':50,
		'B1_ModeID':50,
		'B2_Barcode':120,
		'B3_CarrierRef':170,
		'B4_ScheduledDate':120,
		'B5_BTACC':90,
		'B6_ServiceType':80,
		'B7_Weight':80,
		'B8_Unit':50,
		'C0_Compay':170,
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
		'E1_ByWho':80,
		'E2_Event':80,
		'F0_When':80,
		'F1_ByWho':90,
		'F2_Event':80,
		'F3_ToWho':70,
		'G0_When':80,
		'G1_ByWho':80,
		'G2_Event':90,
		'H0_When':90,
		'H1_ByWho':90,
		'H2_Event':80,
		'H3_TroubleReason':80,
		'H4_Comment':70,
		'H5_Photo':80,
		'I0_When':80,
		'I1_ByWho':70,
		'I2_Event':60,
		'I3_FinishType':80,
		'I4_Comment':70,
		'I5_Photo':80,
		'I6_Receiver':80,
		'J0_When':80,
		'J1_ByWho':80,
		'J2_Event':80,
		'J3_Size':80,
		'J4_HowMuch':80,
		'k0_LastStep':80
	}
	let earlyTime= new Date('2011-01-01').valueOf();
	console.log('earlyTime='+earlyTime);
	var whenPo=[1,36,43,49];//AddOrigData,Dispatch,MeetTrouble,Finish
	var lastStep=['AddOrigData','Dispatch','MeetTrouble','Finish'];
	var maxArr = new Array();
	//columsComObj=columsObj;
	//console.log(columsObj);
	var columsKeyArr=Object.keys(columsObj);
	var columsArr1 = new Array();
	for (let myKey in columsObj) {

		 var columsItemObj = new Object();				
		 if(myKey=='Choosed'){
			columsItemObj.type='checkbox';
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
	
	var barcodeArr = Object.values(origObj);//barcodeArr=barcode's values
	var endDataArr = new Array();
	var dataArr1 = new Array();
	for (var i = 0; i < barcodeArr.length; i++) {
		
			var keyArr=Object.values(barcodeArr[i]);//keyArr=key's values		
		 	//console.log('i='+i);			
		 	endDataArr=[];

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
			
			for (var j = 0; j < keyArr.length; j++) {
								
				for (var k in keyArr[j]) {
					
					var po=columsKeyArr.indexOf(k);          
					
					if(po>=0){
						endDataArr[po]=keyArr[j][k];
					}			
				}
				
			}
			for (var k = 0; k < whenPo.length; k++) {
				maxArr.push(endDataArr[whenPo[k]]);
				
			}
			var re = maxArr[0];
			for (var i = 1; i < maxArr.length; i++) {
				if(maxArr[i]>re){
					re=maxArr[i];
				}
				
			}
				
			var maxpo=maxArr.indexOf(re); 
			endDataArr[61]=lastStep[maxpo];
			dataArr1.push(endDataArr);				
	}
	dataArr=dataArr1;
	console.log(dataArr);
	var allDate1 = new Array();
	for (var m = 0; m < dataArr.length; m++) {
		if(dataArr[m][3]=="AddOrigData"){
			var deliverDate=dataArr[m][8];
			if(!allDate1.includes(deliverDate)){
				allDate1.push(deliverDate);
			}
		}
	}

	allDate1.sort();
	allDate=allDate1;
	console.log(allDate);
	
	createUl();
}

	var refDataArr = new Array();
	var refColumsArr = new Array();
function refreshTable(myDate,myNav){
	refDataArr=[];
	refColumsArr=[];
	 console.log('myDate='+myDate);
	 console.log('myNav='+myNav);
	timePo=[1,36,43,49];//AddOrigData,Dispatch,MeetTrouble,Finish
	var navObj={
		'OrigData':[0,5,6,7,8,9,13,14,15,16,17,21,61],
		'Undidpatch':[0,5,6,7,8,9,13,14,15,16,17,21,1,2,3],
		'Dispatched':[0,5,6,7,8,9,13,14,15,16,17,21,36,37,38,39],//Undidpatch  Dispatched
		'TroubleItem':[0,5,6,7,8,9,13,14,15,16,17,21,43,44,45,46,47,48],//TroubleItem
		'Finished':[0,5,6,7,8,9,13,14,15,16,17,21,49,50,51,52,53,54,55]//Finished
	}
	var matchObj={
		'OrigData':'AddOrigData',//all
		'Undidpatch':'AddOrigData',
		'Dispatched':'Dispatch',
		'TroubleItem':'MeetTrouble',
		'Finished':'Finish'
	}
	var dataArr2 = new Array();
	//console.log(dataArr);
	for (var i = 0,ilen=dataArr.length; i < ilen; i++) {
		dataArr2=[];
		for (var j = 0,jlen=dataArr[i].length; j < jlen; j++) {
			if(myNav=='OrigData'){//all laststep
				if(myDate=='nil'){//all date
					if(navObj[myNav].includes(j)){
						if(timePo.includes(j)){
							var d=new Date(dataArr[i][j]);
							dataArr2.push(d);
						}else{
							dataArr2.push(dataArr[i][j]);							
						}
						
					}
				}else{//all laststep,special date
					if(navObj[myNav].includes(j) &&  dataArr[i][8]==myDate){
						if(timePo.includes(j)){
							var d=new Date(dataArr[i][j]);
							dataArr2.push(d);
						}else{
							dataArr2.push(dataArr[i][j]);							
						}
						
					}
				}
			}else{//special last step
				if(myDate=='nil'){//all date
					if(navObj[myNav].includes(j) && dataArr[i][61]==matchObj[myNav]){
						if(timePo.includes(j)){
							var d=new Date(dataArr[i][j]);
							dataArr2.push(d);
						}else{
							dataArr2.push(dataArr[i][j]);
						}
						
					}
					
				}else{//special last step,special date
					if(navObj[myNav].includes(j) && dataArr[i][8]==myDate && dataArr[i][61]==matchObj[myNav]){
						if(timePo.includes(j)){
							var d=new Date(dataArr[i][j]);
							dataArr2.push(d);
						}else{
							dataArr2.push(dataArr[i][j]);
						}
						
					}
				}
				
			}
		}
		if(dataArr2[6]!=null){
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
	
	showRefTable()
}

function showRefTable(){
	document.getElementById('spreadsheet').innerHTML = '';
	var table3=jspreadsheet(document.getElementById('spreadsheet'), {
		data:refDataArr,
		search:true,
		columns:refColumsArr
		
	});

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
	
var navpo=['nil','OrigData'];//0-vertical po, 5-level po	
function createUl()
	{
		var menu=document.getElementById("menu");
		// 动态创建ul 内存中创建对象
		var ul = document.createElement('ul');
		// 把ul放到页面上 把ul放到DOM树上 并且会重新绘制
		ul.className="menuList";
		//ul.style.listStyle="none";
		ul.style.alignSelf="center";
		menu.appendChild(ul);

		// var allDate1 = JSON.parse(window.sessionStorage.getItem('allDate'));
		// allDate = allDate1;
		for (var i=0; i < allDate.length; i++) {
			var data = allDate[i];
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
		//document.getElementsByClassName('menuLi')[0].style.backgroundColor='blue';
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
function showTable(){

	var table2=jspreadsheet(document.getElementById('spreadsheet'), {
		data:dataArr,
		search:true,
		columns:columsArr
		
	});

table=table2;
}

function refresh(){
	var json1 = JSON.stringify(userInfoObj);//调用stringify()将一个JS对象转换为JSON
	window.localStorage.setItem('userInfo', json1);
	window.close();					
	window.open('secondPage.html');
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
  for (let i in data) {
	var strk=data[i];
	var complex=false;
	var newStr='';
	for (var k = 0; k < strk.length; k++){
		let c=strk.charAt(k);
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

  data.splice(data.length-1,1)
  console.log(data);
  writeToFirebase(data);
});
reader.readAsText(selected);
}


function writeToFirebase(inputData){
	let myTime= new Date().valueOf();
	//console.log(myTime);
	var byWho=userInfoObj.username;
	var event='AddOrigData';
	var heading = [];
	var selectedIndex=[];
	var selectedName=[];
	for (let i in inputData) {
		if(i==0){
			heading=inputData[i]
			
			var str=heading[0]+heading[4]+heading[11];
			
			switch (str) {
				case 'JobIDHubIDDriver':
					selectedIndex=[0,1,23,2,3,14,26,28,13,15,16,17,18,19,21,20,22];//choose item
					selectedName=[
						'B0_JobID',
						'B1_ModeID',
						'B2_Barcode',
						'B3_CarrierRef',
						'B4_ScheduledDate',
						'B5_BTACC',
						'B7_Weight',
						'B8_Unit',
						'C0_Compay',
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
			obj['A0_When'] = myTime; //获取时间戳
			obj['A1_ByWho'] = byWho;
			obj['A2_Event'] = event;
			
			for (let j in inputData[i]) {					
					let index = selectedIndex.indexOf(Number(j) );
					var key1=selectedName[index];
				if(index>-1 && index!=4 && index!=8){
					
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
						if (myMonth < 10) {
							myMonth = "0" + myMonth;
						}
						//console.log(myMonth);
						var myYear=value0.substring(value0.indexOf("/20")+1,value0.indexOf(" "));
						//inputData[i][j]=myMonth+"/"+myDay+"/"+myYear;
						obj[key1] = myMonth+"/"+myDay+"/"+myYear;
				}
				if(index==8){//j=13
					// console.log(inputData[i][1]);
					// console.log(inputData[i][14]);
					if(inputData[i][1] == "PK" || inputData[i][14] == "NOVEXCO" ){
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
			console.log(obj);

			var ref = firebase.database().ref(userInfoObj.company+'/OrignalData');
			var newPostRef = ref.child(obj.B2_Barcode).push();
			newPostRef.set(obj);

		}
		
		
	  }


}