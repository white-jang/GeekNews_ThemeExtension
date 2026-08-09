(() => {
  const VISITED_KEY = "gnVisited";

  // 리스트의 .topic_row에는 data-topic-state-id가 항상 있음 (제목 링크는
  // 외부 기사로 나가는 경우가 대부분이라 href만으로는 글 ID를 알 수 없음)
  const getTopicId = (row) => (row && row.dataset.topicStateId) || null;

  // 댓글/상세 페이지(news.hada.io/topic?id=NNNNN)에 직접 들어온 경우의 ID
  const getTopicIdFromUrl = (url) => {
    try {
      const u = new URL(url, location.href);
      if (u.pathname !== "/topic") return null;
      return u.searchParams.get("id");
    } catch {
      return null;
    }
  };

  const markVisited = (visited) => {
    document.querySelectorAll(".topic_row").forEach((row) => {
      const id = getTopicId(row);
      if (!id || !visited[id]) return;
      row.querySelector(".topictitle > a")?.classList.add("gn-visited");
    });
  };

  const loadAndMark = () => {
    chrome.storage.local.get({ [VISITED_KEY]: {} }, (res) => {
      markVisited(res[VISITED_KEY]);
    });
  };

  const recordVisit = (id) => {
    if (!id) return;
    chrome.storage.local.get({ [VISITED_KEY]: {} }, (res) => {
      if (res[VISITED_KEY][id]) return;
      chrome.storage.local.set({
        [VISITED_KEY]: { ...res[VISITED_KEY], [id]: true },
      });
    });
  };

  const init = () => {
    recordVisit(getTopicIdFromUrl(location.href));
    loadAndMark();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // bfcache 복원 시에도 재마킹
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) init();
  });

  // 리스트에서 제목을 클릭하면 (외부 링크로 나가더라도) 즉시 방문 처리
  document.addEventListener("click", (e) => {
    const a = e.target.closest(".topic_row .topictitle > a");
    if (!a) return;
    const id = getTopicId(a.closest(".topic_row"));
    if (!id) return;
    a.classList.add("gn-visited");
    recordVisit(id);
  });

  // 다른 탭에서 기록된 방문을 실시간 반영
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes[VISITED_KEY]) {
      markVisited(changes[VISITED_KEY].newValue || {});
    }
  });
})();
