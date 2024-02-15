'use client'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Button } from '@nextui-org/react'
import { useState, RefObject, useRef } from 'react'

function Removescreen(props: {
 Ref: RefObject<HTMLDivElement>
 ReadFilaments: () => void
 Filaments: Array<object>
}) {
 const [vendor, setVendor] = useState('')
 const [color, setColor] = useState('')
 const [type, setType] = useState('')
 const [price, setPrice] = useState(0)
 const [weight, setWeight] = useState(0)
 const [selected, setSelected] = useState(-1)

 const Prompt = useRef(null)
 function HideScreen() {
  const main = props.Ref.current || null
  main?.classList.add('off')
 }

 function Select(id: number) {
  try {
   const filament = props.Filaments[id]
   setVendor(filament['vendor'])
   setColor(filament['color'])
   setType(filament['type'])
   setPrice(filament['price'])
   setWeight(filament['weight'])
   setSelected(id)

   const pront = Prompt.current || null
   pront?.classList.remove('hidden')
   pront?.classList.add('visible')
  } catch (error) {
   console.error(error)
  }
 }

 function Clear() {
  setVendor('')
  setColor('')
  setType('')
  setPrice(0)
  setWeight(0)

  props.ReadFilaments()

  const pront = Prompt.current || null
  pront?.classList.remove('visible')
  pront?.classList.add('hidden')
 }

 async function RemoveFilament() {
  const index = await import('@tauri-apps/api')
  const res = await index.invoke('remove_filament', {
   id: selected,
  })

  console.log(res)
  Clear()
 }
 return (
  <div
   ref={props.Ref}
   className="w-screen h-screen bg-gray-800 absolute top-0 left-0 z-50 base off">
   <div className="w-screen flex justify-end px-5 py-5">
    <XMarkIcon className="w-10 h-10 cursor-pointer stroke-red-600" onClick={() => HideScreen()} />
   </div>
   <div
    ref={Prompt}
    className="absolute w-screen h-screen top-0 bg-gray-800/55 justify-center items-center hidden ">
    <div className="absolute w-[50vw] h-[40vh] bg-red-500 border-black border-3 rounded-xl flex flex-col justify-center items-center gap-5 ">
     <h1 className="text-4xl font-bold"> Are you sure?</h1>
     <div className="text-xl"> Are you sure you want to remove this filament?</div>
     <div className="inline-grid grid-cols-5 gap-4 w-full text-sm text-center">
      <div>
       <span className="font-bold">{vendor}</span>
      </div>
      <div>
       <span className="font-bold">{color}</span>
      </div>
      <div>
       <span className="font-bold">{type}</span>
      </div>
      <div>
       <span className="font-bold">{price}</span>
      </div>
      <div>
       <span className="font-bold">{weight}</span>
      </div>
     </div>
     <div className="flex gap-5">
      <Button color="primary" size="lg" onClick={() => RemoveFilament()}>
       Yes
      </Button>
      <Button color="danger" size="lg" onClick={() => Clear()}>
       No
      </Button>
     </div>
    </div>
   </div>
   <div className="flex flex-col items-center">
    <h1 className="text-4xl text-white font-bold">Remove Filament</h1>
    <div className="w-full px-5">
     <div className="bg-slate-300 text-black inline-grid grid-cols-5 gap-4 w-full text-sm">
      <div>Vendor</div>
      <div>Color</div>
      <div>Type</div>
      <div>Price</div>
      <div>Weight</div>
     </div>
     {props.Filaments.map(
      (
       filament: {
        vendor: string | null | undefined
        color: string | null | undefined
        type: string | null | undefined
        price: number | null | undefined
        weight: number | null | undefined
       },
       key: any,
      ) => {
       return (
        <div
         key={key + filament.vendor + filament.color + filament.type}
         className="inline-grid grid-cols-5 gap-4 hover:bg-white/30 hover:cursor-pointer w-full text-sm"
         onClick={() => Select(key)}>
         <div>{filament.vendor}</div>
         <div>{filament.color}</div>
         <div>{filament.type}</div>
         <div>{filament.price.toString()}</div>
         <div>{filament.weight.toString()}</div>
        </div>
       )
      },
     )}
    </div>
   </div>
  </div>
 )
}

export default Removescreen
