var generate_menu = document.getElementById('generate_menu'),
    modify_menu = document.getElementById('modify_menu'),
    bottom_menu = document.getElementById('bottom_menu');

var home_button = document.getElementById('lm-home'),
    generate_button = document.getElementById('lm-refresh'),
    generate_sign_button = document.getElementById('gen_button'),
    modify_button = document.getElementById('lm-modify'),
    download_button = document.getElementById('lm-dl');
    start_button = document.getElementById('splashGen2');


home_button.style.color = 'white';

function resetColorsExcept(button) {
  var buttons = [home_button, generate_button, modify_button, download_button];
  
  for (var i = 0; i < buttons.length; i++) {
      if(buttons[i] !== button) {
          buttons[i].style.color = 'rgb(86, 89, 93)';
      } else {
          buttons[i].style.color = 'white'; 
      }
  }
}


function switchColorIfFromHome() {
  var isHome = true;
  var buttons = [generate_button, modify_button, download_button];
  for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].style.color === 'white') {
          isHome = false;
          break;
      }
  }

  if (isHome) {
      resetColorsExcept(generate_button);
  }
}

function switchToHome() {
  document.getElementById("canvas_0").style.opacity = "0";

  generate_menu.style.display = 'block';
  modify_menu.style.display = 'none';
  bottom_menu.style.display = 'block';
  resetColorsExcept(home_button);
}

function switchToGenerate() {
  console.log("generatemenu");
  if (!generate_menu) return;

  document.getElementById("canvas_0").style.opacity = "100";

  generate_menu.style.display = 'block';
  modify_menu.style.display = 'none';
  bottom_menu.style.display = 'block';
  resetColorsExcept(generate_button);
}

function switchToModify() {
  console.log("modifymenu");
  if(!modify_menu) return;

  document.getElementById("canvas_0").style.opacity = "100";
  document.getElementById("splashScreen").style.display = 'none';

  if (getComputedStyle(modify_menu).display == 'none') {
    modify_menu.style.display = 'block';
    generate_menu.style.display = 'none';
    bottom_menu.style.display = 'none';
  }
  resetColorsExcept(modify_button);
}

function switchToDownload() {
  resetColorsExcept(download_button);
}

home_button.addEventListener('click', switchToHome);
generate_button.addEventListener('click', switchToGenerate);
modify_button.addEventListener('click', switchToModify);
download_button.addEventListener('click', switchToDownload);
generate_sign_button.addEventListener('click', switchToGenerate);
start_button.addEventListener('click', switchToGenerate);
