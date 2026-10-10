export default function AssessmentLayout({ children }: LayoutProps<"/assessment">) {
  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-14">
      <p className="mb-10 text-sm font-semibold text-accent-text">Talentology DISC</p>
      <main>{children}</main>
    </div>
  );
}
