function itemTemplate(i){
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${i.text}</span>
    <div>
    <button data-id=${i._id} class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
    <button data-id=${i._id} class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
</li>`
}

let createField = document.getElementById("create-field")


// Initial Page Load Render
let ourHTML = items.map(function(item){
    return itemTemplate(item)
}).join("")

document.getElementById("item-list").insertAdjacentHTML("beforeend",ourHTML)

//Create Feature 
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault()
    axios.post("/create-item", {text: createField.value}).then(function(response){
        document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
        createField.value = ""
        createField.focus()
    }).catch()
})

// Delete Feature
document.addEventListener("click",function(e){
    //Delete Feature 
    if (e.target.classList.contains("delete-me")) {
        if(confirm("Do you really want to delete ?")){
            axios.post('/delete-item',{id: e.target.getAttribute("data-id")}).then(function()
            {
                e.target.parentElement.parentElement.remove()
            }
            ).catch(function()
            {
                console.log("Something went wrong while delteing item")
            }) 
        }
    }

    //Update Feature 
    if (e.target.classList.contains("edit-me")) {
        let usrInput = prompt("Enter text to update",e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        if (usrInput){
            axios.post('/update-item',{text: usrInput, id: e.target.getAttribute("data-id")})
            .then(function()
            {
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = usrInput
            }
            ).catch(function()
            {
                console.log("Something Went Wrong while updating Item")
            })
        }
    }
})

