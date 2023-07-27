
//hamburger menu
const hamburger = document.getElementById("hamburger");

const navMenu = document.getElementById("nav-items");

//this is for icon cards
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


//code

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
});

profileIcon.addEventListener("click", () => {
    profileIcon.classList.toggle("active");
    profileWrap.classList.toggle("active");
});

notification.addEventListener("click", () => {
    notification.classList.toggle("active");
    profileWrap.classList.toggle("active");
});

office.addEventListener("click", () => {
    office.classList.toggle("active");
    profileWrap.classList.toggle("active");
});

//slide function

  let slideVar = null; // Variable to store the slide interval

  window.slide = function(direction) {
    const container = document.getElementById('js-channels');

    if (!container) {
      return;
    }

    const cardWidth = 280; // Width of each card in pixels
    const step = 1; // How many cards to scroll in one step

    let scrollAmount = cardWidth * step;
    if (direction === 'left') {
      scrollAmount = -scrollAmount; // Negative value to scroll left
    }

    if (slideVar) {
      clearInterval(slideVar); // Clear the previous interval before starting a new one
    }

    const currentScrollPosition = container.scrollLeft;
    const targetScrollPosition = currentScrollPosition + scrollAmount;

    slideVar = setInterval(function () {
      if ((scrollAmount > 0 && container.scrollLeft >= targetScrollPosition) ||
          (scrollAmount < 0 && container.scrollLeft <= targetScrollPosition)) {
        container.scrollLeft = targetScrollPosition;
        clearInterval(slideVar);
        slideVar = null; // Reset slideVar to null when the sliding is complete
      } else {
        container.scrollLeft += scrollAmount / 5; // Adjust the divisor for smoother sliding
      }
    }, 10); // Adjust the interval value for smoother sliding
  };




  



//tab
const categoryTabLinks = document.querySelectorAll(".js-category-tab-link");

if (categoryTabLinks) {
  categoryTabLinks.forEach(btn => btn.addEventListener("click", function (e) {

    document.querySelector(".tab__item--active").classList.remove("tab__item--active");
    this.classList.add("tab__item--active");

    getCategoryJson(this, e)

    e.preventDefault();
  }))

}


async function getCategoryJson(element, event) {


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
          ]
        }
      ]
    };
    let html = json2html.render(data.articles, template)

    articleList.innerHTML = html;

  }

}
