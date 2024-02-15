'use client'
import Removescreen from '@/components/RemoveScreen'
import Addscreen from '@/components/addScreen'
import Editscreen from '@/components/editScreen'
import Filaments from '@/components/filamentsScreen'
import Navbar from '@/components/navbar'
import { Button, Input } from '@nextui-org/react'
import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

export default function Home() {
 const [defaultLoad, setDefault] = useState(false)
 const [filaments, setFilaments] = useState([
  {
   vendor: '',
   color: '',
   type: '',
   price: 0,
   weight: 0,
  },
 ])

 const [settings, setSettings] = useState({
  Energy: 15,
  Margin: 0.15,
  PricePerHour: 100,
  PostProcessing: 0.25,
 })
 const [selected, setSelected] = useState(Array<number>())
 const Base = useRef()
 const AddScreen = useRef()
 const EditScreen = useRef()
 const RemoveScreen = useRef()

 function ShowTable() {
  const main = Base.current || null
  if (main) {
   if (main?.classList.contains('off')) {
    main?.classList.remove('off')
   } else {
    main?.classList.add('off')
   }
  }
 }

 function Calculate() {
  let total = 0
  selected.forEach((id) => {
   const input = document.getElementById('in' + id) as HTMLInputElement
   const val = input?.value || 0
   total += (filaments[id].price / filaments[id].weight) * Number(val)
  })

  const designTime = document.getElementById('designTime') as HTMLInputElement
  let timeStr = designTime.value || ''
  let count = 0
  let time = 0
  timeStr.split(':').forEach((slot: string) => {
   let sub = 60 * count
   if (sub === 0) {
    time += Number(slot)
   } else {
    time += Number(slot) / (60 * count)
   }
   count++
  })
  total += time * settings.PricePerHour

  const printTime = document.getElementById('printTime') as HTMLInputElement
  timeStr = printTime.value || ''
  count = 0
  time = 0
  timeStr.split(':').forEach((slot: string) => {
   let sub = 60 * count
   if (sub === 0) {
    time += Number(slot)
   } else {
    time += Number(slot) / (60 * count)
   }
   count++
  })
  total += time * settings.Energy

  const printCosts = document.getElementById('printCosts') as HTMLInputElement
  let printCostsStr = printCosts.value || 0
  total += Number(printCostsStr)

  const parts = document.getElementById('parts') as HTMLInputElement
  let partsStr = parts.value || 0
  total += Number(partsStr) * settings.PostProcessing * settings.PostProcessing

  const prints = document.getElementById('prints') as HTMLInputElement
  let printsStr = prints.value || 0
  total *= Number(printsStr)

  total *= 1 + settings.Margin

  const totalL = document.getElementById('total')
  const formattedTotal = new Intl.NumberFormat('cs-CZ', {
   style: 'currency',
   currency: 'CZK',
   minimumFractionDigits: 2,
  }).format(total)
  totalL.innerHTML = formattedTotal
 }

 function DisplayPrice(e: ChangeEvent<HTMLInputElement>, id: number) {
  const val = e.target.value
  if (id >= 0 && filaments[id]) {
   const elementId = `${id}${filaments[id].vendor}`
   const lbl = document.getElementById(elementId)
   if (lbl) {
    const price = (filaments[id].price / filaments[id].weight) * Number(val)
    const formattedPrice = new Intl.NumberFormat('cs-CZ', {
     style: 'currency',
     currency: 'CZK',
     minimumFractionDigits: 2,
    }).format(price)
    lbl.innerHTML = formattedPrice
   } else {
    console.error(`Element with ID ${elementId} not found`)
   }
  } else {
   console.error(`Invalid filament index: ${id}`)
  }
 }

 async function ReadFilaments() {
  const raw = await readTextFile('filaments.json', {
   dir: BaseDirectory.AppConfig,
  })
  let res = JSON.parse(raw)
  if (res.length > 0) {
   setFilaments(JSON.parse(raw))
  } else {
   setDefault(true)
  }
 }

 async function ReadSettings() {
  const raw = await readTextFile('vars.json', {
   dir: BaseDirectory.AppConfig,
  })
  setSettings(JSON.parse(raw))
 }

 useEffect(() => {
  ReadFilaments().catch(console.error)
  ReadSettings().catch(console.error)
 }, [])
 return (
  <main className="min-h-screen min-w-screen">
   <Navbar
    ShowTable={ShowTable}
    Calculate={Calculate}
    AddRef={AddScreen}
    EditRef={EditScreen}
    RemoveRef={RemoveScreen}
    defaultLoad={defaultLoad}
   />
   <Addscreen Ref={AddScreen} ReadFilaments={ReadFilaments} />
   <Editscreen Ref={EditScreen} ReadFilaments={ReadFilaments} Filaments={filaments} />
   <Removescreen Ref={RemoveScreen} ReadFilaments={ReadFilaments} Filaments={filaments} />
   <Filaments Ref={Base} filaments={filaments} setSelected={setSelected} selected={selected} />
   <div className="grid grid-cols-[60%,40%] w-screen">
    <div className="flex flex-col mx-5 gap-2">
     <div className="px-2 inline-grid grid-cols-5 gap-2 items-center bg-gray-600 h-10 ">
      <span>Vendor</span>
      <span>Color</span>
      <span>Type</span>
      <span>Used weight</span>
      <span>Price per weight</span>
     </div>
     {selected.map((id, key) => {
      return (
       <div
        key={
         key +
         filaments[id].vendor +
         filaments[id].color +
         filaments[id].type +
         filaments[id].weight
        }
        className="px-2 inline-grid grid-cols-5 gap-2 items-center">
        <span>{filaments[id].vendor}</span>
        <span>{filaments[id].color}</span>
        <span>{filaments[id].type}</span>
        <span>
         <Input id={'in' + id} size="sm" onChange={(e) => DisplayPrice(e, id)} className="w-24" />
        </span>
        <span className="flex justify-end mr-4" id={id + filaments[id].vendor}>
         0 Kč
        </span>
       </div>
      )
     })}
    </div>
    <div className="flex flex-col gap-20">
     <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-2 items-center w-[70%]">
       <span>Design time</span>
       <Input size="sm" className="w-32" id="designTime" placeholder="hh:mm:ss" />
       <span>Print time</span>
       <Input size="sm" className="w-32" id="printTime" placeholder="hh:mm:ss" />
       <span>Print costs</span>
       <Input size="sm" className="w-32" id="printCosts" placeholder="xx,xx" />
       <span>Parts/bed</span>
       <Input size="sm" className="w-32" id="parts" placeholder="x" />
       <span>Prints amount</span>
       <Input size="sm" className="w-32" id="prints" placeholder="x" />
      </div>
     </div>
     <div className="flex justify-evenly">
      <span className="text-2xl">Total price:</span>
      <span className="font-bold text-3xl px-4" id="total">
       0,00 Kč
      </span>
     </div>
     <div className="flex justify-center">
      <Button
       type="button"
       size="lg"
       color="primary"
       className="w-max right-0"
       onClick={() => Calculate()}>
       Calculate
      </Button>
     </div>
    </div>
   </div>
  </main>
 )
}
