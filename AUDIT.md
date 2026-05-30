# Аудит сайта math-training

Дата: 2026-05-30
Всего найдено: 33 — **все исправлены**

---

Все 33 замечания устранены:

- **№1–4** (3 критических + 1): ссылка Task6 → Link, ErrorBoundary, guard нулевого диапазона GraphViewer, guard a=0 в параболе
- **№5–12** (8 средних): клавиатурная доступность (role, tabIndex, onKeyDown), ARIA (progressbar, nav, svg), :focus-visible, удалены дубли @keyframes fadeIn, ProgressBar убран с главной
- **№13–33** (21 низкое): удалён мёртвый код (simplifyFrac, gcd), ID через счётчик, type="button", lazy initialParams, убран лишний paramArr, фидбек при невалидном вводе, clamped ProgressBar, единое округление, clamp шага сетки, placeholder для пустого графика, aria-hidden на иконках, aria-live="polite", document.title, React.memo, guard parseFloat, динамическая легенда, stale closure в Docs
