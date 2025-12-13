function analyzeInput() {
  const text = document.getElementById("inputText").value;
  const mode = document.getElementById("mode").value;
  const result = document.getElementById("result");

  const traits = detectTraits(text);
  const notes = generateNotes(traits);
  const advice = generateAdvice(traits, mode);

  result.innerHTML = `
    <h3>考えられる特性（仮説）</h3>
    <ul>${traits.map(t => `<li>${t}</li>`).join("")}</ul>

    <h3>注意点</h3>
    <ul>${notes.map(n => `<li>${n}</li>`).join("")}</ul>

    <h3>関わり方のヒント</h3>
    <p>${advice}</p>
  `;
}

/* =========================
   ① 特性推定（診断ではない）
========================= */
function detectTraits(text) {
  let traits = [];

  // 感情系
  if (/不安|心配|怖|緊張/.test(text))
    traits.push("不安が高まりやすい特性");
  if (/怒|イライラ|刺激|音|光/.test(text))
    traits.push("感覚過敏・刺激耐性の低さ");
  if (/疲れ|無理|しんどい|動けない/.test(text))
    traits.push("疲労蓄積・抑うつ傾向");

  // 行動特性
  if (/集中しすぎ|止まらない|没頭/.test(text))
    traits.push("過集中しやすい特性");
  if (/予定|変更|切り替え/.test(text))
    traits.push("切り替えが苦手な特性");
  if (/忘れ|抜け|遅れ/.test(text))
    traits.push("注意の抜けやすさ");

  // 認知・対人
  if (/責められ|怒られ|否定/.test(text))
    traits.push("評価への不安が強い");
  if (/どうせ|意味ない|無理/.test(text))
    traits.push("無力感が強まりやすい");

  if (traits.length === 0)
    traits.push("大きな不安定さは見られません");

  return traits;
}

/* =========================
   ② 注意点（NG対応）
========================= */
function generateNotes(traits) {
  let notes = [];

  traits.forEach(t => {
    if (t.includes("不安"))
      notes.push("急かす・正解を求めすぎると不安が強まります");
    if (t.includes("感覚"))
      notes.push("音・光・人の多さなど環境刺激に注意");
    if (t.includes("過集中"))
      notes.push("突然止めさせると混乱や怒りにつながりやすい");
    if (t.includes("切り替え"))
      notes.push("事前予告なしの変更は避ける");
    if (t.includes("評価"))
      notes.push("指摘や正論が自己否定につながりやすい");
    if (t.includes("無力感"))
      notes.push("努力不足と捉えないことが重要");
  });

  return [...new Set(notes)];
}

/* =========================
   ③ アドラー心理学ベース支援
========================= */
function generateAdvice(traits, mode) {
  if (mode === "user") {
    return `
あなたの反応は「弱さ」ではなく、これまでの経験の中で身につけた
“自分を守るための方法”です。

今日は「全部できる」ではなく、
できたことを1つだけ確認してみてください。
それが前進です。
`;
  }

  if (mode === "family") {
    return `
行動を変えさせようとするより、
「困っているんだね」と理解を示すことが回復につながります。

課題は本人のもの。
代わりに解決せず、選択肢を並べて任せてください。
`;
  }

  if (mode === "supporter") {
    return `
行動の背景にある目的（安心・回避・承認）を仮定してください。

① 環境調整  
② 予告  
③ 選択肢提示  

この順で関わると安定しやすくなります。
`;
  }
}
