export default function Home() {
  return (
    <main className="h-screen w-screen bg-[url('/images/linux-programmer-pixel-art.jpg')] bg-center bg-cover">
      <div className="lg:w-5/6 mx-auto pt-5 px-5 h-full">
        <section className="flex justify-center flex-col h-5/6">
          <h1 className="text-white text-4xl mb-4 uppercase font-bold">
            Boostez votre carrière de développeur
          </h1>
          <h2 className="text-white text-2xl mb-4">
            Avec des cours en ligne modernes - Bientôt en béta ouverte !
          </h2>
          <a
            className="bg-blue-600 hover:bg-blue-800 duration-150 h-12 w-48 flex justify-center items-center text-white"
            href="https://beta.nx.academy/"
          >
            Découvrir le projet
          </a>
        </section>
      </div>
    </main>
  );
}
