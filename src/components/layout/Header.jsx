import Title from "../Title";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-header backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Title text="Batalla Urbana" />
      </div>
    </header>
  );
};

export default Header;
