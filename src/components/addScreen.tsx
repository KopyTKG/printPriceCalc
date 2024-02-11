'use client'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Button, Input } from '@nextui-org/react'
import { invoke } from '@tauri-apps/api'
import { ChangeEvent, useRef, useState } from 'react'

function Addscreen(props) {
 const [vendor, setVendor] = useState('')
 const [color, setColor] = useState('')
 const [type, setType] = useState('')
 const [price, setPrice] = useState(0)
 const [weight, setWeight] = useState(0)

 const [Val_vendor, set_Val_Vendor] = useState(true)
 const [Val_color, set_Val_Color] = useState(true)
 const [Val_type, set_Val_Type] = useState(true)
 const [Val_price, set_Val_Price] = useState(true)
 const [Val_weight, set_Val_Weight] = useState(true)

 const Vendor = useRef(null)
 const Color = useRef(null)
 const Type = useRef(null)
 const Price = useRef(null)
 const Weight = useRef(null)

 function HideScreen() {
  const main = props.Ref.current || null
  main?.classList.add('off')
 }

 async function AddFilament() {
  if (!vendor || !color || !type || !price || !weight) {

   if (!vendor) {
    set_Val_Vendor(false)
   }
   if (!color) {
    set_Val_Color(false)
   }
   if (!type) {
    set_Val_Type(false)
   }
   if (!price) {
    set_Val_Price(false)
   }
   if (!weight) {
    set_Val_Weight(false)
   }
  } else {
    const VendorCur = Vendor.current || null
    const ColorCur = Color.current || null
    const TypeCur = Type.current || null
    const PriceCur = Price.current || null
    const WeightCur = Weight.current || null
    VendorCur.value = ''
    ColorCur.value = ''
    TypeCur.value = ''
    PriceCur.value = ''
    WeightCur.value = ''

    const res = await invoke<string>('write_filament', {
    vendor: vendor,
    color: color,
    type: type,
    price: price,
    weight: weight,
   })

   if (res) {
    console.log(res)
   }
    

    setVendor('')
    setColor('')
    setType('')
    setPrice(0)
    setWeight(0)

    props.ReadFilaments()
  }
 }
 return (
  <div ref={props.Ref} className="w-screen h-screen bg-gray-800 absolute top-0 left-0 z-50 base off">
   <div className="w-screen flex justify-end px-5 py-5">
    <XMarkIcon className="w-10 h-10 cursor-pointer stroke-red-600" onClick={() => HideScreen()} />
   </div>
   <div className="flex flex-col items-center">
    <h1 className="text-4xl text-white font-bold">Add Filament</h1>
    <div className="grid grid-cols-2 items-center gap-2 my-5">
     <span className="text-white text-2xl">Vendor:</span>
     <Input
      ref={Vendor}
      isInvalid={!Val_vendor}
      size="sm"
      placeholder="Prusament"
      color="primary"
      value={vendor}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {setVendor(e.target.value); set_Val_Vendor(true)}}
      required
     />

     <span className="text-white text-2xl">Color:</span>
     <Input
      ref={Color}
      isInvalid={!Val_color}
      size="sm"
      placeholder="Jet Black"
      color="primary"
      value={color}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {setColor(e.target.value); set_Val_Color(true)}}
      required
     />

     <span className="text-white text-2xl">Type:</span>
     <Input
      ref={Type}
      isInvalid={!Val_type}
      size="sm"
      placeholder="PLA"
      color="primary"
      value={type}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {setType(e.target.value); set_Val_Type(true)}}
      required
     />

     <span className="text-white text-2xl">Price:</span>
     <Input
      ref={Price}
      isInvalid={!Val_price}
      size="sm"
      placeholder="700"
      color="primary"
      value={price === 0 ? '' : price.toString()}
      endContent={<span>Kč</span>}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {setPrice(Number(e.target.value)); set_Val_Price(true)}}
      required
     />

     <span className="text-white text-2xl">Weight:</span>
     <Input
      ref={Weight}
      isInvalid={!Val_weight}
      size="sm"
      placeholder="1000"
      color="primary"
      value={weight === 0 ? '' : weight.toString()}
      endContent={<span>g</span>}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {setWeight(Number(e.target.value)); set_Val_Weight(true)}}
      required
     />
    </div>
    <Button color="primary" type="button" onClick={() => AddFilament()} size="lg">
     Add
    </Button>
   </div>
  </div>
 )
}

export default Addscreen
