/**
 * SectionHeader
 *
 * Shared heading block for every marketing section so eyebrow + title +
 * subtitle typography stays identical down the page. Server-renderable.
 */

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ eyebrow, title, subtitle, align = 'center' }: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-2xl ${alignment} mb-12 sm:mb-16`}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
