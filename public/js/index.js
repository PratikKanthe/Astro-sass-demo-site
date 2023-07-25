const hamburger = document.getElementById("hamburger");

const navMenu = document.getElementById("nav-items");


const activeMenu = document.getElementById("active-menu");
const movie = document.getElementById("movie-menu");
const tv = document.getElementById("tv-menu");
const subMenu = document.getElementById("sub-menu");
const subMenu1 = document.getElementById("sub-menu");
const subMenu2 = document.getElementById("sub-menu");

const dropdown = document.getElementById("dropdown");

const search = document.getElementById("search-btn");
const searchBar = document.getElementById("wrap-search");

const profileIcon = document.getElementById("profile-icon");
const notification = document.getElementById("notification");
const office = document.getElementById("office");
const profileWrap = document.getElementById("wrap-profile");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

activeMenu.addEventListener("click", () => {
    activeMenu.classList.toggle("active");
    subMenu.classList.toggle("active");
});
movie.addEventListener("click", () => {
    movie.classList.toggle("active");
    subMenu1.classList.toggle("active");
});
tv.addEventListener("click", () => {
    tv.classList.toggle("active");
    subMenu2.classList.toggle("active");
});

navMenu.querySelectorAll("nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

//dropdown
dropdown.addEventListener("click", () => {
    dropdown.classList.toggle("active");
});

navMenu.querySelectorAll("dropdown").forEach(n => n.addEventListener("click", () => {
    dropdown.classList.remove("active");
}));



search.addEventListener("click", () => {
    search.classList.toggle("active");
    searchBar.classList.toggle("active");
    console.log("clicked");
});

profileIcon.addEventListener("click", () => {
    profileIcon.classList.toggle("active");
    profileWrap.classList.toggle("active");
    console.log("clicked");
});

notification.addEventListener("click", () => {
    notification.classList.toggle("active");
    profileWrap.classList.toggle("active");
    console.log("clicked");
});

office.addEventListener("click", () => {
    office.classList.toggle("active");
    profileWrap.classList.toggle("active");
    console.log("clicked");
});



function slide(direction) {
    var change = document.getElementById('js-channels');
  
    let scrollCompleted = 0;
    var slideVar = setInterval(function () {
      if (direction == 'left') {
        change.scrollLeft -= 280;
      } else {
        change.scrollLeft += 280;
      }
      scrollCompleted += 280;
      if (scrollCompleted >= 100) {
        window.clearInterval(slideVar);
      }
    }, 50);
  }



//   const themeToggle = document.getElementById("themeToggle");
//   const htmlElement = document.documentElement;
  
//   // Check if user has a theme preference saved in local storage
//   const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//   const userPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  
//   // Set the theme based on user's preference or default to light mode
//   if (userPrefersDark && localStorage.getItem("theme") !== "light") {
//       htmlElement.classList.add("dark-mode");
//   } else if (userPrefersLight && localStorage.getItem("theme") === "dark") {
//       htmlElement.classList.remove("dark-mode");
//   }
  
//   // Toggle theme when the button is clicked
//   themeToggle.addEventListener("click", () => {
//       htmlElement.classList.toggle("dark-mode");
//       if (htmlElement.classList.contains("dark-mode")) {
//           localStorage.setItem("theme", "dark");
//       } else {
//           localStorage.setItem("theme", "light");
//       }
//   });
  

async function getCategoryJson(element, event) {
    // alert('hello world');
  
  
    const articleList = document.getElementById('js-article-list');
    articleList.innerHTML = "<div class='loader'></div>";
  
    var catId = element.getAttribute("data-url");
    const data = await Utils.getJson("/api/_" + catId + ".json");
  
    if (articleList && data) {
  
      console.log(catId);
      let template = {
        "<>": "a", "href": "${link}", "class": function () {
          switch (this.flag) {
            case 1:
              return ("article-item article-item--exclusive");
              break;
            case 2:
              return ("article-item article-item--breaking");
              break;
            default:
              return ("article-item");
              break;
  
          }
        }, "html": [
          { "<>": "img", "src": "${thumbnail}", "class": "article-item__image", "width": "320", "height": "180", "html": "" },
          {
            "<>": "div", "class": "article-item__content", "html": [
              { "<>": "p", "class": "article-item__title", "html": "${title}" },
              {
                "<>": "p", "class": "pretty-time", "data-utc": "2022-03-10T04:56:00Z", "html": function (obj) {
                  return (Utils.getRelativeTime(new Date(obj.time)));
                }
              }
              //{ "<>": "p", "class": "pretty-time", "data-utc": "2022-03-10T04:56:00Z", "html": "${time}" }
            ]
          }
        ]
      };
      let html = json2html.render(data.articles, template)
  
      articleList.innerHTML = html;
  
    }
  
  }