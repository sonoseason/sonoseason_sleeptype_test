const QUESTIONS = [
  {
    id: "posture",
    kicker: "SLEEP POSITION",
    text: "평소 가장 자주 자는 자세는 무엇인가요?",
    sub: "가장 자주 취하는 수면 자세를 골라주세요.",
    answers: [
      { id: "back", text: "바르게 누워 자는 편이에요" },
      { id: "side", text: "옆으로 누워 자는 편이에요" },
      { id: "move", text: "자세를 자주 바꾸며 자는 편이에요" }
    ]
  },
  {
    id: "current",
    kicker: "CURRENT MATTRESS",
    text: "현재 매트리스에서 가장 아쉬운 점은 무엇인가요?",
    sub: "지금 사용 중인 매트리스를 떠올려주세요.",
    answers: [
      { id: "too_firm", text: "너무 단단해서 몸이 눌리는 느낌이 들어요" },
      { id: "too_soft", text: "너무 푹신해서 몸이 많이 가라앉는 느낌이에요" },
      { id: "not_refreshed", text: "자고 일어나도 개운하지 않은 느낌이에요" },
      { id: "fine", text: "특별히 불편한 점은 없어요" }
    ]
  },
  {
    id: "feel",
    kicker: "COMFORT",
    text: "매트리스에 처음 누웠을 때 어떤 느낌을 선호하나요?",
    sub: "정답보다 본인의 취향에 가까운 느낌을 골라주세요.",
    answers: [
      { id: "soft", text: "몸을 부드럽게 감싸주는 느낌" },
      { id: "balanced", text: "푹신함과 탄탄함이 적당히 균형 잡힌 느낌" },
      { id: "supportive", text: "몸을 탄탄하게 받쳐주는 느낌" },
      { id: "unknown", text: "아직 잘 모르겠어요" }
    ]
  },
  {
    id: "body",
    kicker: "BODY TYPE",
    text: "체형은 어느 쪽에 가까운가요?",
    sub: "현재 체형에 가장 가까운 답을 골라주세요.",
    answers: [
      { id: "light", text: "체중이 가볍거나 마른 편이에요" },
      { id: "average", text: "보통 체형이에요" },
      { id: "large", text: "체형이 크거나 체중이 나가는 편이에요" }
    ]
  },
  {
    id: "concern",
    kicker: "SLEEP CONCERN",
    text: "평소 수면에서 가장 신경 쓰이는 부분은 무엇인가요?",
    sub: "가장 가까운 한 가지를 골라주세요.",
    answers: [
      { id: "back", text: "허리가 불편한 편이에요" },
      { id: "neck", text: "목이나 어깨가 자주 결리는 편이에요" },
      { id: "toss", text: "뒤척임이 많거나 자주 깨요" },
      { id: "none", text: "특별히 신경 쓰이는 부분은 없어요" }
    ]
  },
  {
    id: "height",
    kicker: "MATTRESS HEIGHT",
    text: "매트리스 높이는 어느 쪽을 선호하나요?",
    sub: "높이는 경도와 별도로 제품을 세분화하는 기준으로 활용돼요.",
    answers: [
      { id: "low", text: "낮고 깔끔한 스타일" },
      { id: "standard", text: "적당한 높이" },
      { id: "high", text: "높고 볼륨감 있는 스타일" },
      { id: "any", text: "높이는 크게 상관없어요" }
    ]
  },
  {
    id: "priority",
    kicker: "FINAL CHECK",
    text: "마지막으로, 매트리스를 고를 때 가장 중요한 것은?",
    sub: "가장 중요하게 생각하는 한 가지를 골라주세요.",
    answers: [
      { id: "soft", text: "몸을 편안하게 감싸주는 느낌" },
      { id: "balance", text: "푹신함과 지지감의 균형" },
      { id: "firm", text: "탄탄하게 받쳐주는 안정감" },
      { id: "compare", text: "잘 모르겠어서 직접 비교해보고 싶어요" }
    ]
  }
];

