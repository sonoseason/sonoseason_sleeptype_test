const questions = [
  {
    text: "매트리스에 누웠을 때 어떤 느낌이 가장 편안한가요?",
    sub: "지금 떠오르는 느낌을 골라주세요.",
    answers: [
      { text: "몸을 부드럽게 감싸주는 느낌", type: "soft" },
      { text: "적당히 편안하게 받쳐주는 느낌", type: "medium" },
      { text: "탄탄하게 몸을 받쳐주는 느낌", type: "firm" }
    ]
  },
  {
    text: "현재 사용 중인 매트리스에서 가장 아쉬운 점은?",
    sub: "",
    answers: [
      { text: "너무 딱딱하게 느껴져요", type: "soft" },
      { text: "특별히 불편한 점은 없어요", type: "medium" },
      { text: "너무 푹신하게 느껴져요", type: "firm" }
    ]
  },
  {
    text: "침대의 높이는 어떤 느낌을 선호하나요?",
    sub: "매트리스 자체의 높이에 대한 취향을 골라주세요.",
    answers: [
      { text: "낮고 깔끔한 느낌", type: "low" },
      { text: "적당한 높이의 안정적인 느낌", type: "standard" },
      { text: "높고 여유로운 느낌", type: "high" }
    ]
  },
  {
    text: "혼자 자는 침대라면 어떤 매트리스를 고르고 싶나요?",
    sub: "",
    answers: [
      { text: "무조건 내가 좋아하는 경도로", type: "solo" },
      { text: "누구나 편안할 만한 균형 잡힌 경도로", type: "balanced" },
      { text: "아직 어떤 경도가 맞는지 잘 모르겠어요", type: "uncertain" }
    ]
  },
  {
    text: "둘이 함께 사용하는 침대라면 어떤 상황에 가까운가요?",
    sub: "혼자 사용하는 경우에도 가장 가까운 답을 골라주세요.",
    answers: [
      { text: "둘 다 비슷한 취향이에요", type: "same" },
      { text: "서로 선호하는 경도가 달라요", type: "dual" },
      { text: "둘 다 어떤 경도가 맞는지 모르겠어요", type: "uncertain" }
    ]
  }
];

const results = {
  soft: {
    title: "포근한 SOFT 취향",
    desc: "매트리스에 누웠을 때 몸을 부드럽게 감싸주는 편안함을 선호하는 편이에요.",
    traits: ["부드러운 쿠션감", "포근한 느낌", "SOFT"],
    product: "어드밴스 소프트",
    meta: ["300mm", "SOFT"],
    reason: "현재 테스트에서는 부드러운 경도를 가장 선호하는 것으로 나타났어요."
  },
  medium: {
    title: "균형 잡힌 MEDIUM 취향",
    desc: "너무 푹신하지도, 너무 단단하지도 않은 균형 잡힌 느낌을 선호하는 편이에요.",
    traits: ["균형감", "편안한 지지", "MEDIUM"],
    product: "어드밴스 미디엄",
    meta: ["300mm", "MEDIUM"],
    reason: "현재 테스트에서는 편안함과 균형감을 중시하는 성향으로 나타났어요."
  },
  firm: {
    title: "탄탄한 FIRM 취향",
    desc: "몸이 깊게 가라앉는 느낌보다 탄탄하게 받쳐주는 느낌을 선호하는 편이에요.",
    traits: ["탄탄한 느낌", "안정감", "FIRM"],
    product: "어드밴스 펌",
    meta: ["300mm", "FIRM"],
    reason: "현재 테스트에서는 단단하고 탄탄한 느낌을 가장 선호하는 것으로 나타났어요."
  },
  dual: {
    title: "선택의 폭을 원하는 DUAL 취향",
    desc: "서로 다른 경도를 선호하거나 하나의 경도로 결정하기 어려운 경우에 가까워요.",
    traits: ["선택 가능", "MEDIUM / FIRM", "DUAL"],
    product: "센세이션 듀얼",
    meta: ["300mm", "MEDIUM / FIRM"],
    reason: "한 가지 경도로 결정하기보다 선택의 폭이 있는 제품을 우선 고려해볼 수 있어요."
  },
  high: {
    title: "높은 매트리스를 선호하는 타입",
    desc: "낮은 매트리스보다 높이가 있는 매트리스에서 여유롭고 안정적인 느낌을 선호하는 편이에요.",
    traits: ["높은 높이", "여유로운 느낌", "300~340mm"],
    product: "어드밴스 미디엄",
    meta: ["300mm", "MEDIUM"],
    reason: "높이에 대한 선호를 반영해 300mm 제품을 우선 추천해요."
  },
  low: {
    title: "깔끔한 LOW 타입",
    desc: "높이가 과하지 않고 낮고 깔끔한 침대 구성을 선호하는 편이에요.",
    traits: ["낮은 높이", "깔끔한 구성", "190mm"],
    product: "베이직",
    meta: ["190mm", "MEDIUM"],
    reason: "높이에 대한 선호를 반영해 190mm 제품을 우선 추천해요."
  }
};

