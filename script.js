"use strict";

const copyButton = document.getElementById("copy-citation");
let copyReset;
copyButton.addEventListener("click", async () => {
  const text = document.getElementById("bibtex").textContent;
  let copied = false;
  try {
    await navigator.clipboard.writeText(text);
    copied = true;
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("bibtex"));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try { copied = document.execCommand("copy"); } catch { /* Leave citation selected for manual copying. */ }
    if (copied) selection.removeAllRanges();
  }
  copyButton.textContent = copied ? "Copied" : "Select text to copy";
  document.getElementById("copy-status").textContent = copied ? "Citation copied to clipboard." : "Please copy the selected citation text.";
  clearTimeout(copyReset);
  copyReset = setTimeout(() => { copyButton.textContent = "Copy"; }, 2500);
});

const dialog = document.getElementById("figure-dialog");
if (typeof dialog.showModal === "function") {
  document.querySelectorAll("[data-figure]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const original = link.querySelector("img");
      const expanded = document.getElementById("expanded-figure");
      expanded.src = original.getAttribute("src");
      expanded.alt = original.alt;
      document.getElementById("figure-title").textContent = link.dataset.figure;
      dialog.showModal();
    });
  });
  document.getElementById("close-figure").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
}

