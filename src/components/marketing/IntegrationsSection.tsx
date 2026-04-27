/**
 * IntegrationsSection
 *
 * Horizontal marquee listing the connectors available in-product today. Logo
 * assets live in /public/assets/logos/ and are pulled from the same set that
 * powers the authenticated integration picker, so marketing stays aligned
 * with what's actually shippable.
 *
 * The track renders its children twice and translates -50% so the loop feels
 * seamless. The duplicate copy is aria-hidden.
 */

import { SectionHeader } from './SectionHeader';

/** Inlined mark: avoids raster/black-box logos; uses `currentColor` like the chip label. */
function IscreamInlineMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={1.65}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 12.5c0-3.4 2.6-6.2 6.5-6.2s6.5 2.8 6.5 6.2" />
        <path d="M13.5 9.8c1.1-1.3 2.8-1.9 4.3-1.2" strokeWidth={1.35} />
        <path d="M10.5 13.5h11L16 25.2 10.5 13.5z" />
        <path d="M13 16v6.2M16 16.2v7M19 16v6.2" strokeWidth={1.35} />
        <path d="M3.5 16h5" />
        <path d="M3.5 19.8h6.2" />
        <path d="M3.5 23.5h5.3" />
        <circle cx="9.5" cy="16" r="1.15" fill="currentColor" stroke="none" />
        <circle cx="10.7" cy="19.8" r="1.15" fill="currentColor" stroke="none" />
        <circle cx="9.8" cy="23.5" r="1.15" fill="currentColor" stroke="none" />
        <path d="M23.5 16H28.5" />
        <path d="M22.3 19.8H28.5" />
        <path d="M23.2 23.5h5.8" />
        <circle cx="22.5" cy="16" r="1.15" fill="currentColor" stroke="none" />
        <circle cx="21.3" cy="19.8" r="1.15" fill="currentColor" stroke="none" />
        <circle cx="22.2" cy="23.5" r="1.15" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

// Keep this list in sync with apps/web/src/lib/integrations/*. Logo paths
// reference files already shipped under /public/assets/logos/.
const INTEGRATIONS = [
  { name: 'Salesforce', logo: '/assets/logos/salesforce-logo.svg' },
  { name: 'HubSpot', logo: '/assets/logos/hubspot-logo.svg' },
  { name: 'Snowflake', logo: '/assets/logos/snowflake-logo.svg' },
  { name: 'Bill.com', logo: '/assets/logos/billcom-logo.svg' },
  { name: 'Slack', logo: '/assets/logos/slack-logo.svg' },
  { name: 'Gmail', logo: '/assets/logos/gmail-logo.svg' },
  { name: 'Google Calendar', logo: '/assets/logos/google-calendar-logo.svg' },
  { name: 'Airtable', logo: '/assets/logos/airtable-logo.svg' },
  { name: 'Monday', logo: '/assets/logos/monday-logo.svg' },
  { name: 'Boostr', logo: '/assets/logos/boostr-logo.svg' },
  { name: 'Publica', logo: '/assets/logos/publica-logo.svg' },
  { name: 'Limelight', logo: '/assets/logos/limelight-logo.png' },
  { name: 'AddedTV', logo: '/assets/logos/addedtv-logo.svg' },
  { name: 'iScream', logo: '/assets/logos/iscream-logo.svg' },
] as const;

interface ChipProps {
  name: string;
  logo: string;
  ariaHidden?: boolean;
}

// Renders a single pill-shaped chip with the integration's real logo. We use
// a plain <img> rather than next/image because the marquee duplicates the set
// and we want tight control over the repeat behavior without layout shifts.
function IntegrationChip({ name, logo, ariaHidden }: ChipProps) {
  return (
    <span
      aria-hidden={ariaHidden ? 'true' : undefined}
      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/75 whitespace-nowrap hover:border-emerald-500/40 hover:bg-white/[0.05] transition-colors"
    >
      {name === 'iScream' ? (
        <IscreamInlineMark className="h-5 w-5 shrink-0 text-white/80" />
      ) : (
        <img
          src={logo}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-5 w-5 object-contain shrink-0"
        />
      )}
      {name}
    </span>
  );
}

export function IntegrationsSection() {
  return (
    <section
      id="integrations"
      className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 scroll-mt-20 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Integrations"
          title="Plug into the tools your team already runs on."
          subtitle="New connectors ship weekly. If you need one we don't have, we'll build it."
        />

        {/* Edge fade masks keep chips from hard-cutting at the viewport edges */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex gap-3 animate-marquee w-max">
            {INTEGRATIONS.map((item) => (
              <IntegrationChip key={item.name} name={item.name} logo={item.logo} />
            ))}
            {/* Duplicate track for the seamless loop; marked aria-hidden so
                screen readers only hear the integration list once. */}
            {INTEGRATIONS.map((item) => (
              <IntegrationChip
                key={`${item.name}-dup`}
                name={item.name}
                logo={item.logo}
                ariaHidden
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
