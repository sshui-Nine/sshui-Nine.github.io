(() => {
  const contactEmail = "sshui97555@gmail.com";

  function buildBrief(form) {
    const inputs = form.querySelectorAll("input");
    const tone = form.querySelector("select").value;
    return [
      "【先上线 · 免费页面方案】",
      `我提供：${inputs[0].value.trim()}`,
      `服务对象：${inputs[1].value.trim()}`,
      `希望访客：${inputs[2].value.trim()}`,
      `页面感觉：${tone}`,
      "",
      "我想先做一页可点击预览。请回复我：",
      "1. 你建议的页面结构",
      "2. 还需要我提供什么",
      "3. 最早何时能看到初稿",
    ].join("\n");
  }

  function makeButton(label, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
  }

  function renderResult(form, brief) {
    document.getElementById("result")?.remove();

    const card = document.createElement("div");
    card.className = "resultCard";
    card.id = "result";
    card.setAttribute("aria-live", "polite");

    const head = document.createElement("div");
    head.className = "resultHead";
    const titleWrap = document.createElement("div");
    const ready = document.createElement("small");
    ready.textContent = "READY TO SEND";
    const title = document.createElement("h3");
    title.textContent = "你的需求已整理好";
    const check = document.createElement("span");
    check.textContent = "✓";
    titleWrap.append(ready, title);
    head.append(titleWrap, check);

    const preview = document.createElement("pre");
    preview.textContent = brief;

    const actions = document.createElement("div");
    actions.className = "resultActions";
    const email = makeButton("邮件发送 ↗", () => {
      const subject = encodeURIComponent("先上线｜我的一页网站需求");
      const body = encodeURIComponent(brief);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    });
    const copy = makeButton("复制需求", async () => {
      await navigator.clipboard.writeText(brief);
      copy.textContent = "已复制 ✓";
    });
    const share = makeButton("其他方式分享", async () => {
      if (navigator.share) {
        await navigator.share({ title: "我的一页网站需求", text: brief });
      } else {
        await navigator.clipboard.writeText(brief);
        share.textContent = "已复制 ✓";
      }
    });
    actions.append(email, copy, share);

    const note = document.createElement("p");
    note.textContent = `邮件将发送至 ${contactEmail}；点击前你仍可以检查和修改内容。`;
    card.append(head, preview, actions, note);
    form.insertAdjacentElement("afterend", card);
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".briefForm");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      renderResult(form, buildBrief(form));
    });
  });
})();
