export const Container = () => {
  return (
    <div className="grid grid-cols-[100px_1fr] grid-rows-[100px_1fr] h-screen">
      <aside className="row-span-2 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <nav className="mt-4 space-y-2">
          <div>Menu 1</div>
          <div>Menu 2</div>
          <div>Menu 3</div>
        </nav>
      </aside>

      <div>
        <header className="bg-blue-500 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow w-full mx-4">
            Pesquisar
          </div>
        </header>

        <main className="bg-gray-100 p-4">
          <h2 className="text-lg font-medium">Conteúdo principal aqui</h2>
          <div className="mt-4 bg-white p-4 rounded-md shadow">
            Este é o conteúdo do container.
          </div>
        </main>
      </div>
    </div>
  );
};
