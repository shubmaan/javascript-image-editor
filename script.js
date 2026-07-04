const inputImg = document.getElementById("input-img");
const placeholder = document.getElementById("placeholder");

const filters = document.querySelector("#filters");
const presetsFilters = document.querySelector(".heroRightBottom");
const presetsBtns = document.querySelectorAll(".presetsBtn");

const resetBtn = document.querySelector("#resetBtn");
const downloadImgBtn = document.querySelector("#downloadImgBtn");

const canvas = document.getElementById("img-canvas");
const c = canvas.getContext("2d");


const allRanges = document.querySelectorAll(".filter");

function disableControls() {
    allRanges.forEach((range) => {
        range.disabled = true;
    });

    presetsBtns.forEach((btn) => {
        btn.disabled = true;
    });

}

disableControls();

function enableControls() {
    allRanges.forEach((range) => {
        range.disabled = false;
    });

    presetsBtns.forEach((btn) => {
        btn.disabled = false;
    });
}


const filtersObj = {
    brightness: document.getElementById("Brightness"),
    saturation: document.getElementById("Saturate"),

    contrast: document.getElementById("Contrast"),
    blur: document.getElementById("Blur"),
    hueRotate: document.getElementById("HueRotate"),
    grayscale: document.getElementById("Grayscale"),
    sepia: document.getElementById("Sepia"),
    opacity: document.getElementById("Opacity"),
    invert: document.getElementById("Invert"),
};

const presetButtons = {
    Original: document.getElementById("Original"),
    Drama: document.getElementById("Drama"),
    Vintage: document.getElementById("Vintage"),
    OldSchool: document.getElementById("OldSchool"),
    Cyberpunk: document.getElementById("Cyberpunk"),
    SoftGlow: document.getElementById("SoftGlow"),
    Noir: document.getElementById("Noir"),
    WarmSunset: document.getElementById("WarmSunset"),
    CoolTone: document.getElementById("CoolTone"),
    Faded: document.getElementById("Faded"),
    retroPop: document.getElementById("retroPop"),
    BlackGold: document.getElementById("BlackGold"),
};

let uploadedImage = null;

const presets = {
    Original: {
        brightness: 100,
        saturation: 100,
        contrast: 100,
        blur: 0,
        hueRotate: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },
    Drama: {
        brightness: 110,
        saturation: 140,
        contrast: 120,
        blur: 0,
        hueRotate: 5,
        grayscale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0,
    },
    Vintage: {
        brightness: 105,
        saturation: 80,
        contrast: 110,
        blur: 0,
        hueRotate: 0,
        grayscale: 0,
        sepia: 45,
        opacity: 100,
        invert: 0,
    },
    OldSchool: {
        brightness: 95,
        saturation: 75,
        contrast: 95,
        blur: 1,
        hueRotate: 0,
        grayscale: 10,
        sepia: 25,
        opacity: 100,
        invert: 0,
    },
    Cyberpunk: {
        brightness: 115,
        saturation: 150,
        contrast: 125,
        blur: 0,
        hueRotate: 180,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },
    SoftGlow: {
        brightness: 120,
        saturation: 90,
        contrast: 85,
        blur: 4,
        hueRotate: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },
    Noir: {
        brightness: 90,
        saturation: 60,
        contrast: 110,
        blur: 0,
        hueRotate: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },
    WarmSunset: {
        brightness: 110,
        saturation: 120,
        contrast: 105,
        blur: 0,
        hueRotate: 15,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0,
    },
    CoolTone: {
        brightness: 105,
        saturation: 90,
        contrast: 100,
        blur: 0,
        hueRotate: 320,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },
    Faded: {
        brightness: 100,
        saturation: 70,
        contrast: 80,
        blur: 0,
        hueRotate: 0,
        grayscale: 20,
        sepia: 10,
        opacity: 85,
        invert: 0,
    },
    retroPop: {
        brightness: 115,
        saturation: 140,
        contrast: 115,
        blur: 0,
        hueRotate: 25,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0,
    },
    BlackGold: {
        brightness: 95,
        saturation: 100,
        contrast: 120,
        blur: 0,
        hueRotate: 0,
        grayscale: 0,
        sepia: 35,
        opacity: 100,
        invert: 0,
    },
};

function setFocusToOrgFilter() {
    presetsBtns.forEach((presetButton) => {
        presetButton.classList.remove("presetsBtn-active");
    });
    presetButtons.Original.classList.add("presetsBtn-active");
}

inputImg.addEventListener("change", (e) => {
    const file = e.target.files[0];

    const imageURL = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
        uploadedImage = img;
        canvas.style.display = "flex";
        placeholder.style.display = "none";
        canvas.width = img.width;
        canvas.height = img.height;

        c.drawImage(img, 0, 0);

        enableControls();
    };
    img.src = imageURL;
});

function applyFilters() {
    if (!uploadedImage) return;

    c.filter = `
        brightness(${filtersObj.brightness.value}%)
        saturate(${filtersObj.saturation.value}%)  
        contrast(${filtersObj.contrast.value}%)
        blur(${filtersObj.blur.value}px)
        hue-rotate(${filtersObj.hueRotate.value}deg)
        grayscale(${filtersObj.grayscale.value}%)
        sepia(${filtersObj.sepia.value}%)
        opacity(${filtersObj.opacity.value}%)
        invert(${filtersObj.invert.value}%)
    `;

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(uploadedImage, 0, 0);
}

function filtersApply() {
    filters.addEventListener("input", () => {
        setFocusToOrgFilter();

        applyFilters();
    });
}

function presetsFiltersApply() {

    presetsFilters.addEventListener("click", (e) => {
        if (!e.target.classList.contains("btn")) {
            return;
        }
        presetsBtns.forEach((presetButton) => {
            presetButton.classList.remove("presetsBtn-active");
        });

        e.target.classList.add("presetsBtn-active");

        for (const key in presets[e.target.id]) {
            filtersObj[key].value = presets[e.target.id][key];
        }
        applyFilters();
    });
}

function resetBtnFun() {
    resetBtn.addEventListener("click", () => {
        setFocusToOrgFilter();

        for (const key in presets.Original) {
            filtersObj[key].value = presets.Original[key];
        }

        applyFilters();
    });
}
function downloadImgFun(){
    downloadImgBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = "edited-image.png";
        link.href = canvas.toDataURL();

        link.click();
    });

}

downloadImgFun();
resetBtnFun();

filtersApply();
presetsFiltersApply();
