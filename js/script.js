
(function  main(){
    // const showSize = 5;
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
        // console.log(item);
        addItemToTravelDatabase(item);
        showTravelList();
        // console.log(travelDatabase);
    });



    function saveTravelDatabaseToLocalStorage() {
        localStorage.removeItem("travelDatabase");
        localStorage.setItem("travelDatabase",JSON.stringify(travelDatabase));
    }

    function loadDatabaseFromLocalStorage() {
        const storageVal = localStorage.getItem("travelDatabase");
        // console.log(storageVal);
        travelDatabase = (storageVal)?JSON.parse(storageVal):[];
        // console.log(travelDatabase);
    }

    function addItemToTravelDatabase(item) {
    travelDatabase.push(item);
    saveTravelDatabaseToLocalStorage();
    }

    function makeHtmlElem(item) {
        let string;
        string = `<div class="row bg-success bg-gradient mb-2 form-control-sm">
                <div class="col col-8">
                    From ${item['cityFrom']} to ${item['cityTo']}
                </div>
                <div class="firstLine col col-4 text-end">
                    <svg id="redact" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heartbreak-fill" viewBox="0 0 16 16">
                        <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z"/>
                    </svg>
                    <svg onclick="const x = () => {
                      travelDatabase.splice(travelDatabase.indexOf(item),1);
                    }" id="delete${travelDatabase.indexOf(item)}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle itemDeleterButton" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    <svg id="more" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                </div>
                <div class="secondLine col col-12">
                    Expected budget: ${item['budget']} NIS
                </div>
                <div class="thirdLineLine col col-12">
                    ${item['dateStart']} - ${item['dateEnd']} | ${item['amountPersons']} persons | ${item['mainTransferType']}
                </div>
            </div>`;
        return string;
    }

    const travelDatabaseDom = document.getElementById('rightPart');
    function showTravelList() {
        travelDatabaseDom.innerHTML = '';
        let blockHtml = `<div id="travelHistory" class="col-12 h4">Travel History:</div>`;
        let temp = travelDatabase.reduce((temp,item)=>{
            return temp + makeHtmlElem(item);
        },'');
        blockHtml += temp;
        // blockHtml += '';
        // makeHtmlElem(travelDatabase.at(0));
        travelDatabaseDom.innerHTML = blockHtml;
    }



    loadDatabaseFromLocalStorage();
    // console.log(travelDatabase);
    showTravelList();
    const itemForDelete = document.querySelectorAll('.itemDeleterButton');
    console.log(itemForDelete);
    itemForDelete.onclick = function(){
        console.log('boo')
    };
    //const travelHistory = document.getElementById('travelHistory');
    //travelHistory.onclick = showTravelList;
    document.getElementById('travelHistory').addEventListener("click", myFunction);
    function myFunction() {
        console.log(this);
    }

    function deleteItemFromArray(array, itemID) {
        array.splice(itemID,1);

    }


    let deleteButtons = document.querySelectorAll('.itemDeleterButton');
    deleteButtons.forEach(function (button){
        button.onclick = function () {
            console.log('LOLOLO',this.getAttribute('id'));
            let idForDelete = this.getAttribute('id').toString();
            idForDelete = Number(idForDelete.substring(6, idForDelete.length));
            deleteItemFromArray(travelDatabase,idForDelete);
            saveTravelDatabaseToLocalStorage();
            showTravelList();
            deleteButtons = document.querySelectorAll('.itemDeleterButton');
        }
    });
}())