const PRODUCTS = [
  {
    id: "comfortable",
    name: "컴포터블",
    firmness: "MEDIUM",
    height: 270,
    url: "https://www.sonoseason.com/product/goods/view?goodsId=BO00005661"
  },
  {
    id: "advance_ms",
    name: "어드밴스 미디엄 소프트",
    firmness: "MEDIUM SOFT",
    height: 300,
    url: "https://www.sonoseason.com/product/goods/view?goodsId=BO00000325"
  },
  {
    id: "advance_m",
    name: "어드밴스 미디엄",
    firmness: "MEDIUM",
    height: 300,
    url: "https://www.sonoseason.com/product/goods/view?goodsId=BO00000321"
  },
  {
    id: "sensation",
    name: "센세이션",
    firmness: "MEDIUM ↔ FIRM",
    height: 300,
    dual: true,
    url: "https://www.sonoseason.com/product/goods/view?goodsId=BO00005660"
  },
  {
    id: "signature",
    name: "시그니처",
    firmness: "MEDIUM ↔ FIRM",
    height: 340,
    dual: true,
    url: "https://www.sonoseason.com/product/goods/view?goodsId=BO00005585"
  }
];

const state = {
  current: 0,
  answers: {}
};

const $ = (id) => document.getElementById(id);

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  const target = $(id);
  if (target) target.classList.add("active");

  window.scrollTo(0, 0);
}

function resetTest() {
  state.current = 0;
  state.answers = {};
}

function renderQuestion() {
  const q = QUESTIONS[state.current];

  $("questionKicker").textContent = q.kicker;
  $("questionIndex").textContent = `Q${state.current + 1}.`;
  $("questionText").textContent = q.text;
  $("questionSub").textContent = q.sub;
  $("countText").textContent = `${state.current + 1} / ${QUESTIONS.length}`;
  $("progressBar").style.width =
    `${((state.current + 1) / QUESTIONS.length) * 100}%`;

  const container = $("answers");
  container.innerHTML = "";

  q.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.innerHTML = `
      <span>${answer.text}</span>
      <span class="arrow">→</span>
    `;

    button.addEventListener("click", () => {
      state.answers[q.id] = answer.id;

      if (state.current < QUESTIONS.length - 1) {
        state.current += 1;
        renderQuestion();
      } else {
        showScreen("loadingScreen");
        setTimeout(showResult, 900);
      }
    });

    container.appendChild(button);
  });
}

function calculateResult() {
  let firmnessScore = 0;

  const a = state.answers;

  // 핵심 진단
  if (a.posture === "back") firmnessScore += 2;
  if (a.posture === "side") firmnessScore -= 2;
  if (a.posture === "move") firmnessScore += 0;

  if (a.body === "light") firmnessScore -= 2;
  if (a.body === "large") firmnessScore += 2;

  if (a.concern === "back" || a.concern === "neck") firmnessScore += 1;
  if (a.concern === "toss") firmnessScore += 0;

  // 취향 보정
  if (a.current === "too_firm") firmnessScore -= 1;
  if (a.current === "too_soft") firmnessScore += 1;

  if (a.feel === "soft") firmnessScore -= 1;
  if (a.feel === "supportive") firmnessScore += 1;

  if (a.priority === "soft") firmnessScore -= 1;
  if (a.priority === "firm") firmnessScore += 1;

  let firmness;
  if (firmnessScore <= -3) firmness = "MEDIUM SOFT";
  else if (firmnessScore >= 3) firmness = "MEDIUM ~ FIRM";
  else firmness = "MEDIUM";

  const scored = PRODUCTS.map((product) => {
    let score = 0;

    if (firmness === "MEDIUM SOFT") {
      if (product.id === "advance_ms") score += 8;
      if (product.firmness === "MEDIUM") score += 3;
    }

    if (firmness === "MEDIUM") {
      if (product.firmness === "MEDIUM") score += 7;
      if (product.id === "sensation") score += 4;
      if (product.id === "advance_ms") score += 2;
    }

    if (firmness === "MEDIUM ~ FIRM") {
      if (product.dual) score += 8;
      if (product.id === "advance_m") score += 2;
    }

    // 높이 보정
    if (a.height === "standard" && product.height === 270) score += 3;
    if (a.height === "high" && product.height >= 300) score += 3;
    if (a.height === "low" && product.height === 270) score += 2;
    if (a.height === "any") score += 1;

    // 직접 비교를 원하는 경우 듀얼 제품 가산
    if (a.priority === "compare" && product.dual) score += 3;

    return { ...product, score };
  }).sort((x, y) => y.score - x.score);

  return {
    firmness,
    products: scored.slice(0, 3),
    score: firmnessScore
  };
}

