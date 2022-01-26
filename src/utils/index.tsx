import create, { SetState, GetState } from 'zustand'
import { subscribeWithSelector, devtools } from 'zustand/middleware'

import io from 'socket.io-client'

type Bear = {
  bears: number
  message: string
  increasePopulation: () => void
  removeAllBears: () => void
}

const useStore = create<Bear>(
  subscribeWithSelector(
    devtools((set) => ({
      name: 'bears',
      bears: 0,
      message: '',
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }))
  )
)
export function initialize() {
  const { getState, setState, subscribe, destroy } = useStore
  const socket = io('ws://localhost:3030')

  socket.on('connect', () => {
    setState({ bears: getState().bears + 1 })
  })
  socket.on('message', (data: { type: string; data: string }) => {
    switch (data.type) {
      case 'message':
        setState({ message: data.data })
        break
    }
  })

  return () => {
    destroy()
    socket.close()
  }
}

export { useStore }
