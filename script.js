const getSavedMode = () => {
    let savedMode = localStorage.getItem("mode");
    if (savedMode == null) { 
        localStorage.setItem("mode", "light");
        savedMode = localStorage.getItem("mode");
    }
    return savedMode;
}

const toggleModeInStore = () => {
    let savedMode = localStorage.getItem("mode");
    if (savedMode == null) {
        localStorage.setItem("mode", "light");
    } else if (savedMode == "light") {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
}

const toggleMode = () => {
    document.body.classList.toggle("dark-mode");
    toggleModeInStore()
    if(getSavedMode() == "dark") {
        changeIcon("light")
    } else {
        changeIcon("dark")
    }
}

const toggleToMode = (mode) => {
    document.body.classList.toggle(mode);
    if(getSavedMode() == "dark") {
        changeIcon("light")
        document.getElementById("darkmode-toggle").setAttribute("checked", "checked");
    } else {
        changeIcon("dark")
    }
}

const changeIcon = (mode) => {
    // Obtén todos los elementos con la clase "icon-fill"
    const elements = document.querySelectorAll('.icon-fill');

    let actualColor = "#EEEEEE";
    if (getSavedMode() == "light") {
        actualColor = "#222831";
    } 

    elements.forEach((element) => {
        element.setAttribute('fill', actualColor); // Reemplaza 'nuevoColor' con el color que desees
    });
}

const setInitialMode = () => {
    toggleToMode(getSavedMode()+"-mode")
}

const removeMultiline = () => {
    let textFormat = document.getElementById('textarea-input').value.replace(/(\r\n|\n|\r)/gm, "");
    document.getElementById('textarea-output').value = textFormat;

}

const copyText = () => {
    console.log("a copiar")
    let formatText = document.getElementById('textarea-output');
    formatText.select();
    formatText.setSelectionRange(0, 99999999999);
    document.execCommand("copy");
}

const clearText = () => {
    document.getElementById('textarea-input').value = "";
    document.getElementById('textarea-output').value = "";
} 

const createAlert = () => {
    const createElementWithClass = (tagName, className, innerText) => {
    const elem = document.createElement(tagName);
    elem.className = className;
    elem.innerText = innerText || '';
    return elem;
    };

    const alertDiv = createElementWithClass('div', 'custom-alert');
    const iconSpan = createElementWithClass('span', 'icon', '👌');
    const messageDiv = createElementWithClass('div', 'message', 'Text copy!');

    [iconSpan, messageDiv].forEach(elem => alertDiv.appendChild(elem));
    
    return alertDiv;
}

// Al cargar la página, se establecerá el modo según el valor almacenado en el local storage.
window.onload = function() {

    
    document.getElementById("darkmode-toggle").addEventListener("click", (e) => {
        toggleMode();
    });

    document.getElementById("convert-btn").addEventListener("click", (e) => {
        removeMultiline();
    });

    document.getElementById("copy-btn").addEventListener("click", (e) => {
        copyText();
    });

    document.getElementById("clear-btn").addEventListener("click", (e) => {
        clearText();
    });

    console.log("mode save actual: "+getSavedMode())

    setInitialMode()

    const showAlertButton = document.getElementById("copy-btn");
    const alertContainer = document.getElementById("alertContainer");
  
    showAlertButton.addEventListener("click", function () {
      const alertDiv = createAlert();
      alertContainer.appendChild(alertDiv);
  
      let timeElapsed = 0;
      const duration = 5000;
      const interval = setInterval(() => {
      timeElapsed += 50;
  
  
        if (timeElapsed >= duration) {
          clearInterval(interval);
          alertContainer.removeChild(alertDiv);
        }
      }, 50);
    });



 
    
}