const DOG_URL = 'http://localhost:3000/pups'
let dogBar;
let dogInfo;
let dogFilter;
document.addEventListener('DOMContentLoaded', function(e){
    dogBar = document.querySelector("#dog-bar")
    dogInfo = document.querySelector('#dog-info')
    dogFilter = document.querySelector('#good-dog-filter')
    dogFilter.innerText = 'Filter Good Dogs: OFF'
    dogFilter.addEventListener('click', function(e){
        if (dogFilter.innerText == 'Filter Good Dogs: ON'){
            dogFilter.innerText = 'Filter Good Dogs: OFF'
            console.log('turned off')
        } else {
            dogFilter.innerText = 'Filter Good Dogs: ON'
        }
        if (dogFilter.innerText == 'Filter Good Dogs: OFF'){
            getDogs()
        } else {
                console.log('hi')
                fetch(DOG_URL) 
                .then(function(response){
                return response.json() 
                })
                .then(function(dogs){
                    goodDogs = []
                    dogs.forEach(function(dog){
                        if (dog.isGoodDog == true){
                            goodDogs.push(dog)
                        }
                    })
                    placeDogs(goodDogs)
                })
            }
        })
    
})

function getDogs(){
    fetch(DOG_URL) 
        .then(function(response){
           return response.json() 
        })
        .then(function(dogs){
            placeDogs(dogs)
        })
}


function placeDogs(dogs){

    while(dogBar.hasChildNodes()){
        dogBar.removeChild(dogBar.lastChild)
    }

    dogs.forEach(function(dog){
        let dogSpan = document.createElement('span')
        dogSpan.append(dog.name)
        dogBar.append(dogSpan)
        dogSpan.addEventListener('click', function(e){
            while (dogInfo.hasChildNodes()){
                dogInfo.removeChild(dogInfo.lastChild)
            }
            showDogInfo(dog)
        })
    })
}




function showDogInfo(dog){
    let dogH2 = document.createElement('h2')
    dogH2.innerText = dog.name

    let dogImg = document.createElement('img')
    dogImg.setAttribute('src', dog.image)

    let dogButton = document.createElement('button')
    if (dog.isGoodDog == true){
        dogButton.innerText = "Good Dog!"
    } else{
        dogButton.innerText = "Bad Dog!"
    }
    dogInfo.append(dogH2)
    dogInfo.append(dogImg)
    dogInfo.append(dogButton)

    dogButton.addEventListener('click', function(e){
        e.preventDefault
        isGood(dog, dogButton)
    })
}

function isGood(dog, dogButton){
    if (dog.isGoodDog == true){
        dog.isGoodDog = false
        dogButton.innerText = "Bad Dog!"
    } else{
        dog.isGoodDog = true 
        dogButton.innerText = "Good Dog!"
    }
    console.log(dog.isGoodDog)
    fetch(`${DOG_URL}/${dog.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: dog.isGoodDog 
        })
    })


}





getDogs()