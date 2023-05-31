const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle");

      //LOCAL STORAGE FOR DARK/LIGHT MODE CHECKER
      let getMode = localStorage.getItem("mode");
      if(getMode && getMode === "dark-mode"){
        body.classList.add("dark");

      }

    //JS SCRIPT TO TOGGLE DARK/LIGHT MODE
      modeToggle.addEventListener("click", () => {
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark")

        //LOCAL STORAGE SETTER FOR DARK/LIGHT MODE
        if(!body.classList.contains("dark")){
            localStorage.setItem("mode", "light-mode");
        }else{
            localStorage.setItem("mode", "dark-mode");
        }
      });

    //JS SCRIPT TO TOGGLE SEARCH BAR
      searchToggle.addEventListener("click", () => {
        searchToggle.classList.toggle("active");
      })