import { InfoPage, InfoSection } from './InfoPage';

export function CarePage() {
  return (
    <InfoPage
      title="Garment care"
      eyebrow="Orders"
      lead="These pieces are painted, embroidered or foiled by hand. Treat them like artwork on fabric and they will outlive ordinary clothes."
    >
      <InfoSection index="01" title="Washing">
        <p className="m-0">
          Hand wash only, in cool water (up to 30 °C), inside out. Mild liquid
          detergent, no bleach, no enzymes. Don’t rub painted or foiled areas
          and don’t soak for more than 15 minutes.
        </p>
        <p className="m-0">
          Machine washing, spin cycles and solvent dry cleaning destroy the
          paint layer. I can’t take responsibility for what happens after that.
        </p>
      </InfoSection>

      <InfoSection index="02" title="Drying">
        <p className="m-0">
          Dry flat on a towel or on a hanger, away from radiators and direct
          sun. UV fades both the acrylic and the embroidery thread. Don’t wring
          it out, just press gently with a towel.
        </p>
      </InfoSection>

      <InfoSection index="03" title="Ironing">
        <p className="m-0">
          Iron from the inside on low heat, through a cotton pressing cloth.
          Don’t iron paint or foil at all. Embroidery only from the inside, on
          something soft, so the stitches keep their relief.
        </p>
        <p className="m-0">
          A steamer is fine at 10–15 cm from the fabric, as long as you stay
          off the decorated parts.
        </p>
      </InfoSection>

      <InfoSection index="04" title="Storage">
        <p className="m-0">
          Keep it on a hanger in the fabric cover it came with, somewhere dry
          and aired. Don’t fold painted pieces across the painted area. Over
          time the paint cracks along the fold.
        </p>
        <p className="m-0">
          Keep “Downpour Without an Umbrella or Your Eyes” and any other canvas
          upright, away from heat and damp, like any painting.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
