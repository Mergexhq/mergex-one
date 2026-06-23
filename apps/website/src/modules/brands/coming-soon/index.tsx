export default function ComingSoon({ brandName }: { brandName: string }) {
  return (
    <main className="min-h-screen p-24 flex items-center justify-center">
      <h1 className="text-4xl font-bold capitalize">{brandName} - Coming Soon</h1>
    </main>
  );
}
