function iapp_config(configval, configval2) {
    this.configval = configval;
    this.configval2 = configval2;
};
iapp_config.prototype = {
    constructor: iapp_config,
    iapp_fn: function(key = "", val = "", bool = false) {
        var val = val === 0 ? "0": val;
        var val = val === "" ? null: val;
        var val = this.typeof2(val) === "string" ? String(val).replace(/\\/gi, "\\\\").replace(/\"/gi, "\\\"") : val;
        iapp.s(this.configval2, null);
        var forarray = "";
        if(this.typeof2(val) === "array" && val.length > 0){
        for (var i = 0, len = val.length; i < len; i++) {
            if (this.typeof2(val[i]) === "string" && val[i] != "" && val[i] != null && val[i] != undefined) {
                var val2 = '"' + String(val[i]).replace(/\\/gi, "\\\\").replace(/\"/gi, "\\\"") + '"';
            } else if ((this.typeof2(val[i]) == "number"||this.typeof2(val[i]) == "boolean") && val.length === 1) {
                var val2 = '"' + String(val[i]) + '"';
            } else if ((this.typeof2(val[i]) == "null"||this.typeof2(val[i]) == "undefined") && val.length === 1) {
                var val2 = "";
            } else if (val[i] === "" && val.length === 1) {
                var val2 = "";
            } else if ((this.typeof2(val[i]) == "array"||this.typeof2(val[i]) == "object") && val[i] !== null) {
                return false;
            } else if (val[i] === "") {
                var val2 = null;
            } else {
                var val2 = val[i];
            }
            var val2 = val2 === 0 ? "0": val2;
            forarray += val2 + ",";
        }
        };
        try{
        var forarray = String(forarray).replace(/,$/gi, "");
        }catch(error){
        var forarray = forarray.replace(/,$/gi, "");
        };
        if (key != "" && this.typeof2(val) === "null" && this.jsint(bool) === true) {
          try{
       var value = this.jsret(iapp.fn2(this.configval + "." + key + "('')", this.configval2), bool);
       if(value){
       return value;
       }else{
       return this.jsret(iapp.fn2(this.configval + "." + key + "()", this.configval2), bool);
       }
          }catch(error){
       return this.jsret(iapp.fn2(this.configval + "." + key + "()", this.configval2), bool);
          }
        } else if (key != "" && this.typeof2(val) === "null" && this.jsint(bool) === false) {
          try{
          this.jsret(iapp.fn(this.configval + "." + key + "('')"), bool);
          }catch(error){};
          return this.jsret(iapp.fn(this.configval + "." + key + "()"), bool);
        } else if (key != "" && this.typeof2(val) === "array" && val.length > 0 && this.typeof2(val) !== "null" && this.jsint(bool) === true) {
            return this.jsret(iapp.fn2(this.configval + "." + key + "(" + forarray + ")", this.configval2), bool);
        } else if (key != "" && this.typeof2(val) === "array" && val.length > 0 && this.typeof2(val) !== "null" && this.jsint(bool) === false) {
            return this.jsret(iapp.fn(this.configval + "." + key + "(" + forarray + ")"), bool);
        } else if (key != "" && this.typeof2(val) !== "null" && this.jsint(bool) === true) {
            return this.jsret(iapp.fn2(this.configval + "." + key + "(" + '"' + val + '"' + ")", this.configval2), bool);
        } else if (key != "" && this.typeof2(val) !== "null" && this.jsint(bool) === false) {
            return this.jsret(iapp.fn(this.configval + "." + key + "(" + '"' + val + '"' + ")"), bool);
        } else {
            return this.jsret(iapp.fn(this.configval + "." + key + "(" + '"' + val + '"' + ")"), bool);
        }

    },
    typeof2: function(val) {
          try{
          return Object.prototype.toString.call(val).slice(8,-1).toLowerCase();
          }catch(error){
           return typeof(val);
          }
    },
    jsret: function(val = "", bool = false) {
        if (val == "" && this.jsint(bool) === false) {
            return false;
        } else {
            if (val == "") {
        if (iapp.g(this.configval2) === null || iapp.g(this.configval2) === undefined) {
            return false;
         } else {
            return iapp.g(this.configval2);
         } 
            } else {
            if (val === "true") {
            return true;
            } else if(val === "false") {
            return false;
            } else {
            return val;
            }
            }
        }
    },
    jsint: function(bool = false) {
        if (bool === 1 || bool === true) {
            return true;
        } else {
            return false;
        }
    },
    setval: function(key = "", val = "") {
        if (iapp.s(key, val) === undefined){
        return true;
       } else {
       return true;
       }
    },
    getval: function(key = "") {
        if (iapp.g(key) === null || iapp.g(key) === undefined) {
         return false;
       } else {
         return iapp.g(key);
       }
   }
};



/*
var obj=new iapp_config("run_iapp","sss.xiapp");
obj.iapp_fn("imei",null,1);
obj.iapp_fn("imei",null,true);
*/
