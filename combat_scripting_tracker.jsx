import { useState } from "react";

const CATEGORIES = {
  weapon: {
    emoji: "⚔️",
    label: "Cutlass Tool",
    color: "#FF6B35",
    items: [
      { id: "w1", text: "Create Tool object in StarterPack", hint: "Handle + configuration values (damage, cooldown, range)" },
      { id: "w2", text: "Swing animation on click", hint: "Use Animation instance on Humanoid, play on Activated" },
      { id: "w3", text: "Raycast / hitbox on swing", hint: "Fire raycast from character forward on click, use cooldown to prevent spam" },
      { id: "w4", text: "Deal damage on hit", hint: "Check if ray hit a Humanoid, call TakeDamage or reduce Health" },
      { id: "w5", text: "Swing cooldown", hint: "Simple debounce — block input for X seconds after each swing" },
    ],
  },
  health: {
    emoji: "❤️",
    label: "Health & Damage",
    color: "#F15BB5",
    items: [
      { id: "h1", text: "Player health setup", hint: "Default Humanoid health or custom value, reset on respawn" },
      { id: "h2", text: "Enemy health setup", hint: "Each NPC spawns with X health, dies at 0" },
      { id: "h3", text: "Damage numbers / hit feedback", hint: "Optional but feels great — BillboardGui showing damage on hit" },
      { id: "h4", text: "Player death & respawn", hint: "On death, respawn back on your ship after short delay" },
      { id: "h5", text: "Enemy death cleanup", hint: "Destroy NPC model on death, maybe ragdoll or fade out" },
    ],
  },
  enemy: {
    emoji: "💀",
    label: "Enemy AI",
    color: "#9B5DE5",
    items: [
      { id: "e1", text: "NPC model with Humanoid", hint: "Pirate NPC in ServerStorage, clone to spawn" },
      { id: "e2", text: "Walk toward player", hint: "PathfindingService or simple MoveTo toward nearest player" },
      { id: "e3", text: "Attack when in range", hint: "Check distance to player, if close enough play attack anim + deal damage" },
      { id: "e4", text: "Attack cooldown on NPC", hint: "Same debounce idea as player — don't let them spam attack" },
      { id: "e5", text: "Target switching", hint: "If multiple players, pick nearest one. Re-check every few seconds" },
    ],
  },
  waves: {
    emoji: "🌊",
    label: "Wave System",
    color: "#00BBF9",
    items: [
      { id: "v1", text: "Wave counter / state manager", hint: "IntValue or variable tracking current wave number" },
      { id: "v2", text: "Spawn X enemies per wave", hint: "Loop: clone NPC, parent to workspace, position at spawn points on enemy ship" },
      { id: "v3", text: "Detect all enemies dead", hint: "Track alive enemies in a table, when empty → next wave" },
      { id: "v4", text: "Increase difficulty per wave", hint: "More enemies, maybe faster or more HP. Keep it simple — just add +1 or +2 per wave" },
      { id: "v5", text: "Wave transition UI", hint: "Quick text label: 'Wave 3 incoming!' with short delay before next spawn" },
    ],
  },
  boss: {
    emoji: "🏴‍☠️",
    label: "Blackbeard Boss",
    color: "#00F5D4",
    items: [
      { id: "b1", text: "Boss NPC with big HP pool", hint: "Same system as normal enemies but way more health" },
      { id: "b2", text: "Boss spawns after final wave", hint: "After wave X, spawn Blackbeard instead of normal enemies" },
      { id: "b3", text: "Boss health bar UI", hint: "ScreenGui with a frame that shrinks as boss takes damage" },
      { id: "b4", text: "Boss attack pattern", hint: "Heavier damage, maybe a charge attack. Keep it simple — 1 or 2 moves max" },
      { id: "b5", text: "Win condition on boss death", hint: "Blackbeard dies → victory screen, maybe teleport to next era" },
    ],
  },
};

