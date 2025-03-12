export function SaveKeyToast(props: {
  keyName: string
  message: string
}) {
  return (
    <span>
      {props.message}{' '}
      <pre className="inline bg-gray-100 py-0.5 px-1 rounded">
        {props.keyName}
      </pre>
    </span>
  )
}
