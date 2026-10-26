(() => {
    const textColorInput = document.querySelector("#textColor");
    const backgroundColorInput = document.querySelector("#backgroundColor");
    const highlightStyleSelect = document.querySelector("#highlightStyle");
    const resetButton = document.querySelector("#resetLab");

    const preview = document.querySelector("#preview");
    const previewText = document.querySelector("#previewText");
    const cssOutput = document.querySelector("#cssOutput");

    const highlight = previewText.querySelector(".highlight-word");

    if (
        !textColorInput ||
        !backgroundColorInput ||
        !highlightStyleSelect ||
        !resetButton ||
        !preview ||
        !highlight ||
        !cssOutput
    ) {
        return;
    }

    const defaults = {
        text: "#191919",
        background: "#d9ff43",
        style: "marker",
    };

    function updateLab() {
        const textColor = textColorInput.value;
        const backgroundColor = backgroundColorInput.value;
        const style = highlightStyleSelect.value;

        // Apply the chosen text color to the highlighted phrase.
        highlight.style.color = textColor;

        // Remove previous style classes before applying the new one.
        highlight.classList.remove(
            "style-marker",
            "style-rounded",
            "style-underline",
            "style-solid",
        );

        highlight.classList.add(`style-${style}`);

        // A CSS custom property keeps the selected highlight color reusable.
        highlight.style.setProperty("--highlight-bg", backgroundColor);

        // Keep the background color of each effect consistent.
        if (style === "marker") {
            highlight.style.backgroundImage = `linear-gradient(transparent 42%, ${backgroundColor} 42%)`;
            highlight.style.backgroundColor = "transparent";
            highlight.style.boxShadow = "none";
            highlight.style.borderRadius = "0";
        } else if (style === "underline") {
            highlight.style.backgroundImage = "none";
            highlight.style.backgroundColor = "transparent";
            highlight.style.boxShadow = `inset 0 -0.14em 0 ${backgroundColor}`;
            highlight.style.borderRadius = "0";
        } else {
            highlight.style.backgroundImage = "none";
            highlight.style.backgroundColor = backgroundColor;
            highlight.style.boxShadow = "none";

            highlight.style.borderRadius = style === "rounded" ? "0.2em" : "0";
        }

        // Display CSS that learners can copy into their own project.
        let css = `.highlight-word {\n`;
        css += `  color: ${textColor};\n`;

        if (style === "marker") {
            css += `  background-color: transparent;\n`;
            css += `  background-image: linear-gradient(\n`;
            css += `    transparent 42%,\n`;
            css += `    ${backgroundColor} 42%\n`;
            css += `  );\n`;
        } else if (style === "underline") {
            css += `  background-color: transparent;\n`;
            css += `  box-shadow: inset 0 -0.14em 0 ${backgroundColor};\n`;
        } else {
            css += `  background-color: ${backgroundColor};\n`;

            if (style === "rounded") {
                css += `  border-radius: 0.2em;\n`;
                css += `  padding: 0.02em 0.16em 0.08em;\n`;
            } else {
                css += `  padding: 0.02em 0.12em;\n`;
            }
        }

        css += `}`;
        cssOutput.textContent = css;

        // Provide a subtle visual response when the preview changes.
        preview.animate(
            [
                { opacity: 0.85, transform: "scale(0.995)" },
                { opacity: 1, transform: "scale(1)" },
            ],
            {
                duration: 220,
                easing: "ease-out",
            },
        );
    }

    function resetLab() {
        textColorInput.value = defaults.text;
        backgroundColorInput.value = defaults.background;
        highlightStyleSelect.value = defaults.style;

        updateLab();
    }

    textColorInput.addEventListener("input", updateLab);
    backgroundColorInput.addEventListener("input", updateLab);
    highlightStyleSelect.addEventListener("change", updateLab);
    resetButton.addEventListener("click", resetLab);

    // Render the initial CSS and preview on page load.
    updateLab();
})();
