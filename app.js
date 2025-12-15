document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("analyzeBtn");
  const input = document.getElementById("inputText");
  const output = document.getElementById("result");

  if (!btn || !input || !output) {
    console.error("要素が見つかりません");
    return;
  }

  btn.addEventListener("click", () => {
    const text = input.value.trim();

    if (!text) {
      output.innerText = "内容が入力されていません。";
      return;
    }

    const analysis = analyzeText(text);
    output.innerText = analysis;
  });
});

function analyzeText(text) {
  let traits = [];
  let supports = [];

  if (text.includes("イライラ") || text.includes("怒")) {
    traits.push("感情の疲労・蓄積ストレス");
    supports.push("今は正論より共感を優先");
    supports.push("要求や指示は一旦減らす");
  }

  if (text.includes("期待") || text.includes("思った通り")) {
    traits.push("期待と現実のズレに敏感");
    supports.push("『期待してたんだね』と気持ちを言語化して返す");
  }

  if (traits.length === 0) {
    traits.push("明確な特性は検出されませんでした");
    supports.push("状況をそのまま受け止めて聞く姿勢が有効");
  }

  return `
【推定される心理状態・特性】
・${traits.join("\n・")}

【支援・関わり方のヒント】
・${supports.join("\n・")}
`;
}
