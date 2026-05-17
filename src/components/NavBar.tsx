import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "rules" | "leaderboard" | "donate" | "download";

interface NavBarProps {
  activeSection: Section;
  currentUser: { id: number; nickname: string; email: string } | null;
  onNav: (s: Section) => void;
  onOpenAuth: (mode: "login" | "register") => void;
  onLogout: () => void;
}

const navItems: { id: Section; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "rules", label: "Правила" },
  { id: "leaderboard", label: "Рейтинг" },
  { id: "donate", label: "Донат" },
  { id: "download", label: "Скачать" },
];

export default function NavBar({ activeSection, currentUser, onNav, onOpenAuth, onLogout }: NavBarProps) {
  const [mobileMenu, setMobileMenu] = useState(false);

  const nav = (s: Section) => { onNav(s); setMobileMenu(false); };

  return (
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
              <button className="btn-outline text-sm py-2 px-4" onClick={onLogout}>Выйти</button>
            </div>
          ) : (
            <>
              <button className="btn-outline text-sm py-2 px-4" onClick={() => onOpenAuth("login")}>Войти</button>
              <button className="btn-red text-sm py-2 px-4" onClick={() => onOpenAuth("register")}>Регистрация</button>
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
            <div className="flex flex-col gap-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              {currentUser ? (
                <>
                  <span className="text-sm text-gray-400" style={{ fontFamily: "Oswald" }}>👤 {currentUser.nickname}</span>
                  <button className="btn-outline text-sm py-2" onClick={() => { onLogout(); setMobileMenu(false); }}>Выйти</button>
                </>
              ) : (
                <>
                  <button className="btn-outline text-sm py-2" onClick={() => { onOpenAuth("login"); setMobileMenu(false); }}>Войти</button>
                  <button className="btn-red text-sm py-2" onClick={() => { onOpenAuth("register"); setMobileMenu(false); }}>Регистрация</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
