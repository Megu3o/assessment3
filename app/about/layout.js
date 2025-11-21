export default function Layout({ children }) {
  return (
    <section className="py-8 md:py-10">
      <div className="mx-auto max-w-3xl px-4">
        <main>{children}</main>
      </div>
    </section>
  );
}
