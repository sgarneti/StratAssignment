({
    /* doInitHelper funcation 
     * initial load of JSON data
     */
    doInitHelper : function(component,event){ 
        var action = component.get("c.fetchJsonDataWrapper");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var res = response.getReturnValue();
                if(res.length > 0){
                    component.set('v.allRecsList', res);
                    //giving a limit for number of rows
                    var maxRows = 20;
                    var totalRecordsList = res;
                    var totalSize = totalRecordsList.length ;
                    component.set("v.totalRecordsCount", totalSize);
                    
                    var TableList = [];
                    for(var i=0; i < maxRows; i++){
                        if(component.get("v.allRecsList").length > i){
                            TableList.push(res[i]);    
                        } 
                    }
                    component.set('v.TableList', TableList);
                    component.set("v.selectedCount" , 0);  
                }else{
                    component.set("v.NoRecords" , true);
                } 
            }
            else{
                alert('Error...');
            }
        });
        $A.enqueueAction(action);  
    },
    
    //helper for adding new Debt row
    createDebt: function(component, event) {
        // get the table list from component and add new row to the list
        var RowItemList = component.get("v.TableList");
        var balvar = component.find("balance");
        console.log(balvar);
        debugger;
        RowItemList.push({
            'sobjectType': 'jsonDataWrapper',
            'isChecked':'',
            'id': '',
            'firstName': '',
            'LastName': '',
            'minPaymentPercentage': '',
            'balance': ''
        });
        var totalSize = RowItemList.length ;
        component.set("v.totalRecordsCount", totalSize);
        component.set("v.TableList", RowItemList);
    },
})