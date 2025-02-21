import { PizzaIcon } from 'lucide-react'

export function EmptyState(props: {
  label: string
}) {
  return (
    <div className="w-full flex items-center flex-wrap justify-center gap-10">
      <div className="grid gap-4 w-60">
        <div className="flex flex-col gap-1 items-center justify-center">
          <PizzaIcon className="text-red-400" size={120} />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-center text-base font-semibold leading-relaxed">
            {props.label}
          </h2>
        </div>
      </div>
    </div>
  )
}
