import Icon from "@/components/ui/icon";

interface FormData {
  nickname: string;
  email: string;
  password: string;
  password2: string;
  gender: string;
}

interface AuthModalProps {
  authMode: "login" | "register";
  authLoading: boolean;
  authError: string;
  authSuccess: string;
  formData: FormData;
  onClose: () => void;
  onOpenAuth: (mode: "login" | "register") => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (field: keyof FormData, value: string) => void;
}

export default function AuthModal({
  authMode,
  authLoading,
  authError,
  authSuccess,
  formData,
  onClose,
  onOpenAuth,
  onSubmit,
  onFormChange,
}: AuthModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md animate-fade-in-up"
        style={{ background: "var(--surface)", border: "1px solid rgba(230,48,48,0.3)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title text-2xl text-white">
              {authMode === "login" ? "Вход" : "Регистрация"}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="flex mb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            {(["login", "register"] as const).map((m) => (
              <button key={m} onClick={() => onOpenAuth(m)}
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
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              {authMode === "register" && (
                <>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block" style={{ fontFamily: "Oswald" }}>Никнейм</label>
                    <input type="text" placeholder="YourNickname" value={formData.nickname}
                      onChange={(e) => onFormChange("nickname", e.target.value)} required />
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
                          onClick={() => onFormChange("gender", g.val)}
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
                    {!formData.gender && (
                      <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: "Oswald" }}>Выберите пол персонажа</p>
                    )}
                  </div>
                </>
              )}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block" style={{ fontFamily: "Oswald" }}>Email</label>
                <input type="email" placeholder="email@example.com" value={formData.email}
                  onChange={(e) => onFormChange("email", e.target.value)} required />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block" style={{ fontFamily: "Oswald" }}>Пароль</label>
                <input type="password" placeholder="••••••••" value={formData.password}
                  onChange={(e) => onFormChange("password", e.target.value)} required />
              </div>
              {authMode === "register" && (
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block" style={{ fontFamily: "Oswald" }}>Повторите пароль</label>
                  <input type="password" placeholder="••••••••" value={formData.password2}
                    onChange={(e) => onFormChange("password2", e.target.value)} required />
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
  );
}
