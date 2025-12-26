export default function ContinuityEquation({ active }: { active: string }) {
  return (
    <div className={active === 'continuity' ? 'block' : 'hidden'}>
      <h2>Ecuación de Continuidad</h2>
      <p>
        Por un tubo de <input className="w-16 inline-flex" /> cm de diámetro interior fluye agua a una velocidad de{' '}
        <input className="w-16 inline-flex" /> m/s. ¿Cuál debe ser el diámetro de la sección de salida para que el agua
        salga a una velocidad de <input className="w-16 inline-flex" /> m/s?
      </p>
      <p>
        La ecuación de continuidad es una de las ecuaciones fundamentales de la mecánica de fluidos. Establece que la
        masa que entra en un volumen de control debe ser igual a la masa que sale de ese volumen. La ecuación de
        continuidad se puede expresar de la siguiente manera:
      </p>
      <div className="text-center text-sm font-bold my-2">ρ1 * A1 * V1 = ρ2 * A2 * V2</div>
      <ul>
        <li>ρ = Densidad del fluido</li>
        <li>A = Área de la sección transversal</li>
        <li>V = Velocidad del fluido</li>
      </ul>
      <p>
        La ecuación de continuidad se puede aplicar a cualquier flujo de fluido, ya sea en un tubo, un canal, un río, un
        conducto, etc. En el caso de un tubo, la ecuación de continuidad se puede expresar de la siguiente manera:
      </p>
      <div className="text-center text-sm font-bold my-2">A1 * V1 = A2 * V2</div>
      <p>
        Donde A1 y A2 son las áreas de las secciones transversales del tubo y V1 y V2 son las velocidades del fluido en
        esas secciones.
      </p>
    </div>
  );
}
