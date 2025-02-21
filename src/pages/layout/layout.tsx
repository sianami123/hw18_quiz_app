interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center justify-around w-full h-screen">
      <h1 className="text-4xl font-bold mb-8 text-yellow-300">QUIZ</h1>
      {children}
    </div>
  );
}
