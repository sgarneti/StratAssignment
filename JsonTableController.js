({
    doInit: function(component, event, helper) {
        helper.doInitHelper(component, event);
    },
 
    // function to add new row
    addDebt: function(component, event, helper) {
        helper.createDebt(component, event);
    },
 
    // function to delete the row 
    removeRow: function(component, event, helper) {        
        var idx = event.getSource().get("v.name");
        var removelist = component.get("v.indexList");
        debugger;
        
        var AllRowsList = component.get("v.TableList");
        var finalList = [];
        //adding the index of all rows that are checked
        for(var i = 0; i<AllRowsList.length; i++){
            if(AllRowsList[i].isChecked){
                const index2 = AllRowsList.indexOf(AllRowsList[i]);
                
            }else{
                finalList.push(AllRowsList[i]);
            }

        }
        component.set("v.totalRecordsCount",finalList.length);
        component.set("v.TableList", finalList);
        component.set("v.selectedCount", 0);
    },
 
    //function to select all rows
    selectAllrows: function(component, event, helper) {
        var selectedHeaderCheck = event.getSource().get("v.value");
        var selectedRows = [];
        var allRecsList = component.get("v.allRecsList");
        var TableList = component.get("v.TableList");
        // loop to check all records 
        for (var i = 0; i < TableList.length; i++) {
            // if header is true, then mark all rows with true.
            // update the count
            if (selectedHeaderCheck == true) {
                TableList[i].isChecked = true;
                component.set("v.selectedCount", TableList.length);
                
            } else { //else update all records with false and set selectedCount with 0  
                TableList[i].isChecked = false;
                component.set("v.selectedCount", 0);
            }
            selectedRows.push(TableList[i]);
        }
        
        component.set("v.TableList", selectedRows);
    },
 
    //function to select single row
    selectRow: function(component, event, helper) {
        // on each checkbox selection update the selected record count 
        var updatedTableList = [];
        var selectedRec = event.getSource().get("v.value");
        var getSelectedNumber = component.get("v.selectedCount");
        var tableList = component.get("v.TableList");
        var ind = event.getSource().get("v.name");
        for (var i = 0; i < tableList.length; i++) {
            
            if (selectedRec == true) {
                tableList[ind].isChecked = true;
            } else {
                tableList[ind].isChecked = false;
            }
            updatedTableList.push(tableList[i]);
        }
        component.set("v.TableList",updatedTableList);
        var myList = component.get("v.indexList");
        
        
        
        if (selectedRec == true) {
            getSelectedNumber++;
        } else {
            //myList.splice(ind);
            getSelectedNumber--;
            component.find("checkAll").set("v.value", false);
        }
        
        component.set("v.selectedCount", getSelectedNumber);
        // Mark header checkbox as true if all rows are checked
        if (getSelectedNumber == component.get("v.totalRecordsCount")) {
            component.find("checkAll").set("v.value", true);
        }
    },
    
    
 
    
})