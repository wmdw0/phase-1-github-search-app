const init = () => {
    const inputForm = document.querySelector('form')
  
    inputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let input = document.getElementById('search');
    console.log(input.value)


    fetch("https://api.github.com/search/users?q=" + input.value)
    .then(response => response.json())
    .then(json => renderInfo(json));
    });

    function renderInfo(info){
        console.log(info)
    let container = document.getElementById("user-list");
    var repos = document.getElementById("repos-list");
    repos.innerHTML = "";
    container.innerHTML = "";
    info.items.forEach((item) => {
        let li = document.createElement('li');
        li.className = "listitem";
        let div = document.createElement('div');
        div.innerHTML = "@" + item.login;
        let img = document.createElement('img');
        img.src = item.avatar_url;
        let a = document.createElement('a');
        var createAText = document.createTextNode(item.avatar_url);
        li.onclick = function () {
            fetch("https://api.github.com/users/" + item.login + "/repos")
            .then(response => response.json())
            .then(json => showRepos(json));
        };
        function showRepos(json){
            repos.innerHTML = "";
            json.forEach((name) => {
                let repoList = document.createElement('li');
                console.log(name)
                repoList.innerHTML = name.name;
                repos.appendChild(repoList);
            });
        }

        a.setAttribute('href', item.html_url);
        let div3 = document.createElement('div');
        div3.innerHTML = item.html_url;
        container.appendChild(li);
        li.appendChild(img);
        li.appendChild(div);
        li.appendChild(div3);
        li.appendChild(a);
        a.appendChild(createAText);
    });
    
    
    }

    const showRepos = document.getElementsByClassName("listitem");
    //document.addEventListener('click', (showRepos) => {
    // showRepos.forEach((repos) => {
    //     console.log(repos)
    // })
    //};
    console.log(showRepos)
    
}






document.addEventListener('DOMContentLoaded', init);


