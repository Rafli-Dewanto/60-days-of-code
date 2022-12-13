document.getElementById("getText").addEventListener("click", () => {
    fetch("sample.txt")
        .then((res) => res.text())
        .then((text) => {
            document.getElementById("output").innerHTML = text;
        })
        .catch((err) => alert(err));
});

document.getElementById("getJoke").addEventListener("click", () => {
    fetch("https://v2.jokeapi.dev/joke/Any?safe-mode")
        .then((res) => res.json())
        .then((data) => data.joke || data.setup + " " + data.delivery)
        .then((joke) => {
            document.getElementById("output").innerHTML = joke;
        })
        .catch((err) => alert(err));
});

document.getElementById("getUsers").addEventListener("click", () => {
    fetch("users.json")
        .then((res) => res.json())
        .then((data) => {
            let output = `<h2 class="mb-4 mt-4">Users</h2>`;
            data.forEach((user) => {
                output += `
        <ul class="list-group mb-3">
            <li class="list-group-item">${user.id}</li>
            <li class="list-group-item">${user.name}</li>
            <li class="list-group-item">${user.email}</li>
        </ul>
          `;
            });
            document.getElementById("output").innerHTML = output;
        })
        .catch((err) => alert(err));
});

document.getElementById("getPosts").addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => {
            let output = `<h2 class="mb-4 mt-4">Posts</h2>`;
            data.forEach((post) => {
                output += `
          <div class="card card-body mb-3">
              <h3>${post.title}</h3>
              <p>${post.body}</p>
          </div>
          `;
            });
            document.getElementById("output").innerHTML = output;
        })
        .catch((err) => alert(err));
});

document.getElementById("addPost").addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value
    let body = document.getElementById("body").value
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify({ title: title, body: body })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        })
        .catch((err) => alert(err))
});