/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Chart() {
    this.config;
    this.container;
    this.seriesData;
    this.URL = "webresources/DashboardWebService/";
    this.chart;
    this.chartCode;
    this.metaData;
    this.data;

    var me = this;

    this.setMetaData = function (pMetaData) {
        this.metaData = pMetaData;
    };

    this.getMetaData = function () {
        return this.metaData;
    };

    this.setData = function (pData) {
        this.data = pData;
    };

    this.getData = function () {
        return this.data;
    };

    this.setChartCode = function (pChartCode) {
        this.chartCode = pChartCode;
    };

    this.getChartCode = function () {
        return this.chartCode;
    };

    this.setURL = function (pURL) {
        this.URL = pURL;
    };

    this.getURL = function () {
        return this.URL;
    };

    this.setConfig = function (pConfig) {
        this.config = pConfig;
    };

    this.getConfig = function () {
        return this.config;
    };

    this.setContainer = function (pContainer) {
        this.container = pContainer;
    };

    this.getContainer = function () {
        return this.container;
    };

    this.setSeriesData = function (pSeriesData) {
        this.seriesData = pSeriesData;
    };

    this.getSeriesData = function () {
        return this.seriesData;
    };

    this.getMetaData = function () {
        return this.metaData;
    };

    this.fetchMetaData = function () {
//        debugger;
        var me = this;
        var lURL = this.getURL() + "getChart/" + this.getChartCode();
        var lMetaAjax = new FormAjax();
        lMetaAjax.setUrl(lURL);
        lMetaAjax.setType('get');
        lMetaAjax.addEventListener('success', function (response) {
            console.log(response);
            var lJSONResponse = JSON.parse(response);
            //renderChart(lJSONResponse);
            me.setMetaData(lJSONResponse);
            me.fetchData();
        });
        lMetaAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error while gettting data for chart : ' + me.chartCode);
        });
        lMetaAjax.execute();
    };

    this.getData = function () {
        return this.data;
    };

    this.fetchData = function () {
//        debugger;
        var that = this;
        var lAjax = new FormAjax();
        lAjax.setUrl(this.getURL() + "getChartData");
        lAjax.setSync(false);
//        var lData = JSON.stringify({
//            "data": { chartCode:this.getChartCode()
//            }
//        });
        lAjax.setData(this.getChartCode());
        lAjax.setType('post');
        lAjax.addEventListener('success', function (response) {
            var lJSONResponse = JSON.parse(response);
            var lSeriesData = me.buildData(lJSONResponse);
            me.setData(lSeriesData);
            me.renderChart();

        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error while gettting data for chart : ' + that.chartCode);
        });
        lAjax.execute();
    };

    this.buildData = function (pData) {
        var lData = pData.data;
        var lMetaData = this.getMetaData();
        var lChartAxisArray = lMetaData.chartAxis;
        for (var j in lData) {
            for (var i in lChartAxisArray) {
                var lChartAxis = lChartAxisArray[i];
                if (lChartAxis.dataType && lChartAxis.dataType === "number") {
                    var lValue = lData[j][i];
                    lValue = parseInt(lValue);
                    lData[j][i] = lValue;
                } else if (lChartAxis.dataType && lChartAxis.dataType === "date") {
                    var lValue = lData[j][i];
                    lValue = Date.parseString(lValue);
                    lData[j][i] = lValue.getTime();
                }
            }
        }
//        debugger;
        return lData;
    };

    this.render = function () {
        var that = this;
        this.fetchMetaData();
    };

    this.renderChart = function () {
        var lData = this.getData();
        var lCofigObj = this.getConfig();
        lCofigObj.dataSource.data = lData;

        this.chart = new FusionCharts(this.getConfig()).render();
        //Date.parseString
    };

}


