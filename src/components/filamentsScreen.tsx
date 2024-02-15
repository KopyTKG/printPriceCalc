'use client'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Checkbox } from '@nextui-org/react'
import {
 ReactElement,
 JSXElementConstructor,
 ReactPortal,
 PromiseLikeOfReactNode,
 ReactNode,
} from 'react'

function Filaments(props: {
 Ref: any
 selected: number[]
 // eslint-disable-next-line no-unused-vars
 setSelected: (arg0: any[]) => void
 filaments: {
  vendor:
   | string
   | number
   | boolean
   | ReactElement<any, string | JSXElementConstructor<any>>
   | ReactPortal
   | PromiseLikeOfReactNode
   | Iterable<ReactNode>
   | null
   | undefined
  color:
   | string
   | number
   | boolean
   | ReactElement<any, string | JSXElementConstructor<any>>
   | ReactPortal
   | PromiseLikeOfReactNode
   | Iterable<ReactNode>
   | null
   | undefined
  type:
   | string
   | number
   | boolean
   | ReactElement<any, string | JSXElementConstructor<any>>
   | ReactPortal
   | PromiseLikeOfReactNode
   | Iterable<ReactNode>
   | null
   | undefined
  price:
   | string
   | number
   | boolean
   | ReactElement<any, string | JSXElementConstructor<any>>
   | ReactPortal
   | PromiseLikeOfReactNode
   | Iterable<ReactNode>
   | null
   | undefined
  weight:
   | string
   | number
   | boolean
   | ReactElement<any, string | JSXElementConstructor<any>>
   | ReactPortal
   | PromiseLikeOfReactNode
   | Iterable<ReactNode>
   | null
   | undefined
 }[]
}) {
 function SelectedFilaments(id: number) {
  if (props.selected.includes(id)) {
   let tmp: Array<number> = []
   props.selected.forEach((element: number) => {
    if (element != id) tmp.push(element)
   })
   props.setSelected(tmp)
  } else {
   props.setSelected([...props.selected, id])
  }
 }

 function HideSelection() {
  const base = props.Ref.current
  base.classList.add('off')
 }

 return (
  <div
   ref={props.Ref}
   className="absolute w-screen h-screen top-0 left-0 bg-black/75 flex justify-center base off z-10">
   <XMarkIcon
    className="w-10 h-10 cursor-pointer stroke-red-600 absolute top-5 right-5"
    onClick={() => HideSelection()}
   />
   <div className=" absolute w-screen h-screen -z-10" onClick={() => HideSelection()} />
   <div className="flex flex-col w-[80%] min-h-[90%] max-h-[90vh] mt-[5vh] bg-gray-800 border-2 border-white px-2 py-3 rounded-md">
    <div className="bg-slate-300 text-black inline-grid grid-cols-6 gap-4">
     <div>Add</div>
     <div>Vendor</div>
     <div>Color</div>
     <div>Type</div>
     <div>Price</div>
     <div>Weight</div>
    </div>
    {props.filaments.map(
     (
      filament: {
       vendor:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | PromiseLikeOfReactNode
        | null
        | undefined
       color:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | PromiseLikeOfReactNode
        | null
        | undefined
       type:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | PromiseLikeOfReactNode
        | null
        | undefined
       price:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | PromiseLikeOfReactNode
        | null
        | undefined
       weight:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | PromiseLikeOfReactNode
        | null
        | undefined
      },
      key: any,
     ) => {
      return (
       <div
        key={key + filament.vendor + filament.color + filament.type}
        className="inline-grid grid-cols-6 gap-4 hover:bg-white/30"
        onClick={() => SelectedFilaments(key)}>
        <div>
         <Checkbox
          isSelected={props.selected.includes(key)}
          id={key + filament.vendor + filament.color}
          size="md"
          onClick={() => SelectedFilaments(key)}></Checkbox>
        </div>
        <div>{filament.vendor}</div>
        <div>{filament.color}</div>
        <div>{filament.type}</div>
        <div>{filament.price}</div>
        <div>{filament.weight}</div>
       </div>
      )
     },
    )}
   </div>
  </div>
 )
}

export default Filaments
