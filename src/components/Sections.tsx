import Icon from "@/components/ui/icon";

type Section = "home" | "rules" | "leaderboard" | "donate" | "download";

const LEADERS = [
  { rank: 1, name: "DarkWolf99", level: 87, playtime: "1240ч", role: "Администратор", badge: "rank-admin", icon: "👑" },
  { rank: 2, name: "ShadowKing", level: 75, playtime: "980ч", role: "Модератор", badge: "rank-moder", icon: "🔥" },
  { rank: 3, name: "NeonRider", level: 71, playtime: "870ч", role: "VIP", badge: "rank-vip", icon: "⚡" },
  { rank: 4, name: "CityBoss", level: 66, playtime: "740ч", role: "VIP", badge: "rank-vip", icon: "💎" },
  { rank: 5, name: "StreetKing", level: 60, playtime: "690ч", role: "Игрок", badge: "rank-player", icon: "🎯" },
  { rank: 6, name: "RedPhoenix", level: 55, playtime: "610ч", role: "Игрок", badge: "rank-player", icon: "🎯" },
  { rank: 7, name: "BlueStorm", level: 51, playtime: "580ч", role: "Игрок", badge: "rank-player", icon: "🎯" },
  { rank: 8, name: "GhostRide", level: 48, playtime: "520ч", role: "Игрок", badge: "rank-player", icon: "🎯" },
  { rank: 9, name: "NightCrawler", level: 44, playtime: "470ч", role: "Игрок", badge: "rank-player", icon: "🎯" },
  { rank: 10, name: "UrbanHero", level: 41, playtime: "420ч", role: "Игрок", badge: "rank-player", icon: "🎯" },
];

const RULES = [
  { id: 1, title: "Уважение к игрокам", text: "Запрещено оскорблять, унижать и угрожать другим игрокам. Относитесь к окружающим так, как хотите, чтобы относились к вам." },
  { id: 2, title: "Запрет на читы и баги", text: "Использование стороннего ПО, читов, а также намеренное использование багов для получения преимущества — бан без предупреждения." },
  { id: 3, title: "Реалистичная игра (РП)", text: "Играйте в рамках ролевой атмосферы. Мета-гейминг, нон-РП поведение и выход из роли без причины наказываются." },
  { id: 4, title: "Запрет на DM (Deathmatch)", text: "Убийство игроков без ролевого обоснования строго запрещено. Перед конфликтом необходима ролевая ситуация." },
  { id: 5, title: "Игровой чат", text: "В игровом чате — только по делу. Флуд, реклама и оффтоп запрещены. Для общения используйте Discord." },
  { id: 6, title: "Ценность жизни", text: "Персонаж должен ценить свою жизнь. Суицидальное поведение без ролевого обоснования является нарушением." },
];

const DONATES = [
  { name: "Базовый", price: "199₽", glow: "", features: ["VIP-тег в чате", "Цветной ник", "Кастомный префикс", "+10% опыта"], icon: "🎮", popular: false },
  { name: "Продвинутый", price: "499₽", glow: "glow-blue", features: ["Всё из Базового", "Личный гараж (5 слотов)", "Уникальный транспорт", "+25% опыта", "Приоритет входа"], icon: "💎", popular: true },
  { name: "Элитный", price: "999₽", glow: "glow-red", features: ["Всё из Продвинутого", "Личный особняк", "Охрана (2 NPC)", "+50% опыта", "Уникальный скин", "Закрытые зоны"], icon: "👑", popular: false },
];

interface SectionsProps {
  activeSection: Section;
  onOpenAuth: (mode: "login" | "register") => void;
}

