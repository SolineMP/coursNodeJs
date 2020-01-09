const form = document.getElementById('msg')

if (form) {
form.addEventListener('submit', function(event) {
    event.preventDefault()
    console.log(event)
    let post = document.querySelector("textarea").value
    console.log(post)
    if (post.length > 280) {
        var oneP = document.createElement("p")
        oneP.innerHTML = "Trop de caractères"
        document.querySelector("form").appendChild(oneP)
    } else {
        fetch('/tweet', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({message: post})
        })
        .then(function() {window.location.reload()});
    }
})

}

const formUpdate = document.getElementById('updateMsg')

if (formUpdate) {
    formUpdate.addEventListener('submit', function(event) {
        event.preventDefault()
        console.log(event)
        let update = document.querySelector("textarea").value
        console.log(update)
        if (update.length > 280) {
            var oneP = document.createElement("p")
            oneP.innerHTML = "Trop de caractères"
            document.querySelector("form").appendChild(oneP)
        } else {
            fetch('', {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
            body: JSON.stringify({message: update})
            })
            .then(function(response) {
                console.log(response)
                if (response.status === 200) {
                    location.href = '/'
                }
            })
        }
    })
}

const formSearch = document.getElementById('search')

if (formSearch) {
    formSearch.addEventListener('input', function(event) {
        event.preventDefault()
        let search = formSearch.value
        console.log(search)
        fetch('/search?input='+search, {
            method: 'GET'
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(responseJson){
            document.getElementById('post').innerHTML = responseJson.template
        })
    })
}