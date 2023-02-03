import * as RadixCheckbox from "@radix-ui/react-checkbox"
import { Check } from "phosphor-react";

interface CheckboxProps {
  key: string
  title: string
  checked?: boolean
  //TODO - this props could be ommited from the declaration and extended from the corect type, like the mobile/Checkbox.tsx file
  disabled?: boolean
  onChange: (checkboxId: any) => void   //checkboxId: string ("Dormir 8h") | number (0 (Sunday))
}

export function Checkbox({key, title, checked = false, disabled = false, onChange}: CheckboxProps) {

  return (
    //tailwind trick: "group": allows me to style components based on attributes they don't have, but someone inside the group does */}
    //(style the parent "div" based on the state of the "Indicator" child)
    <RadixCheckbox.Root 
      className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
      checked={checked}
      disabled={disabled}
      onCheckedChange={() => onChange(key)}
    >

      {/* Here I style a div because an unchecked Radix checkbox does not get rendered */}
      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
        <RadixCheckbox.Indicator>
          <Check size={20} className="text-white"/>
        </RadixCheckbox.Indicator>
      </div>

      {/* TODO - add this if checkbox is for "habits": "group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400" */}
      <span className="font-semibold text-xl text-white leading-tight">
        {title}
      </span>
    </RadixCheckbox.Root>
  )
}