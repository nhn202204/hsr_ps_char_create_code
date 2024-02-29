'use client'

import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from "react"

export type EidolonChangedFunc = (value: number) => void
export type EidolonStepFunc = ({ label, id }: { label: string, id: string }) => void

interface Props {
  label: string, id: string, initStat: number, maxStep: number
  stepChanged: EidolonChangedFunc
}

const CharacterEidolonInput: React.FC<Props> = ({ label, id, stepChanged, initStat, maxStep }) => {

  const [step, setStep] = useState<number>(initStat)

  const handelIncrement: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if (step < maxStep) {
      setStep(() => step + 1)
    }
  }

  const handelDecrement: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if (step > 0) {
      setStep(() => step - 1)
    }
  }

  const handleOnchange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log("onchange step: ", e.target.step)
    let newStep = e.target.step ? parseInt(e.target.step) : 0
    if (newStep > maxStep) newStep = maxStep
    else if (newStep < 0) newStep = 0
    setStep(newStep)
  }

  useEffect(() => {
    stepChanged(step)
  }, [step])

  return (
    <>
      <div className="flex items-center col-span-2">
        <label htmlFor={id} className={`text-gray-900 dark:text-white mr-2 break-words`}>{label}</label>
      </div>
      <div className={`relative flex items-center w-full col-span-5`}>
        <button type="button" id={"decrement-button-" + id} onClick={handelDecrement}
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-10 
          focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
          <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
          </svg>
        </button>
        <input type="number" max={30} min={0} id={id} data-input-counter aria-describedby="helper-text-explanation" value={step} onChange={handleOnchange}
          className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm w-full 
                    py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          placeholder="0" required />
        <button type="button" id={"increment-button" + id} onClick={handelIncrement}
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-10 
          focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
          <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default CharacterEidolonInput