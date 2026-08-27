/*
 * SONOSEASON Mattress Test V2
 * 매장 교육용 "메모리폼 매트리스 맞춤 수면 체크리스트 & 선택 가이드" 기반
 *
 * 핵심 판단 기준
 * 1) 수면 습관
 * 2) 체형/체중
 * 3) 특수 고민
 *
 * 기존 1차 프로토타입의 취향형 점수 로직을 제거하고,
 * 매장 교육 가이드의 추천 경도와 매칭 모델을 중심으로 구성했습니다.
 */

const QUESTIONS = [
  {
    id: "posture",
    kicker: "SLEEP HABIT",
    text: "주로 어떤 자세로 자나요?",
    sub: "가장 자주 취하는 수면 자세를 골라주세요.",
    answers: [
      {
        id: "back",
        text: "바르게 누워 자는 편이에요",
        tags: ["바른 자세", "허리 지지"],
        guidance: "척추의 S자 곡선 유지와 요추 지지가 중요한 타입이에요.",
        firmness: "Firm ~ Medium Firm"
      },
      {
        id: "side",
        text: "옆으로 누워 자는 편이에요",
        tags: ["옆으로 수면", "체압 분산"],
        guidance: "어깨와 골반에 집중되는 체압을 부드럽게 분산해주는 것이 중요한 타입이에요.",
        firmness: "Medium ~ Medium Soft"
      },
      {
        id: "toss",
        text: "뒤척임이 많고 자주 깨는 편이에요",
        tags: ["뒤척임", "움직임 흡수"],
        guidance: "흔들림을 줄이고 움직임에 맞춰 체형을 받쳐주는 것이 중요한 타입이에요.",
        firmness: "Medium"
      }
    ]
  },
  {
    id: "body",
    kicker: "BODY TYPE",
    text: "내 체형은 어떤 편인가요?",
    sub: "현재 체형에 가장 가까운 답을 골라주세요.",
    answers: [
      {
        id: "light",
        text: "체중이 가볍거나 마른 편이에요",
        tags: ["가벼운 체형", "부드러운 지지"],
        guidance: "너무 단단한 매트리스보다 부드러운 체압 분산이 필요한 타입이에요.",
        firmness: "Soft ~ Medium Soft"
      },
      {
        id: "large",
        text: "체형이 크거나 체중이 나가는 편이에요",
        tags: ["큰 체형", "탄탄한 지지"],
        guidance: "과도하게 꺼지지 않도록 탄탄하게 받쳐주는 것이 중요한 타입이에요.",
        firmness: "Firm"
      },
      {
        id: "average",
        text: "보통 체형이에요",
        tags: ["보통 체형", "균형"],
        guidance: "수면 자세와 특수 고민을 중심으로 경도를 판단해볼게요.",
        firmness: "자세에 따라 결정"
      }
    ]
  },
  {
    id: "concern",
    kicker: "SLEEP CONCERN",
    text: "수면 중 특별히 신경 쓰이는 부분이 있나요?",
    sub: "가장 가까운 고민을 골라주세요.",
    answers: [
      {
        id: "back_neck",
        text: "허리가 불편하거나 목·어깨가 자주 결려요",
        tags: ["허리", "목·어깨"],
        guidance: "척추를 안정적으로 지지하면서 전신 체압을 균일하게 분산하는 것이 중요한 타입이에요.",
        firmness: "Medium Firm"
      },
      {
        id: "none",
        text: "특별한 고민은 없어요",
        tags: ["일반 수면", "균형"],
        guidance: "수면 자세와 체형을 중심으로 추천해드릴게요.",
        firmness: "자세에 따라 결정"
      }
    ]
  }
];

/*
 * 사용자가 앞서 제공한 현재 제품 라인업 기준
 * 시그니처 듀얼 340mm / Medium·Firm
 * 센세이션 듀얼 300mm / Medium·Firm
 * 어드밴스 소프트 300mm / Soft
 * 어드밴스 미디엄 300mm / Medium
 * 어드밴스 펌 300mm / Firm
 * 컴포터블 270mm / Medium
 * 스탠다드 미디엄 270mm / Medium
 * 스탠다드 펌 270mm / Firm
 * 베이직 190mm / Medium
 *
 * 실제 판매 URL은 각 product.url에 입력하면 됩니다.
 */

