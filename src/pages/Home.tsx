import { ArrowRight, CheckSquare, Info, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const Home = () => {
  const sections = [
    {
      title: "Manage users",
      description: "Browse your users, update their details, or add someone new.",
      to: "/users",
      icon: Users,
      iconClass: "bg-blue-100 text-blue-700",
    },
    {
      title: "Your tasks",
      description: "Keep track of what needs doing and celebrate what’s complete.",
      to: "/todos",
      icon: CheckSquare,
      iconClass: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "About this app",
      description: "Learn more about this little space and its preferences.",
      to: "/about",
      icon: Info,
      iconClass: "bg-violet-100 text-violet-700",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-10 text-white shadow-xl shadow-blue-950/10 sm:px-10 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
          Welcome back
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          A little space to learn and get things done.
        </h1>
        <p className="mt-4 max-w-xl leading-7 text-blue-100">
          Explore your users, keep up with your tasks, and make progress one
          step at a time.
        </p>
        <Link
          to="/todos"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
        >
          View your tasks <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </section>

      <section className="mt-10">
        <div className="mb-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Explore
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Pick up where you like.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {sections.map(({ title, description, to, icon: Icon, iconClass }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
            >
              <span
                className={`grid size-11 place-items-center rounded-xl ${iconClass}`}
              >
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700 dark:text-blue-300">
                Explore <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};
