import Reveal from "@/components/kit/Reveal";

interface FigureProps {
  src: string;
  alt: string;
  /** which pair of corners is rounded */
  cut?: "tr-bl" | "tl-br" | "small";
  /** aspect ratio class, e.g. "aspect-[4/3]" */
  ratio?: string;
  caption?: string;
  delay?: number;
  className?: string;
}

const cuts = {
  "tr-bl": "img-cut",
  "tl-br": "img-cut-alt",
  small: "img-cut-sm",
} as const;

/**
 * Imagery treatment for the site: no border, no full radius. Two opposite
 * corners are cut, which is the one shape motif carried across the pages.
 */
const Figure = ({
  src,
  alt,
  cut = "tr-bl",
  ratio = "aspect-[4/3]",
  caption,
  delay = 0,
  className = "",
}: FigureProps) => (
  <Reveal delay={delay} className={className}>
    <figure>
      <div className={`${cuts[cut]} ${ratio} w-full bg-mist`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[11.5px] leading-relaxed text-dim2">
          {caption}
        </figcaption>
      )}
    </figure>
  </Reveal>
);

export default Figure;