const PRODUCTS = {
  signatureMedium: {
    name: "시그니처 듀얼",
    meta: ["340mm", "MEDIUM / FIRM"],
    reason: "가벼운 체형에서 Soft ~ Medium Soft를 고려할 때, 매장 가이드에 매칭된 시그니처 Medium 모드를 우선 체험해볼 수 있어요.",
    url: ""
  },
  sensationFirm: {
    name: "센세이션 듀얼",
    meta: ["300mm", "MEDIUM / FIRM"],
    reason: "탄탄한 지지가 필요한 경우 Firm 모드로 체험해볼 수 있는 매장 가이드 매칭 모델이에요.",
    url: ""
  },
  sensationMedium: {
    name: "센세이션 듀얼",
    meta: ["300mm", "MEDIUM / FIRM"],
    reason: "옆으로 자는 타입에서 Medium ~ Medium Soft를 고려할 때 Medium 모드로 체험해볼 수 있어요.",
    url: ""
  },
  sensationDual: {
    name: "센세이션 듀얼",
    meta: ["300mm", "MEDIUM / FIRM"],
    reason: "뒤척임이 많은 타입의 매장 가이드 매칭 모델로, 양면 듀얼 토퍼 구성을 직접 비교해볼 수 있어요.",
    url: ""
  },
  advanceMedium: {
    name: "어드밴스 미디엄",
    meta: ["300mm", "MEDIUM"],
    reason: "Medium 경도가 필요한 타입에서 체형과 수면 자세를 함께 확인할 수 있는 매장 가이드 매칭 모델이에요.",
    url: ""
  },
  advanceFirm: {
    name: "어드밴스 펌",
    meta: ["300mm", "FIRM"],
    reason: "탄탄한 지지가 필요한 타입에서 Firm 경도를 직접 확인해볼 수 있어요.",
    url: ""
  }
};

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

function resetState() {
  state.current = 0;
  state.answers = {};
}

function renderQuestion() {
  const q = QUESTIONS[state.current];

  $("questionKicker").textContent =
    `QUESTION ${String(state.current + 1).padStart(2, "0")} · ${q.kicker}`;

  $("questionText").textContent = q.text;
  $("questionSub").textContent = q.sub;

  $("countText").textContent =
    `${state.current + 1} / ${QUESTIONS.length}`;

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
      state.answers[q.id] = answer;
      goNext();
    });

    container.appendChild(button);
  });
}

function goNext() {
  if (state.current < QUESTIONS.length - 1) {
    state.current += 1;
    renderQuestion();
    return;
  }

  showScreen("loadingScreen");
  setTimeout(showResult, 700);
}

function goBack() {
  if (state.current === 0) {
    showScreen("homeScreen");
    return;
  }

  state.current -= 1;
  renderQuestion();
}

/*
 * 매장 교육 가이드 기반 추천 로직
 *
 * 가이드에 명시된 기준:
 * - 수면 자세 A(바르게): Firm ~ Medium Firm
 * - 수면 자세 B(옆으로): Medium ~ Medium Soft
 * - 수면 자세 C(뒤척임): Medium
 * - 체형/체중 A(가벼움/마른): Soft ~ Medium Soft
 * - 체형/체중 B(큼/체중이 나감): Firm
 * - 특수 고민(허리 불편/목·어깨 결림): Medium Firm
 *
 * 조건이 충돌하면 아래 우선순위로 보정:
 * 1. 특수 고민
 * 2. 체형/체중
 * 3. 수면 자세
 *
 * 본 테스트는 매장 상담을 돕는 참고용 추천이며 의료적 진단이 아닙니다.
 */
