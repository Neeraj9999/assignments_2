export default function Index(props: { error: any; refetch: () => void }) {
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="w-full h-full gap-y-2 bg-stone-700 rounded flex flex-col items-center justify-center">
        <p className="text-stone-200">
          {(props.error as any)?.message || "Something went wrong"}
        </p>
        <button
          className="px-4 py-1 rounded bg-stone-600"
          onClick={() => props.refetch()}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
