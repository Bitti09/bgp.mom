import { useEffect, useRef, useState } from "react";

interface Props {
  lines: string[];
  maxVisibleLines?: number;
}

const MAX_LINES = 4;

export default function ExpandableNotes({ lines, maxVisibleLines = MAX_LINES }: Props) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [heights, setHeights] = useState({ clamped: 0, full: 0 });
  const [animating, setAnimating] = useState(false);
  const prevExpanded = useRef(expanded);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () => {
      // Calculate based on computed line-height, with a fallback to 20px (typical for text-xs leading-relaxed)
      const computedLineHeight = getComputedStyle(el).lineHeight;
      const lineHeight = parseFloat(computedLineHeight) || 20; 
      const clampPx = lineHeight * maxVisibleLines;
      const scrollH = el.scrollHeight;
      
      const needsClamp = scrollH > clampPx;
      setIsClamped(needsClamp);
      setHeights({ clamped: clampPx, full: scrollH });
    };

    measure();

    // Re-measure when container size changes (e.g., window resize wrapping text differently)
    const resizeObserver = new ResizeObserver(() => {
      measure();
    });
    
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [lines, maxVisibleLines]);

  useEffect(() => {
    if (prevExpanded.current !== expanded) {
      setAnimating(true);
      const timeout = setTimeout(() => setAnimating(false), 300);
      prevExpanded.current = expanded;
      return () => clearTimeout(timeout);
    }
  }, [expanded]);

  // isHydrated prevents SSR layout shift warnings and jumping by providing an em-based fallback
  const isHydrated = heights.full > 0;
  
  const currentMaxHeight = !isClamped && isHydrated
    ? undefined
    : expanded
      ? heights.full
      : isHydrated ? heights.clamped : `${maxVisibleLines * 1.5}em`; // leading-relaxed is 1.5

  return (
    <div>
      <div
        style={{
          maxHeight: currentMaxHeight,
          overflow: expanded && !animating ? "visible" : "hidden",
          transition: "max-height 300ms ease-in-out, opacity 300ms ease-in-out",
          opacity: expanded || (!isClamped && isHydrated) ? 1 : 0.85,
        }}
      >
        <div
          ref={innerRef}
          className="text-xs text-base-content/80 leading-relaxed"
        >
          {lines.map((line, i) => (
            <div key={i} data-key={`note-${i}-${line}`}>
              {line}
            </div>
          ))}
        </div>
      </div>

      {isClamped && (
        <div className="flex justify-center mt-2">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="btn btn-ghost btn-xs font-medium text-xs"
            aria-expanded={expanded}
            aria-label={expanded ? "Show less notes" : "Show more notes"}
          >
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 300ms ease-in-out",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {expanded ? "Show less" : "Show more"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
