import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/eb6dfeeb-1c23-4e90-b690-80803f4acb65/files/286625a0-63e0-4a80-852e-fea79d951d42.jpg";
const ASSEMBLY_IMG = "https://cdn.poehali.dev/projects/eb6dfeeb-1c23-4e90-b690-80803f4acb65/files/30eeb75e-31a9-47fc-91f8-4f24e216e087.jpg";

const NAV = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О партии" },
  { id: "voting", label: "Голосование" },
  { id: "members", label: "Участники" },
  { id: "contacts", label: "Контакты" },
];

const VOTES = [
  { id: 1, title: "О порядке проведения Большой Копы 2025", status: "active", level: "Большая Копа", ends: "20 апр 2025", yes: 124, no: 18, total: 142 },
  { id: 2, title: "Утверждение Устава о порядке вступления новых членов", status: "active", level: "Малая Копа", ends: "15 апр 2025", yes: 67, no: 31, total: 98 },
  { id: 3, title: "Выбор представителей в Совет Старейшин", status: "done", level: "Большая Копа", ends: "1 мар 2025", yes: 201, no: 44, total: 245 },
];

const MEMBERS = [
  { id: 1, name: "Александр Петрович Волков", role: "Старейшина", region: "Московская обл.", gender: "М", since: "2021" },
  { id: 2, name: "Надежда Ивановна Семёнова", role: "Старейшина", region: "Новгородская обл.", gender: "Ж", since: "2021" },
  { id: 3, name: "Дмитрий Олегович Кузнецов", role: "Копный судья", region: "Тверская обл.", gender: "М", since: "2022" },
  { id: 4, name: "Марина Сергеевна Орлова", role: "Копный судья", region: "Псковская обл.", gender: "Ж", since: "2022" },
  { id: 5, name: "Сергей Владимирович Лебедев", role: "Член партии", region: "Ленинградская обл.", gender: "М", since: "2023" },
  { id: 6, name: "Елена Михайловна Громова", role: "Член партии", region: "Рязанская обл.", gender: "Ж", since: "2023" },
  { id: 7, name: "Артём Николаевич Соловьёв", role: "Член партии", region: "Владимирская обл.", gender: "М", since: "2023" },
  { id: 8, name: "Ольга Павловна Тихомирова", role: "Член партии", region: "Ярославская обл.", gender: "Ж", since: "2024" },
];

const HIERARCHY = [
  { level: 1, title: "Большая Копа", icon: "Crown", desc: "Высший орган: все полноправные члены от 18 лет (мужчины и женщины). Принимает ключевые решения." },
  { level: 2, title: "Совет Старейшин", icon: "Users", desc: "Управление между созывами Копы. Избирается из уважаемых членов, равное представительство полов." },
  { level: 3, title: "Копные судьи", icon: "Scale", desc: "Разрешают споры, следят за соблюдением Устава. Назначаются Советом Старейшин." },
  { level: 4, title: "Малая Копа", icon: "UserCheck", desc: "Местные собрания в регионах. Подотчётны Большой Копе." },
  { level: 5, title: "Члены партии", icon: "User", desc: "Граждане от 18 лет, принявшие Устав. Равные права для мужчин и женщин." },
];

const S = {
  navy: "#0f1f3d",
  navyL: "#1a3060",
  gold: "#c8a53a",
  goldL: "#e8c96a",
  cream: "#f5f0e8",
  creamD: "#ede5d5",
};

