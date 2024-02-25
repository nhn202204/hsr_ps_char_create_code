import { ChangeEventHandler, PropsWithChildren } from 'react'

interface props {
  id: number
  onChange: ChangeEventHandler<HTMLInputElement>
  checked: boolean
}

const CheckBoxButton: React.FC<PropsWithChildren<props>> = ({ children, id, onChange, checked }) => {

  return (
    <div className="relative flex items-start py-1 ml-2">
      <input id={id.toString()} type="checkbox" checked={checked} className="hidden peer" name="preferred_activities[]" value={id}
        onChange={onChange} />
      <label htmlFor={id.toString()} 
      className="p-2 font-medium tracking-tight border rounded-lg cursor-pointer bg-brand-light 
                text-brand-black border-violet-500 peer-checked:border-violet-400 peer-checked:bg-violet-700">
        <div className="w-full text-center text-sm text-brand-black overflow-hidden rounded-md">
          {children}
        </div>
      </label>
    </div>
  )
}

export default CheckBoxButton