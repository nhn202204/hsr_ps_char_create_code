

const ColorTag: React.FC<{ label: string, className?: string }> = ({ label, className }) => {

  return (
    <h1 className={`text-white bg-blue-700 p-1.5 rounded-md bg-opacity-80 z-10 flex justify-center items-center${className ? " " + className : ""}`}>{label}</h1>
  )
}

export default ColorTag