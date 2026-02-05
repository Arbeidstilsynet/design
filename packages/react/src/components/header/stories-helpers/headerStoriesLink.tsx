export function Link({ children }: { children: React.ReactNode; href: string }) {
  return (
    <div style={{ color: "var(--ds-color-main-text-default)", cursor: "pointer" }}>
      {children}
    </div>
  );
}
