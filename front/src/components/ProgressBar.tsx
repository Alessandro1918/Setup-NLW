interface ProgressBarProps {
  progress: number  //0 - 100
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div 
        className="h-3 rounded-xl bg-violet-600 transition-all"
        style={{width: `${props.progress}%`}} 

        //used by screen readers:
        role="progressbar"
        aria-label="Progress Bar de hábitos completados nesse dia"
        aria-valuenow={props.progress}
      />
    </div>
  )
}