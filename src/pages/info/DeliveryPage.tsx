import { InfoPage, InfoSection } from './InfoPage';

export function DeliveryPage() {
  return (
    <InfoPage
      title="Shipping & returns"
      eyebrow="Orders"
      lead="Most pieces exist once, so I pack every parcel myself and ship it carefully. Orders go out in batches."
    >
      <InfoSection index="01" title="Shipping methods">
        <p className="m-0">
          CDEK courier to your door or to a pickup point, Russian Post, or a
          hand-off in Moscow if we agree on a time. Every piece travels in a
          rigid box with a fabric cover.
        </p>
      </InfoSection>

      <InfoSection index="02" title="Delivery times">
        <p className="m-0">
          Moscow 1–2 days, Saint Petersburg 2–3 days, the rest of Russia 3–7
          days, CIS countries 7–14 days. That is counted from the moment the
          parcel is handed to the carrier. The tracking number comes by email.
        </p>
      </InfoSection>

      <InfoSection index="03" title="International shipping">
        <p className="m-0">
          I ship worldwide (EMS / CDEK International). It takes 10 to 21 days
          depending on the country. Customs fees on the receiving side are on
          the buyer. I include the paperwork that says the piece is handmade
          and what it costs.
        </p>
      </InfoSection>

      <InfoSection index="04" title="Shipping cost">
        <p className="m-0">
          Within Russia 600 ₽, free for orders over 30,000 ₽. CIS from 1,200 ₽,
          the rest of the world is calculated at checkout. A hand-off in Moscow
          is free.
        </p>
      </InfoSection>

      <InfoSection index="05" title="Returns">
        <p className="m-0">
          You can return a piece within 14 days of receiving it, as long as it
          hasn’t been worn and still has its tags and packaging. The refund
          goes back the same way you paid, within 5 working days after the
          piece gets back to me.
        </p>
        <p className="m-0">
          Pieces made to your measurements and paintings can’t be returned.
          Each one is made for a specific person.
        </p>
      </InfoSection>

      <InfoSection index="06" title="Exchanges">
        <p className="m-0">
          A size swap works if the size you need still exists. Message me on
          Telegram before you send anything back. With runs this small it is
          better to check the size guide or ask me for exact measurements
          before you buy.
        </p>
      </InfoSection>

      <InfoSection index="07" title="Processing time">
        <p className="m-0">
          In-stock pieces go out within 1–2 working days. Pre-orders ship when
          they are done, usually 2–4 weeks. Paint and embroidery don’t like
          being rushed. The order status is visible in your account.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
