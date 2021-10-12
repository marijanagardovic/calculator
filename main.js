//change theme

const themes = document.getElementsByClassName('theme');
for (var i=0; i<themes.length; i++){
    themes[i].addEventListener('click',changeTheme);
}

function changeTheme(e){
    var colorTheme = e.target.id;
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', colorTheme);

    for (var i=0; i<themes.length; i++){
        themes[i].style.setProperty('background-color', 'inherit');
    }
    
    var circle = document.getElementById(colorTheme);
    circle.style.setProperty('background-color', 'var(--key-eq-bg)');
}