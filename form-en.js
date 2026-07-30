(() => {
  const contactEmail = "sshui97555@gmail.com";

  function buildBrief(form) {
    const inputs = form.querySelectorAll("input");
    const tone = form.querySelector("select").value;
    return [
      "XIANSHANG STUDIO — FREE PAGE BRIEF",
      `Service: ${inputs[0].value.trim()}`,
      `Best-fit client: ${inputs[1].value.trim()}`,
      `Desired next action: ${inputs[2].value.trim()}`,
      `Preferred tone: ${tone}`,
      "",
      "I would like to see a focused one-page direction. Please reply with:",
      "1. Your recommended page structure",
      "2. What content you need from me",
      "3. When I could see the first clickable direction",
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
    title.textContent = "Your brief is ready";
    const check = document.createElement("span");
    check.textContent = "✓";
    titleWrap.append(ready, title);
    head.append(titleWrap, check);

    const preview = document.createElement("pre");
    preview.textContent = brief;

    const actions = document.createElement("div");
    actions.className = "resultActions";
    const email = makeButton("Open in email ↗", () => {
      const subject = encodeURIComponent("Xianshang Studio | My one-page website brief");
      const body = encodeURIComponent(brief);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    });
    const copy = makeButton("Copy brief", async () => {
      await navigator.clipboard.writeText(brief);
      copy.textContent = "Copied ✓";
    });
    const share = makeButton("Share another way", async () => {
      if (navigator.share) {
        await navigator.share({ title: "My one-page website brief", text: brief });
      } else {
        await navigator.clipboard.writeText(brief);
        share.textContent = "Copied ✓";
      }
    });
    actions.append(email, copy, share);

    const note = document.createElement("p");
    note.textContent = `The email will be addressed to ${contactEmail}; you can review and edit it before sending.`;
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
