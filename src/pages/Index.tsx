import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const AUTH_URL = "https://functions.poehali.dev/569a5b55-77b1-4b70-b78b-466210497f0b";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/365970a3-3a96-4709-bf03-6f332841bb5d/files/5bc0fec9-6709-4a9a-90b1-82425d780664.jpg";

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

type Section = "home" | "rules" | "leaderboard" | "donate" | "download";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<{id: number; nickname: string; email: string} | null>(() => {
    try {
      const saved = localStorage.getItem("dezerp_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [formData, setFormData] = useState({ nickname: "", email: "", password: "", password2: "", gender: "" });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("dezerp_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("dezerp_user");
    }
  }, [currentUser]);

  const navItems: { id: Section; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "rules", label: "Правила" },
    { id: "leaderboard", label: "Рейтинг" },
    { id: "donate", label: "Донат" },
    { id: "download", label: "Скачать" },
  ];

  const nav = (s: Section) => { setActiveSection(s); setMobileMenu(false); };

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthError("");
    setAuthSuccess("");
    setFormData({ nickname: "", email: "", password: "", password2: "" });
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    if (authMode === "register") {
      if (formData.password !== formData.password2) {
        setAuthError("Пароли не совпадают");
        return;
      }
      if (!formData.gender) {
        setAuthError("Выберите пол персонажа");
        return;
      }
    }

    setAuthLoading(true);
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: authMode,
          nickname: formData.nickname,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setAuthError(data.error || "Произошла ошибка");
      } else {
        setCurrentUser(data.user);
        setAuthSuccess(authMode === "register" ? `Добро пожаловать, ${data.user.nickname}!` : `С возвращением, ${data.user.nickname}!`);
        setTimeout(() => { setAuthMode(null); setAuthSuccess(""); }, 1500);
      }
    } catch {
      setAuthError("Ошибка сети, попробуйте ещё раз");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid-bg">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(10,11,15,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(230,48,48,0.2)" }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => nav("home")} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-glow-red" style={{ fontFamily: "Oswald", color: "var(--red)" }}>DEZE</span>
            <span className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald" }}>RP</span>
            <span className="w-2 h-2 rounded-full animate-pulse-glow ml-1" style={{ background: "var(--red)" }}></span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => nav(item.id)}
                className={`nav-link text-sm font-medium uppercase tracking-widest ${activeSection === item.id ? "active text-white" : "text-gray-400 hover:text-white"}`}
                style={{ fontFamily: "Oswald" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300" style={{ fontFamily: "Oswald" }}>👤 {currentUser.nickname}</span>
                <button className="btn-outline text-sm py-2 px-4" onClick={() => setCurrentUser(null)}>Выйти</button>
              </div>
            ) : (
              <>
                <button className="btn-outline text-sm py-2 px-4" onClick={() => openAuth("login")}>Войти</button>
                <button className="btn-red text-sm py-2 px-4" onClick={() => openAuth("register")}>Регистрация</button>
              </>
            )}
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
            <Icon name={mobileMenu ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden animate-slide-down" style={{ background: "rgba(10,11,15,0.98)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="px-4 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => nav(item.id)}
                  className={`text-left py-2 text-sm font-medium uppercase tracking-widest ${activeSection === item.id ? "text-red-500" : "text-gray-400"}`}
                  style={{ fontFamily: "Oswald" }}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex gap-3 pt-2">
                {currentUser ? (
                  <button className="btn-outline text-sm py-2 px-4 flex-1" onClick={() => { setCurrentUser(null); setMobileMenu(false); }}>Выйти ({currentUser.nickname})</button>
                ) : (
                  <>
                    <button className="btn-outline text-sm py-2 px-4 flex-1" onClick={() => { openAuth("login"); setMobileMenu(false); }}>Войти</button>
                    <button className="btn-red text-sm py-2 px-4 flex-1" onClick={() => { openAuth("register"); setMobileMenu(false); }}>Регистрация</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* AUTH MODAL */}
      {authMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
          onClick={() => setAuthMode(null)}>
          <div className="w-full max-w-md animate-fade-in-up"
            style={{ background: "var(--surface)", border: "1px solid rgba(230,48,48,0.3)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="section-title text-2xl text-white">
                  {authMode === "login" ? "Вход" : "Регистрация"}
                </h2>
                <button onClick={() => setAuthMode(null)} className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="flex mb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                {(["login", "register"] as const).map((m) => (
                  <button key={m} onClick={() => openAuth(m)}
                    className="flex-1 py-2 text-sm uppercase tracking-wider transition-colors"
                    style={{ fontFamily: "Oswald", borderBottom: authMode === m ? "2px solid var(--red)" : "2px solid transparent", color: authMode === m ? "white" : "rgba(255,255,255,0.4)" }}>
                    {m === "login" ? "Войти" : "Регистрация"}
                  </button>
                ))}
              </div>

              {authSuccess ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="text-white font-semibold" style={{ fontFamily: "Oswald", fontSize: "1.2rem" }}>{authSuccess}</p>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleAuthSubmit}>
                  {authMode === "register" && (
                    <>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block" style={{ fontFamily: "Oswald" }}>Никнейм</label>
                        <input type="text" placeholder="YourNickname" value={formData.nickname}
                          onChange={(e) => setFormData(f => ({ ...f, nickname: e.target.value }))} required />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block" style={{ fontFamily: "Oswald" }}>Пол персонажа</label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { val: "male", label: "Мужской", icon: "👨" },
                            { val: "female", label: "Женский", icon: "👩" },
                          ].map((g) => (
                            <button
                              key={g.val}
                              type="button"
                              onClick={() => setFormData(f => ({ ...f, gender: g.val }))}
                              className="flex items-center justify-center gap-2 py-3 text-sm transition-all"
                              style={{
                                fontFamily: "Oswald",
                                border: formData.gender === g.val ? "2px solid var(--red)" : "1px solid rgba(255,255,255,0.12)",
                                background: formData.gender === g.val ? "rgba(230,48,48,0.12)" : "rgba(255,255,255,0.03)",
                                color: formData.gender === g.val ? "white" : "rgba(255,255,255,0.5)",
                                cursor: "pointer",
                              }}
                            >
                              <span className="text-lg">{g.icon}</span>
                              {g.label}
                            </button>
                          ))}
                        </div>
                        {authMode === "register" && !formData.gender && (
                          <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: "Oswald" }}>Выберите пол персонажа</p>
                        )}
                      </div>
                    </>
                  )}
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block" style={{ fontFamily: "Oswald" }}>Email</label>
                    <input type="email" placeholder="email@example.com" value={formData.email}
                      onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block" style={{ fontFamily: "Oswald" }}>Пароль</label>
                    <input type="password" placeholder="••••••••" value={formData.password}
                      onChange={(e) => setFormData(f => ({ ...f, password: e.target.value }))} required />
                  </div>
                  {authMode === "register" && (
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block" style={{ fontFamily: "Oswald" }}>Повторите пароль</label>
                      <input type="password" placeholder="••••••••" value={formData.password2}
                        onChange={(e) => setFormData(f => ({ ...f, password2: e.target.value }))} required />
                    </div>
                  )}
                  {authError && (
                    <div className="text-sm py-2 px-3 flex items-center gap-2"
                      style={{ background: "rgba(230,48,48,0.12)", border: "1px solid rgba(230,48,48,0.3)", color: "#ff6b6b" }}>
                      <Icon name="AlertCircle" size={14} />
                      {authError}
                    </div>
                  )}
                  <button type="submit" className="btn-red w-full mt-2" disabled={authLoading}
                    style={{ opacity: authLoading ? 0.7 : 1, cursor: authLoading ? "not-allowed" : "pointer" }}>
                    {authLoading ? "Загрузка..." : authMode === "login" ? "Войти" : "Зарегистрироваться"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="pt-16">
        {/* ─── HOME ─── */}
        {activeSection === "home" && (
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
                    <button className="btn-red text-base px-8 py-3 animate-pulse-glow" onClick={() => nav("download")}>
                      Играть сейчас
                    </button>
                    <button className="btn-outline text-base px-8 py-3" onClick={() => nav("rules")}>
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
                  <button className="btn-red px-10 py-4 text-lg" onClick={() => openAuth("register")}>Зарегистрироваться</button>
                  <button className="btn-blue px-10 py-4 text-lg" onClick={() => nav("download")}>Скачать клиент</button>
                </div>
              </div>
            </section>
          </div>
        )}

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
                            onClick={() => openAuth("register")}
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
      </main>
    </div>
  );
}