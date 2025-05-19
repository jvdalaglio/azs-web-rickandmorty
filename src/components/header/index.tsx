interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="flex items-center justify-center h-20 bg-background text-white">
      <h1 className="text-2xl font-bold font-creepster">{title}</h1>
    </div>
  );
}
