/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Team() {

    this.dataList;
    this.teamMap = new Hashtable();

    this.getTeamMap = function () {
        return this.teamMap;
    };

    this.setTeamMap = function (pTeamMap) {
        this.teamMap = pTeamMap;
    };

    this.setDataList = function (pDataList) {
        debugger;
        this.dataList = pDataList;
    };

    this.getDataList = function () {
        return this.dataList;
    };

    this.getTeam = function () {
        var that = this;
        var lUser = JSON.parse(sessionStorage.getItem("USER"));
        var lUser1 = "";
        if (lUser !== null) {
            lUser1 = lUser.BUID.toString();
        }
        var url = localStorage.getItem("url") + 'webresources/LeadWorkflowServiceAPI/getOrgStructure?data=' + lUser1;
        var lAjax = new Ajax();
        lAjax.setUrl(url);
        lAjax.setType("GET");
        lAjax.setSync(true); //need to select records. hence made synchronous.
        var that = this;
        this.teamMap = new Hashtable();
        lAjax.addEventListener('success', function (response) {
            response = JSON.parse(response);
            that.getDataList().empty();
            for (var i in response) {
                var lData = response[i];
                that.teamMap.put(lData.levelCode, lData);
                var lStr = lData.levelValue + " , " + lData.userName + " , " + lData.empCode;
                var opt = $("<option></option>").attr("value", lData.levelCode);
                opt.text(lStr);
                that.getDataList().append(opt);
            }

        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };


    this.getAllStatusCaption = function (pProjectName) {
        var that = this;
        var url = localStorage.getItem("url") + 'webresources/LeadWorkflowServiceAPI/getAllStatusCaption';
        var data = {"ProjectName": pProjectName};
        var lData = JSON.stringify(data);
        var lAjax = new Ajax();
        lAjax.setUrl(url);
        lAjax.setType("POST");
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        lAjax.setData(lData);
        lAjax.setSync(true); //need to select records. hence made synchronous.
        var that = this;
        this.teamMap = new Hashtable();
        lAjax.addEventListener('success', function (response) {
            response = JSON.parse(response);
            that.getDataList().empty();
            if (pProjectName === "MW_LOAN")
            {
                var lData = ["New Call", "Unassigned Call"];
                var opt = $("<option></option>").attr("value", "New Call");
                opt.text("New Call")
                that.getDataList().append(opt);
                var opt = $("<option></option>").attr("value", "Unassigned Call");
                opt.text("Unassigned Call");
                that.getDataList().append(opt);
                var opt = $("<option></option>").attr("value", "Follow Up By Executive");
                opt.text("Follow Up By Executive");
                that.getDataList().append(opt);
            }
            for (var i in response) {
                var lData = response[i];
                that.teamMap.put(lData, lData);

                if (lData !== "Problematic at RO")
                {
                    if (lData !== "Risk Problematic")
                    {
                        if (lData !== "Rejected")
                        {
                            var opt = $("<option></option>").attr("value", lData);
                            opt.text(lData);
                            that.getDataList().append(opt);
                        }
                    }
                }
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };

    this.getYesBankTeam = function () {
        var that = this;
        var url = localStorage.getItem("url") + 'webresources/LeadWorkflowServiceAPI/getYesBankOrgStructure';
        var lAjax = new Ajax();
        lAjax.setUrl(url);
        lAjax.setType("GET");
        lAjax.setSync(true); //need to select records. hence made synchronous.
        var that = this;
        this.teamMap = new Hashtable();
        lAjax.addEventListener('success', function (response) {
            response = JSON.parse(response);
            that.getDataList().empty();
            for (var i in response) {
                var lData = response[i];
                that.teamMap.put(lData.levelCode, lData);
                var lStr = lData.levelValue + " , " + lData.userName + " , " + lData.empCode;
                var opt = $("<option></option>").attr("value", lData.levelCode);
                opt.text(lStr);
                that.getDataList().append(opt);
            }

        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();

    };

    this.getServiceTeam = function () {
        debugger;
        var url = localStorage.getItem("url") + 'webresources/LeadWorkflowServiceAPI/getServiceOrgStructure';
        var lAjax = new Ajax();
        lAjax.setUrl(url);
        lAjax.setType("GET");
        lAjax.setSync(true); //need to select records. hence made synchronous.
        var that = this;
        this.teamMap = new Hashtable();
        lAjax.addEventListener('success', function (response) {

            response = JSON.parse(response);
            that.getDataList().empty();
            for (var i in response) {
                var lData = response[i];
                that.teamMap.put(lData.levelCode, lData);
                var lStr = lData.levelValue + " , " + lData.userName + " , " + lData.empCode;
                var opt = $("<option></option>").attr("value", lData.levelCode);
                opt.text(lStr);
                that.getDataList().append(opt);
            }

        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };

    this.getDropDownData = function (key, project) {
        var url = localStorage.getItem('url') + 'webresources/LeadWorkflowServiceAPI/getDropDownData';
        var lAjax = new Ajax();
        var lData = {"key": key, "project": project};
        var json = JSON.stringify(lData);
        lAjax.setData(json);
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        lAjax.setUrl(url);
        lAjax.setType('post');
        var that = this;
        lAjax.addEventListener('success', function (response) {
            var lValues = {};
            response = JSON.parse(response);
            that.getDataList().empty();
            lValues = response.data;
            for (var i in lValues) {
                var lValue = lValues[i];
                var lStr = lValue.value;
                var opt = $("<option></option>").attr("value", lValue.text);
                opt.text(lStr);
                that.getDataList().append(opt);
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };

    this.getTaskForceTeam = function () {
        var lUser = sessionStorage.getItem("USER");
        var url = localStorage.getItem("url") + 'webresources/TaskForceServiceAPI/getOrgStructure';
        var lAjax = new Ajax();
        lAjax.setUrl(url);
        lAjax.setType("POST");
        lAjax.setDataType("json");
        lAjax.setData(lUser);
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        lAjax.setSync(true); //need to select records. hence made synchronous.
        var that = this;
        this.teamMap = new Hashtable();
        lAjax.addEventListener('success', function (response) {
            //response = JSON.parse(response);
            that.getDataList().empty();
            for (var i in response) {
                var lData = response[i];
                that.teamMap.put(lData.levelCode, lData);
                var lStr = lData.levelValue + " , " + lData.userName + " , " + lData.empCode;
                var opt = $("<option></option>").attr("value", lData.levelCode);
                opt.text(lStr);
                that.getDataList().append(opt);
            }

        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };

    this.getLoanUserTeam = function (key) {
        var url = localStorage.getItem("url") + 'webresources/TaskForceServiceAPI/getLoanUserTeam';
        var lAjax = new Ajax();
        var lData = {"key": key};
        var json = JSON.stringify(lData);
        lAjax.setData(json);
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        lAjax.setUrl(url);
        lAjax.setType('post');
        var that = this;
        this.teamMap = new Hashtable();
        lAjax.addEventListener('success', function (response) {
            response = JSON.parse(response);
            that.getDataList().empty();
            for (var i in response) {
                var lData = response[i];
                if (key === 'backend') {
                    that.teamMap.put(lData.levelCode, lData);
                }
                var lStr = lData.levelValue + " , " + lData.userName + " , " + lData.empCode;
                var opt = $("<option></option>").attr("value", lData.levelCode);
                opt.text(lStr);
                that.getDataList().append(opt);
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };
}


function Workflow() {
    this.data;
    this.url = localStorage.getItem("url") + "webresources/LeadWorkflowServiceAPI/routeBulk";
    this.message = "Request routed..";

    this.setData = function (pData) {
        this.data = pData;
    };

    this.getData = function () {
        return this.data;
    };

    this.getURL = function () {
        return this.url;
    };

    this.setMessage = function (pMessage) {
        this.message = pMessage;
    };

    this.getMessage = function () {
        return this.message;
    };

    this.route = function () {
        var that = this;
        var lAjax = new Ajax();
        lAjax.setUrl(this.getURL());
        lAjax.setType("POST");
        lAjax.setDataType("json");
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        var data = JSON.stringify(this.data);
        lAjax.setData(data);
        lAjax.addEventListener('success', function (response) {
            //response = JSON.parse(response);
            //var opt = $("<option></option>").attr("value", res.DATA[i][0]);
            //alert("Lead Assigned");
            $.smallBox({
                title: that.getMessage(),
                content: "<i class='fa fa-clock-o'></i> <i>" + that.getMessage() + "...</i>",
                color: "#739E73",
                iconSmall: "fa fa-thumbs-up bounce animated",
                timeout: 2000
            }, function () {

                //window.location.hash = "ui/view/leads/AssignedToManager.html";
                checkURL();
            });
            if ($('#modal').modal) {
                $('#modal').modal('hide');
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            alert('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };


    this.assign = function () {
        var that = this;
        var lAjax = new Ajax();
        lAjax.setUrl(localStorage.getItem("url") + "webresources/LeadWorkflowServiceAPI/assignRequest");
        lAjax.setType("POST");
        lAjax.setDataType("json");
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        var data = JSON.stringify(this.data);
        lAjax.setData(data);
        lAjax.addEventListener('success', function (response) {

            $.smallBox({
                title: that.getMessage(),
                content: "<i class='fa fa-clock-o'></i> <i>" + that.getMessage() + "...</i>",
                color: "#739E73",
                iconSmall: "fa fa-thumbs-up bounce animated",
                timeout: 2000
            }, function () {

                checkURL();
            });
            if ($('#modal').modal) {
                $('#modal').modal('hide');
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            alert('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };

    this.move = function () {
        var that = this;
        var lAjax = new Ajax();
        lAjax.setUrl(localStorage.getItem("url") + "webresources/LeadWorkflowServiceAPI/moveTo");
        lAjax.setType("POST");
        lAjax.setDataType("json");
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        var data = JSON.stringify(this.data);
        lAjax.setData(data);
        lAjax.addEventListener('success', function (response) {

            $.smallBox({
                title: that.getMessage(),
                content: "<i class='fa fa-clock-o'></i> <i>" + that.getMessage() + "...</i>",
                color: "#739E73",
                iconSmall: "fa fa-thumbs-up bounce animated",
                timeout: 2000
            }, function () {

                checkURL();
            });
            if ($('#modal').modal) {
                $('#modal').modal('hide');
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            alert('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };

    this.moveLoan = function () {
        debugger;
        var that = this;
        var lAjax = new Ajax();
        lAjax.setUrl(localStorage.getItem("url") + "webresources/TaskForceServiceAPI/moveTo");
        lAjax.setType("POST");
        lAjax.setDataType("json");
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        var data = JSON.stringify(this.data);
        lAjax.setData(data);
        lAjax.addEventListener('success', function (response) {
            $.smallBox({
                title: that.getMessage(),
                content: "<i class='fa fa-clock-o'></i> <i>" + that.getMessage() + "...</i>",
                color: "#739E73",
                iconSmall: "fa fa-thumbs-up bounce animated",
                timeout: 2000
            }, function () {

                checkURL();
            });
            if ($('#modal').modal) {
                $('#modal').modal('hide');
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            alert('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };


}

function WorkflowService() {
    this.data;
    this.url = localStorage.getItem("url") + "webresources/workflowWebServiceAPI/routeBulk";
    this.message = "Request routed..";

    this.setData = function (pData) {
        this.data = pData;
    };

    this.getData = function () {
        return this.data;
    };

    this.getURL = function () {
        return this.url;
    };

    this.setMessage = function (pMessage) {
        this.message = pMessage;
    };

    this.getMessage = function () {
        return this.message;
    };

    this.route = function () {
        var that = this;
        var lAjax = new Ajax();
        lAjax.setUrl(this.getURL());
        lAjax.setType("POST");
        lAjax.setDataType("json");
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        var data = JSON.stringify(this.data);
        lAjax.setData(data);
        lAjax.addEventListener('success', function (response) {
            //response = JSON.parse(response);
            //var opt = $("<option></option>").attr("value", res.DATA[i][0]);
            //alert("Lead Assigned");
            $.smallBox({
                title: that.getMessage(),
                content: "<i class='fa fa-clock-o'></i> <i>" + that.getMessage() + "...</i>",
                color: "#739E73",
                iconSmall: "fa fa-thumbs-up bounce animated",
                timeout: 2000
            }, function () {

                //window.location.hash = "ui/view/leads/AssignedToManager.html";
                checkURL();
            });
            if ($('#modal').modal) {
                $('#modal').modal('hide');
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            alert('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };
}
function MoveLead() {
    this.data;
    this.url = localStorage.getItem("url") + "webresources/LeadWorkflowServiceAPI/moveTo";
    this.message = "Request routed..";


    this.setData = function (pData) {
        this.data = pData;
    };

    this.getData = function () {
        return this.data;
    };

    this.getURL = function () {
        return this.url;
    };

    this.setMessage = function (pMessage) {
        this.message = pMessage;
    };

    this.getMessage = function () {
        return this.message;
    };

    this.route = function () {
        var that = this;
        var lAjax = new Ajax();
        lAjax.setUrl(this.getURL());
        lAjax.setType("POST");
        lAjax.setDataType("json");
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        var data = JSON.stringify(this.data);
        lAjax.setData(data);
        lAjax.addEventListener('success', function (response) {
            //response = JSON.parse(response);
            //var opt = $("<option></option>").attr("value", res.DATA[i][0]);
            //alert("Lead Assigned");
            $.smallBox({
                title: that.getMessage(),
                content: "<i class='fa fa-clock-o'></i> <i>" + that.getMessage() + "...</i>",
                color: "#739E73",
                iconSmall: "fa fa-thumbs-up bounce animated",
                timeout: 2000
            }, function () {

                //window.location.hash = "ui/view/leads/AssignedToManager.html";
                checkURL();
            });
            if ($('#modal').modal) {
                $('#modal').modal('hide');
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            alert('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };
}

function workFlowStageAndStatus() {
//    this.data;
    this.dataList;
    this.url = localStorage.getItem("url") + "webresources/LeadWorkflowServiceAPI/getWorkflowStageAndStatus";
    this.message = "Request routed..";
    this.teamMap = new Hashtable();

    this.getTeamMap = function () {
        return this.teamMap;
    };

    this.setTeamMap = function (pTeamMap) {
        this.teamMap = pTeamMap;
    };
    this.setDataList = function (pDataList) {
        this.dataList = pDataList;
    };

    this.getDataList = function () {
        return this.dataList;
    };

    this.getURL = function () {
        return this.url;
    };

    this.setMessage = function (pMessage) {
        this.message = pMessage;
    };

    this.getMessage = function () {
        return this.message;
    };

    this.wfStageStatus = function () {

        var lData = {};
        lData.data = {Project: "MW_LEAD"};

        var that = this;
        var lAjax = new Ajax();
        lAjax.setUrl(this.getURL());
        lAjax.setType("POST");
        lAjax.setDataType("json");
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        var data = JSON.stringify(lData);
        lAjax.setData(data);
        this.teamMap = new Hashtable();
        lAjax.addEventListener('success', function (response) {
            debugger;
//            var lData = response[i];
//                that.teamMap.put(lData.levelCode, lData);
//                var lStr = lData.levelValue + " , " + lData.userName;
//                var opt = $("<option></option>").attr("value", lData.levelCode);
//                opt.text(lStr);
//                that.getDataList().append(opt);
//        alert(typeof(response));
//            response = JSON.parse(response);

            that.getDataList().empty();
            for (var i in response) {
                var lData = response[i];
                that.teamMap.put(lData.wfStage, lData.wfStatus, lData);
//                that.teamMap.put(lData.wfStatus, lData);
                var lStr = lData.wfStage + "   ,   " + lData.wfStatus + " , " + lData.stageCaption + " , " + lData.statusCaption;
//                var lStr = lData + " " ;

                var lContent = $("<option></option>").attr("value", lData.wfStatus);
                lContent.text(lStr);
                that.getDataList().append(lContent);
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            alert('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };
}

function smallAlert(pMessage, pCallBack, pTimeOut) {
    if (pTimeOut)
        pTimeOut = 1000;
    $.smallBox({
        title: pMessage,
        content: "<i class='fa fa-clock-o'></i> <i>" + pMessage + "...</i>",
        color: "#739E73",
        iconSmall: "fa fa-thumbs-up bounce animated",
        timeout: pTimeOut
    }, function () {
        pCallBack();
    });
}
function WorkflowTaskforce() {
    this.data;
    this.url = localStorage.getItem("url") + "webresources/TaskForceServiceAPI/routeBulk";
    this.message = "Request routed..";

    this.setData = function (pData) {
        this.data = pData;
    };

    this.getData = function () {
        return this.data;
    };

    this.getURL = function () {
        return this.url;
    };

    this.setMessage = function (pMessage) {
        this.message = pMessage;
    };

    this.getMessage = function () {
        return this.message;
    };

    this.route = function () {
        debugger;
        var that = this;
        var lAjax = new Ajax();
        lAjax.setUrl(this.getURL());
        lAjax.setType("POST");
        lAjax.setDataType("json");
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        var data = JSON.stringify(this.data);
        lAjax.setData(data);
        lAjax.addEventListener('success', function (response) {
            //response = JSON.parse(response);
            //var opt = $("<option></option>").attr("value", res.DATA[i][0]);
            //alert("Lead Assigned");
            $.smallBox({
                title: that.getMessage(),
                content: "<i class='fa fa-clock-o'></i> <i>" + that.getMessage() + "...</i>",
                color: "#739E73",
                iconSmall: "fa fa-thumbs-up bounce animated",
                timeout: 2000
            }, function () {

                //window.location.hash = "ui/view/leads/AssignedToManager.html";
                checkURL();
            });
            if ($('#modal').modal) {
                $('#modal').modal('hide');
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            alert('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };

}

function WorkflowBilling() {
    this.data;
    this.url = localStorage.getItem("url") + "webresources/BillingServiceAPI/routeBulk";
    this.message = "Request routed..";

    this.setData = function (pData) {
        this.data = pData;
    };

    this.getData = function () {
        return this.data;
    };

    this.getURL = function () {
        return this.url;
    };

    this.setMessage = function (pMessage) {
        this.message = pMessage;
    };

    this.getMessage = function () {
        return this.message;
    };

    this.route = function () {
        var that = this;
        var lAjax = new Ajax();
        lAjax.setUrl(this.getURL());
        lAjax.setType("POST");
        lAjax.setDataType("json");
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        var data = JSON.stringify(this.data);
        lAjax.setData(data);
        lAjax.addEventListener('success', function (response) {
            //response = JSON.parse(response);
            //var opt = $("<option></option>").attr("value", res.DATA[i][0]);
            //alert("Lead Assigned");
            $.smallBox({
                title: that.getMessage(),
                content: "<i class='fa fa-clock-o'></i> <i>" + that.getMessage() + "...</i>",
                color: "#739E73",
                iconSmall: "fa fa-thumbs-up bounce animated",
                timeout: 2000
            }, function () {

                //window.location.hash = "ui/view/leads/AssignedToManager.html";
                checkURL();
            });
            if ($('#modal').modal) {
                $('#modal').modal('hide');
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            alert('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };
}

function WorkflowFastTag() {
    this.data;
    this.url = localStorage.getItem("url") + "webresources/FastTagServiceAPI/routeBulk";
    this.message = "Request routed..";

    this.setData = function (pData) {
        this.data = pData;
    };

    this.getData = function () {
        return this.data;
    };

    this.getURL = function () {
        return this.url;
    };

    this.setMessage = function (pMessage) {
        this.message = pMessage;
    };

    this.getMessage = function () {
        return this.message;
    };

    this.route = function () {
        var that = this;
        var lAjax = new Ajax();
        lAjax.setUrl(this.getURL());
        lAjax.setType("POST");
        lAjax.setDataType("json");
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        var data = JSON.stringify(this.data);
        lAjax.setData(data);
        lAjax.addEventListener('success', function (response) {
            //response = JSON.parse(response);
            //var opt = $("<option></option>").attr("value", res.DATA[i][0]);
            //alert("Lead Assigned");
            $.smallBox({
                title: that.getMessage(),
                content: "<i class='fa fa-clock-o'></i> <i>" + that.getMessage() + "...</i>",
                color: "#739E73",
                iconSmall: "fa fa-thumbs-up bounce animated",
                timeout: 2000
            }, function () {

                //window.location.hash = "ui/view/leads/AssignedToManager.html";
                checkURL();
            });
            if ($('#modal').modal) {
                $('#modal').modal('hide');
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            alert('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };
}