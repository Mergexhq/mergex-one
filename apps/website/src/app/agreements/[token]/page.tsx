interface PageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function AgreementTokenPage({ params }: PageProps) {
  const { token } = await params;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <h1 className="text-4xl font-bold">Public Agreement</h1>
      <p className="mt-4 text-gray-400">Token ID: {token}</p>
    </main>
  );
}
