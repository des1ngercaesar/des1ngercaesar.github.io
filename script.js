let cropper = null;

const imageInput = document.getElementById("imageInput");
const uploadCard = document.getElementById("uploadCard");
const cropImage = document.getElementById("cropImage");

const generateBtn = document.getElementById("generateBtn");
const tiles = document.getElementById("tiles");

const layoutButtons = document.querySelectorAll(".layout-btn[data-ratio]");

let currentLayout = {
    rows: 1,
    cols: 3,
    width: 3240,
    height: 1080,
    ratio: 3
};

uploadCard.addEventListener("click", () => {
    imageInput.click();
});

imageInput.addEventListener("change", e => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

        cropImage.src = reader.result;
        cropImage.style.display = "block";

        if (cropper) cropper.destroy();

        cropper = new Cropper(cropImage, {
            aspectRatio: currentLayout.ratio,
            viewMode: 1,
            autoCropArea: 1,
            responsive: true,
            background: false
        });

    };

    reader.readAsDataURL(file);

});

layoutButtons.forEach(button => {

    button.addEventListener("click", () => {

        layoutButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        if (button.textContent.includes("3")) {

            currentLayout = {
                rows: 1,
                cols: 3,
                width: 3240,
                height: 1080,
                ratio: 3
            };

        } else {

            currentLayout = {
                rows: 3,
                cols: 3,
                width: 3240,
                height: 3240,
                ratio: 1
            };

        }

        if (cropper) {

            cropper.setAspectRatio(currentLayout.ratio);

        }

    });

});

generateBtn.addEventListener("click", () => {

    if (!cropper) {
        alert("Upload an image first.");
        return;
    }

    tiles.innerHTML = "";

    const cropped = cropper.getCroppedCanvas({
        width: currentLayout.width,
        height: currentLayout.height,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high"
    });

    const tileWidth = currentLayout.width / currentLayout.cols;
    const tileHeight = currentLayout.height / currentLayout.rows;

    for (let row = 0; row < currentLayout.rows; row++) {

        for (let col = 0; col < currentLayout.cols; col++) {

            const canvas = document.createElement("canvas");

            canvas.width = tileWidth;
            canvas.height = tileHeight;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(
                cropped,
                col * tileWidth,
                row * tileHeight,
                tileWidth,
                tileHeight,
                0,
                0,
                tileWidth,
                tileHeight
            );

            tiles.appendChild(canvas);

        }

    }

});