export default function Sections({ activeSection, onOpenAuth }: SectionsProps) {
  return (
    <>
      {/* ─── RULES ─── */}
      {activeSection === "rules" && (
        <div className="min-h-screen max-w-4xl mx-auto px-4 py-24">
          <div className="mb-12">
            <h2 className="section-title text-white mb-4 animate-fade-in-up">
              Правила <span style={{ color: "var(--red)" }}>сервера</span>
            </h2>
            <div className="divider-red mb-6"></div>
            <p className="text-gray-400 animate-fade-in-up delay-100">Нарушение правил влечёт предупреждение, временный или постоянный бан. Незнание правил не освобождает от ответственности.</p>
          </div>

          <div className="flex flex-col gap-4 mb-12">
            {RULES.map((rule, i) => (
              <div key={rule.id} className="flex gap-4 p-5 animate-fade-in-up card-hover"
                style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.05)", animationDelay: `${i * 0.07}s`, opacity: 0 }}>
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-sm font-bold"
                  style={{ background: "rgba(230,48,48,0.12)", border: "1px solid rgba(230,48,48,0.3)", color: "var(--red)", fontFamily: "Oswald" }}>
                  {rule.id}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1" style={{ fontFamily: "Oswald", fontSize: "1.1rem" }}>{rule.title}</h3>
                  <p className="text-gray-400 text-sm" style={{ lineHeight: 1.65 }}>{rule.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 flex flex-col sm:flex-row items-center gap-4"
            style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.3)" }}>
            <Icon name="FileText" size={32} style={{ color: "var(--blue)", flexShrink: 0 }} />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-white font-semibold mb-1" style={{ fontFamily: "Oswald" }}>Полный свод правил</p>
              <p className="text-gray-400 text-sm">Скачай PDF-документ с полными правилами сервера</p>
            </div>
            <button className="btn-blue flex items-center gap-2 whitespace-nowrap"
              onClick={() => alert("Файл правил будет добавлен администратором")}>
              <Icon name="Download" size={16} />
              Скачать PDF
            </button>
          </div>
        </div>
      )}

      {/* ─── LEADERBOARD ─── */}
      {activeSection === "leaderboard" && (
        <div className="min-h-screen max-w-4xl mx-auto px-4 py-24">
          <div className="mb-12">
            <h2 className="section-title text-white mb-4 animate-fade-in-up">
              Таблица <span style={{ color: "var(--red)" }}>лидеров</span>
            </h2>
            <div className="divider-red mb-6"></div>
            <p className="text-gray-400 animate-fade-in-up delay-100">Топ игроков по уровню и времени на сервере. Обновляется каждый час.</p>
          </div>

          {/* Podium */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[LEADERS[1], LEADERS[0], LEADERS[2]].map((p, i) => {
              const pos = [2, 1, 3][i];
              const ht = ["h-28", "h-36", "h-24"][i];
              const cl = ["var(--blue)", "var(--red)", "#ffd700"][i];
              return (
                <div key={p.rank} className="flex flex-col items-center">
                  <div className="text-2xl mb-1">{p.icon}</div>
                  <div className="text-sm font-bold mb-1" style={{ fontFamily: "Oswald", color: cl }}>{p.name}</div>
                  <div className="text-xs text-gray-400 mb-2">Ур. {p.level}</div>
                  <div className={`w-full ${ht} flex items-center justify-center text-2xl font-bold`}
                    style={{ background: `${cl}18`, border: `1px solid ${cl}45`, fontFamily: "Oswald", color: cl }}>
                    #{pos}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table */}
          <div style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="grid grid-cols-12 px-4 py-3 text-xs uppercase tracking-widest text-gray-500"
              style={{ fontFamily: "Oswald", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span className="col-span-1">#</span>
              <span className="col-span-4">Игрок</span>
              <span className="col-span-2">Ур.</span>
              <span className="col-span-3">Время</span>
              <span className="col-span-2">Ранг</span>
            </div>
            {LEADERS.map((p, i) => {
              const topColor = p.rank === 1 ? "230,48,48" : p.rank === 2 ? "37,99,235" : "255,215,0";
              const numColor = p.rank === 1 ? "var(--red)" : p.rank === 2 ? "var(--blue)" : p.rank === 3 ? "#ffd700" : "rgba(255,255,255,0.25)";
              return (
                <div key={p.rank} className="grid grid-cols-12 px-4 py-4 items-center animate-fade-in-up"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                    animationDelay: `${i * 0.05}s`,
                    opacity: 0,
                    background: p.rank <= 3 ? `rgba(${topColor},0.05)` : "transparent"
                  }}>
                  <span className="col-span-1 font-bold" style={{ fontFamily: "Oswald", color: numColor }}>{p.rank}</span>
                  <span className="col-span-4 flex items-center gap-2">
                    <span className="text-lg">{p.icon}</span>
                    <span className="text-white text-sm font-medium" style={{ fontFamily: "Oswald" }}>{p.name}</span>
                  </span>
                  <span className="col-span-2 text-sm font-bold" style={{ color: "var(--blue)", fontFamily: "Oswald" }}>{p.level}</span>
                  <span className="col-span-3 text-gray-400 text-sm">{p.playtime}</span>
                  <span className={`col-span-2 text-xs font-medium ${p.badge}`} style={{ fontFamily: "Oswald" }}>{p.role}</span>
                </div>
              );
            })}
          </div>
          <p className="text-center text-gray-600 text-xs mt-6" style={{ fontFamily: "Oswald" }}>
            Демо-данные. Реальный рейтинг подключит администратор.
          </p>
        </div>
      )}

      {/* ─── DONATE ─── */}
      {activeSection === "donate" && (
        <div className="min-h-screen max-w-5xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="section-title text-white mb-4 animate-fade-in-up">
              Поддержать <span style={{ color: "var(--red)" }}>сервер</span>
            </h2>
            <div className="divider-red mx-auto mb-6"></div>
            <p className="text-gray-400 animate-fade-in-up delay-100 max-w-xl mx-auto">
              Донат помогает развивать сервер и даёт уникальные привилегии в игре
            </p>
          </div>

          {/* DC / Dcoins */}
          <div className="mb-12 p-6 animate-fade-in-up"
            style={{ background: "var(--surface)", border: "1px solid rgba(255,215,0,0.25)", opacity: 0 }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">💰</div>
                <div>
                  <h3 className="text-white text-xl font-bold" style={{ fontFamily: "Oswald" }}>
                    DC — внутриигровая валюта
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    1 Dcoin = <span className="text-yellow-400 font-semibold">1 рубль</span> · Тратьте на машины, одежду, недвижимость и многое другое
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold" style={{ fontFamily: "Oswald", color: "#ffd700" }}>1 DC</span>
                  <span className="text-gray-400 text-sm">= 1₽</span>
                </div>
                <button
                  className="btn-red px-8 py-2 text-sm"
                  onClick={() => alert("Система пополнения DC будет настроена администратором")}>
                  Пополнить DC
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DONATES.map((tier, i) => (
              <div key={tier.name}
                className={`relative p-6 animate-fade-in-up card-hover ${tier.glow}`}
                style={{
                  background: "var(--surface)",
                  border: tier.popular ? "1px solid rgba(37,99,235,0.5)" : "1px solid rgba(255,255,255,0.06)",
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0
                }}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs uppercase tracking-wider px-4 py-1"
                    style={{ background: "var(--blue)", fontFamily: "Oswald", color: "white" }}>
                    Популярно
                  </div>
                )}
                <div className="text-4xl text-center mb-4">{tier.icon}</div>
                <h3 className="text-center text-xl mb-2 text-white" style={{ fontFamily: "Oswald" }}>{tier.name}</h3>
                <div className="text-center text-3xl font-bold mb-6"
                  style={{ fontFamily: "Oswald", color: tier.popular ? "var(--blue)" : "var(--red)" }}>
                  {tier.price}<span className="text-sm text-gray-400 font-normal">/мес</span>
                </div>
                <ul className="flex flex-col gap-3 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                      <Icon name="Check" size={14} style={{ color: tier.popular ? "var(--blue)" : "var(--red)", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={tier.popular ? "btn-blue w-full" : "btn-red w-full"}
                  onClick={() => alert("Система оплаты будет настроена администратором")}>
                  Купить
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-xs mt-10" style={{ fontFamily: "Oswald" }}>
            Привилегии активируются автоматически после оплаты. Возврат средств не предусмотрен.
          </p>
        </div>
      )}

      {/* ─── DOWNLOAD ─── */}
      {activeSection === "download" && (
        <div className="min-h-screen max-w-3xl mx-auto px-4 py-24">
          <div className="mb-12">
            <h2 className="section-title text-white mb-4 animate-fade-in-up">
              Скачать <span style={{ color: "var(--blue)" }}>клиент</span>
            </h2>
            <div className="divider-red mb-6"></div>
            <p className="text-gray-400 animate-fade-in-up delay-100">
              Следуй инструкции для подключения к серверу. Если возникнут проблемы — обратись в Discord.
            </p>
          </div>

          <div className="flex flex-col gap-5 mb-12">
            {[
              { step: 1, title: "Скачай GTA V (Steam или Rockstar)", text: "Необходима лицензионная версия GTA V. Пиратские версии не поддерживаются.", color: "var(--red)" },
              { step: 2, title: "Установи FiveM", text: "FiveM — официальный клиент для многопользовательских RP-серверов GTA V. Бесплатный.", color: "var(--blue)" },
              { step: 3, title: "Подключись к DezeRP", text: 'После установки FiveM найди сервер «DezeRP» в списке или введи IP вручную.', color: "var(--red)" },
              { step: 4, title: "Зарегистрируй персонажа", text: null, color: "var(--blue)" },
            ].map((s, i) => (
              <div key={s.step} className="flex gap-4 p-5 animate-fade-in-up card-hover"
                style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.05)", animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl font-bold"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}40`, color: s.color, fontFamily: "Oswald" }}>
                  {s.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1" style={{ fontFamily: "Oswald", fontSize: "1.1rem" }}>{s.title}</h3>
                  {s.text ? (
                    <p className="text-gray-400 text-sm" style={{ lineHeight: 1.65 }}>{s.text}</p>
                  ) : (
                    <div>
                      <p className="text-gray-400 text-sm mb-3" style={{ lineHeight: 1.65 }}>Выбери удобный способ регистрации персонажа:</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider transition-all"
                          style={{ fontFamily: "Oswald", background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.4)", color: "#60a5fa", cursor: "pointer" }}
                          onClick={() => onOpenAuth("register")}
                        >
                          🌐 На сайте
                        </button>
                        <div
                          className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider"
                          style={{ fontFamily: "Oswald", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                        >
                          🎮 В игре — при первом входе
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <a href="https://fivem.net" target="_blank" rel="noopener noreferrer"
              className="btn-red flex items-center justify-center gap-3 py-4 no-underline">
              <Icon name="Download" size={20} />
              Скачать FiveM
            </a>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-10" style={{ background: "var(--surface)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-xl font-bold mb-3" style={{ fontFamily: "Oswald" }}>
            <span style={{ color: "var(--red)" }}>DEZE</span>
            <span className="text-white">RP</span>
          </div>
          <p className="text-gray-600 text-sm">© 2024 DezeRP. Проект не аффилирован с Rockstar Games.</p>
        </div>
      </footer>
    </>
  );
}
