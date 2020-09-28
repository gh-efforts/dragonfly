export const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }
    timeout = setTimeout(() => func(...args), waitFor)
  }

  return debounced as (...args: Parameters<F>) => ReturnType<F>
}

export const copyToClipboard = (textToCopy: string): Promise<void> => {
  return new Promise(
    (resolve, reject): void => {
      let success = false
      const listener = (e: ClipboardEvent): void => {
        if (e.clipboardData) {
          e.clipboardData.setData('text/plain', textToCopy)
          e.preventDefault()
          success = true
        }
      }
      // some browser requires selected item
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.select()

      document.addEventListener('copy', listener)
      document.execCommand('copy')
      document.removeEventListener('copy', listener)
      document.body.removeChild(input)
      success ? resolve() : reject()
    }
  )
}

export const transPower = (data: number) => {
  let size = ''
  if (data < 1 * 1024) {
    size = data.toFixed(2) + 'B'
  } else if (data < 1 * 1024 * 1024) {
    size = (data / 1024).toFixed(2) + 'KiB'
  } else if (data < 1 * 1024 * 1024 * 1024) {
    size = (data / (1024 * 1024)).toFixed(2) + 'MiB'
  } else if (data < 1 * 1024 * 1024 * 1024 * 1024) {
    size = (data / (1024 * 1024 * 1024)).toFixed(2) + 'GiB'
  } else if (data < 1 * 1024 * 1024 * 1024 * 1024 * 1024) {
    size = (data / (1024 * 1024 * 1024 * 1024)).toFixed(2) + 'TiB'
  } else {
    size = (data / (1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) + 'PiB'
  }
  return size
}
