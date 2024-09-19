const Alerta = ({ alerta }) => {
  const { error } = alerta;
  return (
    <div
      className={`${
        error ? "from-red-400 to-red-600" : "from-indigo-400 to-indigo-600"
      } bg-gradient-to-tr text-center font-bold text-white p-3 rounded-xl mb-10 text-sm uppercase `}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;

//el componente tiene como parametro un objeto {alerta}. En el div mostramos el .msg de ese objeto y usamos la propiedad error como condicional para la clase---> className= {} para escapar del jsx y template string para inyectar Js className = { `  ${codigo js} clases  ` }

//Cuando las clases tienen condicional se escribe: ClassName={} --llaves y backticks ``
