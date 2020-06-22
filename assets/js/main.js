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

function generateTables() {
  //tables = document.getElementsByClassName('db-table')
 // for (t of tables) { t.rows[0].cells[0].colSpan = t.rows[0].cells.length }
  }