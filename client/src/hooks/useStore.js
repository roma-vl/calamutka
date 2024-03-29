import {create} from 'zustand'

const useStore = create((set, get) => ({
  file: null,
  showPreview: false,
  showEmoji: false,
  setFile: (file) => {
    const prevFile = get().file
    if (prevFile) {
      // https://w3c.github.io/FileAPI/#creating-revoking
      URL.revokeObjectURL(prevFile)
    }
    set({file})
  },
  setShowPreview: (showPreview) => set({showPreview}),
  setShowEmoji: (showEmoji) => set({showEmoji})
}))

export default useStore
