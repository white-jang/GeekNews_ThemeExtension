const KEY = "gnTheme";

const setActive = (theme) => {
  document.getElementById("light").classList.toggle("active", theme === "light");
  document.getElementById("dark").classList.toggle("active", theme === "dark");
};

const save = (theme) => {
  chrome.storage.sync.set({ [KEY]: theme }, () => setActive(theme));
};

chrome.storage.sync.get({ [KEY]: "light" }, (res) => setActive(res[KEY]));

document.getElementById("light").addEventListener("click", () => save("light"));
document.getElementById("dark").addEventListener("click", () => save("dark"));

const VISITED_KEY = "gnVisited";
const resetBtn = document.getElementById("resetVisited");

resetBtn.addEventListener("click", () => {
  chrome.storage.local.remove(VISITED_KEY, () => {
    resetBtn.textContent = "초기화 완료";
    setTimeout(() => {
      resetBtn.textContent = "방문 기록 초기화";
    }, 1200);
  });
});
