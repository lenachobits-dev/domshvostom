export default function FounderSection() {
  return (
    <section id="founder-section" className="founder-block">
      <div className="founder-inner shell">
        <p className="founder-overline">Голос проекта</p>
        <h2 className="founder-heading">
          Юлиана Гафарова — основатель и руководитель проектов
        </h2>
        <div className="founder-visual">
          <div className="founder-collage">
            <div className="founder-collage__item founder-collage__item--a">
              <img
                src="/static/founder-stage.jpg"
                alt="Юлиана Гафарова на сцене"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="founder-collage__item founder-collage__item--b">
              <img
                src="/static/founder-tenderness.jpg"
                alt="Юлиана Гафарова с животным"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="founder-collage__item founder-collage__item--c">
              <img
                src="/static/founder-smile.jpg"
                alt="Юлиана Гафарова улыбается"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <div className="founder-body">
          <p className="founder-paragraph">
            Юлиана Гафарова — основатель «Дома с Хвостом» и автор проекта
            «Территория Добрых Дел».
          </p>
          <p className="founder-paragraph">
            По образованию дизайнер и юрист, уже шесть лет шаг за шагом Юлиана
            развивает систему помощи животным: от ежедневной практической работы
            в приюте до проектирования будущего центра, расчётов, смет и
            грантовой поддержки.
          </p>
          <p className="founder-paragraph">
            В основе её подхода — открытость, доверие, ответственность и желание
            строить помощь не на эмоции одного дня, а на прочной долгосрочной
            системе.
          </p>
        </div>
      </div>
    </section>
  );
}
