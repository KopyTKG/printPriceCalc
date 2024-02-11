import { Button } from '@nextui-org/react'

function Navbar(props) {
 return (
  <nav className="grid grid-cols-2 py-2 bg-gray-800 min-h-10 mb-5 px-3">
   <div className="flex gap-5 ">
    <Button
     type="button"
     color="warning"
     onClick={() => props.ShowAddScreen()}
     className="w-max"
     isDisabled={props.defaultLoad}>
     Add
    </Button>

    <Button
     type="button"
     color="success"
     onClick={() => props.ShowTable()}
     className="w-max"
     isDisabled={props.defaultLoad}>
     Select filament
    </Button>
   </div>
   <div className="flex justify-end">
    <Button
     type="button"
     color="primary"
     className="w-max right-0"
     onClick={() => props.Calculate()}>
     Calculate
    </Button>
   </div>
  </nav>
 )
}

export default Navbar