let current = 0;
let answers = [];
let scores = { soft: 0, medium: 0, firm: 0, low: 0, standard: 0, high: 0, dual: 0, uncertain: 0 };

const $ = id => document.getElementById(id);

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo(0, 0);
}

function renderQuestion() {
  const q = questions[current];
  $("questionKicker").textContent = `QUESTION ${String(current + 1).padStart(2, "0")}`;
  $("questionText").textContent = q.text;
  $("questionSub").textContent = q.sub;
  $("countText").textContent = `${current + 1} / ${questions.length}`;
  $("progressBar").style.width = `${((current + 1) / questions.length) * 100}%`;

  const container = $("answers");
  container.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.innerHTML = `<span>${answer.text}</span><span class="arrow">→</span>`;
    btn.addEventListener("click", () => selectAnswer(answer.type, index));
    container.appendChild(btn);
  });
}

function selectAnswer(type, index) {
  answers[current] = { type, index };
  scores[type] = (scores[type] || 0) + 1;

  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showScreen("loadingScreen");
    setTimeout(showResult, 800);
  }
}

function getResultKey() {
  if (scores.dual >= 1) return "dual";
  if (scores.soft > scores.medium && scores.soft >= scores.firm) return "soft";
  if (scores.firm > scores.medium && scores.firm > scores.soft) return "firm";
  if (scores.high >= 1 && scores.high > scores.low) return "high";
  if (scores.low >= 1 && scores.low > scores.high) return "low";
  return "medium";
}

function showResult() {
  const key = getResultKey();
  const result = results[key];

  $("resultTitle").textContent = result.title;
  $("resultDesc").textContent = result.desc;
  $("recommendTitle").textContent = result.product;
  $("recommendReason").textContent = result.reason;
  $("productMeta").innerHTML = result.meta.map(x => `<span>${x}</span>`).join("");
  $("traits").innerHTML = result.traits.map(x => `<span class="trait">#${x}</span>`).join("");

  $("productBtn").onclick = () => showScreen("placeholderScreen");
  showScreen("resultScreen");
}

function resetTest() {
  current = 0;
  answers = [];
  scores = { soft: 0, medium: 0, firm: 0, low: 0, standard: 0, high: 0, dual: 0, uncertain: 0 };
  renderQuestion();
  showScreen("quizScreen");
}

$("startBtn").addEventListener("click", () => {
  current = 0;
  answers = [];
  scores = { soft: 0, medium: 0, firm: 0, low: 0, standard: 0, high: 0, dual: 0, uncertain: 0 };
  renderQuestion();
  showScreen("quizScreen");
});

$("backBtn").addEventListener("click", () => {
  if (current === 0) {
    showScreen("homeScreen");
    return;
  }
  current--;
  renderQuestion();
});

$("retryBtn").addEventListener("click", resetTest);

$("placeholderBack").addEventListener("click", () => showScreen("resultScreen"));

$("shareBtn").addEventListener("click", async () => {
  const shareData = {
    title: "나에게 맞는 매트리스 찾기",
    text: "나에게 맞는 매트리스 취향을 테스트해봤어요.",
    url: window.location.href
  };

  if (navigator.share) {
    try { await navigator.share(shareData); } catch (e) {}
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      $("shareBtn").textContent = "링크가 복사됐어요";
      setTimeout(() => $("shareBtn").textContent = "결과 공유하기", 1600);
    } catch (e) {
      alert("이 페이지의 주소를 복사해서 공유해주세요.");
    }
  }
});
