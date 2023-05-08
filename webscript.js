const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle");
      sidebarToggle = document.querySelector(".sidebar");
      extensionToggle1 = document.querySelector(".widget1");
      extensionToggle2 = document.querySelector(".widget2");
      extensionToggle3 = document.querySelector(".widget3");

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
    
      //JS SCRIPT TO TOGGLE EXTENSION OF SIDEBAR
      

      //BUTTON 1
      if(!body.classList.contains("widget2 active") && !body.classList.contains("widget3 active")){
            extensionToggle1.addEventListener("mouseover", () => {
                extensionToggle1.classList.toggle("active");
            })

            extensionToggle1.addEventListener("mouseout", () => {
                extensionToggle1.classList.toggle("active");
            })
        }

      //BUTTON 2
      if(!body.classList.contains("widget1 active") && !body.classList.contains("widget3 active")){
            extensionToggle2.addEventListener("mouseover", () => {
                extensionToggle2.classList.toggle("active");
            })

            extensionToggle2.addEventListener("mouseout", () => {
                extensionToggle2.classList.toggle("active");
            })
        }

      //BUTTON 3
      if(!body.classList.contains("widget1 active") && !body.classList.contains("widget2 active")){
            extensionToggle3.addEventListener("mouseover", () => {
                extensionToggle3.classList.toggle("active");
            })

            extensionToggle3.addEventListener("mouseout", () => {
                extensionToggle3.classList.toggle("active");
            })
        }

