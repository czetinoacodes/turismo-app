export default function QuienesSomosPage() {
  return (
    <div className="mx-auto max-w-full space-y-8 bg-zinc-950">
      <h1 className="text-5xl md:text-8xl lg:8xl font-bold text-white text-center" style={{ fontFamily: "var(--font-playfair)" }}>
        Sobre nosotros
      </h1>
      <div className="flex flex-col md:flex-row justify-between">
        {/*mision*/}
        <div className="order-1 text-center p-12">
          <h3 className="text-xl md:text-6xl lg:text-6xl font-black text-amber-400/90 mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Misión
          </h3>
          <p className="text-lg text-stone-200 font-light">
            Brindar experiencias de viaje accesibles, seguras y memorables, conectando a nuestros clientes con los destinos
            y atractivos de El Salvador mediante un servicio de transporte cómodo, atención cercana y una organización responsable.
          </p>
        </div>
        {/*vision*/}
        <div className="order-2 text-center p-12">
          <h3 className="text-xl md:text-6xl lg:text-6xl font-black text-amber-400/90 mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Visión
          </h3>
          <p className="text-lg text-stone-200 font-light">
            Ser una agencia de turismo reconocida en Santa Ana y El Salvador por ofrecer experiencias de calidad,
            ampliar continuamente nuestra oferta de destinos y convertir cada viaje en una oportunidad para descubrir,
            disfrutar y crear nuevos recuerdos.
          </p>
        </div>

      </div>
      <section id="destinos" className="bg-zinc-900 px-5 py-10">
        <h1
          className="text-5xl md:text-6xl lg:text-8xl font-black text-amber-500/90 mb-6 leading-tight text-center"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          ACOTOURS
        </h1>
        <div className="mx-auto max-w-6xl text-gray-400 justify-items-center text-justify font-light">

          <p className="text-xl md:text-2xl mb-8 ">
            ACOTOURS es una extensión de ACODES S.A. de C.V., empresa con trayectoria en el rubro del transporte departamental en Santa Ana, El Salvador. A partir de la experiencia adquirida en el sector transporte y con el propósito de ofrecer nuevas alternativas a nuestros usuarios, nace ACOTOURS como una propuesta orientada al turismo, la recreación y el descubrimiento de nuevos destinos.
          </p>

          <p className="text-xl md:text-2xl mb-8">
            En ACOTOURS organizamos excursiones y viajes grupales a distintos destinos, desde playas, montañas, pueblos turísticos y sitios históricos, hasta parques recreativos, actividades culturales y experiencias especiales. Cada viaje es planificado buscando ofrecer una experiencia cómoda y organizada, desde el punto de encuentro hasta el retorno.
          </p>
          <p className="text-xl md:text-2xl mb-8">
            Contamos con transporte con aire acondicionado y coordinadores de grupo, procurando que nuestros pasajeros puedan disfrutar del recorrido con mayor comodidad y acompañamiento. Además, en determinados viajes ofrecemos servicio domiciliar al retorno en zonas céntricas de Santa Ana, facilitando aún más la experiencia para nuestros usuarios.
          </p>

          <p className="text-xl md:text-2xl mb-8 font-bold">
            Viajamos contigo para que descubras nuevos destinos, vivas nuevas experiencias y crees recuerdos que perduren.
          </p>
        </div>
      </section>
    </div>
  );
}