console.log("hello script js");

const toggleSidebar = () =>{
    if($(".sidebar").is(":visible")){
        $(".sidebar").css("display","none");
        $(".content").css("margin-left","0%");
    } else{
        $(".sidebar").css("display","block");
        $(".content").css("margin-left","20%");
    }
}
function saveContact(){
	debugger;
 var lAjax = new Ajax();
             debugger;
             lAjax.setUrl('http://localhost:8081/user/process-contact');
             lAjax.setSync(true);
             lAjax.setType("POST");
             lAjax.setDataType("json");
             lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
             lAjax.setData(10);
             lAjax.addEventListener('success', function (response) {
                 debugger;
                 console.log(response);
                  const time = response.data;  
                
                 $("#status_time").val(time);
                 });
             
             lAjax.addEventListener('error', function (textStatus, errorThrown) {
        alert("Error : " + textStatus + " - " + errorThrown);
    });

    lAjax.execute();
 }  