
(function  main(){

    let travelDatabase = [];
    let item = {};
    const formElement = document.getElementById('myForm');
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(formElement);
        item['cityFrom'] = formData.get('cityFrom');
        item['cityTo'] = formData.get('cityTo');
        item['budget'] = formData.get('budget');
        item['dateStart'] = formData.get('dateStart');
        item['dateEnd'] = formData.get('dateEnd');
        item['amountPersons'] = formData.get('amountPersons');
        item['mainTransferType'] = formData.get('mainTransferType');
        if(item['dateEnd'] < item['dateStart']) [item['dateStart'],item['dateEnd']] = [item['dateEnd'],item['dateStart']];
        console.log(item);
        addItemToTravelDatabase(item);
        console.log(travelDatabase);
    });

    function saveTravelDatabaseToLocalStorage() {
        localStorage.removeItem("travelDatabase");
        localStorage.setItem("travelDatabase",JSON.stringify(travelDatabase));
    }

    function loadDatabaseFromLocalStorage() {
        const storageVal = localStorage.getItem("travelDatabase");
        // console.log(storageVal);
        travelDatabase = (storageVal)?JSON.parse(storageVal):[];
        console.log(travelDatabase);
    }

    function addItemToTravelDatabase(item) {
    travelDatabase.push(item);
    saveTravelDatabaseToLocalStorage();
    }

    function makeTravelList(array) {


        return result;
    }



    loadDatabaseFromLocalStorage();
    console.log(travelDatabase);

}())