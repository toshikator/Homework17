(function  main(){

    let travelDatabase = [];

    const loadTravelDatabase = ()=>{
        travelDatabase = JSON.parse(localStorage.getItem('travelDatabase'));
    }
    const saveTravelDatabase = ()=>{
        localStorage.removeItem('travelDatabase');
        localStorage.setItem('travelDatabase',JSON.stringify(travelDatabase))
    }
    const addItemToArray = (array,item)=>{
        array.push(item);
    }
    const saveCurrentItemToDatabase = (currentItem)=>{
        addItemToArray(travelDatabase,currentItem)
    }





}())