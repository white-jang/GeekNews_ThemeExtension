(() => {
  const STORAGE_KEY = "gnTheme";
  const DEFAULT = "light";

  const apply = (theme) => {
    const root = document.documentElement;
    root.setAttribute("data-gn-theme", theme === "dark" ? "dark" : "light");
  };

  chrome.storage.sync.get({ [STORAGE_KEY]: DEFAULT }, (res) => {
    apply(res[STORAGE_KEY]);
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes[STORAGE_KEY]) {
      apply(changes[STORAGE_KEY].newValue);
    }
  });

})();
