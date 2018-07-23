//phone or web
var isPCWeb = window.chrome;

//


//if web bridge mapping
var MDHBasic = (function(namespace, $, undefined){
    
    namespace.SEMP = {};

    var form = {};
    form.connectionType = '';
    form.ipAddress = '';
    form.portNumber = '';
    form.userId = '';
    form.deviceId = '';
    form.contextUrl = '';
    form.dataType = '';
    form.sType = 'GET';
    form.sCode = '';
    form.parameter = '';
    form.paramEncrypted = '';
    form.paramCompressed = '';

    namespace.form = $.extend(true, {}, form);

    namespace.SEMP.request = function(successCallback, errorCallback, data){
        
        var connectionType;     //?
        var ipAddress;          //
        var portNumber;         //
        var userId;             //sid??
        var deviceId;           //
        var contextUrl;         //url
        var dataType;           //
        var sType = 'GET';      //GET, POST...
        var sCode;              //?
        var parameter = {};     //key=value&...
        var paramEncrypted;     //?
        var paramCompressed;    //?

        if ( data !== undefined ) {
            connectionType = data.connectionType;
            ipAddress = data.ipAddress;
            portNumber = data.portNumber;
            userId = data.userId;
            deviceId = data.deviceId;
            contextUrl = data.contextUrl;
            dataType = data.dataType;
            sType = data.sType;
            sCode = data.sCode;
            parameter = data.parameter;
            paramEncrypted = data.paramEncrypted;
            paramCompressed = data.paramCompressed;
        }
        
        $.ajax({
          type: sType,
          url: contextUrl,
          data: parameter,
          success: function(response) {
            if (successCallback != null) successCallback(response);
          },
          error: function(response) {
            if (errorCallback != null) errorCallback(response);
          }
        });

    };
   
    return namespace;
    
})(window.namespace || {}, jQuery);

//Test
/*
MDHBasic.SEMP.request(
    function(data) {
        console.log('MDHBasic.SEMP.request successCallback');
        console.log(data);
    }, 
    function(data) {
        console.log('MDHBasic.SEMP.request errorCallback');
        console.log(data);
    }, 
    {
        sType : 'GET',
        contextUrl : 'https://developer.atlassian.com/cloud/jira/platform/jira-rest-api-basic-authentication/',
        parameter : 'name=Bae&age=38'
    }
);
*/

