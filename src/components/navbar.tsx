import { PlusIcon } from '@heroicons/react/20/solid'
import {
 Button,
 Dropdown,
 DropdownTrigger,
 DropdownMenu,
 DropdownItem,
 Divider,
} from '@nextui-org/react'

function Navbar(props: {
 ShowAddScreen: () => void
 ShowTable: () => void
 Calculate: () => void
 defaultLoad: boolean
}) {
 return (
  <nav className="grid grid-cols-2 py-2 bg-slate-900 min-h-10 mb-5 px-3">
   <div className="flex gap-5 ">
    <Dropdown className="text-white">
     <DropdownTrigger>
      <Button variant="light" color="primary" className="font-bold text-lg">
       Filaments
      </Button>
     </DropdownTrigger>
     <DropdownMenu
      aria-label="Static Actions"
      variant="bordered"
      color="primary"
      className="text-black">
      <DropdownItem
       key="new"
       startContent={<PlusIcon className="w-4 h-4" />}
       description="Add filament to configuration file"
       onClick={() => props.ShowAddScreen()}>
       New filament
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
