/**
 * ProductShowcaseSection
 *
 * A Cursor-inspired product tour. Each "stop" pairs a concise marketing
 * pitch on one side with a framed screenshot of the real product on the
 * other. The visual weight alternates left/right every row so the section
 * reads as a scroll narrative rather than a repeating grid.
 *
 * Design notes:
 *  - Screenshot frames include a faint macOS-style title bar so the images
 *    read as application surfaces at a glance (matches how Cursor presents
 *    its IDE screenshots on cursor.com).
 *  - Every image sits inside a soft emerald radial glow — keeps the visual
 *    language consistent with the hero's DataVisualization orb and the
 *    emerald washes on Features/HowItWorks.
 *  - We lean on next/image with explicit width/height for optimized
 *    delivery + correct aspect ratio preservation. Images are marked
 *    `priority={false}` since the section lives below the fold.
 */

import Image from 'next/image';
import type { ReactNode } from 'react';
import { SectionHeader } from './SectionHeader';

// ---------------------------------------------------------------------------
// ScreenshotFrame — shared window-chrome wrapper
// ---------------------------------------------------------------------------

interface ScreenshotFrameProps {
  children: ReactNode;
  /** Adds a soft right-edge fade so wide screenshots feel like they extend
   *  past the column boundary, mimicking Cursor's bleed-to-edge treatment. */
  bleedRight?: boolean;
  /** Flips the fade to the left edge for rows where the screenshot sits on
   *  the left side of the content grid. */
  bleedLeft?: boolean;
  className?: string;
}

/**
 * Wraps any screenshot in a glassy, rounded container with a subtle title
 * bar. The emerald ambient glow is painted behind the frame via an absolute
 * layer so it never affects layout but still tints the card edges.
 */