export default function Index() {
  const [active, setActive] = useState("home");
  const [votes, setVotes] = useState<Record<number, "yes" | "no">>({});
  const [mob, setMob] = useState(false);
  const [cf, setCf] = useState({ name: "", email: "", msg: "" });
  const [cSent, setCSent] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [jf, setJf] = useState({ name: "", region: "", age: "", email: "" });
  const [jSent, setJSent] = useState(false);

  const go = (id: string) => {
    setActive(id); setMob(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Golos Text', sans-serif", background: S.cream, minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: S.navy, borderBottom: `2px solid ${S.gold}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: S.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: S.navy, fontFamily: "Cormorant, serif", fontWeight: 700, fontSize: 18 }}>К</span>
            </div>
            <div>
              <div style={{ fontFamily: "Cormorant, serif", fontWeight: 700, color: S.goldL, fontSize: 18, lineHeight: 1.2 }}>Партия Копного Права</div>
              <div style={{ fontSize: 10, color: `${S.gold}88`, letterSpacing: "0.25em", textTransform: "uppercase" }}>Народное самоуправление</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="hidden md:flex">
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                style={{ color: active === n.id ? S.gold : `${S.cream}cc`, fontSize: 14, fontWeight: 500, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.02em" }}>
                {n.label}
              </button>
            ))}
            <button onClick={() => setJoinOpen(true)}
              style={{ marginLeft: 16, padding: "8px 20px", background: S.gold, color: S.navy, fontWeight: 700, fontSize: 13, border: "none", borderRadius: 2, cursor: "pointer" }}>
              Вступить
            </button>
          </div>
          <button onClick={() => setMob(!mob)} className="md:hidden" style={{ background: "none", border: "none", color: S.gold, cursor: "pointer" }}>
            <Icon name={mob ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {mob && (
          <div style={{ background: S.navyL, borderTop: `1px solid ${S.gold}33`, padding: "8px 24px 16px" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 0", color: `${S.cream}cc`, fontSize: 14, background: "none", border: "none", borderBottom: `1px solid ${S.gold}22`, cursor: "pointer" }}>
                {n.label}
              </button>
            ))}
            <button onClick={() => { setJoinOpen(true); setMob(false); }}
              style={{ marginTop: 12, width: "100%", padding: "10px", background: S.gold, color: S.navy, fontWeight: 700, fontSize: 13, border: "none", borderRadius: 2, cursor: "pointer" }}>
              Вступить в партию
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 64 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${S.navy}dd, ${S.navy}bb, ${S.navy}ee)` }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 1.5rem", maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${S.gold}66`, color: `${S.gold}cc`, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", padding: "6px 16px", marginBottom: 24 }}>
            <Icon name="Shield" size={11} /> Официальный портал партии
          </div>
          <h1 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 700, color: S.cream, lineHeight: 1.1, marginBottom: 24 }}>
            Партия<br /><span style={{ color: S.gold }}>Копного Права</span>
          </h1>
          <p style={{ color: `${S.cream}bb`, fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px" }}>
            Объединение граждан на основе традиционных принципов народного самоуправления. Равные права для всех членов от 18 лет.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("voting")}
              style={{ padding: "14px 32px", background: S.gold, color: S.navy, fontWeight: 700, fontSize: 14, border: "none", borderRadius: 2, cursor: "pointer", letterSpacing: "0.05em" }}>
              Голосовать
            </button>
            <button onClick={() => go("about")}
              style={{ padding: "14px 32px", background: "transparent", color: S.cream, fontWeight: 500, fontSize: 14, border: `1px solid ${S.cream}55`, borderRadius: 2, cursor: "pointer" }}>
              О партии
            </button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: `${S.navy}ee`, borderTop: `1px solid ${S.gold}33`, display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          {[["1 847", "Членов партии"], ["34", "Регионов"], ["218", "Решений принято"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center", padding: "16px 8px", borderRight: `1px solid ${S.gold}22` }}>
              <div style={{ fontFamily: "Cormorant, serif", fontSize: 28, fontWeight: 700, color: S.gold }}>{v}</div>
              <div style={{ fontSize: 11, color: `${S.cream}66`, letterSpacing: "0.05em" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "80px 0", background: S.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, color: S.gold, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>О партии</div>
            <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: S.navy, margin: 0 }}>Принципы и иерархия</h2>
            <div style={{ margin: "16px auto 0", maxWidth: 160, height: 1, background: `linear-gradient(to right, transparent, ${S.gold}, transparent)` }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center", marginBottom: 64 }}>
            <img src={ASSEMBLY_IMG} alt="Собрание" style={{ width: "100%", borderRadius: 2, border: `1px solid ${S.gold}33`, boxShadow: "0 8px 32px rgba(15,31,61,0.15)" }} />
            <div>
              <h3 style={{ fontFamily: "Cormorant, serif", fontSize: 28, fontWeight: 600, color: S.navy, marginBottom: 16 }}>Копное право — основа народной власти</h3>
              <p style={{ color: "#444", lineHeight: 1.8, marginBottom: 16, fontSize: 15 }}>
                Копное право — древнейшая система народного самоуправления, основанная на общем собрании, коллективном принятии решений и ответственности каждого перед общиной.
              </p>
              <p style={{ color: "#444", lineHeight: 1.8, fontSize: 15 }}>
                Равное право голоса для мужчин и женщин от 18 лет, прозрачное голосование и иерархия, избираемая самими членами.
              </p>
            </div>
          </div>

          <h3 style={{ fontFamily: "Cormorant, serif", fontSize: 28, fontWeight: 700, color: S.navy, textAlign: "center", marginBottom: 32 }}>Структура управления</h3>
          <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {HIERARCHY.map((n, i) => (
              <div key={n.level} style={{ marginLeft: i * 16, borderLeft: `3px solid ${S.gold}`, background: "#fff", padding: "16px 20px", borderRadius: "0 2px 2px 0", boxShadow: "0 2px 8px rgba(15,31,61,0.06)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, background: S.navy, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={n.icon as "Crown"} size={15} style={{ color: S.gold }} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: S.gold, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 2 }}>Уровень {n.level}</div>
                  <div style={{ fontFamily: "Cormorant, serif", fontSize: 18, fontWeight: 600, color: S.navy }}>{n.title}</div>
                  <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginTop: 4 }}>{n.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOTING */}
      <section id="voting" style={{ padding: "80px 0", background: S.navy }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, color: S.gold, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>Народное волеизъявление</div>
            <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: S.cream, margin: 0 }}>Онлайн-голосование</h2>
            <div style={{ margin: "16px auto 0", maxWidth: 160, height: 1, background: `linear-gradient(to right, transparent, ${S.gold}, transparent)` }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {VOTES.map(v => {
              const my = votes[v.id];
              const pct = v.total > 0 ? Math.round((v.yes / v.total) * 100) : 0;
              const active = v.status === "active";
              return (
                <div key={v.id} style={{ background: S.navyL, border: `1px solid ${S.gold}33`, borderRadius: 2, padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 999, fontWeight: 600, background: active ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.07)", color: active ? "#4ade80" : "#888", border: `1px solid ${active ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)"}` }}>
                      {active ? "● Активно" : "Завершено"}
                    </span>
                    <span style={{ fontSize: 11, color: `${S.gold}99`, border: `1px solid ${S.gold}33`, padding: "2px 8px", borderRadius: 999 }}>{v.level}</span>
                  </div>
                  <div style={{ fontFamily: "Cormorant, serif", fontSize: 18, fontWeight: 600, color: S.cream, lineHeight: 1.4, marginBottom: 12 }}>{v.title}</div>
                  <div style={{ fontSize: 11, color: `${S.cream}55`, marginBottom: 16, display: "flex", alignItems: "center", gap: 4 }}>
                    <Icon name="Clock" size={11} /> До {v.ends} · {v.total} голосов
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: `${S.cream}77`, marginBottom: 6 }}>
                      <span>За: {v.yes}</span><span style={{ color: S.gold, fontWeight: 700 }}>{pct}%</span><span>Против: {v.no}</span>
                    </div>
                    <div style={{ height: 4, background: `${S.navy}`, borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: S.gold, borderRadius: 4, transition: "width 0.5s ease" }} />
                    </div>
                  </div>
                  {active ? (
                    my ? (
                      <div style={{ textAlign: "center", padding: "8px", border: `1px solid ${S.gold}44`, color: `${S.gold}cc`, fontSize: 13, borderRadius: 2 }}>
                        ✓ Ваш голос: {my === "yes" ? "«За»" : "«Против»"}
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setVotes(p => ({ ...p, [v.id]: "yes" }))}
                          style={{ flex: 1, padding: "9px", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80", fontSize: 13, borderRadius: 2, cursor: "pointer" }}>За</button>
                        <button onClick={() => setVotes(p => ({ ...p, [v.id]: "no" }))}
                          style={{ flex: 1, padding: "9px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: 13, borderRadius: 2, cursor: "pointer" }}>Против</button>
                      </div>
                    )
                  ) : (
                    <div style={{ textAlign: "center", fontSize: 12, color: `${S.cream}33`, padding: "8px 0" }}>Голосование завершено</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section id="members" style={{ padding: "80px 0", background: S.creamD }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, color: S.gold, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>Состав</div>
            <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: S.navy, margin: 0 }}>Участники партии</h2>
            <div style={{ margin: "16px auto 0", maxWidth: 160, height: 1, background: `linear-gradient(to right, transparent, ${S.gold}, transparent)` }} />
          </div>

          <div style={{ overflowX: "auto", borderRadius: 2, border: `1px solid ${S.gold}33`, boxShadow: "0 4px 16px rgba(15,31,61,0.08)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: S.navy }}>
                  {["Имя", "Должность", "Регион", "Пол", "Член с"].map(h => (
                    <th key={h} style={{ padding: "14px 20px", textAlign: "left", color: `${S.cream}aa`, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MEMBERS.map((m, i) => (
                  <tr key={m.id} style={{ background: i % 2 === 0 ? "#fff" : S.cream, borderBottom: `1px solid ${S.gold}22` }}>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: S.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ color: S.gold, fontSize: 11, fontFamily: "Cormorant, serif", fontWeight: 700 }}>
                            {m.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                          </span>
                        </div>
                        <span style={{ fontWeight: 500, color: S.navy }}>{m.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                        background: m.role === "Старейшина" ? `${S.gold}22` : m.role === "Копный судья" ? `${S.navy}15` : `${S.creamD}`,
                        color: m.role === "Старейшина" ? S.navy : `${S.navy}bb`,
                        border: `1px solid ${m.role === "Старейшина" ? S.gold + "55" : S.navy + "22"}`
                      }}>{m.role}</span>
                    </td>
                    <td style={{ padding: "14px 20px", color: `${S.navy}99` }}>{m.region}</td>
                    <td style={{ padding: "14px 20px", textAlign: "center" }}>
                      <span style={{ fontWeight: 600, fontSize: 13, color: m.gender === "Ж" ? "#be185d" : "#1d4ed8" }}>{m.gender}</span>
                    </td>
                    <td style={{ padding: "14px 20px", color: `${S.navy}66`, textAlign: "center" }}>{m.since}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center", marginTop: 24, color: `${S.navy}77`, fontSize: 13 }}>Показано 8 из 1847 участников</div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "80px 0", background: S.navy }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, color: S.gold, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>Связь с партией</div>
            <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: S.cream, margin: 0 }}>Контакты</h2>
            <div style={{ margin: "16px auto 0", maxWidth: 160, height: 1, background: `linear-gradient(to right, transparent, ${S.gold}, transparent)` }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <h3 style={{ fontFamily: "Cormorant, serif", fontSize: 24, color: S.cream, margin: 0 }}>Реквизиты</h3>
              {[
                { icon: "MapPin", label: "Офис", val: "г. Москва, ул. Народная, 1" },
                { icon: "Phone", label: "Телефон", val: "+7 (495) 000-00-00" },
                { icon: "Mail", label: "Почта", val: "info@kopnoe.ru" },
                { icon: "Clock", label: "Режим", val: "Пн–Пт, 9:00–18:00" },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, background: `${S.gold}18`, border: `1px solid ${S.gold}33`, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={r.icon as "MapPin"} size={16} style={{ color: S.gold }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: `${S.cream}55`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>{r.label}</div>
                    <div style={{ color: `${S.cream}ee`, fontSize: 14 }}>{r.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              {cSent ? (
                <div style={{ textAlign: "center", padding: "48px 24px", border: `1px solid ${S.gold}33`, borderRadius: 2 }}>
                  <Icon name="CheckCircle" size={40} style={{ color: S.gold, marginBottom: 16 }} />
                  <div style={{ fontFamily: "Cormorant, serif", fontSize: 22, color: S.cream, marginBottom: 8 }}>Отправлено!</div>
                  <div style={{ color: `${S.cream}77`, fontSize: 13 }}>Ответим в течение 2 рабочих дней</div>
                  <button onClick={() => setCSent(false)} style={{ marginTop: 20, color: `${S.gold}88`, fontSize: 12, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Написать ещё</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setCSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontFamily: "Cormorant, serif", fontSize: 24, color: S.cream, margin: 0 }}>Написать обращение</h3>
                  {[
                    { key: "name", label: "Ваше имя", type: "text", ph: "Иванов Иван Иванович" },
                    { key: "email", label: "Электронная почта", type: "email", ph: "example@mail.ru" },
                  ].map(f => (
                    <div key={f.key}>
                      <div style={{ fontSize: 11, color: `${S.cream}66`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{f.label}</div>
                      <input type={f.type} required placeholder={f.ph}
                        value={cf[f.key as "name" | "email"]}
                        onChange={e => setCf(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ width: "100%", background: S.navyL, border: `1px solid ${S.gold}33`, color: S.cream, padding: "10px 14px", fontSize: 14, borderRadius: 2, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div>
                    <div style={{ fontSize: 11, color: `${S.cream}66`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Сообщение</div>
                    <textarea required rows={4} placeholder="Ваше обращение..."
                      value={cf.msg} onChange={e => setCf(p => ({ ...p, msg: e.target.value }))}
                      style={{ width: "100%", background: S.navyL, border: `1px solid ${S.gold}33`, color: S.cream, padding: "10px 14px", fontSize: 14, borderRadius: 2, outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <button type="submit" style={{ padding: "13px", background: S.gold, color: S.navy, fontWeight: 700, fontSize: 14, border: "none", borderRadius: 2, cursor: "pointer", letterSpacing: "0.05em" }}>
                    Отправить обращение
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: S.navy, borderTop: `2px solid ${S.gold}44`, padding: "24px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: S.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: S.navy, fontFamily: "Cormorant, serif", fontWeight: 700 }}>К</span>
            </div>
            <span style={{ fontFamily: "Cormorant, serif", color: `${S.gold}cc`, fontSize: 15 }}>Партия Копного Права</span>
          </div>
          <div style={{ color: `${S.cream}44`, fontSize: 12 }}>© 2025 Партия Копного Права</div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Устав", "Документы", "Конфиденциальность"].map(l => (
              <button key={l} style={{ color: `${S.cream}44`, fontSize: 12, background: "none", border: "none", cursor: "pointer" }}>{l}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* JOIN MODAL */}
      {joinOpen && (
        <div onClick={e => { if (e.target === e.currentTarget) setJoinOpen(false); }}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: S.cream, width: "100%", maxWidth: 460, borderRadius: 2, padding: 32, position: "relative", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
            <button onClick={() => setJoinOpen(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: `${S.navy}66` }}>
              <Icon name="X" size={20} />
            </button>
            {jSent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <Icon name="CheckCircle" size={48} style={{ color: S.gold, marginBottom: 16 }} />
                <div style={{ fontFamily: "Cormorant, serif", fontSize: 26, fontWeight: 700, color: S.navy, marginBottom: 8 }}>Заявка принята!</div>
                <div style={{ color: `${S.navy}88`, fontSize: 14 }}>Представитель вашего регионального отделения свяжется с вами в течение 3 рабочих дней.</div>
                <button onClick={() => { setJoinOpen(false); setJSent(false); }}
                  style={{ marginTop: 24, padding: "10px 28px", background: S.gold, color: S.navy, fontWeight: 700, fontSize: 13, border: "none", borderRadius: 2, cursor: "pointer" }}>
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 10, color: S.gold, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 4 }}>Вступление в партию</div>
                  <div style={{ fontFamily: "Cormorant, serif", fontSize: 26, fontWeight: 700, color: S.navy }}>Подать заявку</div>
                  <div style={{ fontSize: 12, color: `${S.navy}88`, marginTop: 4 }}>Открыто для граждан от 18 лет</div>
                </div>
                <form onSubmit={e => { e.preventDefault(); setJSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { key: "name", label: "ФИО", type: "text", ph: "Иванов Иван Иванович" },
                    { key: "email", label: "Электронная почта", type: "email", ph: "example@mail.ru" },
                  ].map(f => (
                    <div key={f.key}>
                      <div style={{ fontSize: 11, color: `${S.navy}77`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>{f.label}</div>
                      <input type={f.type} required placeholder={f.ph}
                        value={jf[f.key as "name" | "email"]}
                        onChange={e => setJf(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ width: "100%", border: `1px solid ${S.navy}22`, background: "#fff", color: S.navy, padding: "9px 14px", fontSize: 14, borderRadius: 2, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { key: "age", label: "Возраст", type: "number", ph: "18+" },
                      { key: "region", label: "Регион", type: "text", ph: "Москва" },
                    ].map(f => (
                      <div key={f.key}>
                        <div style={{ fontSize: 11, color: `${S.navy}77`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>{f.label}</div>
                        <input type={f.type} required placeholder={f.ph} min={f.key === "age" ? "18" : undefined}
                          value={jf[f.key as "age" | "region"]}
                          onChange={e => setJf(p => ({ ...p, [f.key]: e.target.value }))}
                          style={{ width: "100%", border: `1px solid ${S.navy}22`, background: "#fff", color: S.navy, padding: "9px 14px", fontSize: 14, borderRadius: 2, outline: "none", boxSizing: "border-box" }} />
                      </div>
                    ))}
                  </div>
                  <button type="submit" style={{ marginTop: 4, padding: "13px", background: S.navy, color: S.gold, fontWeight: 700, fontSize: 14, border: "none", borderRadius: 2, cursor: "pointer", letterSpacing: "0.05em" }}>
                    Подать заявку на вступление
                  </button>
                  <div style={{ textAlign: "center", fontSize: 11, color: `${S.navy}55` }}>Нажимая кнопку, вы принимаете Устав партии</div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}