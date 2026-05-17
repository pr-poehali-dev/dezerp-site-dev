import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/365970a3-3a96-4709-bf03-6f332841bb5d/files/5bc0fec9-6709-4a9a-90b1-82425d780664.jpg";

type Section = "home" | "rules" | "leaderboard" | "donate" | "download";

interface HomePageProps {
  onNav: (s: Section) => void;
  onOpenAuth: (mode: "login" | "register") => void;
}

export default function HomePage({ onNav, onOpenAuth }: HomePageProps) {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="DezeRP" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,11,15,0.2) 0%, rgba(10,11,15,0.7) 60%, rgba(10,11,15,1) 100%)" }}></div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(230,48,48,0.06) 0%, transparent 50%, rgba(37,99,235,0.06) 100%)" }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: "var(--red)" }}></span>
              <span className="text-xs uppercase tracking-widest text-gray-400" style={{ fontFamily: "Oswald" }}>Онлайн: 247 игроков</span>
            </div>
            <h1 className="animate-fade-in-up delay-100" style={{ fontFamily: "Oswald", fontSize: "clamp(3.5rem,12vw,8rem)", lineHeight: 0.9, fontWeight: 700, textTransform: "uppercase" }}>
              <span style={{ color: "var(--red)" }} className="text-glow-red">DEZE</span>
              <span className="text-white">RP</span>
            </h1>
            <p className="animate-fade-in-up delay-200 text-gray-300 mt-4 mb-3" style={{ fontFamily: "Oswald", fontSize: "1.3rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Ролевой сервер нового поколения
            </p>
            <p className="text-gray-400 mb-10 max-w-xl animate-fade-in-up delay-300" style={{ lineHeight: 1.75 }}>
              Живи двойной жизнью — строй бизнес, управляй бандой или служи закону. Уникальная атмосфера, реалистичная экономика и тысячи игроков ждут тебя.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400">
              <button className="btn-red text-base px-8 py-3 animate-pulse-glow" onClick={() => onNav("download")}>
                Играть сейчас
              </button>
              <button className="btn-outline text-base px-8 py-3" onClick={() => onNav("rules")}>
                Правила сервера
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float flex flex-col items-center gap-1">
          <span className="text-xs text-gray-600 uppercase tracking-widest" style={{ fontFamily: "Oswald" }}>Листать</span>
          <Icon name="ChevronDown" size={18} className="text-gray-600" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-white mb-4">Почему <span style={{ color: "var(--red)" }}>DezeRP</span>?</h2>
          <div className="divider-red mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "Building2", title: "Живой город", text: "Реалистичная экономика, рабочие места, бизнес и недвижимость. Каждое действие влияет на мир.", color: "var(--red)" },
            { icon: "Shield", title: "Система фракций", text: "Полиция, мафия, байкеры, политики — выбери свой путь и поднимись до вершины.", color: "var(--blue)" },
            { icon: "Zap", title: "Уникальные ивенты", text: "Еженедельные события, турниры и специальные задания с крутыми наградами.", color: "var(--red)" },
            { icon: "Users", title: "Большое комьюнити", text: "Discord-сервер, стримы, контент-мейкеры и 12 000+ зарегистрированных игроков.", color: "var(--blue)" },
            { icon: "Trophy", title: "Рейтинг и прогресс", text: "Система уровней, достижений и рангов. Твоя история на сервере сохраняется навсегда.", color: "var(--red)" },
            { icon: "Headphones", title: "Поддержка 24/7", text: "Команда администраторов всегда на связи. Быстрое решение любых вопросов.", color: "var(--blue)" },
          ].map((f, i) => (
            <div key={i} className="card-hover p-6" style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: `${f.color}18`, border: `1px solid ${f.color}35` }}>
                <Icon name={f.icon} size={22} style={{ color: f.color }} />
              </div>
              <h3 className="text-white text-lg mb-2" style={{ fontFamily: "Oswald" }}>{f.title}</h3>
              <p className="text-gray-400 text-sm" style={{ lineHeight: 1.65 }}>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, rgba(230,48,48,0.08) 0%, rgba(37,99,235,0.08) 100%)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="section-title text-white mb-4">Готов начать?</h2>
          <p className="text-gray-400 mb-8">Регистрация займёт меньше минуты. Сервер ждёт тебя прямо сейчас.</p>
          <div className="flex justify-center flex-wrap gap-4">
            <button className="btn-red px-10 py-4 text-lg" onClick={() => onOpenAuth("register")}>Зарегистрироваться</button>
            <button className="btn-blue px-10 py-4 text-lg" onClick={() => onNav("download")}>Скачать клиент</button>
          </div>
        </div>
      </section>
    </div>
  );
}