function calculateRecommendation() {
  const posture = state.answers.posture?.id;
  const body = state.answers.body?.id;
  const concern = state.answers.concern?.id;

  // 1) 특수 고민 → Medium Firm
  if (concern === "back_neck") {
    if (body === "large" || posture === "back") {
      return {
        key: "sensationFirm",
        firmness: "Medium Firm",
        reason: "허리·목/어깨 고민을 고려해 Medium Firm을 우선 추천해요. 바르게 눕거나 체형이 큰 경우에는 탄탄한 지지가 필요한 만큼 Firm 모드부터 함께 체험해보세요."
      };
    }

    return {
      key: "advanceMedium",
      firmness: "Medium Firm",
      reason: "허리·목/어깨 고민을 고려해 Medium Firm을 우선 추천해요. 실제 매장에서는 어드밴스 미디엄을 함께 비교해보세요."
    };
  }

  // 2) 체형이 크거나 체중이 나가는 경우 → Firm
  if (body === "large") {
    return {
      key: "sensationFirm",
      firmness: "Firm",
      reason: "체형이 크거나 체중이 나가는 경우 과도한 꺼짐을 방지하고 탄탄하게 받쳐주는 Firm 경도를 우선 고려해요."
    };
  }

  // 3) 체중이 가볍거나 마른 경우 → Soft ~ Medium Soft
  if (body === "light") {
    return {
      key: "signatureMedium",
      firmness: "Soft ~ Medium Soft",
      reason: "체중이 가볍거나 마른 체형은 너무 단단한 매트리스에서 압박감을 느낄 수 있어 Soft ~ Medium Soft를 우선 고려해요. 가이드에는 시그니처 Medium 모드가 매칭되어 있어요."
    };
  }

  // 4) 바르게 눕는 타입 → Firm ~ Medium Firm
  if (posture === "back") {
    return {
      key: "sensationFirm",
      firmness: "Firm ~ Medium Firm",
      reason: "바르게 누워 자는 타입은 척추의 S자 곡선을 유지하고 요추를 안정적으로 지지하는 것이 중요해 Firm ~ Medium Firm을 우선 고려해요."
    };
  }

  // 5) 옆으로 자는 타입 → Medium ~ Medium Soft
  if (posture === "side") {
    return {
      key: "sensationMedium",
      firmness: "Medium ~ Medium Soft",
      reason: "옆으로 자면 어깨와 골반에 체압이 집중될 수 있어 Medium ~ Medium Soft를 우선 고려해요."
    };
  }

  // 6) 뒤척임이 많은 타입 → Medium
  if (posture === "toss") {
    return {
      key: "sensationDual",
      firmness: "Medium",
      reason: "뒤척임이 많은 타입은 흔들림을 줄이고 움직임에 맞춰 체형을 받쳐주는 것이 중요해 Medium을 우선 고려해요."
    };
  }

  // 7) 기본값 → Medium
  return {
    key: "advanceMedium",
    firmness: "Medium",
    reason: "수면 자세와 체형에 따른 추가 조건이 적어 균형 잡힌 Medium 경도를 우선 추천해요."
  };
}

function buildTraits() {
  const traits = [];

  [state.answers.posture, state.answers.body, state.answers.concern]
    .forEach((answer) => {
      if (!answer) return;

      answer.tags.forEach((tag) => {
        if (!traits.includes(tag)) traits.push(tag);
      });
    });

  return traits.slice(0, 5);
}

function showResult() {
  const recommendation = calculateRecommendation();
  const product = PRODUCTS[recommendation.key];

  // 기존 HTML 구조를 그대로 사용합니다.
  const resultLabel = document.querySelector(".result-label");
  if (resultLabel) {
    resultLabel.textContent = "당신의 수면 정보를 기준으로 보면";
  }

  $("resultTitle").textContent = recommendation.firmness;
  $("resultDesc").textContent = recommendation.reason;

  $("traits").innerHTML = buildTraits()
    .map((tag) => `<span class="trait">#${tag}</span>`)
    .join("");

  $("recommendTitle").textContent = product.name;
  $("recommendReason").textContent = product.reason;

  $("productMeta").innerHTML = product.meta
    .map((item) => `<span>${item}</span>`)
    .join("");

  $("productBtn").onclick = () => {
    if (product.url) {
      window.open(product.url, "_blank", "noopener,noreferrer");
    } else {
      showScreen("placeholderScreen");
    }
  };

  showScreen("resultScreen");
}

function startTest() {
  resetState();
  renderQuestion();
  showScreen("quizScreen");
}

async function shareResult() {
  const recommendation = calculateRecommendation();

  const shareData = {
    title: "나에게 맞는 매트리스 찾기",
    text: `SONOSEASON 매트리스 테스트 결과: ${recommendation.firmness} 추천`,
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      // 사용자가 공유창을 닫은 경우
    }
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    $("shareBtn").textContent = "링크가 복사됐어요";

    setTimeout(() => {
      $("shareBtn").textContent = "결과 공유하기";
    }, 1600);
  } catch (error) {
    alert("이 페이지의 주소를 복사해서 공유해주세요.");
  }
}

$("startBtn").addEventListener("click", startTest);
$("backBtn").addEventListener("click", goBack);
$("retryBtn").addEventListener("click", startTest);
$("shareBtn").addEventListener("click", shareResult);
$("placeholderBack").addEventListener("click", () => {
  showScreen("resultScreen");
});
