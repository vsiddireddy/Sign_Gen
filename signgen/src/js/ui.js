var generate_menu = document.getElementById('generate_menu'),
    modify_menu = document.getElementById('modify_menu'),
    bottom_menu = document.getElementById('bottom_menu');

var home_button = document.getElementById('lm-home'),
    generate_button = document.getElementById('lm-refresh'),
    modify_button = document.getElementById('lm-modify'),
    download_button = document.getElementById('lm-dl');

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

function switchToHome() {
  resetColorsExcept(home_button);
}

function switchToGenerate() {
  console.log("generatemenu");
  if(!generate_menu) return;
  if (getComputedStyle(generate_menu).display == 'none') {
    generate_menu.style.display = 'block';
    modify_menu.style.display = 'none';
    bottom_menu.style.display = 'block';
  }
  resetColorsExcept(generate_button);
}

function switchToModify() {
  console.log("modifymenu");
  if(!modify_menu) return;
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
