import axios from axios;

const logo = document.getElementById("logo");
let c = true;

function changeColor(){
    if (c){
        logo.style.color = 'red';
        c = false;
    } else {
        logo.style.color = 'blue';
        c = true;
    }
}

logo.addEventListener('click', () => changeColor());

