import { create } from 'zustand'

type ReserveFormStore = {
  submit: () => void
  setSubmit: (fn: () => void) => void
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
}

export const useReserveFormStore = create<ReserveFormStore>(set => ({
  submit: () => {},
  setSubmit: fn => set({ submit: fn }),
  isSubmitting: false,
  setIsSubmitting: value => set({ isSubmitting: value }),
}))
