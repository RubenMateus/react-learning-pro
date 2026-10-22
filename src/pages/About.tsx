import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const About = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900">
        <span className="grid size-12 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
          <Sparkles aria-hidden="true" className="size-6" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
          About
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          A place to practice, explore, and build.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          React Learning is a small collection of hands-on examples: user
          management, forms, and a task list. Use the navigation to explore
          each part at your own pace.
        </p>
      </section>

      <section className="mt-6 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">Appearance preference</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Current preference: <span className="font-medium capitalize">{theme}</span>
          </p>
        </div>
        <Button onClick={toggleTheme} variant="outline">
          Switch to {theme === "light" ? "dark" : "light"} theme
        </Button>
      </section>
    </main>
  );
};
