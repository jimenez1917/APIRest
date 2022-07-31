const socket = io();
socket.on('log',(data)=>{
    let chathistory = data;
    let productTem = document.getElementById('chathistoryTem');
    fetch('../static/templates/chathistory.handlebars').then(response=>{
        return response.text();
    }).then(template=>{
        const processTem = Handlebars.compile(template);
        const html = processTem({chathistory})
        productTem.innerHTML=html;
    })
})
function register(){
    setTimeout("location.reload(true);",1000);
    let mensaje = document.getElementById('message').value;
    fetch(`http://localhost:8080/chat`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({mensaje})  
    });  
}
