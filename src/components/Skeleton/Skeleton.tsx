const Skeleton = ({ count = 1, row = false }: { count?: number; row?: boolean }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{ minWidth: row ? 155 : undefined, background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", flexShrink: row ? 0 : undefined }}>
        <div className="skeleton-pulse" style={{ width: "100%", aspectRatio: "2/3" }} />
        <div style={{ padding: 10 }}>
          <div className="skeleton-pulse" style={{ height: 12, width: "90%", borderRadius: 4, marginBottom: 6 }} />
          <div className="skeleton-pulse" style={{ height: 10, width: "55%", borderRadius: 4 }} />
        </div>
      </div>
    ))}
  </>
);

export default Skeleton;
