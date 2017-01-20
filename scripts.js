var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination','ui.bootstrap']);
var legis,bill,nbill,comm;

function MyController($scope,$http) {
    $scope.meals=[];
    $scope.bills=[];
    $scope.nbills=[];
    $scope.comms=[];
    $scope.fav_l=[];
    $scope.fav_b=[];
    $scope.fav_c=[];
    $scope.currentPage1 = 1;
    $scope.currentPage2 = 1;
    $scope.currentPage3 = 1;
    $scope.currentPage4 = 1;
    $scope.currentPage5 = 1;
    $scope.currentPage6 = 1;
    $scope.currentPage7 = 1;
    $scope.currentPage8 = 1;
    
    $("#myCarousel").carousel();
    $("#myCarousel2").carousel(); 
    $("#myCarousel3").carousel();
    
    $(".nav-tabs a").click(function(){
            $(this).tab('show');
    });
    $('.nav-tabs a').on("show.bs.tab",function(event){
        /*var x = $(event.target).text();
        if(x=='Favorites'){
            $scope.fav_l=[];
            for(var len=0;len<localStorage.length;len++){
                if(localStorage.getItem(localStorage.key(len))=='legislators'){
                    for(var h=0;h<legis['results'].length;h++){
                        if(legis['results'][h]['bioguide_id']==localStorage.key(len)){ 
                            $scope.fav_l.push({id:legis['results'][h]['bioguide_id'],email:legis['results'][h]['oc_email'],img:"https://theunitedstates.io/images/congress/original/"+legis['results'][h]['bioguide_id']+".jpg",party:legis['results'][h]['partyimg'],name:legis['results'][h]['title']+"."+legis['results'][h]['last_name']+","+legis['results'][h]['first_name'],chamber:legis['results'][h]['chamber'],state:legis['results'][h]['state_name']});
                        }
                    }
                }
            }
            console.log($scope.fav_l.splice(0,1));
        }*/
    });
    
    $http.jsonp('http://homework8.nbhfzpbexy.us-west-2.elasticbeanstalk.com/?callback=JSON_CALLBACK',{params:{detail:"legislators?apikey=9866274f0ecd495ea7ae1052be0fc607&per_page=all"}}).success(function(data){
        legis=data;
        for(var i=0;i<data['results'].length;i++){
            legis['results'][i]['liked']=false;
            if(data['results'][i]['party']=='R'){
                legis['results'][i]['partyName']="Republican";
                legis['results'][i]['partyimg']="http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
            }
            else if(data['results'][i]['party']=='D'){
                legis['results'][i]['partyName']="Democrat";
                legis['results'][i]['partyimg']="http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
            }
            else{
                legis['results'][i]['partyName']="Independent";
                legis['results'][i]['partyimg']="http://independentamericanparty.org/wp-content/themes/v/images/logo-american-heritage-academy.png";
            }
            if(data['results'][i]['chamber']=='senate'){
                legis['results'][i]['chamberIcon']="http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
            }
            else if(data['results'][i]['chamber']=='house'){
                legis['results'][i]['chamberIcon']="http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
            }
            if(data['results'][i]['district']==null){
                $scope.district="N.A";
            }
            else{
                $scope.district="District "+legis['results'][i]['district'];
            }
            for(var l=0;l<localStorage.length;l++){
                if(localStorage.key(l)==legis['results'][i]['bioguide_id']){
                    legis['results'][i]['liked']=true;
                    $scope.fav_l.push({id:legis['results'][i]['bioguide_id'],email:legis['results'][i]['oc_email'],img:"https://theunitedstates.io/images/congress/original/"+legis['results'][i]['bioguide_id']+".jpg",party:legis['results'][i]['partyimg'],name:legis['results'][i]['title']+"."+legis['results'][i]['last_name']+","+legis['results'][i]['first_name'],chamber:legis['results'][i]['chamber'],state:legis['results'][i]['state_name'],index:i,chamberimg:legis['results'][i]['chamberIcon']});
                }
            }
            $scope.meals.push({name:legis['results'][i]['last_name']+','+legis['results'][i]['first_name'],state:legis['results'][i]['state_name'],party:legis['results'][i]['partyimg'],chamber:legis['results'][i]['chamber'],chamberIcon:legis['results'][i]['chamberIcon'],district:$scope.district,id:legis['results'][i]['bioguide_id']});
        }
    });
    $http.jsonp('http://homework8.nbhfzpbexy.us-west-2.elasticbeanstalk.com/?callback=JSON_CALLBACK',{params:{detail:"bills?history.active=true&last_version.urls.pdf__exists=true&apikey=9866274f0ecd495ea7ae1052be0fc607&per_page=50"}}).success(function(data){
        bill=data;
        for(var k=0;k<50;k++){
            bill['results'][k]['liked']=false;
            if(bill['results'][k]['chamber']=='house'){
                bill['results'][k]['chamberimg']="http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
            }
            else if(bill['results'][k]['chamber']=='senate'){
                bill['results'][k]['chamberimg']="http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
            }
            for(var l=0;l<localStorage.length;l++){
                if(localStorage.key(l)==bill['results'][k]['bill_id']){
                    bill['results'][k]['liked']=true;
                    $scope.fav_b.push({id:bill['results'][k]['bill_id'],type:bill['results'][k]['bill_type'],title:bill['results'][k]['official_title'],chamber:bill['results'][k]['chamber'],introduce:bill['results'][k]['introduced_on'],sponsor:bill['results'][k]['sponsor']['title']+"."+bill['results'][k]['sponsor']['last_name']+","+bill['results'][k]['sponsor']['first_name'],index:k,adtive:true,chamberimg:bill['results'][k]['chamberimg']});
                }
            }
            $scope.bills.push({id:bill['results'][k]['bill_id'],type:bill['results'][k]['bill_type'].toUpperCase(),title:bill['results'][k]['official_title'],chamber:bill['results'][k]['chamber'],introduce:bill['results'][k]['introduced_on'],sponsor:bill['results'][k]['sponsor']['title']+'.'+bill['results'][k]['sponsor']['last_name']+','+bill['results'][k]['sponsor']['first_name'],chamberimg:bill['results'][k]['chamberimg']});
        }
    });
    $http.jsonp('http://homework8.nbhfzpbexy.us-west-2.elasticbeanstalk.com/?callback=JSON_CALLBACK',{params:{detail:"bills?history.active=false&last_version.urls.pdf__exists=true&apikey=9866274f0ecd495ea7ae1052be0fc607&per_page=50"}}).success(function(data){
        nbill=data;
        for(var k=0;k<50;k++){
            nbill['results'][k]['liked']=false;
            if(nbill['results'][k]['chamber']=='house'){
                nbill['results'][k]['chamberimg']="http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
            }
            else if(nbill['results'][k]['chamber']=='senate'){
                nbill['results'][k]['chamberimg']="http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
            }
            for(var l=0;l<localStorage.length;l++){
                if(localStorage.key(l)==nbill['results'][k]['bill_id']){
                    nbill['results'][k]['liked']=true;
                    $scope.fav_b.push({id:nbill['results'][k]['bill_id'],type:nbill['results'][k]['bill_type'],title:nbill['results'][k]['official_title'],chamber:nbill['results'][k]['chamber'],introduce:nbill['results'][k]['introduced_on'],sponsor:nbill['results'][k]['sponsor']['title']+"."+nbill['results'][k]['sponsor']['last_name']+","+nbill['results'][k]['sponsor']['first_name'],index:k,active:'false',chamberimg:nbill['results'][k]['chamberimg']});
                }
            }
            $scope.nbills.push({id:nbill['results'][k]['bill_id'],type:nbill['results'][k]['bill_type'].toUpperCase(),title:nbill['results'][k]['official_title'],chamber:nbill['results'][k]['chamber'],introduce:nbill['results'][k]['introduced_on'],sponsor:nbill['results'][k]['sponsor']['title']+'.'+nbill['results'][k]['sponsor']['last_name']+','+nbill['results'][k]['sponsor']['first_name'],chamberimg:nbill['results'][k]['chamberimg']});
        }
    });
    $http.jsonp('http://homework8.nbhfzpbexy.us-west-2.elasticbeanstalk.com/?callback=JSON_CALLBACK',{params:{detail:"committees?apikey=9866274f0ecd495ea7ae1052be0fc607&per_page=all"}}).success(function(data){
        comm=data;
        for(var k=0;k<data['results'].length;k++){
            comm['results'][k]['liked']=false;
            if(comm['results'][k]['chamber']=='house'){
                comm['results'][k]['chamberimg']="http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
            }
            else{
                comm['results'][k]['chamberimg']="http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
            }
            for(var l=0;l<localStorage.length;l++){
                if(localStorage.key(l)==comm['results'][k]['committee_id']){
                    comm['results'][k]['liked']=true;
                    $scope.fav_c.push({chamber:comm['results'][k]['chamber'],id:comm['results'][k]['committee_id'],name:comm['results'][k]['name'],parent:comm['results'][k]['parent_committee_id'],subcommittee:comm['results'][k]['subcommittee'],index:k,chamberimg:comm['results'][k]['chamberimg']});
                }
            }
            $scope.comms.push({chamberimg:comm['results'][k]['chamberimg'],chamber:comm['results'][k]['chamber'],id:comm['results'][k]['committee_id'],name:comm['results'][k]['name'],parent:comm['results'][k]['parent_committee_id'],contact:comm['results'][k]['phone'],office:(comm['results'][k]['office']==null)?'N.A':comm['results'][k]['office'],class:(comm['results'][k]['liked'])?'fa fa-star yellow':'fa fa-star-o'});
        }
    });
    $scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
    };
    $scope.r=function(a,b){
        $scope.constructLeftTable(a);
        $scope.constructRightTable(a);
        $scope.constructDownTable(a);
        for(var person in legis['results']){
            if(legis['results'][person]['bioguide_id']==a){
                if(legis['results'][person]['liked']==true){
                    $(".star_icon").attr('class','fa fa-star yellow star_icon');
                }
                else if(legis['results'][person]['liked']==false){
                    $(".star_icon").attr('class','fa fa-star-o star_icon');
                }
            }
        }
        $("#"+b).carousel("next");
    }
    $scope.l=function(){
        $("#myCarousel").carousel("prev");
    }
    $scope.r2=function(a){
        var str2,pdf;
        $("#myCarousel2").carousel("next"); 
        for(var b in bill['results']){
            if(bill['results'][b]['bill_id']==a){
                if(bill['results'][b]['liked']==true){
                    $(".star_icon").attr('class','fa fa-star yellow star_icon');
                }
                else if(bill['results'][b]['liked']==false){
                    $(".star_icon").attr('class','fa fa-star-o star_icon');
                }
            }
        }
        for(var m=0;m<50;m++){
            if(bill['results'][m]['bill_id']==a){
                var status='';
                if(bill['results'][m]['history']['active']==true){
                    status='Active';
                }
                else if(bill['results'][m]['history']['active']==false){
                    status='New';
                }
                str2="<div class='table-responsive'><table class='table detailtable'><tr><th>Bill ID</th><td class='extractfav2'>"+a+"</td></tr><tr><th>Title</th><td>"+bill['results'][m]['official_title']+"</td></tr><tr><th>Bill Type</th><td>"+bill['results'][m]['bill_type'].toUpperCase()+"</td></tr><tr><th>Sponsor</th><td>"+bill['results'][m]['sponsor']['title']+"."+bill['results'][m]['sponsor']['last_name']+","+bill['results'][m]['sponsor']['first_name']+"</td></tr><tr><th>Chamber</th><td>"+bill['results'][m]['chamber']+"</td></tr><tr><th>Status</th><td>"+status+"</td></tr><tr><th>Introduced On</th><td>"+moment(bill['results'][m]['introduced_on']).format('MMM D,YYYY')+"</td></tr><tr><th>Congress URL</th><td><a rel='next' target='_blank' href='"+bill['results'][m]['urls']['congress']+"'>URL</a></td></tr><tr><th>Version Status</th><td>"+bill['results'][m]['last_version']['version_name']+"</td></tr><tr><th>Bill URL</th><td><a rel='next' target='_blank' href='"+bill['results'][m]['last_version']['urls']['pdf']+"'>Link</a></td></tr></table></div>";
                pdf="<object class='embedpdf' type='application/pdf' data='"+bill['results'][m]['last_version']['urls']['pdf']+"'/>";
            }
        }
        $(".billdetailtable").html(str2);
        $(".billpdf").html(pdf);
    }
    $scope.l2=function(){
    $("#myCarousel2").carousel("prev");
}
    $scope.r3=function(a){
        var str3,pdf;
        $("#myCarousel2").carousel("next"); 
        for(var b in nbill['results']){
            if(nbill['results'][b]['bill_id']==a){
                if(nbill['results'][b]['liked']==true){
                    $(".star_icon").attr('class','fa fa-star yellow star_icon');
                }
                else if(nbill['results'][b]['liked']==false){
                    $(".star_icon").attr('class','fa fa-star-o star_icon');
                }
            }
        }
        for(var m=0;m<50;m++){
            if(nbill['results'][m]['bill_id']==a){
                var status='';
                if(nbill['results'][m]['history']['active']==true){
                    status='Active';
                }
                else if(nbill['results'][m]['history']['active']==false){
                    status='New';
                }
                str3="<div class='table-responsive'><table class='table detailtable'><tr><th>Bill ID</th><td class='extractfav2'>"+a+"</td></tr><tr><th>Title</th><td>"+nbill['results'][m]['official_title']+"</td></tr><tr><th>Bill Type</th><td>"+nbill['results'][m]['bill_type'].toUpperCase()+"</td></tr><tr><th>Sponsor</th><td>"+nbill['results'][m]['sponsor']['title']+"."+nbill['results'][m]['sponsor']['last_name']+","+nbill['results'][m]['sponsor']['first_name']+"</td></tr><tr><th>Chamber</th><td>"+nbill['results'][m]['chamber']+"</td></tr><tr><th>Status</th><td>"+status+"</td></tr><tr><th>Introduced On</th><td>"+nbill['results'][m]['introduced_on']+"</td></tr><tr><th>Congress URL</th><td><a rel='next' target='_blank' href='"+nbill['results'][m]['urls']['congress']+"'>URL</a></td></tr><tr><th>Version Status</th><td>"+bill['results'][m]['last_version']['version_name']+"</td></tr><tr><th>Bill URL</th><td><a rel='next' target='_blank' href='"+nbill['results'][m]['last_version']['urls']['pdf']+"'>Link</a></td></tr></table></div>";
                pdf="<embed class='embedpdf' src='"+nbill['results'][m]['last_version']['urls']['pdf']+"'/>";
            }
        }
        $(".billdetailtable").html(str3);
        $(".billpdf").html(pdf);
    }
    $scope.l3=function(){
        $("#myCarousel3").carousel(0);
    }
    $scope.add_fav_leg=function(){
        var email = document.getElementsByClassName("detailleft")[0].getElementsByTagName("a")[0].firstChild.nodeValue;
        for(var q=0;q<legis['results'].length;q++){
            if(legis['results'][q]['oc_email']==email){
                if(legis['results'][q]['liked']==true){
                    $(".star_icon").attr('class','fa fa-star-o star_icon');
                    legis['results'][q]['liked']=false;
                    if(typeof(Storage)!=="undefined"){
                        localStorage.removeItem(legis['results'][q]['bioguide_id']);
                    }
                    for(var x=0;x<$scope.fav_l.length;x++){
                        if($scope.fav_l[x]['email']==email){
                            $scope.fav_l.splice(x,1);
                        }
                    }
                }
                else if(legis['results'][q]['liked']==false){
                    $(".star_icon").attr('class','fa fa-star yellow star_icon');
                    legis['results'][q]['liked']=true;
                    if(typeof(Storage)!=="undefined"){
                        localStorage.setItem(legis['results'][q]['bioguide_id'],'legislators');
                    }
                    $scope.fav_l.push({id:legis['results'][q]['bioguide_id'],email:legis['results'][q]['oc_email'],img:"https://theunitedstates.io/images/congress/original/"+legis['results'][q]['bioguide_id']+".jpg",party:legis['results'][q]['partyimg'],name:legis['results'][q]['title']+"."+legis['results'][q]['last_name']+","+legis['results'][q]['first_name'],chamber:legis['results'][q]['chamber'],state:legis['results'][q]['state_name'],index:q,chamberimg:legis['results'][q]['chamberIcon']});
                }
            }
        }
    }
    $scope.delete_leg=function(a,b,c){
        localStorage.removeItem(a);
        legis['results'][c]['liked']=false;
        var tablerow=document.getElementsByClassName("fav_leg_table")[0].getElementsByTagName("tr");
        for(var i=1;i<tablerow.length;i++){
            if(tablerow[i].getElementsByTagName("td")[6].childNodes[0].firstChild.nodeValue==b){
            document.getElementsByClassName("fav_leg_table")[0].deleteRow(i);
            }
        }
        for(var x=0;x<$scope.fav_l.length;x++){
            if($scope.fav_l[x]['email']==b){
                $scope.fav_l.splice(x,1);
            }
        }
    }
    $scope.add_fav_bill=function(){
        var billid = document.getElementsByClassName("billdetailtable")[0].getElementsByTagName("td")[0].firstChild.nodeValue;
        console.log(billid);
        for(var b in bill['results']){
            if(bill['results'][b]['bill_id']==billid){
                if(bill['results'][b]['liked']==true){
                    $(".star_icon").attr('class','fa fa-star-o star_icon');
                    bill['results'][b]['liked']=false;
                    if(typeof(Storage)!=="undefined"){
                        localStorage.removeItem(billid);
                    }
                    for(var x=0;x<$scope.fav_b.length;x++){
                        if($scope.fav_b[x]['id']==billid){
                            $scope.fav_b.splice(x,1);
                        }
                    }
                }
                else if(bill['results'][b]['liked']==false){
                    $(".star_icon").attr('class','fa fa-star yellow star_icon');
                    bill['results'][b]['liked']=true;
                    if(typeof(Storage)!=="undefined"){
                        localStorage.setItem(billid,'bills');
                    }
                    $scope.fav_b.push({id:bill['results'][b]['bill_id'],type:bill['results'][b]['bill_type'],title:bill['results'][b]['official_title'],chamber:bill['results'][b]['chamber'],introduce:bill['results'][b]['introduced_on'],sponsor:bill['results'][b]['sponsor']['title']+"."+bill['results'][b]['sponsor']['last_name']+","+bill['results'][b]['sponsor']['first_name'],index:b,active:'true',chamberimg:bill['results'][b]['chamberimg']});
                }
            }
        }
        for(var b in nbill['results']){
            if(nbill['results'][b]['bill_id']==billid){
                if(nbill['results'][b]['liked']==true){
                    $(".star_icon").attr('class','fa fa-star-o star_icon');
                    nbill['results'][b]['liked']=false;
                    if(typeof(Storage)!=="undefined"){
                        localStorage.removeItem(billid);
                    }
                    for(var x=0;x<$scope.fav_b.length;x++){
                        if($scope.fav_b[x]['id']==billid){
                            $scope.fav_b.splice(x,1);
                        }
                    }
                }
                else if(nbill['results'][b]['liked']==false){
                    $(".star_icon").attr('class','fa fa-star yellow star_icon');
                    nbill['results'][b]['liked']=true;
                    if(typeof(Storage)!=="undefined"){
                        localStorage.setItem(billid,'bills');
                    }
                    $scope.fav_b.push({id:nbill['results'][b]['bill_id'],type:nbill['results'][b]['bill_type'],title:nbill['results'][b]['official_title'],chamber:nbill['results'][b]['chamber'],introduce:nbill['results'][b]['introduced_on'],sponsor:nbill['results'][b]['sponsor']['title']+"."+nbill['results'][b]['sponsor']['last_name']+","+nbill['results'][b]['sponsor']['first_name'],index:b,active:'false',chamberimg:nbill['results'][b]['chamberimg']});
                }
            }
        }
    }
    $scope.delete_bill=function(a,b,c){
        localStorage.removeItem(a);
        if(c=="true"){
            bill['results'][b]['liked']=false;
        }
        else{
            nbill['results'][b]['liked']=false;
        }
        var tablerow=document.getElementsByClassName("fav_bill_table")[0].getElementsByTagName("tr");
        for(var i=1;i<tablerow.length;i++){
            if(tablerow[i].getElementsByTagName("td")[1].firstChild.nodeValue==a){
                document.getElementsByClassName("fav_bill_table")[0].deleteRow(i);
            }
        }
        for(var x=0;x<$scope.fav_b.length;x++){
            if($scope.fav_b[x]['id']==a){
                $scope.fav_b.splice(x,1);
            }
        }
    }
    $scope.add_fav_comm=function(a){
        for(var i=0;i<comm['results'].length;i++){
            if(comm['results'][i]['committee_id']==a){
                if(comm['results'][i]['liked']==true){
                    $("#"+a).attr('class','fa fa-star-o');
                    comm['results'][i]['liked']=false;
                    if(typeof(Storage)!=="undefined"){
                        localStorage.removeItem(a);
                    }
                    for(var x=0;x<$scope.fav_c.length;x++){
                        if($scope.fav_c[x]['id']==a){
                            $scope.fav_c.splice(x,1);
                        }
                    }
                }
                else if(comm['results'][i]['liked']==false){
                    $("#"+a).attr('class','fa fa-star yellow');
                    comm['results'][i]['liked']=true;
                    if(typeof(Storage)!=="undefined"){
                        localStorage.setItem(a,'committees');
                    }
                    $scope.fav_c.push({chamber:comm['results'][i]['chamber'],id:comm['results'][i]['committee_id'],name:comm['results'][i]['name'],parent:comm['results'][i]['parent_committee_id'],subcommittee:comm['results'][i]['subcommittee'],index:i,chamberimg:comm['results'][i]['chamberimg']});
                }
            }
        }
    }
    $scope.delete_comm=function(a,b){
        localStorage.removeItem(a);
        comm['results'][b]['liked']=false;
        $("#"+a).attr('class','fa fa-star-o');
        var tablerow=document.getElementsByClassName("fav_comm_table")[0].getElementsByTagName("tr");
        for(var i=1;i<tablerow.length;i++){
            if(tablerow[i].getElementsByTagName("td")[2].firstChild.nodeValue==a){
                document.getElementsByClassName("fav_comm_table")[0].deleteRow(i);
            }
        }
        for(var x=0;x<$scope.fav_c.length;x++){
            if($scope.fav_c[x]['id']==a){
                $scope.fav_c.splice(x,1);
            }
        }
    }
    $scope.constructLeftTable = function(a){
        var str='';
        for(var person in legis['results']){
            if(legis['results'][person]['bioguide_id']==a){
                var now = new Date();
                var start = new Date(legis['results'][person]['term_start']);
                var end = new Date(legis['results'][person]['term_end']);
                var termvalue=Math.round(((now-start)/(end-start))*100);
                var sociallinks='';
                if(legis['results'][person]['twitter_id']!=undefined){
                    sociallinks+="<a rel='next' target='_blank' href='https://twitter.com/"+legis['results'][person]['twitter_id']+"'><img class='sociallinkicon' src='http://cs-server.usc.edu:45678/hw/hw8/images/t.png'></a>";
                }
                if(legis['results'][person]['facebook_id']!=undefined){
                    sociallinks+="<a rel='next' target='_blank' href='https://www.facebook.com/"+legis['results'][person]['facebook_id']+"'><img class='sociallinkicon' src='http://cs-server.usc.edu:45678/hw/hw8/images/f.png'></a>";
                }
                if(legis['results'][person]['website']!=undefined){
                    sociallinks+="<a href='"+legis['results'][person]['website']+"' rel='next' target='_blank'><img class='sociallinkicon' src='http://cs-server.usc.edu:45678/hw/hw8/images/w.png'></a>";
                }
                /*str = "<div class='table-responsive container-fluid'><table class='table detailtable'><tr><td rowspan='5'><img src='https://theunitedstates.io/images/congress/original/"+a+".jpg' class='figureimg'></td><td>"+legis['results'][person]['title']+"."+legis['results'][person]['last_name']+","+legis['results'][person]['first_name']+"</td></tr><tr><td><a href='mailto:"+legis['results'][person]['oc_email']+"' target='_top'>"+legis['results'][person]['oc_email']+"</a></td></tr><tr><td>Chamber:<span class='capitalize'>"+legis['results'][person]['chamber']+"</span></td></tr><tr><td>Contect:<a href='tel:"+legis['results'][person]['phone']+"'>"+legis['results'][person]['phone']+"</a></td></tr><tr><td><img src='"+legis['results'][person]['partyimg']+"' class='partyIcon'>"+legis['results'][person]['partyName']+"</td></tr><tr><th class='minihid'>Start Term</th><td >"+moment(legis['results'][person]['term_start']).format('MMM D,YYYY')+"</td></tr><tr><th class='minihid'>End Term</th><td>"+moment(legis['results'][person]['term_end']).format('MMM D,YYYY')+"</td></tr><tr><th class='hidden-xs'>Term</th><td class='hidden-xs'><div class='progress'><div class='progress-bar progress-bar-success' role='progressbar' style='width:"+termvalue+"%'>"+termvalue+"%</div></div></td></tr><tr><th class='minihid'>Office</th><td>"+legis['results'][person]['office']+"</td></tr><tr><th class='minihid'>State</th><td>"+legis['results'][person]['state_name']+"</td></tr><tr><th class='minihid'>Fax</th><td><a href='fax:+"+legis['results'][person]['fax']+"'>"+legis['results'][person]['fax']+"</a></td></tr><tr><th class='minihid'>Birthday</th><td>"+moment(legis['results'][person]['birthday']).format('MMM D,YYYY')+"</td></tr><tr><th class='minihid'>Social Links</th><td>"+sociallinks+"</td></tr></table></div>";*/
                str = "<div class='container-fluid'><div class='row'><div class='col-sm-6 col-xs-12 figure'><img src='https://theunitedstates.io/images/congress/original/"+a+".jpg' class='figureimg'></div><div class='col-sm-6 col-xs-12'><table class='table detailtable'><tr><td>"+legis['results'][person]['title']+"."+legis['results'][person]['last_name']+","+legis['results'][person]['first_name']+"</td></tr><tr><td><a href='mailto:"+legis['results'][person]['oc_email']+"' target='_top'>"+legis['results'][person]['oc_email']+"</a></td></tr><tr><td>Chamber:<span class='capitalize'>"+legis['results'][person]['chamber']+"</span></td></tr><tr><td>Contect:<a href='tel:"+legis['results'][person]['phone']+"'>"+legis['results'][person]['phone']+"</a></td></tr><tr><td><img src='"+legis['results'][person]['partyimg']+"' class='partyIcon'>"+legis['results'][person]['partyName']+"</td></tr></table></div></div><table class='table detailtable'><tr><th class='minihid'>Start Term</th><td >"+moment(legis['results'][person]['term_start']).format('MMM D,YYYY')+"</td></tr><tr><th class='minihid'>End Term</th><td>"+moment(legis['results'][person]['term_end']).format('MMM D,YYYY')+"</td></tr><tr><th class='hidden-xs'>Term</th><td class='hidden-xs'><div class='progress'><div class='progress-bar progress-bar-success' role='progressbar' style='width:"+termvalue+"%'>"+termvalue+"%</div></div></td></tr><tr><th class='minihid'>Office</th><td>"+legis['results'][person]['office']+"</td></tr><tr><th class='minihid'>State</th><td>"+legis['results'][person]['state_name']+"</td></tr><tr><th class='minihid'>Fax</th><td><a href='fax:+"+legis['results'][person]['fax']+"'>"+legis['results'][person]['fax']+"</a></td></tr><tr><th class='minihid'>Birthday</th><td>"+moment(legis['results'][person]['birthday']).format('MMM D,YYYY')+"</td></tr><tr><th class='minihid'>Social Links</th><td>"+sociallinks+"</td></tr></table></div>";
            }
        }
        $(".detailleft").html(str);
    }
    $scope.constructRightTable = function(a){
        var commDetails = "committees?member_ids="+a+"&apikey=9866274f0ecd495ea7ae1052be0fc607&per_page=5";
        $http.jsonp('http://homework8.nbhfzpbexy.us-west-2.elasticbeanstalk.com/?callback=JSON_CALLBACK',{params:{detail:commDetails}}).success(function(data){
            var str="<div class='table-responsive'><table class='table table-condensed detailtable'><caption>Committees</caption><tr><th>Chamber</th><th>Committee ID</th><th class='minihid'>Name</th></tr>";
            for(var p = 0;p<data['results'].length;p++){
                str+="<tr><td>"+data['results'][p]['chamber']+"</td><td>"+data['results'][p]['committee_id']+"</td><td class='minihid'>"+data['results'][p]['name']+"</td></tr>";
            }
            str+="</table></div>";
            $(".detailright").html(str);
        });
    }
    $scope.constructDownTable = function(a){
        var billDetails = "bills?sponsor_id="+a+"&last_version.urls.pdf__exists=true&apikey=9866274f0ecd495ea7ae1052be0fc607&per_page=5";
        $http.jsonp('http://homework8.nbhfzpbexy.us-west-2.elasticbeanstalk.com/?callback=JSON_CALLBACK',{params:{detail:billDetails}}).success(function(data){
            var str="<div class='table-responsive'><table class='table table-condensed detailtable'><caption>Bills</caption><tbody><tr><th>Bill ID</th><th class='minihid'>Title</th><th class='minihid'>Chamber</th><th class='minihid'>Bill Type</th><th class='minihid'>Congress</th><th>Link</th></tr>";
            for(var p = 0;p<data['results'].length;p++){
                str+="<tr><td>"+data['results'][p]['bill_id']+"</td><td class='minihid'>"+data['results'][p]['official_title']+"</td><td class='minihid'>"+data['results'][p]['chamber']+"</td><td class='minihid'>"+data['results'][p]['bill_type']+"</td><td class='minihid'>"+data['results'][p]['congress']+"</td><td><a href='"+data['results'][p]['last_version']['urls']['pdf']+" rel='next' target='_blank''>Link</a></td></tr>";
            }
            str+="</tbody></table></div>";
            $(".detaildown").html(str);
        });
    }
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
    $scope.favde=function(a){
        $scope.constructLeftTable(a);
        $scope.constructRightTable(a);
        $scope.constructDownTable(a);
        $(".star_icon2").attr('class','fa fa-star yellow star_icon2');
        $("#myCarousel3").carousel("next");
    }
    $scope.delFromFav_l=function(){
        var email = document.getElementsByClassName("detailleft")[1].getElementsByTagName("a")[0].firstChild.nodeValue;
        for(var i=0;i<legis['results'].length;i++){
            if(legis['results'][i]['oc_email']==email){
                console.log(legis['results'][i]['bioguide_id']);
                $scope.delete_leg(legis['results'][i]['bioguide_id'],legis['results'][i]['oc_email'],i);
            }
        }
        $(".star_icon2").attr('class','fa fa-star-o star_icon2');
    }
    $scope.favde2=function(a,b){
        var str='';
        if(b=="true"){
            for(var m=0;m<50;m++){
                if(bill['results'][m]['bill_id']==a){
                    var status='';
                    if(bill['results'][m]['history']['active']==true){
                        status='Active';
                    }
                    else if(bill['results'][m]['history']['active']==false){
                        status='New';
                    }
                    str="<div class='table-responsive'><table class='table detailtable'><tr><th>Bill ID</th><td class='extractfav2'>"+a+"</td></tr><tr><th>Title</th><td>"+bill['results'][m]['official_title']+"</td></tr><tr><th>Bill Type</th><td>"+bill['results'][m]['bill_type'].toUpperCase()+"</td></tr><tr><th>Sponsor</th><td>"+bill['results'][m]['sponsor']['title']+"."+bill['results'][m]['sponsor']['last_name']+","+bill['results'][m]['sponsor']['first_name']+"</td></tr><tr><th>Chamber</th><td>"+bill['results'][m]['chamber']+"</td></tr><tr><th>Status</th><td>"+status+"</td></tr><tr><th>Introduced On</th><td>"+moment(bill['results'][m]['introduced_on']).format('MMM D,YYYY')+"</td></tr><tr><th>Congress URL</th><td><a rel='next' target='_blank' href='"+bill['results'][m]['urls']['congress']+"'>URL</a></td></tr><tr><th>Version Status</th><td>"+bill['results'][m]['last_version']['version_name']+"</td></tr><tr><th>Bill URL</th><td><a rel='next' target='_blank' href='"+bill['results'][m]['last_version']['urls']['pdf']+"'>Link</a></td></tr></table></div>";
                    pdf="<object class='embedpdf' type='application/pdf' data='"+bill['results'][m]['last_version']['urls']['pdf']+"'/>";
                }
            }
            $(".billdetailtable").html(str);
            $(".billpdf").html(pdf);
        }
        else{
            for(var m=0;m<50;m++){
                if(nbill['results'][m]['bill_id']==a){
                    var status='';
                    if(nbill['results'][m]['history']['active']==true){
                        status='Active';
                    }
                    else if(nbill['results'][m]['history']['active']==false){
                        status='New';
                    }
                    str="<div class='table-responsive'><table class='table detailtable'><tr><th>Bill ID</th><td class='extractfav2'>"+a+"</td></tr><tr><th>Title</th><td>"+nbill['results'][m]['official_title']+"</td></tr><tr><th>Bill Type</th><td>"+nbill['results'][m]['bill_type'].toUpperCase()+"</td></tr><tr><th>Sponsor</th><td>"+nbill['results'][m]['sponsor']['title']+"."+nbill['results'][m]['sponsor']['last_name']+","+nbill['results'][m]['sponsor']['first_name']+"</td></tr><tr><th>Chamber</th><td>"+nbill['results'][m]['chamber']+"</td></tr><tr><th>Status</th><td>"+status+"</td></tr><tr><th>Introduced On</th><td>"+nbill['results'][m]['introduced_on']+"</td></tr><tr><th>Congress URL</th><td><a rel='next' target='_blank' href='"+nbill['results'][m]['urls']['congress']+"'>URL</a></td></tr><tr><th>Version Status</th><td>"+bill['results'][m]['last_version']['version_name']+"</td></tr><tr><th>Bill URL</th><td><a rel='next' target='_blank' href='"+nbill['results'][m]['last_version']['urls']['pdf']+"'>Link</a></td></tr></table></div>";
                    pdf="<embed class='embedpdf' src='"+nbill['results'][m]['last_version']['urls']['pdf']+"'/>";
                }
            }
            $(".billdetailtable").html(str);
            $(".billpdf").html(pdf);
        }
        $(".star_icon3").attr('class','fa fa-star yellow star_icon3');
        $("#myCarousel3").carousel(2);
    }
    $scope.delFromFav_b=function(){
        var billid = document.getElementsByClassName("billdetailtable")[1].getElementsByTagName("td")[0].firstChild.nodeValue;
        console.log(billid);
        $(".star_icon3").attr('class','fa fa-star-o star_icon3');
        for(var i=0;i<50;i++){
            if(bill['results'][i]['bill_id']==billid){
                $scope.delete_bill(bill['results'][i]['bill_id'],i,"true");
            }
            else if(nbill['results'][i]['bill_id']==billid){
                $scope.delete_bill(nbill['results'][i]['bill_id'],i,"false");
            }
        }
    }
}
/*function PageController($scope) {
    $scope.currentPage = 1;
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
}*/
myApp.controller('MyController', MyController);
//myApp.controller('PageController', PageController);

function openNav(){
    if(document.getElementById("myNav").style.display==""){
        document.getElementById("myNav").style.display="none";
        $(".pagecon").css('margin-left',0);
        $(".pagecon").css('width','100%');
        //$("#webcontent").attr('class','tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12');
    }
    else if(document.getElementById("myNav").style.display="none"){
        document.getElementById("myNav").style.display="";
        $(".pagecon").css('margin-left','13%');
        $(".pagecon").css('width','87%');
        //$("#webcontent").attr('class','tab-content col-lg-10 col-md-10 col-sm-10 col-xs-10');
    }
    /*var w = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
    if(w<=768){
        minwid="50px";
    }
    else{
        minwid="150px";
    }
    if(document.getElementById("myNav").style.width=="0px"){
        document.getElementById("myNav").style.width = minwid;
        document.getElementById("webcontent").style.marginLeft= minwid;
    }
    else{
        document.getElementById("myNav").style.width = "0px";
        document.getElementById("webcontent").style.marginLeft = "0px";
    }*/
}