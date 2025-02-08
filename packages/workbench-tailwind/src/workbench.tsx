type WorkbenchProps = {
  test: string
}

export function Workbench(props: WorkbenchProps) {
  return <div className="text-green-500">I am the workbench! {props.test}</div>
}
