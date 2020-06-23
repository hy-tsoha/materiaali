function hideSideNav() {
  document.getElementById("side-nav").className = "side-nav-hidden";
}

function showSideNav() {
  document.getElementById("side-nav").className = "side-nav";
}


function reportWindowSize() {
  if (window.innerWidth < 500) {
    hideSideNav();
  } else {
    showSideNav();
  }
}

window.onresize = reportWindowSize;
window.onload = reportWindowSize;

function generateTOC() {
  tof = document.getElementById("tof")
  tof.parentNode.insertBefore(document.getElementsByTagName("h1")[0], tof)
  tof.style.removeProperty("display")
}