function profileData() {
  const a = state.answers;

  const lookup = {
    posture: {
      back: "바르게 누워 자는 편",
      side: "옆으로 누워 자는 편",
      move: "자세를 자주 바꾸는 편"
    },
    body: {
      light: "가벼운 / 마른 체형",
      average: "보통 체형",
      large: "크거나 체중이 나가는 체형"
    },
    feel: {
      soft: "부드럽게 감싸는 느낌",
      balanced: "균형 잡힌 느낌",
      supportive: "탄탄한 느낌",
      unknown: "아직 잘 모르겠음"
    },
    concern: {
      back: "허리 불편",
      neck: "목·어깨 결림",
      toss: "뒤척임 / 자주 깸",
      none: "특별한 고민 없음"
    },
    height: {
      low: "낮은 편",
      standard: "적당한 높이",
      high: "높은 편",
      any: "상관없음"
    }
  };

  return [
    ["수면 자세", lookup.posture[a.posture]],
    ["체형", lookup.body[a.body]],
    ["선호 착와감", lookup.feel[a.feel]],
    ["현재 고민", lookup.concern[a.concern]],
    ["선호 높이", lookup.height[a.height]]
  ];
}

function resultCopy(firmness) {
  if (firmness === "MEDIUM SOFT") {
    return {
      desc: "부드러운 체압 분산과 편안한 착와감을 우선 고려해보세요.",
      why: "수면 자세와 체형, 현재 매트리스에서 느끼는 압박감과 선호 착와감을 함께 반영했을 때 부드러운 방향의 경도가 더 잘 맞는 결과예요."
    };
  }

  if (firmness === "MEDIUM ~ FIRM") {
    return {
      desc: "균형감 있는 지지부터 탄탄한 안정감까지 직접 비교해보세요.",
      why: "수면 자세와 체형을 종합했을 때 안정적인 지지감이 중요하게 나타났어요. 매장에서는 Medium과 Firm 느낌을 함께 비교해보는 것을 권장해요."
    };
  }

  return {
    desc: "푹신함과 지지감의 균형을 우선 고려해보세요.",
    why: "수면 자세와 체형, 선호 착와감을 종합했을 때 어느 한쪽으로 치우치기보다 균형 잡힌 Medium 경도가 가장 적합한 결과예요."
  };
}

function showResult() {
  const result = calculateResult();
  const copy = resultCopy(result.firmness);
  const [first, second, third] = result.products;

  $("resultTitle").textContent = result.firmness;
  $("resultDesc").textContent = copy.desc;
  $("whyText").textContent = copy.why;

  $("profileList").innerHTML = profileData()
    .map(([label, value]) => `
      <div class="profile-row">
        <span class="label">${label}</span>
        <span class="value">${value}</span>
      </div>
    `)
    .join("");

  $("recommendTitle").textContent = first.name;
  $("productMeta").innerHTML = `
    <span>${first.firmness}</span>
    <span>${first.height}mm</span>
  `;

  $("recommendReason").textContent =
    `고객님의 수면 조건과 취향을 종합했을 때, 이 매트리스를 먼저 체험해보시길 추천드립니다.`;

  $("alsoProducts").innerHTML = [second, third]
    .filter(Boolean)
    .map((product, index) => `
      <a class="also-product"
         href="${product.url}"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="${product.name} 제품 자세히 보기">
        <span class="num">${String(index + 2).padStart(2, "0")}</span>
        <div>
          <strong>${product.name}</strong>
          <small>${product.firmness} · ${product.height}mm</small>
        </div>
        <span class="arrow">→</span>
      </a>
    `)
    .join("");

  $("productBtn").onclick = () => {
    if (first.url) {
      window.open(first.url, "_blank", "noopener,noreferrer");
    } else {
      showScreen("placeholderScreen");
    }
  };

  showScreen("resultScreen");
}

function startTest() {
  resetTest();
  renderQuestion();
  showScreen("quizScreen");
}

$("startBtn").addEventListener("click", startTest);

$("backBtn").addEventListener("click", () => {
  if (state.current === 0) {
    showScreen("homeScreen");
    return;
  }

  state.current -= 1;
  renderQuestion();
});

$("retryBtn").addEventListener("click", startTest);

$("placeholderBack").addEventListener("click", () => {
  showScreen("resultScreen");
});

$("shareBtn").addEventListener("click", async () => {
  const result = calculateResult();

  const shareData = {
    title: "나에게 맞는 매트리스 찾기",
    text: `SONOSEASON 매트리스 테스트 결과: ${result.firmness}`,
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (e) {}
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    $("shareBtn").textContent = "링크가 복사됐어요";
    setTimeout(() => {
      $("shareBtn").textContent = "결과 공유하기";
    }, 1500);
  } catch (e) {
    alert("페이지 주소를 복사해서 공유해주세요.");
  }
});
