const hideSideNav = () => {
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

window.onload = () => {
  reportWindowSize();
  setActiveMenu()
  generateTOC()
};

window.onscroll = () => {
  setActiveMenu()
}

function generateTOC() {
  tof = document.getElementById("tof")
  if (tof && document.body.id === "chapter") {
    tof.parentNode.insertBefore(document.getElementsByTagName("h1")[0], tof)
    tof.style.removeProperty("display")
  }

}

function handleActiveMenu(headers) {
  for (h in headers) {
    if (headers[h].tagName === "H1") {
      if (document.getElementById(headers[h].innerText + "nav")) {
        document.getElementById(headers[h].innerText + "nav").classList.add("current")
        document.getElementById(headers[h].innerText + "nav").scrollIntoView({ block: "center" })
      }
    } else if (headers[h].offsetTop <= window.scrollY + window.screenTop) {
      if (document.getElementById(headers[h].innerText + "nav")) {
        document.getElementById(headers[h].innerText + "nav").classList.add("current")

      }
    } else if (headers[h].offsetTop > window.scrollY + window.screenTop) {
      if (document.getElementById(headers[h].innerText + "nav")) {
        document.getElementById(headers[h].innerText + "nav").classList.remove("current")

      }
    }
  }
}

function setActiveMenu() {
  if (location.href.split("/").length <= 5) {
    document.getElementById("indexnav").classList.add("current")

  }

  titles = document.getElementsByTagName("h1")
  subtitles = document.getElementsByTagName("h2")
  handleActiveMenu(titles)
  handleActiveMenu(subtitles)
}

