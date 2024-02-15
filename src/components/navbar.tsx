import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import {
 Button,
 Dropdown,
 DropdownTrigger,
 DropdownMenu,
 DropdownItem,
 Divider,
} from '@nextui-org/react'
import { RefObject } from 'react'

function Navbar(props: {
 ShowTable: () => void
 Calculate: () => void
 defaultLoad: boolean
 AddRef: RefObject<HTMLDivElement>
 EditRef: RefObject<HTMLDivElement>
 RemoveRef: RefObject<HTMLDivElement>
}) {
 function Show(ref: RefObject<HTMLDivElement>) {
  const main = ref.current || null
  if (main) {
   if (main?.classList.contains('off')) {
    main?.classList.remove('off')
   } else {
    main?.classList.add('off')
   }
  }
 }

 return (
  <nav className="grid grid-cols-2 py-2 bg-slate-900 min-h-10 mb-5 px-3">
   <div className="flex gap-5 ">
    <Dropdown className="text-white">
     <DropdownTrigger>
      <Button variant="light" color="primary" className="font-bold text-lg">
       Filaments
      </Button>
     </DropdownTrigger>
     <DropdownMenu aria-label="Static Actions" className="text-black">
      <DropdownItem
       key="new"
       startContent={<PlusIcon className="w-4 h-4" />}
       variant="solid"
       description="Add filament to configuration file"
       onClick={() => Show(props.AddRef)}>
       New filament
      </DropdownItem>
      <DropdownItem
       key="edit"
       startContent={<PencilIcon className="w-4 h-4" />}
       description="Edit filaments configuration"
       variant="solid"
       onClick={() => Show(props.EditRef)}>
       Edit filament
      </DropdownItem>
      <DropdownItem
       key="edit"
       startContent={<TrashIcon className="w-4 h-4" />}
       description="Remove filament from configuration file"
       color="danger"
       variant="solid"
       onClick={() => Show(props.RemoveRef)}>
       Remove filament
      </DropdownItem>
     </DropdownMenu>
    </Dropdown>
    <Divider orientation="vertical" className="bg-gray-500" />
    <Button
     variant="light"
     type="button"
     color="success"
     onClick={() => props.ShowTable()}
     className="w-max font-bold text-lg"
     isDisabled={props.defaultLoad}>
     Select filament
    </Button>
   </div>
   <div className="flex justify-end"></div>
  </nav>
 )
}

export default Navbar
