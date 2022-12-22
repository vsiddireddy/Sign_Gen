var generate_menu = document.getElementById('generate_menu'),
    modify_menu = document.getElementById('modify_menu');

function switchToModify() {
  console.log("modifymenu");
  if(!modify_menu) return;
  if (getComputedStyle(modify_menu).display == 'none') {
    modify_menu.style.display = 'block';
    generate_menu.style.display = 'none';
  }
}

function switchToGenerate() {
    console.log("generatemenu");
    if(!generate_menu) return;
    if (getComputedStyle(generate_menu).display == 'none') {
      generate_menu.style.display = 'block';
      modify_menu.style.display = 'none';
    }
  }

document.getElementById('lm-modify').addEventListener('click', switchToModify);
document.getElementById('lm-refresh').addEventListener('click', switchToGenerate);