const TIPS = [
  "server scripts for damage, local scripts for input & UI",
  "use RemoteEvents to tell server when player swings",
  "validate hits on the server — never trust the client",
  "test with 2 enemies before spawning 10",
  "print() is your best friend for debugging",
];

const ENCOURAGEMENTS = [
  "arrr that's progress 🏴‍☠️",
  "Blackbeard is shaking rn",
  "ship it (literally) 🚢",
  "coding menace fr",
  "one step closer to $1500",
  "Maynard would be proud",
  "that's a W",
  "absolutely cooking",
];

export default function App() {
  const [active, setActive] = useState("weapon");
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState({});
  const [lastChecked, setLastChecked] = useState(null);
  const [encouragement, setEncouragement] = useState("");

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    if (!checked[id]) {
      setLastChecked(id);
      setEncouragement(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
      setTimeout(() => setLastChecked(null), 1200);
    }
  };

  const toggleHint = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalItems = Object.values(CATEGORIES).flatMap((c) => c.items).length;
  const doneItems = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneItems / totalItems) * 100);
  const catData = CATEGORIES[active];
  const catDone = catData.items.filter((i) => checked[i.id]).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D0D0D",
      fontFamily: "'Courier New', monospace",
      color: "#F0E6D3",
      padding: "20px",
      boxSizing: "border-box",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: "#666", marginBottom: 4 }}>
          Battle of Ocracoke Inlet
        </div>
        <h1 style={{
          fontSize: 26,
          margin: 0,
          background: "linear-gradient(90deg, #FF6B35, #F15BB5, #9B5DE5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 900,
          letterSpacing: -1,
        }}>
          COMBAT SCRIPTING
        </h1>
        <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
          everything you need to code (no building, no visuals)
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        background: "#1A1A1A",
        borderRadius: 20,
        height: 32,
        margin: "16px auto",
        maxWidth: 500,
        position: "relative",
        overflow: "hidden",
        border: "1px solid #2A2A2A",
      }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: pct === 100
            ? "linear-gradient(90deg, #00F5D4, #00BBF9)"
            : "linear-gradient(90deg, #FF6B35, #F15BB5)",
          borderRadius: 20,
          transition: "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#F0E6D3",
          textShadow: "0 1px 3px rgba(0,0,0,0.8)",
        }}>
          {pct === 100 ? "🏴‍☠️ COMBAT SYSTEM DONE — GO BUILD THE SHIP" : `${doneItems}/${totalItems} scripts (${pct}%)`}
        </div>
      </div>

      {/* Encouragement */}
      <div style={{
        textAlign: "center", height: 24, fontSize: 14,
        color: catData.color,
        opacity: lastChecked ? 1 : 0,
        transform: lastChecked ? "translateY(0)" : "translateY(8px)",
        transition: "all 0.3s ease", fontWeight: 700,
      }}>
        {encouragement}
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 6, flexWrap: "wrap",
        justifyContent: "center", margin: "12px auto", maxWidth: 600,
      }}>
        {Object.entries(CATEGORIES).map(([key, cat]) => {
          const isActive = active === key;
          const done = cat.items.filter((i) => checked[i.id]).length;
          const allDone = done === cat.items.length;
          return (
            <button key={key} onClick={() => setActive(key)} style={{
              padding: "8px 14px", borderRadius: 12,
              border: isActive ? `2px solid ${cat.color}` : "2px solid #2A2A2A",
              background: isActive ? `${cat.color}18` : "#141414",
              color: isActive ? cat.color : "#666",
              fontFamily: "'Courier New', monospace",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s ease",
            }}>
              {cat.emoji} {cat.label}{allDone && " ✅"}
              {!allDone && <span style={{ marginLeft: 6, fontSize: 10, opacity: 0.6 }}>{done}/{cat.items.length}</span>}
            </button>
          );
        })}
      </div>

      {/* Category status */}
      <div style={{
        textAlign: "center", margin: "16px 0 8px",
        fontSize: 11, letterSpacing: 4, textTransform: "uppercase",
        color: catData.color, opacity: 0.7,
      }}>
        {catDone === catData.items.length ? `${catData.label} — done! 🎉` : `${catData.items.length - catDone} remaining`}
      </div>

      {/* Items */}
      <div style={{ maxWidth: 500, margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
        {catData.items.map((item) => {
          const isDone = checked[item.id];
          const justChecked = lastChecked === item.id;
          const showHint = expanded[item.id];
          return (
            <div key={item.id} style={{
              borderRadius: 14,
              border: justChecked ? `2px solid ${catData.color}` : isDone ? "2px solid #1A3A1A" : "2px solid #1E1E1E",
              background: justChecked ? `${catData.color}12` : isDone ? "#0F1A0F" : "#141414",
              transition: "all 0.25s ease",
              transform: justChecked ? "scale(1.02)" : "scale(1)",
              overflow: "hidden",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px", cursor: "pointer",
              }} onClick={() => toggle(item.id)}>
                <div style={{
                  width: 26, height: 26, borderRadius: 8,
                  border: isDone ? "2px solid #2D5A2D" : `2px solid ${catData.color}55`,
                  background: isDone ? "#2D5A2D" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, flexShrink: 0, transition: "all 0.2s ease",
                }}>
                  {isDone ? "✓" : ""}
                </div>
                <span style={{
                  fontFamily: "'Courier New', monospace", fontSize: 14,
                  color: isDone ? "#4A6A4A" : "#F0E6D3",
                  textDecoration: isDone ? "line-through" : "none",
                  flex: 1,
                }}>
                  {item.text}
                </span>
                <button onClick={(e) => { e.stopPropagation(); toggleHint(item.id); }} style={{
                  background: showHint ? `${catData.color}30` : "#1E1E1E",
                  border: `1px solid ${showHint ? catData.color : "#333"}`,
                  color: showHint ? catData.color : "#666",
                  borderRadius: 8, padding: "4px 10px",
                  fontFamily: "'Courier New', monospace",
                  fontSize: 11, cursor: "pointer", fontWeight: 700,
                  transition: "all 0.2s ease", flexShrink: 0,
                }}>
                  {showHint ? "hide" : "hint"}
                </button>
              </div>
              {showHint && (
                <div style={{
                  padding: "0 16px 14px 54px",
                  fontSize: 12, color: catData.color, opacity: 0.8,
                  lineHeight: 1.5, fontStyle: "italic",
                }}>
                  💡 {item.hint}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Scripting order tip */}
      <div style={{
        maxWidth: 500, margin: "24px auto 0", padding: "14px 16px",
        background: "#141414", borderRadius: 14, border: "1px solid #2A2A2A",
      }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#666", marginBottom: 8 }}>
          📌 build order
        </div>
        <div style={{ fontSize: 13, color: "#F0E6D3", lineHeight: 1.7 }}>
          <span style={{ color: "#FF6B35" }}>1.</span> Cutlass tool + swing →{" "}
          <span style={{ color: "#F15BB5" }}>2.</span> Health + damage →{" "}
          <span style={{ color: "#9B5DE5" }}>3.</span> Enemy AI →{" "}
          <span style={{ color: "#00BBF9" }}>4.</span> Wave spawner →{" "}
          <span style={{ color: "#00F5D4" }}>5.</span> Blackbeard boss
        </div>
      </div>

      {/* Tips */}
      <div style={{
        maxWidth: 500, margin: "12px auto 0", padding: "14px 16px",
        background: "#141414", borderRadius: 14, border: "1px solid #2A2A2A",
      }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#666", marginBottom: 8 }}>
          🧠 remember
        </div>
        {TIPS.map((tip, i) => (
          <div key={i} style={{ fontSize: 12, color: "#888", lineHeight: 1.8 }}>
            → {tip}
          </div>
        ))}
      </div>
    </div>
  );
}
