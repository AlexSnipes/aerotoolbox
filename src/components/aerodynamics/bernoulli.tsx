export default function Bernoulli({ active }: { active: string }) {
  return (
    <div className={active === 'bernoulli' ? 'block' : 'hidden'}>
      <h2>Teorema de Bernoulli</h2>
      <p>
        El teorema de Bernoulli es una expresión de la conservación de la energía en un flujo de fluido. El teorema de
        Bernoulli establece que en un fluido ideal, sin viscosidad, en régimen estacionario y sin fuerzas exteriores, la
        energía total por unidad de masa permanece constante a lo largo de una línea de corriente.
      </p>
      <h3>Expresión matemática</h3>
      <p>La expresión matemática del teorema de Bernoulli es:</p>
      <p></p>
      <p>Donde:</p>
      <ul>
        <li>\( P \) es la presión del fluido en el punto considerado.</li>
        <li>\( \rho \) es la densidad del fluido.</li>
        <li>\( v \) es la velocidad del fluido en el punto considerado.</li>
        <li>\( g \) es la aceleración de la gravedad.</li>
        <li>\( h \) es la altura del punto considerado respecto de un nivel de referencia.</li>
      </ul>
      <h3>Aplicaciones</h3>
      <p>
        El teorema de Bernoulli es de gran utilidad en la aerodinámica, ya que permite relacionar la velocidad de un
        fluido con la presión que ejerce sobre una superficie.
      </p>
    </div>
  );
}
