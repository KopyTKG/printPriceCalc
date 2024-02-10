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
 return (
  <div ref={props.Ref} className="flex w-screen justify-center base off z-10">
   <div className="flex flex-col w-[80vw] bg-gray-800 border-2 border-white px-2 py-3 rounded-md">
    <div className="bg-slate-300 text-black inline-grid grid-cols-6 gap-4">
     <span>Add</span>
     <span>Vendor</span>
     <span>Color</span>
     <span>Type</span>
     <span>Price</span>
     <span>Weight</span>
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
        className="inline-grid grid-cols-6 gap-4">
        <span>
         <Checkbox size="md" onClick={() => SelectedFilaments(key)}></Checkbox>
        </span>
        <span>{filament.vendor}</span>
        <span>{filament.color}</span>
        <span>{filament.type}</span>
        <span>{filament.price}</span>
        <span>{filament.weight}</span>
       </div>
      )
     },
    )}
   </div>
  </div>
 )
}

export default Filaments
