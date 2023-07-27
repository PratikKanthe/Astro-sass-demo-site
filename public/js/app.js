'use strict';

class Utils {
  // Function to format currency
  static formatCurrency(amount, currency = 'USD') {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    });
    return formatter.format(amount);
  }

  // Function to check if a string is empty or not
  static isEmpty(str) {
    return !str.trim().length;
  }

  // Function to check if a number is within a specified range
  static isInRange(num, min, max) {
    return num >= min && num <= max;
  }

  // Function to generate a random integer within a specified range
  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // This is a function that will be used to throttle the scroll event
  static throttle(func, delay) {
    let lastCallTime = 0;
    return function (...args) {
      const context = this;
      const now = new Date().getTime();
      if (now - lastCallTime >= delay) {
        func.apply(context, args);
        lastCallTime = now;
      }
    };
  }

  //This function can be used for auto-complete search to delay the search until the user has stopped typing
  static debounce(func, delay) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }


  // Function to fetch JSON data from a URL
  static async getJson(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching JSON data: ${error}`);
    }
  }

  // Function to fetch HTML data from a URL
  static async getHtml(url) {
    try {
      const response = await fetch(url);
      const data = await response.text();
      return data;
    } catch (error) {
      console.error(`Error fetching HTML data: ${error}`);
    }
  }

  // Function to fetch HTML data from a URL and insert it into a specified div
  static async getHtmlAndInsert(url, responseDiv) {
    try {
      const response = await fetch(url);
      const data = await response.text();

      responseDiv.innerHTML = data;
    } catch (error) {
      console.error(`Error fetching and inserting HTML data: ${error}`);
    }
  }


  static async formatTime(selector) {
    const elements = document.querySelectorAll(selector);
    for (const element of elements) {
      const utcDate = element.getAttribute('data-utc');
      const localDate = new Date(utcDate);
      const relativeTime = Utils.getRelativeTime(localDate);
      const title = localDate.toLocaleString('en-US');
      element.innerText = relativeTime;
      element.setAttribute('title', title);
      await new Promise(resolve => setTimeout(resolve));
    }
  }


  static getRelativeTime(date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = diff / 1000;
    if (seconds < 60) {
      return 'just now';
    } else if (seconds < 120) {
      return '1 minute ago';
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 7200) {
      return '1 hour ago';
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else {
      const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return date.toLocaleString(undefined, options);
    }
  }

}


//This is done to avoid conflicts with other scripts
const init = async () => {

  //This sets the Navigation Toggle Menu for Mobile
  setNavigationToggle();

  //This sets the Top Bar Site Search
  setNavBarSearch();

  //This sets the Page Overlay which is used when the Navigation Menu is open
  setPageOverlay();

  //Sets the Dropdowns for the User Menu, Inbox and Notifications
  setDropDown();

  await Utils.formatTime('.pretty-time');
  //console.log('Done formatting times');

  //This gets the Notification Counts from the API
  await getNotificationCount();

  /**
   * Functions for the Site
   */

  function setNavigationToggle() {

    /* Navigation Toggle Menu for Mobile */
    const navToggle = document.getElementById('js-nav-toggle');
    const navMenu = document.getElementById('js-nav-menu');
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", (e) => {
        navMenu.classList.toggle("show");
        pageOverlay.style.display = "block";
        e.preventDefault();
      })
    }

  }

  function setNavBarSearch() {

    // Top Bar Site Search

    const showSearch = document.getElementById("js-search-show");
    const hideSearch = document.getElementById("js-search-hide");
    const searchDiv = document.getElementById("js-search-div");
    const searchQuery = document.getElementById("js-search-query");

    if (showSearch && searchDiv && searchQuery) {
      showSearch.addEventListener("click", (e) => {
        searchDiv.classList.add("top-bar-search--visible");
        searchQuery.focus();
        e.preventDefault();
      })
    }

    if (hideSearch && searchDiv) {
      hideSearch.addEventListener("click", (e) => {
        searchDiv.classList.remove("top-bar-search--visible");
        e.preventDefault();
      })
    }

  }


  function setPageOverlay() {
    const pageOverlay = document.getElementById('js-overlay');
    if (pageOverlay) {
      pageOverlay.addEventListener("click", (e) => {
        document.querySelector(".show").classList.remove("show");
        pageOverlay.style.display = "none";
      })

    }

  }

  function setDropDown() {

    const userDropdownBtns = document.querySelectorAll(".js-dropdown-link");

    if (userDropdownBtns) {
      userDropdownBtns.forEach(btn => btn.addEventListener("click", function (e) {
        toggleDropdown(this, e);

        e.preventDefault();
      }))

    }

  }

  function toggleDropdown(element, event) {

    element.nextElementSibling.classList.toggle("show");

    const pageOverlay = document.getElementById('js-overlay');
    pageOverlay.style.display = "block";
    switch (element.getAttribute("data-url")) {

      case ("inbox"):
        Utils.getHtmlAndInsert("/ajax/_inbox.html", element.nextElementSibling)
        break;
      case ("notification"):
        Utils.getHtmlAndInsert("/ajax/_notification.html", element.nextElementSibling)
        break;
      case "user":
        Utils.getHtmlAndInsert("/ajax/_user.html", element.nextElementSibling)
        break;

      default:

    }

  }


  

  async function getNotificationCount() {

    const inboxCount = document.getElementById("js-inbox-count");
    const notificationCount = document.getElementById("js-notification-count");

    if (inboxCount && notificationCount) {
      const data = await Utils.getJson("/api/_count.json");

      if (data.hasOwnProperty('notification') && data.notification != null) {
        notificationCount.innerHTML = data.notification;
        notificationCount.classList.remove("hidden");
      };
      if (data.hasOwnProperty('inbox') && data.inbox != null) {
        inboxCount.innerHTML = data.inbox;
        inboxCount.classList.remove("hidden");
      };


    }
  }

};

init();