function ScreenshotFrame({
  children,
  bleedRight = false,
  bleedLeft = false,
  className = '',
}: ScreenshotFrameProps) {
  // Edge-fade mask — only applied on md+ to avoid chopping content on mobile
  // where the screenshot is always centered in its own column.
  const maskClass = bleedRight
    ? 'md:[mask-image:linear-gradient(to_right,black_0%,black_88%,transparent_100%)]'
    : bleedLeft
      ? 'md:[mask-image:linear-gradient(to_left,black_0%,black_88%,transparent_100%)]'
      : '';

  return (
    <div className={`relative ${className}`}>
      {/* Ambient emerald glow — sits behind the frame. Radius is generous so
          the tint feathers past the corners and into the section background. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 sm:-inset-10 rounded-[2rem] blur-2xl opacity-70"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(16,185,129,0.22), transparent 70%)',
        }}
      />

      {/* Frame — rounded border + glassy background keeps the screenshot
          legible while matching the section's bento card treatment. */}
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] shadow-2xl shadow-black/60 ring-1 ring-inset ring-white/5 ${maskClass}`}
      >
        {/* Faux window title bar — 3 traffic lights + a subtle bottom border.
            Keeps things recognizable as "an app surface" without mimicking
            any specific OS too literally. */}
        <div className="flex items-center gap-1.5 border-b border-white/5 bg-black/40 px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>

        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ShowcaseRow — alternating text/image row primitive
// ---------------------------------------------------------------------------

interface ShowcaseRowProps {
  /** Tiny uppercase label — scannable tag above the headline. */
  eyebrow: string;
  title: string;
  description: string;
  /** Bullet list of concrete capabilities shown in the screenshot. */
  highlights: readonly string[];
  /** Pre-built screenshot node (already wrapped in <ScreenshotFrame>). */
  screenshot: ReactNode;
  /** When true, the screenshot renders on the left on md+. */
  reverse?: boolean;
}

/**
 * A single tour row. On mobile everything stacks (text first, then image).
 * On md+ the image + copy sit side-by-side and swap sides per `reverse`.
 */
function ShowcaseRow({
  eyebrow,
  title,
  description,
  highlights,
  screenshot,
  reverse = false,
}: ShowcaseRowProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-14 lg:gap-20 ${
        reverse ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      {/* Text column */}
      <div>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
          {eyebrow}
        </p>
        <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[1.1]">
          {title}
        </h3>
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/65 max-w-xl">
          {description}
        </p>

        {/* Capability list — mirrors the Features section's bullet style so
            the section feels cohesive with the rest of the page. */}
        <ul className="mt-7 space-y-2.5">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-white/70">
              <span
                aria-hidden="true"
                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Screenshot column */}
      <div className="relative">{screenshot}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screenshot compositions
// ---------------------------------------------------------------------------

/**
 * Full-bleed workspace screenshot. We let the image render at its native
 * aspect ratio (roughly 16:9) and fill the frame below the title bar.
 */
// Retina source dimensions (captured at 2x on macOS). next/image uses these
// intrinsic values to (a) reserve correct aspect-ratio space pre-load and
// (b) pick the right downscaled variant for the device. Quality is bumped
// above the default 75 because product shots reward the extra bytes — text
// and UI chrome stay crisp even on high-DPI displays.
const SHOWCASE_QUALITY = 90;

// The showcase column on lg+ is roughly 600px wide, so 1200px at 2x DPR is
// the upper bound we actually need; below lg the image fills the column.
const SHOWCASE_SIZES = '(min-width: 1024px) 620px, (min-width: 768px) 50vw, 100vw';

function WorkspaceShot() {
  return (
    <ScreenshotFrame bleedRight>
      <Image
        src="/assets/screenshots/marli-workspace.png"
        alt="Marli workspace showing the Hi, I'm Marli greeting, quick start prompts, and sidebar history"
        width={3446}
        height={1918}
        quality={SHOWCASE_QUALITY}
        sizes={SHOWCASE_SIZES}
        className="block w-full h-auto"
      />
    </ScreenshotFrame>
  );
}

function ExtensionInlineShot() {
  // Width/height match the exported asset (2x retina bake: 2048x1136). The
  // surrounding workspace on the left is intentionally bubbalized so the
  // extension panel — which remains pixel-sharp — is the focal point.
  return (
    <ScreenshotFrame bleedLeft>
      <Image
        src="/assets/screenshots/marli-extension-inline.png"
        alt="Marli Anywhere extension docked beside a workspace, answering a question inline"
        width={2048}
        height={1136}
        quality={SHOWCASE_QUALITY}
        sizes={SHOWCASE_SIZES}
        className="block w-full h-auto"
      />
    </ScreenshotFrame>
  );
}

function IntegrationsShot() {
  return (
    <ScreenshotFrame bleedRight>
      <Image
        src="/assets/screenshots/integrations-setup.png"
        alt="Lytica setup page showing connected platforms across advertising, finance, CRM, and productivity categories"
        width={3452}
        height={1926}
        quality={SHOWCASE_QUALITY}
        sizes={SHOWCASE_SIZES}
        className="block w-full h-auto"
      />
    </ScreenshotFrame>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

// Row data is defined inline (not as an array of objects) because the
// screenshot nodes are components with distinct alt text + sizing. Keeping
// them as named compositions keeps the data/view split clean without
// forcing a generic `ShotKey` enum.
export function ProductShowcaseSection() {
  return (
    <section
      id="product-tour"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-28 scroll-mt-20 border-t border-white/5"
    >
      {/* Top + bottom emerald washes — gives the section its own lighting
          so product screenshots feel spotlit rather than laid on flat black. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.08),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.06),transparent_55%)]"
      />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Product tour"
          title="A look inside Lytica."
          subtitle="The real screens your team works in every day — from the Marli workspace to the extension that follows you across tools."
        />

        {/* Row stack. Increased vertical rhythm between rows so each shot
            has room to breathe without competing with its neighbor. */}
        <div className="space-y-24 sm:space-y-32">
          <ShowcaseRow
            eyebrow="Workspace"
            title="One workspace for every number that matters."
            description="Open a chat, ask anything. Marli reasons across every connected system and hands back charts, tables, and narrative answers — with your full history one click away in the sidebar."
            highlights={[
              'Persistent chat history and saved threads per workspace',
              'Quick-start prompts tuned to your connected data',
              'Publisher, advertiser, and cross-business workspaces',
            ]}
            screenshot={<WorkspaceShot />}
          />

          <ShowcaseRow
            reverse
            eyebrow="Marli Anywhere"
            title="Marli, pinned alongside your work."
            description="Launch the Marli Anywhere extension to keep answers one click away — right next to the tool you're already in. It draws on the same sources as the main app, so context never gets lost between tabs."
            highlights={[
              'Dockable side-panel across the Lytica app and the web',
              'Reads the same connected sources as the main workspace',
              'History stays in sync across devices and surfaces',
            ]}
            screenshot={<ExtensionInlineShot />}
          />

          <ShowcaseRow
            eyebrow="Setup"
            title="Connect everything in minutes."
            description="Authenticate your ad platforms, finance systems, CRM, and productivity stack from a single setup screen. Lytica keeps sources fresh in the background so Marli always answers against live data."
            highlights={[
              '30+ first-class connectors across ads, finance, sales, and ops',
              'OAuth-first auth — no long-lived keys to rotate',
              'Background refresh keeps every answer grounded in live data',
            ]}
            screenshot={<IntegrationsShot />}
          />
        </div>
      </div>
    </section>
  );
}
