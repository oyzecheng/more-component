import useHiForm from '@/components/HiForm/hooks/useHiForm.ts'


export const testFormConfig = useHiForm([
  { type: 'input', label: 'name', model: 'name', maxLength: 10 }
])