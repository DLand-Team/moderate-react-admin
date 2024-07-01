import './Preview.scss'


export default function CodeEditorPreview() {
  return (
    <>
      <div className='code-block-line'>
        <pre className='code-block' style={{ backgroundColor: '#bd89e2' }}>{' '.repeat(2)}</pre>
        <pre className='code-block' style={{ backgroundColor: '#e87d85' }}>{' '.repeat(5)}</pre>
        <pre className='code-block' style={{ backgroundColor: '#9faebe' }}>{' '}</pre>
      </div>
      <div className='code-block-line'>
        <pre className='code-block' style={{ backgroundColor: 'transparent' }}>{' '.repeat(2)}</pre>
        <pre className='code-block' style={{ backgroundColor: '#8ad097' }}>{' '.repeat(3)}</pre>
      </div>
      <div className='code-block-line highlight'>
        <pre className='code-block' style={{ backgroundColor: 'transparent' }}>{' '.repeat(2)}</pre>
        <pre className='code-block' style={{ backgroundColor: '#8ad097' }}>{' '.repeat(6)}</pre>
        <pre className='code-block' style={{ backgroundColor: '#e2b876' }}>{' '.repeat(2)}</pre>
        <div className='code-cursor' />
        <div className='code-completions'>
          <div className='code-completion'></div>
          <div className='code-completion'></div>
        </div>
      </div>
      <div className='code-block-line'>
        <pre className='code-block' style={{ backgroundColor: '#9faebe' }}>{' '}</pre>
      </div>
      <div className='code-block-line'>
        <pre className='code-block' style={{ backgroundColor: '#e87d85' }}>{' '.repeat(5)}</pre>
      </div>
    </>
  )
}
