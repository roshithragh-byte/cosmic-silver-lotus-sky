import { useEffect, useRef, useState } from "react";
import { sfxPlay } from "@/lib/game/audio";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SketchRound({
  onSettle,
}: {
  seconds: number;
  onSettle: (score: number, leak: number, headline: string) => void;
}) {
  const sketch = useGame((s) => s.runtime.sketch);
  const setRuntime = useGame((s) => s.setRuntime);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const strokes = useRef(0);
  const [inked, setInked] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = r.width * dpr;
      c.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#f4f4f0";
      ctx.lineWidth = 3.2;
    };
    resize();
  }, []);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const down = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (sketch?.phase !== "draw") return;
    drawing.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const ctx = e.currentTarget.getContext("2d");
    if (!ctx) return;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };
  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = e.currentTarget.getContext("2d");
    if (!ctx) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    strokes.current += 1;
    setInked(true);
  };
  const up = () => {
    drawing.current = false;
  };

  if (!sketch) return null;

  const toGuess = () => {
    sfxPlay.whoosh();
    setRuntime({
      sketch: { ...sketch, phase: "guess", strokeCount: strokes.current },
    });
  };

  const pick = (g: string) => {
    if (sketch.pickedGuess) return;
    sfxPlay.tap();
    const correct = g === sketch.correctGuess;
    const leak = sketch.isFakeArtist ? (correct ? 0.22 : 0.04) : 0;
    const score = correct ? (inked ? 82 : 40) : 18;
    setRuntime({ sketch: { ...sketch, phase: "done", pickedGuess: g } });
    window.setTimeout(
      () =>
        onSettle(
          score,
          leak,
          correct ? "The room read the drawing." : "The drawing lied, or the reader did.",
        ),
      500,
    );
  };

  return (
    <div className="space-y-3">
      {sketch.phase === "draw" ? (
        <>
          <p className="text-center font-display text-2xl">{sketch.prompt}</p>
          {sketch.isFakeArtist ? (
            <p className="text-center text-xs text-echo">This is the fake title. Draw like you belong.</p>
          ) : (
            <p className="text-center text-xs text-muted">One picture. Don't over-explain.</p>
          )}
          <canvas
            ref={canvasRef}
            className="h-56 w-full touch-none rounded-[20px] bg-subtle shadow-[var(--shadow-border)]"
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
          />
          <Button className="w-full" variant="secondary" onClick={toGuess}>
            That's the picture
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm text-muted">What did the table actually try to draw?</p>
          <div className="grid gap-2">
            {sketch.guessOptions.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => pick(g)}
                className={cn(
                  "rounded-[14px] bg-elevated px-4 py-3 text-left text-sm shadow-[var(--shadow-border)]",
                  sketch.pickedGuess === g && "ring-1 ring-accent",
                  sketch.phase === "done" && g === sketch.correctGuess && "bg-ok/20",
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
