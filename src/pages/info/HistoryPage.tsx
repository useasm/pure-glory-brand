import { InfoPage } from './InfoPage';
import { Reveal } from '../../components/ui/Reveal';

const MILESTONES = [
  {
    year: '2021',
    title: 'First brush',
    text: 'It started with one shirt and a jar of acrylic. A thing I didn’t mind ruining turned into a thing I couldn’t repeat.',
  },
  {
    year: '2022',
    title: 'The painting',
    text: 'I painted “Downpour Without an Umbrella or Your Eyes”. Everything visual here grew out of it: warm concrete, rain on fabric, a quiet kind of feeling.',
  },
  {
    year: '2023',
    title: 'First collections',
    text: '“Climate of Two Threads” and “Pure Corporation”, the first runs of 7 to 12 pieces. All painted by hand, every piece signed.',
  },
  {
    year: '2024',
    title: 'Embroidery',
    text: 'Hand embroidery joined the paint: “Isabelle — Thorns and Roses”, about six hours of work per flower.',
  },
  {
    year: '2025',
    title: 'Underground',
    text: '“Underground” and “Isolation”: the rhythm of a city, and then a closed room. Half of the pieces were gone before I announced them.',
  },
  {
    year: '2026',
    title: 'This site',
    text: 'A place of my own online, the one you are looking at. Not a marketplace, more of an exhibition.',
  },
];

export function HistoryPage() {
  return (
    <InfoPage
      title="History"
      eyebrow="Pure Glory"
      lead="Pure Glory grew slowly, from one painted shirt to this site. These are the main points along the way."
    >
      <div className="flex flex-col">
        {MILESTONES.map((m, i) => (
          <Reveal key={m.year} delay={i * 60}>
            <div
              className="grid gap-3 py-7 md:grid-cols-[120px_1fr]"
              style={{ borderTop: '1px solid var(--border-hairline)' }}
            >
              <div
                className="font-display"
                style={{ fontSize: 'var(--fs-heading-l)', color: 'var(--text-muted)' }}
              >
                {m.year}
              </div>
              <div>
                <div
                  className="font-display mb-2"
                  style={{ fontSize: 'var(--fs-heading-l)' }}
                >
                  {m.title}
                </div>
                <p
                  className="m-0 max-w-[52ch]"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--fs-body)',
                    lineHeight: 'var(--lh-body)',
                  }}
                >
                  {m.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </InfoPage>
  );
}
