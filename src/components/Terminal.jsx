import { useState, useEffect, useRef } from "react";
import {
  terminalConfig,
  commands,
  whoamiOutput,
  places,
  neofetchOutput,
} from "../data/content";

function TerminalOutput({ content, type = "normal" }) {
  if (!content) return null;
  const lines = content.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className={`terminal-output ${type}`}>
          {line || " "}
        </div>
      ))}
    </>
  );
}

function PlacesList() {
  return (
    <div className="terminal-output" style={{ lineHeight: "1.8" }}>
      {places.map((p) => (
        <div key={p.id}>
          <span style={{ color: p.color }}>●</span>{" "}
          <span style={{ color: "#c9d1d9" }}>{p.name}</span>
          <span style={{ color: "#8b949e" }}>
            {" "}
            — {p.nameEn} ({p.period})
          </span>
        </div>
      ))}
      <div style={{ marginTop: 8 }}>
        <span style={{ color: "#8b949e" }}>
          {"Try 'journey' for the full story."}
        </span>
      </div>
    </div>
  );
}

export default function Terminal({ onActivateJourney, externalCommand }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const executeCommandRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    setHistory([
      {
        type: "banner",
        content: terminalConfig.banner,
      },
    ]);
  }, []);

  // Handle external commands from chips
  useEffect(() => {
    if (externalCommand?.cmd && executeCommandRef.current) {
      executeCommandRef.current(externalCommand.cmd);
    }
  }, [externalCommand]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const addOutput = (content, type = "normal") => {
    setHistory((prev) => [...prev, { type, content }]);
  };

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();

    // Clear the external command trigger after execution
    setHistory((prev) => [
      ...prev,
      {
        type: "command",
        content: `${terminalConfig.promptSymbol} ${cmd}`,
        isInput: true,
      },
    ]);

    if (!trimmed) return;

    switch (trimmed) {
      case "help":
        addOutput(
          Object.entries(commands)
            .map(
              ([name, cmd]) =>
                `  ${name.padEnd(12)} — ${cmd.description}`
            )
            .join("\n"),
          "bright"
        );
        break;

      case "whoami":
        addOutput(whoamiOutput.identity, "bright");
        addOutput("");
        addOutput(whoamiOutput.trajectory, "accent");
        break;

      case "places":
        setHistory((prev) => [
          ...prev,
          { type: "places", content: "places" },
        ]);
        break;

      case "journey":
        addOutput("Launching journey map...", "green");
        if (onActivateJourney) {
          setTimeout(() => onActivateJourney(), 500);
        }
        break;

      case "tennis":
        addOutput(
          `🎾  Tennis\n\n在上海崇明中学期间打了两年网球。\n\n不是竞技水平多高，而是在那个封闭的环境里，网球场是为数不多可以自由呼吸的地方。挥拍、跑动、出汗——一种不需要语言的表达方式。`,
          "bright"
        );
        break;

      case "drink":
        addOutput(
          `🍺  The Philosophy of Drinking\n\n喝酒，但不只是喝酒。\n\n最好的酒是在崇明中学宿舍浴室里喝的——七八个人，小心翼翼，偷偷摸摸，喝到凌晨。那不是酒精，是一种共享的秘密，是那个年纪能拥有的为数不多的反叛。\n\n现在能光明正大地喝、随时随地喝，但那种"偷偷喝酒"的快乐再也找不到了。\n\n不是为了醉。是为了在一起。`,
          "bright"
        );
        break;

      case "music":
        addOutput(
          `🎵  real music — by e-呓语\n\nJoji · Imagine Dragons · Adele · Taylor Swift · Lana Del Rey · Billie Eilish\n\n情绪索引：忧郁 → 力量 → 穿透 → 叙事\n\nhttps://163cn.tv/bbmTYMjF`,
          "blue"
        );
        break;

      case "contact":
        addOutput(
          `📬  Get in Touch\n\n  GitHub:  https://github.com/IlyarMamattursun\n  Email:   elyar@smail.nju.edu.cn`,
          "bright"
        );
        break;

      case "neofetch":
        addOutput(neofetchOutput, "accent");
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        addOutput(
          `command not found: ${trimmed}\nType 'help' for available commands.`,
          "red"
        );
    }
  };

  executeCommandRef.current = executeCommand;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    }
  };

  return (
    <div className="terminal-window w-full max-w-2xl mx-auto" onClick={focusInput}>
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-dot red" />
        <div className="terminal-dot yellow" />
        <div className="terminal-dot green" />
        <div className="terminal-title">
          guest@ilyar — bash — 80×24
        </div>
      </div>

      {/* Terminal Body */}
      <div ref={bodyRef} className="terminal-body">
        {history.map((item, i) => {
          if (item.type === "places") {
            return <PlacesList key={i} />;
          }
          if (item.isInput) {
            return (
              <div
                key={i}
                className="terminal-prompt"
                style={{ color: "#58a6ff" }}
              >
                {item.content}
              </div>
            );
          }
          if (item.type === "banner") {
            return (
              <div key={i} className="ascii-art">
                {item.content}
              </div>
            );
          }
          return (
            <TerminalOutput
              key={i}
              content={item.content}
              type={item.type}
            />
          );
        })}

        {/* Input Line */}
        <div className="terminal-input-line">
          <span className="prompt-text" style={{ color: "#58a6ff" }}>
            guest@ilyar
          </span>
          <span style={{ color: "#8b949e" }}>:</span>
          <span style={{ color: "#3fb950" }}>~</span>
          <span style={{ color: "#8b949e" }}>$ </span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
