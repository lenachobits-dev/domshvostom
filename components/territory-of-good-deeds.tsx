export default function TerritoryOfGoodDeeds() {
  return (
    <section id="territory-section" className="territory-block">
      <div className="territory-header shell">
        <p className="territory-overline">Новый проект</p>
        <h2 className="territory-heading">Территория Добрых Дел</h2>
        <p className="territory-subheading">
          Первый в России самоокупаемый экосистемный центр помощи животным
        </p>
      </div>

      <div className="territory-grid">
        <div className="territory-row shell">
          <div className="territory-image-wrap">
            <figure className="territory-figure">
              <img
                src="/static/doska.jpg"
                alt="Доска почёта проекта Территория Добрых Дел"
                className="territory-img"
                loading="lazy"
                decoding="async"
              />
              <div className="territory-img-overlay" />
            </figure>
          </div>
          <div className="territory-text">
            <p className="territory-text-content">
              Следующий большой шаг проекта — создание нового центра «Территория
              Добрых Дел». Это пространство, где будет комфортно и животным, и
              людям. Пространство, в котором помощь строится не на выживании от
              сбора к сбору, а на продуманной системе, рассчитанной на годы
              вперёд.
            </p>
          </div>
        </div>

        <div className="territory-row territory-row--reverse shell">
          <div className="territory-image-wrap">
            <figure className="territory-figure">
              <img
                src="/static/promo.jpg"
                alt="Промо-изображение территории центра"
                className="territory-img"
                loading="lazy"
                decoding="async"
              />
              <div className="territory-img-overlay" />
            </figure>
          </div>
          <div className="territory-text">
            <p className="territory-text-content">
              Проект развивается на участке площадью 9 гектаров в Благовещенском
              районе Башкортостана. Центр рассчитан на 350 собак, 150 кошек и
              десятки диких животных и птиц. Здесь будут созданы условия для
              лечения, адаптации, социализации, проживания, реабилитации и
              безопасной жизни.
            </p>
          </div>
        </div>

        <div className="territory-row shell">
          <div className="territory-image-wrap">
            <figure className="territory-figure">
              <img
                src="/static/white.jpeg"
                alt="Архитектурный план центра Территория Добрых Дел"
                className="territory-img"
                loading="lazy"
                decoding="async"
              />
              <div className="territory-img-overlay" />
            </figure>
          </div>
          <div className="territory-text">
            <p className="territory-text-content">
              Концепция центра построена вокруг принципа «самоокупаемость +
              социальная миссия». Часть услуг будет коммерческой, а выручка
              направляться на уставную деятельность — помощь животным.
            </p>
          </div>
        </div>
      </div>

      <div className="territory-epilogue shell">
        <p className="territory-epilogue-text">
          Мы создаём место, где добро — не разовая акция, а среда. Место, где
          можно помогать системно. Место, где животные и люди возвращают друг
          другу доверие и смысл.
        </p>
      </div>
    </section>
  );
}
