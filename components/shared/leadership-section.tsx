import Image from "next/image";
import { LightOrbs } from "@/components/home/light-orbs";
import { leadership, type Leader } from "@/lib/leadership";

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    // tabIndex: quem navega pelo teclado também consegue abrir a descrição
    <li className="group flex flex-col items-center text-center outline-none" tabIndex={0}>
      <div className="relative size-52 sm:size-56">
        {/* halo e anel tracejado, no mesmo espírito dos círculos dos pilares */}
        <span className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgb(242_176_30/0.4),rgb(47_127_240/0.3)_50%,transparent_72%)] blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-70" aria-hidden="true" />
        <span className="pillar-spin absolute inset-[-6%] rounded-full border-2 border-dashed border-gold/40" aria-hidden="true" />

        {/* moldura dourada */}
        <div className="relative size-full rounded-full bg-linear-to-br from-gold-300 via-gold to-gold-600 p-1.5 shadow-[0_24px_50px_-18px_rgb(0_0_0/0.7)] transition-transform duration-300 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]">
          <div className="relative size-full overflow-hidden rounded-full bg-blue-100">
            <Image src={leader.photo} alt={`${leader.name}, ${leader.role.toLowerCase()} do Colégio CPPEM`} fill sizes="224px" className="object-cover" />
            {/* descrição por cima da foto: só em tela larga com mouse (ou foco pelo teclado) */}
            <div className="absolute inset-0 hidden place-items-center bg-navy-950/88 px-7 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:[@media(hover:hover)]:grid">
              <p className="text-sm leading-snug font-bold text-white">{leader.description}</p>
            </div>
          </div>
        </div>

        <span className="btn-gold absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 font-display text-xs font-black tracking-widest whitespace-nowrap uppercase">
          {leader.role}
        </span>
      </div>

      <h3 className="mt-8 font-display text-2xl leading-tight font-black text-white">{leader.name}</h3>
      {/* no celular e em telas de toque não há hover: a descrição fica sempre visível, abaixo do nome */}
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-blue-100/85 sm:[@media(hover:hover)]:hidden">{leader.description}</p>
      <p className="mt-1 hidden text-sm text-blue-100/60 sm:[@media(hover:hover)]:block" aria-hidden="true">
      </p>
    </li>
  );
}

export function LeadershipSection() {
  return (
    <section id="diretoria" className="surface-night scroll-mt-20 overflow-hidden py-14 sm:py-20">
      <LightOrbs />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-extrabold tracking-widest text-gold-300 uppercase">Equipe diretiva</p>
          <h2 className="mt-1 font-display text-[clamp(1.8rem,3.8vw,2.9rem)] leading-tight font-black text-white">
            Conheça nossa <span className="text-gold">diretoria.</span>
          </h2>
          <p className="mt-3 text-lg text-blue-100/85">Quem está à frente do Colégio CPPEM no dia a dia.</p>
        </div>

        <ul className="mt-12 grid justify-items-center gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </ul>
      </div>
    </section>
  );
}
